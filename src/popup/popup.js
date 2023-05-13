import * as consts from "../consts.js";
import * as helpers from "../helpers.js";
import * as locators from "../locators.js";

const loadCredentials = async () => {
    const [sdarotUsername, sdarotPassword] = await Promise.all(
        helpers.getStoredCredentials(
            [consts.SDAROT_USERNAME_KEY, consts.SDAROT_PASSWORD_KEY]
        )
    );

    if (sdarotUsername) {
        locators.GetSdarotAutoUsername().value = sdarotUsername;
    }

    if (sdarotPassword) {
        locators.GetSdarotAutoPassword().value = sdarotPassword;
    }

    const saveButton = locators.GetSaveButton();
    saveButton.addEventListener('click', onSave);

    const popup = locators.GetSavePopup();
    popup.addEventListener('animationend', () => {
        popup.classList.add('hidden');
        popup.classList.remove('popup-fade');
    })
}


const onSave = () => {
    const username = locators.GetSdarotAutoUsername().value;
    if (username) {
        chrome.storage.sync.set({ [consts.SDAROT_USERNAME_KEY]: username });
    }

    const password = locators.GetSdarotAutoPassword().value;
    if (password) {
        chrome.storage.sync.set({ [consts.SDAROT_PASSWORD_KEY]: password });
    }

    const popup = locators.GetSavePopup();
    popup.classList.remove('hidden');
    popup.classList.add('popup-fade');
}

document.addEventListener('DOMContentLoaded', loadCredentials)