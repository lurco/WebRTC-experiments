export function waitForPeerConnection(peer) {
    return new Promise((resolve, reject) => {
        // Event listener for 'open' event
        function onOpen() {
            // Unsubscribe from the event to avoid memory leaks
            peer.off('open', onOpen);
            // Resolve the promise when connection is open
            resolve();
        }

        // Event listener for 'error' event
        function onError(error) {
            // Unsubscribe from the event to avoid memory leaks
            peer.off('error', onError);
            // Reject the promise with the error
            reject(error);
        }

        // Subscribe to 'open' and 'error' events
        peer.on('open', onOpen);
        peer.on('error', onError);
    });
}

// Example usage:
const peer = new Peer();
waitForPeerConnection(peer)
    .then(() => {
        console.log('Peer connection established successfully');
    })
    .catch(error => {
        console.error('Error occurred while establishing peer connection:', error);
    });