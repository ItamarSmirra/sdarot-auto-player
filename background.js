function sdarotAutoPlay() {
    console.log('Sdarot Auto Play is Enabled');
    let isSpinnerHiddenChange = false;
    let isTryingToLog = false;
    const SDAROT_USERNAME_KEY = 'sdarotUsername';
    const SDAROT_PASSWORD_KEY = 'sdarotPassword';
    const NOT_LOGGED_ERROR_TEXT = 'שגיאה 2!על מנת לצפות בפרק עליך להתחבר למערכת';
    const SERVER_LOAD_ERROR_TEXT = 'שגיאה 2!כל שרתי הצפייה שלנו עמוסים ולא יכולים לטפל בפניות נוספות, נא לנסות שנית מאוחר יותר.לצפייה בעומסי השרתים לחצו כאן.משתמשים שתרמו לאתר יכולים לצפות בפרקים גם בשעות העומס!';
    const sleep = (miliseconds) => new Promise((res) => {
        setTimeout(() => {
            res();
        }, miliseconds);
    })

    const getSdarotCredentials = (key) => new Promise((res) => {
        chrome.storage.sync.get([key], (result) => {
            res(result[key]);
        });
    })

    const login = (username, password) => {
        if (!isTryingToLog) {
            isTryingToLog = true;
            fetch("https://sdarot.buzz/login", {
                "headers": {
                    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "accept-language": "he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7",
                    "cache-control": "no-cache",
                    "content-type": "application/x-www-form-urlencoded",
                    "pragma": "no-cache",
                    "sec-ch-ua": "\"Chromium\";v=\"106\", \"Google Chrome\";v=\"106\", \"Not;A=Brand\";v=\"99\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"Windows\"",
                    "sec-fetch-dest": "document",
                    "sec-fetch-mode": "navigate",
                    "sec-fetch-site": "same-origin",
                    "sec-fetch-user": "?1",
                    "upgrade-insecure-requests": "1"
                },
                "referrer": "https://sdarot.buzz/",
                "referrerPolicy": "strict-origin",
                "body": `location=%2Fwatch%2F8327-%25D7%2591%25D7%2599%25D7%25AA-%25D7%2594%25D7%2593%25D7%25A8%25D7%25A7%25D7%2595%25D7%259F-house-of-the-dragon%2Fseason%2F1%2Fepisode%2F9&username=${username}&password=${password}&submit_login=`,
                "method": "POST",
                "mode": "cors",
                "credentials": "include"
            }).then(() => {
                window.location.reload();
            }).catch((error) => {
                console.log('Error while trying to log in');
            });
        }
    }

    const interval = setInterval(async () => {
        const errElement = document.querySelectorAll(".err");
        if (errElement?.length > 0 && errElement[0].textContent === NOT_LOGGED_ERROR_TEXT) {
            console.log('You need to log in first');
            const sdarotUsername = await getSdarotCredentials(SDAROT_USERNAME_KEY);
            const sdarotPassword = await getSdarotCredentials(SDAROT_PASSWORD_KEY);
            if (sdarotPassword && sdarotUsername) {
                login(sdarotUsername, sdarotPassword);
            }
            clearInterval(interval);
        } else if (errElement?.length > 0 && errElement[0].textContent === SERVER_LOAD_ERROR_TEXT) {
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