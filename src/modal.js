const body =  document.getElementsByTagName("body")[0];
const modal = document.getElementsByClassName("modal__background")[0];
body.addEventListener("load", showModal);

function showModal() {
    modal.classList.remove("inactive");
}

function hideModal() {
    modal.classList.add("inactive");
}
