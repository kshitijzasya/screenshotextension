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
        .then((bitmap) => {
            track.stop();
            canvas = document.createElement('canvas');
            canvas.width = bitmap.width;
            canvas.height = bitmap.height;
            let context = canvas.getContext('2d');
            context.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height);
            return canvas.toDataURL()
        })
        .then((url) => {
            //To download the image from the url
            chrome.runtime.sendMessage({name: 'download', url}, (response) => {
                if(response.success) {
                    alert('screenshot saved')
                } else {
                    alert('could not save screenshot')
                }
                canvas.remove()
                senderResponse({success: true})
            })
        })
        .catch((err) => {
            alert('Unable to take screenshot');
            senderResponse({
                success: false,
                message: err
            });
        })
    }

    return true;
})

//To download a image from url
chrome.runtime.onMessage.addListener((message, sender, senderResponse) => {
    if(message.name === 'download' && message.url) {
        chrome.downloads.download({
            filename: 'screenshot.png',
            url: message.url
        }, (downloadId) => {
            senderResponse({success: true})
        })

        return true
    }
})