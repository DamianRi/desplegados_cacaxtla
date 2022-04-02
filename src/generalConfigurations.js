
window.addEventListener("load", function() {
    noDownload();
});


function noDownload() {
    let allImages = document.querySelectorAll("img.no-download");
    for (const image of allImages) {
        image.addEventListener("contextmenu", function(e){
            e.preventDefault();
        });
    }
}
