/*global chrome*/
// chorme.browserAction.onClicked.addListener(function(tab) {
//     chrome.desktopCapture.chooseDesktopMedia([
//         'screen',
//         'window',
//         'tab'
//     ], tab, (streamId) => {
//         if (streamId && streamId.length) {

//         }
//     })
// })
chrome.runtime.onMessage.addListener(async (message, sender, senderResponse) => {
    if (message.name === 'screen') {
        console.log('stream so start taking screenshots....');
        let tab = await getActiveTab();
        chrome.desktopCapture.chooseDesktopMedia([
            "screen"
        ], tab, (streamId) => {
            if (streamId && streamId.length) { 
                setTimeout( async _=> {
                    chrome.tabs.sendMessage(await getActiveTab().id, {name: 'stream', streamId}, (response) => {
                        console.log('stream response', response)
                    })
                }, 200)
            }
        })
    };

    senderResponse('response from backfroud');
})

console.log('background.js');


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
        }, (downloadId) => { console.log('download ID: ', downloadId)
            senderResponse({success: true})
        })
    }

    return true;
})