import {useEffect, useState} from "react";

function OtherWebRtcComponent({othersIds, peer, index, mvOtherId}) {
    const [connection, setConnection] = useState(null);
    const [isConnecting, setIsConnecting] = useState(false);

    useEffect(() => {
        if (!isConnecting) {
            return;
        }
        const conn = peer.connect(`lurco_${othersIds[index]}`);
        conn.on('open', () => {
            conn.send(`Connected to ${othersIds[index]}!`);
        });

        conn.on('error', (err) => {
            console.error('Connection error:', err);
        });

        peer.on('error', (err) => {
            console.error('Peer error:', err);
        });

        setConnection(conn);

        // return () => {
        //     conn.close();
        // }
    }, [isConnecting]);



    return (
        <form>
            <input type="text" value={othersIds[index]} onChange={(e) => {
                mvOtherId(index, e.target.value)
            }}/>
            <button onClick={(e) => {
                e.preventDefault();
                setIsConnecting(true);
            }}>Utwórz połączenie
            </button>
        </form>
    );
}

export default OtherWebRtcComponent;
