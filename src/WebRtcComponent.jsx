const videoPlayerStyle = {
    width: "400px",
    height: "400px",
    border: "1px solid red",
}

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    alignItems: 'center'
};
const containerStyleNoGap = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
};

function WebRtcComponent({
                             myVideo,
                             theirVideo,
                             myPeerId,
                             setMyPeerId,
                             theirPeerId,
                             setTheirPeerId,
                             myStream,
                             stopVideo,
                             playMyVideo,
                         }) {

    return (
        <div style={containerStyle}>
            <div style={containerStyleNoGap}>
                <label htmlFor='my-peer-id'>
                    My peer ID:
                </label>
                <input id='my-peer-id' type="text" value={myPeerId}
                       onChange={(e) => setMyPeerId(e.target.value)}/>
            </div>
            <div style={containerStyleNoGap}>
                <label htmlFor='their-peer-id'>
                    Their peer ID:
                </label>
                <input id='their-peer-id' type="text" value={theirPeerId}
                       onChange={(e) => setTheirPeerId(e.target.value)}/>
            </div>
            <div>
                <video ref={myVideo} style={videoPlayerStyle}></video>
                <video ref={theirVideo} style={videoPlayerStyle}></video>
            </div>
            <div>
                <button
                    style={{background: 'lightgreen'}}
                    onClick={async (e) => {
                        myStream = await playMyVideo();
                    }}
                >
                    Turn on my video
                </button>
                <button
                    style={{background: 'lightcoral'}}
                    onClick={(e) => {
                        stopVideo(myStream);
                    }}
                >
                    Turn off my video
                </button>
            </div>
            <div>
                <button
                    style={{background: 'green'}}
                >
                    Connect
                </button>
                <button
                    style={{background: 'red'}}
                >
                    Disconnect
                </button>
            </div>
            <button>Hide incoming videos</button>
            <button>Mute</button>
        </div>
    );
}

export default WebRtcComponent;
