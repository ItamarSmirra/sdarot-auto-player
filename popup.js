const SDAROT_USERNAME_KEY = 'sdarotUsername';
const SDAROT_PASSWORD_KEY = 'sdarotPassword';

const getSdarotCredentials = (key) => new Promise((res) => {
    chrome.storage.sync.get([key], (result) => {
        res(result[key]);
    });
})

const onSave = () => {
    const username = document.getElementById("sdarot-auto-username").value;
    if (username) {
        chrome.storage.sync.set({ sdarotUsername: username });
    }

    const password = document.getElementById("sdarot-auto-password").value;
    if (password) {
        chrome.storage.sync.set({ sdarotPassword: password });
    }

    const popup = document.getElementById('save-popup');
    popup.classList.remove('hidden');
    popup.classList.add('popup-fade');
}

document.addEventListener('DOMContentLoaded', async () => {
    const sdarotUsername = await getSdarotCredentials(SDAROT_USERNAME_KEY);
    if (sdarotUsername) {
        document.getElementById("sdarot-auto-username").value = sdarotUsername;
    }

    const sdarotPassword = await getSdarotCredentials(SDAROT_PASSWORD_KEY);
    if (sdarotPassword) {
        document.getElementById("sdarot-auto-password").value = sdarotPassword;
    }

    const saveButton = document.getElementById('sdarot-auto-login-save');
    saveButton.addEventListener('click', onSave);

    const popup = document.getElementById('save-popup');
    popup.addEventListener('animationend', () => {
        popup.classList.add('hidden');
        popup.classList.remove('popup-fade');
    })
})