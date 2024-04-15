import Peer from "peerjs";
import {useCallback, useEffect, useState} from "react";
import OtherWebRtcComponent from "./OtherWebRtcComponent.jsx";

function WebRtcComponent2() {
    const [myId, setMyId] = useState('');
    const [otherIds, setOthersIds] = useState([]);
    const mvOtherId = useCallback((index, value) => {
        setOthersIds((othersIds) => {
            const newOthersIds = [...othersIds];
            newOthersIds[index] = value;
            return newOthersIds;
        });
    }, []);
    let peer = null;

    const openMyConnection = () => {
        peer = new Peer(`lurco_${myId}`);
        peer.on('open', (id) => {
            console.log('My peer ID is: ' + id);
        });
    }

    const addConnection = () => {
        mvOtherId(otherIds.length, '');
    }

    return (
        <div>
            <form>
                <input type="text" value={myId} onChange={(e) => setMyId(e.target.value)}/>
                <button onClick={openMyConnection}>Kliknij mnie!</button>
            </form>
            {/*{otherIds.map((id, index) => (*/}
            {/*    <OtherWebRtcComponent othersIds={otherIds} mvOtherId={mvOtherId} peer={peer} index={index} key={otherIds[index]}/>*/}
            {/*))}*/}
            {/*<button onClick={addConnection}>Dodaj połączenie</button>*/}
        </div>
    );
}

export default WebRtcComponent2;
