
window.addEventListener("load", function() {
    setTimeout(() => {
        noDownload();
    }, 2000);
});


function noDownload() {
    let allImages = document.querySelectorAll(".no-download");
    for (const image of allImages) {
        image.addEventListener("contextmenu", function(e){
            e.preventDefault();
        });
    }
}
