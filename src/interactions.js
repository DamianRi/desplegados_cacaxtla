function manageMuralSectionShort() {
    const muralSectionShort = document.getElementById("mural-section-short");
    let sectionShortClases = muralSectionShort.classList;
    // If section is inactive we want activate it
    if (sectionShortClases.contains("inactive")) {
        sectionShortClases.remove("inactive");
    } else { // Hide section
        sectionShortClases.add('inactive');
        manageMuralSectionLong();
    }
}

function manageMuralSectionLong() {
    const muralSectionLong = document.getElementById("mural-section-long");
    let sectionLongClases = muralSectionLong.classList;
    // If section is inactive we want activate it
    if (sectionLongClases.contains("inactive")) {
        sectionLongClases.remove('inactive', 'fade--out');
        sectionLongClases.add('fade--in');
    } else { // Hide section after fadeOut effect
        sectionLongClases.remove('fade--in');
        sectionLongClases.add('fade--out');
        setTimeout(function () {
            sectionLongClases.add('inactive');
        }, 300);
        manageMuralSectionShort();
    }
}