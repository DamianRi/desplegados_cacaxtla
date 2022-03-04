/* MENU INTERACTIONS */

/**
 * Active or inactive the side right menu.
 */
 function manageMenu() {
    const verticalMenu = document.getElementsByClassName("header-menu__vertical");
    let verticalMenuClasses = verticalMenu[0].classList;
    // If section is inactive we want activate it
    if (verticalMenuClasses.contains("inactive")) {
        verticalMenuClasses.remove("inactive", "fadeOutMenu");
        verticalMenuClasses.add("fadeInMenu");
    } else { // Hide section
        verticalMenuClasses.add("fadeOutMenu");
        verticalMenuClasses.remove("fadeInMenu");
        setTimeout(function () {
            verticalMenuClasses.add('inactive');
        }, 200);
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
    } else if (currentItem.offsetWidth < 50){
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