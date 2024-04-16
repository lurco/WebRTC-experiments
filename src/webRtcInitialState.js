const servers = { // stun servers
    iceservers: [
        {
            urls: [
                "stun1.l.google.com:19302",
                "23.21.150.121:3478",
                "iphone-stun.strato-iphone.de:3478",
                "numb.viagenie.ca:3478",
                "s1.taraba.net:3478",
                "s2.taraba.net:3478",
                "stun.12connect.com:3478",
                "stun.12voip.com:3478",
                "stun.1und1.de:3478",
                "stun.2talk.co.nz:3478",
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
