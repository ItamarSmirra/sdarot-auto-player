const NOT_LOGGED_ERROR_TEXT = 'שגיאה 2!על מנת לצפות בפרק עליך להתחבר למערכת';
const SERVER_LOAD_ERROR_TEXT= 'שגיאה 2!כל שרתי הצפייה שלנו עמוסים ולא יכולים לטפל בפניות נוספות, נא לנסות שנית מאוחר יותר.לצפייה בעומסי השרתים לחצו כאן.משתמשים שתרמו לאתר יכולים לצפות בפרקים גם בשעות העומס!';

function IsNotLoggedErrorVisible() {
    const errElement = document.querySelectorAll(".err");
    return (errElement?.length > 0 && errElement[0].textContent === NOT_LOGGED_ERROR_TEXT)
}

function IsServerErrorVisible() {
    const errElement = document.querySelectorAll(".err");
    return (errElement?.length > 0 && errElement[0].textContent === SERVER_LOAD_ERROR_TEXT)
}

function IsSpinnerVisible() {
    const spinner = document.querySelector("#spinner");
    return !(spinner && window.getComputedStyle(spinner)?.display !== 'none');
}

function GetEpisodeToPlay() {
    return document.querySelector("#proceed")
}

function GetPlayBtn() {
    return document.querySelector('.vjs-big-play-button > .vjs-icon-placeholder');
}

function GetExpandViewBtn() {
    return document.querySelector('.vjs-fullscreen-control');
}

export {
    IsNotLoggedErrorVisible,
    IsServerErrorVisible,
    IsSpinnerVisible,
    GetEpisodeToPlay,
    GetPlayBtn,
    GetExpandViewBtn
};