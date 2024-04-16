import {useEffect, useReducer, useRef, useState} from "react";
import reducer from './webRtcReducer';
import initialState from './webRtcInitialState';

function WebRtcComponent2() {
    const [isCaller, setIsCaller] = useState(true);
    const chatRef = useRef(null);
    const remoteDescriptionRef = useRef(null);
    const remoteIceCandidatesRef = useRef(null);
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleCreateOffer = () => {
        state.pc
            .createOffer()
            .then((offer) => {
                console.log(`new local offer: ${JSON.stringify(offer)}`)
                dispatch({type: 'SET_LOCAL_DESCRIPTION', payload: offer});
                const dataChannel = state.pc.createDataChannel('chat');
                dispatch({type: 'SET_DATA_CHANNEL', payload: dataChannel});
            });
    }

    const handleAcceptOffer = () => {
        if (state.pc.signalingState !== 'closed') {
            const remoteDescription = JSON.parse(remoteDescriptionRef.current.value);
            state.pc
                .setRemoteDescription(remoteDescription)
                .then(() => {
                    state.pc
                        .createAnswer()
                        .then((answer) => {
                            console.log(`new local answer: ${JSON.stringify(answer)}`);
                            dispatch({type: 'SET_REMOTE_DESCRIPTION', payload: answer});
                        });
                })
                .catch((error) => console.error('error setting remote description', error));

        }
    }

    const handleAcceptAnswer = () => {
        if (state.pc.signalingState !== 'closed') {
            const remoteDescription = JSON.parse(remoteDescriptionRef.current.value);
            state.pc
                .setRemoteDescription(remoteDescription)
                .then(() => {
                    console.log('Remote description set');
                })
                .catch((error) => console.error('error setting remote description', error));
        }
    }

    const handleAddRemoteIceCandidate = () => {
        const remoteIceCandidate = JSON.parse(remoteIceCandidatesRef.current.value);
        state.pc.addIceCandidate(remoteIceCandidate).catch(() => console.error('error adding remote ice candidate'));
        dispatch({type: 'ADD_REMOTE_ICE_CANDIDATE', payload: remoteIceCandidate});

    }

    useEffect(() => {
        state.pc.onicecandidate = (event) => {
            if (event.candidate) {
                console.log(`new local ice candidate: ${event.candidate}`);
                state.pc.addIceCandidate(event.candidate).catch(() => console.error('error adding local ice candidate'));
                dispatch({type: 'ADD_LOCAL_ICE_CANDIDATE', payload: event.candidate});
            }

            if (state.dataChannel) {
                state.dataChannel.onopen = () => {
                    console.log('Data channel is open');
                };

                state.dataChannel.onmessage = (event) => {
                    console.log('Received message:', event.data);
                    // Display the message in your chat
                    chatRef.current.textContent += `\n${event.data}`;
                };

                state.dataChannel.onclose = () => {
                    console.log('Data channel is closed');
                };
            }
        }

        if (state.dataChannel && state.pc) {
            return () => {
                state.dataChannel.close();
                state.pc.close();
            }
        }
    }, [state]);

    return (
        <div>
            <label htmlFor="is_caller">
                <input name="is_caller" type="checkbox" checked={isCaller} onChange={() => setIsCaller(!isCaller)}/>
                Inicjuję
            </label>
            <h1>WebRtcComponent2</h1>
            <p ref={chatRef}>Tutaj chat</p>
            {isCaller && <button onClick={handleCreateOffer}>Zainicjuj połączenie</button>}
            <input type="text" ref={remoteDescriptionRef}/>
            <button onClick={isCaller ? handleAcceptAnswer : handleAcceptOffer}>Przyjmij {isCaller ? 'odpowiedź' : 'połączenie'}</button>
            <hr/>
            <input type="text" ref={remoteIceCandidatesRef}/>
            <button onClick={handleAddRemoteIceCandidate}>Dodaj kandydata ICE</button>
        </div>
    );
}

export default WebRtcComponent2;
