
/* MURAL INTERACTIONS */

/**
 * Active or inactive the short section.
 */
function manageMuralSectionShort() {
    const muralSectionShort = document.getElementById("mural-section-short");
    let sectionShortClasses = muralSectionShort.classList;
    // If section is inactive we want activate it
    if (sectionShortClasses.contains("inactive")) {
        sectionShortClasses.remove("inactive");
    } else { // Hide section
        sectionShortClasses.add('inactive');
        manageMuralSectionLong();
    }
}

/**
 * Active or inactive the long section and adds the fade effect by a class.
 */
function manageMuralSectionLong() {
    const muralSectionLong = document.getElementById("mural-section-long");
    let sectionLongClasses = muralSectionLong.classList;
    // If section is inactive we want activate it
    if (sectionLongClasses.contains("inactive")) {
        sectionLongClasses.remove('inactive', 'fade--out');
        sectionLongClasses.add('fade--in');
    } else { // Hide section after fadeOut effect
        sectionLongClasses.remove('fade--in');
        sectionLongClasses.add('fade--out');
        setTimeout(function () {
            sectionLongClasses.add('inactive');
        }, 300);
        manageMuralSectionShort();
    }
}
