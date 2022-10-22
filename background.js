function sdarotAutoPlay() {
    console.log('Sdarot Auto Play is Enabled');
    let isSpinnerHiddenChange = false;
    const sleep = (miliseconds) => new Promise((res) => {
        setTimeout(() => {
            res();
        }, miliseconds);
    })

    const interval = setInterval(async () => {
        const errElement = document.querySelectorAll(".err");
        if (errElement?.length > 0 && errElement[0].textContent.includes('2!')) {
            console.log('Found loading error');
            window.location.reload();
        } else {
            const spinner = document.querySelector("#spinner");
            if (spinner && window.getComputedStyle(spinner)?.display !== 'none') {
                isSpinnerHiddenChange = true;
            } else if (isSpinnerHiddenChange) {
                const playEpisode = document.querySelector("#proceed");
                playEpisode.click();
                await sleep(1500);
                document.querySelector('.vjs-big-play-button > .vjs-icon-placeholder').click();
                await sleep(1500);
                document.querySelector('.vjs-fullscreen-control').click();
                clearInterval(interval);
            }
        }
    }, 1000)
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url?.includes('episode')) {
        chrome.scripting.executeScript({
            target: { tabId: tabId, allFrames: true },
            func: sdarotAutoPlay,
        });
    }
})

chrome.webNavigation.onCommitted.addListener((details) => {
    if (details.url?.includes("episode")) {
        chrome.scripting.executeScript({
            target: { tabId: details.tabId, allFrames: true },
            func: sdarotAutoPlay,
        });
    }
}, {
    url: [
        {
            hostContains: 'sdarot'
        },
    ]
})