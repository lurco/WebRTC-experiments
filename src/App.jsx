import Peer from "peerjs";
import {useRef, useState} from "react";
import WebRtcContainer from "./WebRtcContainer.jsx";

function App() {
    let peer;
    let myStream = null;
    let theirStream = null;
    const [myPeerId, setMyPeerId] = useState('');
    const [theirPeerId, setTheirPeerId] = useState('');
    const myVideo = useRef();
    const theirVideo = useRef();


    async function playMyVideo() {
        const myStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });

        myVideo.current.srcObject = myStream;
        myVideo.current.play();

        return myStream;
    }

    function stopVideo(stream) {
        stream.getTracks().forEach((track) => track.stop());
    }

    function connectPeer(peer) {
        return peer.connect(theirPeerId);
    }

    async function playTheirVideo(theirStream) {
        theirVideo.current.srcObject = theirStream;
        theirVideo.current.play();
    }

    return (
        <>
            <h1>WebRTC</h1>
            <WebRtcContainer/>

        </>
    )
}

export default App
