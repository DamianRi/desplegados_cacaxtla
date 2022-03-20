const body =  document.getElementsByTagName("body")[0];
const modal = document.getElementsByClassName("modal__background")[0];
body.addEventListener("load", showModal);

function showModal() {
    modal.classList.remove("inactive");
}

function hideModal() {
    modal.classList.add("inactive");
}

function setCookie(name, value) {
    const d = new Date();
    d.setTime(d.getTime() + (expireHours*60*60*1000));
    let expires = "expires=session" // + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }