export const getStoredCredentials = (keys) => {
    console.log(`Getting values for keys: ${JSON.stringify(keys)}`);

    return keys.map(key => new Promise((res) => {
        chrome.storage.sync.get(key, (result) => {
            res(result);
        });
    }));
}

export const sleep = (milliseconds = 1500) => {
    return new Promise((res) => {
        setTimeout(() => {
            res();
        }, milliseconds);
    })
}

export const login = (username, password) => {
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
        "body": `location=index&username=${username}&password=${password}&submit_login=`,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    }).then(() => {
        window.location.reload();
    }).catch((error) => {
        console.error('Error while trying to log in');
    });
}