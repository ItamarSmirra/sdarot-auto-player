import * as consts from "./consts.js";
import * as helpers from "./helpers.js";
import * as locators from "./locators.js";

const sdarotAutoPlay = () => {
    const currentVersion = "1.1.0";
    const probingTimeout = 1000;
    let logging = false;

    console.log(`Sdarot Auto Play version ${currentVersion} is Enabled`);

    const interval = setInterval(async () => {
        if (locators.IsNotLoggedErrorVisible()) {
            console.log('Found user logging error, logging in...');
            const [sdarotUsername, sdarotPassword] = await Promise.all(
                helpers.getStoredCredentials(
                    [consts.SDAROT_USERNAME_KEY, consts.SDAROT_PASSWORD_KEY]
                )
            );

            if (!logging && sdarotPassword && sdarotUsername) {
                helpers.login(sdarotUsername, sdarotPassword);
                logging = true;
            }
            clearInterval(interval);
        } else if (locators.IsServerErrorVisible()) {
            console.log('Found server loading error, reloading...');
            window.location.reload();
        } else {
            if (locators.IsSpinnerVisible()) {
                locators.GetEpisodeToPlay().click();
                await helpers.sleep();

                locators.GetPlayBtn().click();
                await helpers.sleep();

                locators.GetExpandViewBtn().click();

                clearInterval(interval);
            }
        }
    }, probingTimeout)
}

const initSdarotAutoplay = (tabId, info) => {
    if (info.url?.includes('episode')) {
        chrome.scripting.executeScript({
            target: { tabId: tabId, allFrames: true },
            func: sdarotAutoPlay,
        });
    }
}

export default initSdarotAutoplay;
