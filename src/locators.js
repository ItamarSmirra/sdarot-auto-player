const NOT_LOGGED_ERROR_TEXT = 'שגיאה 2!על מנת לצפות בפרק עליך להתחבר למערכת';
const SERVER_LOAD_ERROR_TEXT = 'שגיאה 2!כל שרתי הצפייה שלנו עמוסים ולא יכולים לטפל בפניות נוספות, נא לנסות שנית מאוחר יותר.לצפייה בעומסי השרתים לחצו כאן.משתמשים שתרמו לאתר יכולים לצפות בפרקים גם בשעות העומס!';

const IsNotLoggedErrorVisible = () => {
    const errElement = document.querySelectorAll(".err");
    return (errElement?.length > 0 && errElement[0].textContent === NOT_LOGGED_ERROR_TEXT)
}

const IsServerErrorVisible = () => {
    const errElement = document.querySelectorAll(".err");
    return (errElement?.length > 0 && errElement[0].textContent === SERVER_LOAD_ERROR_TEXT)
}

const IsSpinnerVisible = () => {
    const spinner = document.querySelector("#spinner");
    return !(spinner && window.getComputedStyle(spinner)?.display !== 'none');
}

const GetEpisodeToPlay = () => (
    document.querySelector("#proceed")
)

const GetPlayBtn = () => (
    document.querySelector('.vjs-big-play-button > .vjs-icon-placeholder')
)

const GetExpandViewBtn = () => (
    document.querySelector('.vjs-fullscreen-control')
)

const GetSdarotAutoUsername = () => (
    document.querySelector('#sdarot-auto-username')
)

const GetSdarotAutoPassword = () => (
    document.querySelector('#sdarot-auto-password')
)

const GetSdarotAutoSaveBtn = () => (
    document.querySelector('#sdarot-auto-login-save')
)

const GetSdarotAutoSavePopup = () => (
    document.querySelector('#save-popup')
)

export {
    IsNotLoggedErrorVisible,
    IsServerErrorVisible,
    IsSpinnerVisible,
    GetEpisodeToPlay,
    GetPlayBtn,
    GetExpandViewBtn,
    GetSdarotAutoUsername,
    GetSdarotAutoPassword,
    GetSdarotAutoSaveBtn,
    GetSdarotAutoSavePopup
};