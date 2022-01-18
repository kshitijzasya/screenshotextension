/*global chrome*/
chrome.runtime.onMessage.addListener((message, sender, senderResponse) => {
    if(message.name === 'stream' && message.streamId) {
        let track, canvas
        navigator.mediaDevices.getUserMedia({
            video: {
                mandatory: {
                    chromeMediaSource: 'desktop',
                    chromeMediaSourceId: messsage.streamId
                }
            }
        })
        .then((stream) => {
            track = stream.getVideoTracks()[0];
            const imageCapture = new ImageCapture(track);
            return imageCapture.grabFrame();
        })
    }
})