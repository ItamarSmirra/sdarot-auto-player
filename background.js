import core from './src/core.js'

try {
    console.log('background wrapper started')

    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        console.log('tab updated, initializing autoplay');
        core.initSdarotAutoplay(tabId, changeInfo)
    })

    chrome.webNavigation.onCommitted.addListener((details) => {
        console.log('url changed, initializing autoplay');
        core.initSdarotAutoplay(details.tabId, details)
    }, {
        url: [
            {
                hostContains: 'sdarot'
            },
        ]
    })
} catch (e) {
    console.error(e);
}