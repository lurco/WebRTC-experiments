export default  (state, action) => {
    switch (action.type) {
        case 'SET_PC':
            return {...state, pc: action.payload};
        case 'SET_LOCAL_DESCRIPTION':
            state.pc.setLocalDescription(action.payload).catch(() => console.error('error setting local description'));
            return {...state};
        case 'SET_REMOTE_DESCRIPTION':
            state.pc.setRemoteDescription(action.payload).catch(() => console.error('error setting remote description'));
            return {...state};
        case 'ADD_LOCAL_ICE_CANDIDATE':
            return {...state, localIceCandidates: [...state.localIceCandidates, action.payload]};
        case 'ADD_REMOTE_ICE_CANDIDATE':
            return {...state, remoteIceCandidates: [...state.remoteIceCandidates, action.payload]};
        case 'SET_DATA_CHANNEL':
            return {...state, dataChannel: action.payload};
        default:
            throw new Error('Invalid action type');
    }
}
