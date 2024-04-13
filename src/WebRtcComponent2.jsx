import Peer from "peerjs";

function WebRtcComponent2() {

    const openConnection = () => {
        const peer = new Peer('this_unique_id_is_very_unique');
        peer.on('open', (id) => {
            console.log('My peer ID is: ' + id);
        });
    }

    return (
        <div>
            <button onClick={openConnection}>Kliknij mnie!</button>
        </div>
    );
}

export default WebRtcComponent2;
