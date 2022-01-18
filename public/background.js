chorme.browserAction.onClicked.addListener(function(tab) {
    chrome.desktopCapture.chooseDesktopMedia([
        'screen',
        'window',
        'tab'
    ], tab, (streamId) => {
        if (streamId && streamId.length) {

        }
    })
})