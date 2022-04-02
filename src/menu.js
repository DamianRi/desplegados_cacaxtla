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
 function manageMenuItem(item, itemIndex) {
    // close all items previusly opened
    closeMenuItems(itemIndex);
    
    let itemClasses = item.classList;
    let classesList = [
        `item-${itemIndex}`,
        "inactive"
    ]
    let itemsInactive = document.getElementsByClassName(classesList.join(" "));
    let itemInactive = itemsInactive.length ? itemsInactive[0] : document.createElement("div");
    if (itemClasses.contains("inactive")) {
        itemClasses.remove("inactive");
        itemInactive.classList.add("inactive");
    } else {
        itemClasses.add("inactive");
        itemInactive.classList.remove("inactive");
    }
}

/**
 * Gets an HTMLCollection with the elements that have the
 * specifif class recived as parameter and that are inactive.
 * All this items should be only menu items.
 *
 * @returns {HTMLCollection}
 */
function getOpenedItems(byClass) {
    let items = document.getElementsByClassName(byClass);
    let itemsArray = Array.from(items);
    itemsArray = itemsArray.filter((item) => !item.classList.contains("inactive"));
    return itemsArray;
}

/**
 * Sets the "inactive" class to hide the components
 *
 * @param {number} itemIndex: current item that not will be hi
 */
function closeMenuItems(itemIndex) {
    // Display all the icons
    let iconItems = document.getElementsByClassName("main-menu__item--close");
    Array.from(iconItems).forEach(item => {
        item.classList.remove("inactive");
    });
    // Hide all the sections opened
    let openItems = document.getElementsByClassName("main-menu__item--open");
    Array.from(openItems).forEach(item => {
        item.classList.add("inactive");
    })
}