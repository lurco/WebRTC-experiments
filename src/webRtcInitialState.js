const servers = { // stun servers
    iceServers: [
        {
            urls: "stun:stun.relay.metered.ca:80",
        },
        {
            urls: "turn:eu.relay.metered.ca:80",
            username: "fc0df59808e9b6ca61e35dca",
            credential: "olSo+Tft0Wq/iU7H",
        },
        {
            urls: "turn:eu.relay.metered.ca:80?transport=tcp",
            username: "fc0df59808e9b6ca61e35dca",
            credential: "olSo+Tft0Wq/iU7H",
        },
        {
            urls: "turn:eu.relay.metered.ca:443",
            username: "fc0df59808e9b6ca61e35dca",
            credential: "olSo+Tft0Wq/iU7H",
        },
        {
            urls: "turns:eu.relay.metered.ca:443?transport=tcp",
            username: "fc0df59808e9b6ca61e35dca",
            credential: "olSo+Tft0Wq/iU7H",
        },
    ],
    iceCandidatePoolSize: 10,
}

export default {
    pc: new RTCPeerConnection(servers),
    localIceCandidates: [],
    remoteIceCandidates: [],
    dataChannel: null,
};
