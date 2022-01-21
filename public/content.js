/*global chrome*/
// document.body.style.background = "red";
// var startButtons = document.getElementsByClassName('start')[0];
var triggerBtn = document.getElementById('addEOD');
var projectSelect = document.getElementById('project_select');
//adding event listener
triggerBtn.addEventListener('click', function() {
    console.log('button clicked');
    // let project = projectSelect.value;
    startTakingScreenshots();
});

//Start process to take screenshots
function startTakingScreenshots() {
    console.log('Start taking screenshots...');
    chrome.runtime.sendMessage({
        name: 'screen'
    },(response) => {
        console.log('response', response)
    })

    return true;
}

//Recieve message
chrome.runtime.onMessage.addListener((message, sender, senderResponse) => {
    if (message.name === 'stream' && message.streamId) {
        let track, canvas
        navigator.mediaDevices.getUserMedia({
            video: {
                mandatory: {
                    chromeMediaSource: 'desktop',
                    chromeMediaSourceId: message.streamId
                },
            }
        })
        .then((stream) => { 
            track = stream.getVideoTracks()[0]; 
            const imageCapture = new ImageCapture(track)
            return imageCapture.grabFrame()
        })
        .then((bitmap) => { console.log('bitmap', bitmap)
            track.stop();
            canvas = document.createElement('canvas');
            canvas.width = bitmap.width;
            canvas.height = bitmap.height;
            let context = canvas.getContext('2d');
            context.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height);
            return canvas.toDataURL();
        })
        .then((url) => {
            //Save or upload screenshot somewhere
            chrome.runtime.sendMessage({name: 'download', url}, (response) => { console.log('response', response)
                if (response.success) {
                    alert("Screenshot saved");
                } else {
                    alert("Could not save screenshot")
                }
                canvas.remove()
                senderResponse({success: true})
            })
        })
        .catch(err => {
            alert('colud not get screenshot'); 
            senderResponse({success: false, message: err});
        })
    }
    return true;
})

