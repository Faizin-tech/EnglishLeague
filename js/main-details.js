document.addEventListener('DOMContentLoaded', () => {

    let urlParams = new URLSearchParams(window.location.search);
    let isFromSaved = urlParams.get("saved");

    if (isFromSaved) {
        getSavedDetailsTeams();
    } else {
        getTeamDetails();
    }
});