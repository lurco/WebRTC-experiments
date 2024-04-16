const servers = { // stun servers
    iceservers: [
        {
            urls: [
                "stun1.l.google.com:19302",
                "stun2.l.google.com:19302",
            ]
        }
    ],
    iceCandidatePoolSize: 10,
}

export default {
    pc: new RTCPeerConnection(servers),
    localIceCandidates: [],
    remoteIceCandidates: [],
    dataChannel: null,
};
