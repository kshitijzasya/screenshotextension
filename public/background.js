/*global chrome*/
//Start listening to chrome messages
chrome.runtime.onMessage.addListener(async (message, sender, senderResponse) => { 
    if (message.name === 'screen') {
        console.log('stream so start taking screenshots....');
        let tab = sender.tab;
        chrome.desktopCapture.chooseDesktopMedia([
            "screen"
        ], tab, (streamId) => {
            if (streamId && streamId.length) { 
                setTimeout( async _=> {
                    chrome.tabs.sendMessage(sender.tab.id, {name: 'stream', streamId}, (response) => {
                        console.log('stream response', response)
                    })
                }, 200)
            }
        })
        senderResponse('response from background');
    };
})


//Get active tab in chrome
function getActiveTab() {
    return chrome.tabs.query({currentWindow: true, active: true}, function(tabArray) {
        return tabArray[0];
    });
};

chrome.runtime.onMessage.addListener((message, sender, senderResponse) => {
    if (message.name === 'download' && message.url) {
        chrome.downloads.download({
            filename: 'screenshot.png',
            url: message.url
        }, (downloadId) => { 
           return senderResponse({success: true, downloadId})
        })
    }

    return true;
})
