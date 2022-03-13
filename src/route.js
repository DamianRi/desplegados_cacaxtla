/* REDIRECTIONS */
function redirectToMurals(section) {
    let params = new URLSearchParams()
    params.append("section", section)
    window.location.href = "views/murales.html?" + params.toString();
}
function redirectToHome() {
    window.location.href = "../index.html";
}
