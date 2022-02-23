
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

/**
 * Adds/removes the class 'main-menu__item--open' to the
 * clicked menu item
 *
 * @param {*} currentItem: menu item clicked
 * @returns
 */
function manageMenuItem(currentItem) {
    if (!currentItem) return
    // close all items previusly opened
    let openedItems = getOpenedItems();
    if (openedItems.length) {
        closeMenuItems(openedItems, currentItem);
    }

    let classListItem = currentItem.classList;
    if (classListItem.contains("main-menu__item--open")) {
        classListItem.remove("main-menu__item--open");
    } else {
        classListItem.add("main-menu__item--open");
    }
}

/**
 * Gets an HTMLCollection with the elements that have the
 * 'main-menu__item--open' class. All this items should be
 * only menu items.
 *
 * @returns {HTMLCollection}
 */
function getOpenedItems() {
    let items = document.getElementsByClassName("main-menu__item--open");
    return items;
}

/**
 * Removes the class 'main-menu__item--open' for each item in the list,
 * except for the 'exceptItem'.
 *
 * @param {HTMLCollection} list: of menu items opened
 * @param {object} exceptItem: item that will not remove the class
 * @returns
 */
function closeMenuItems(list, exceptItem) {
    for (const itemOpened of list) {
        if (itemOpened.id !== exceptItem.id)
            itemOpened.classList.remove("main-menu__item--open");
    }
}
/* REDIRECTIONS */
function redirectToMurals() {
    window.location.href = "/desplegados_cacaxtla/views/murales.html";
}
function redirectToHome() {
    window.location.href = "/desplegados_cacaxtla/index.html";
}

/* MOVEMENTS */
function randomMoveMenuItem(index) {
    let menuItems = document.getElementsByClassName("main-menu__item");
    let menuItemsTriangule = document.getElementsByClassName("triangule");

    if (index > 3) {
        index = 0
    }

    let menuItemShake = menuItems[index];
    let menuItemShakeTriangule = menuItemsTriangule[index];

    let menuItemShakeClasses = menuItemShake.classList;
    if (!menuItemShakeClasses.contains("main-menu__item--open")) {
        menuItemShake.classList.add("shake");
        menuItemShakeTriangule.classList.add("shake");
    }

    setTimeout(() => {
        menuItemShake.classList.remove("shake");
        menuItemShakeTriangule.classList.remove("shake");
        randomMoveMenuItem(index + 1);
    }, 5000);
}
randomMoveMenuItem(0);
