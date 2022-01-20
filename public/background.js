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
chrome.runtime.onMessage.addListener((message, sender, senderResponse) => {
    console.log('meesage back', message)
})