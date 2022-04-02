import { readDatabase } from './database.js';

var DATABASE = {};
let IMAGE_TILES = '';
let LINE_TILES = '';
let IMAGE_LOCATION = '';
let WIDTH = 1;
let HEIGHT = 1;
let TILES = [];
let currentSection = -1;
let currentMural = -1;
// This are general names for murals that will be zoomed with default value 0.5
const MURAL_DISPLACEMENT = [
    "escalera",
    "pilares"
];
const WIDTH_DESKTOP = 768;
const main = document.getElementsByTagName("main")[0];
main.onload = loadContent();

/**
 * Reads the database json and the load the mural info in the main section
 */
async function loadContent() {
    let url = window.location.search;
    let params = new URLSearchParams(url);
    let sectionIndex = params.get("section") - 1;
    DATABASE = await readDatabase();
    loadMural(sectionIndex, 0, true);
}
/**
 * Loads the mural into the main section
 *
 * @param {number} indexSection 
 * @param {number} indexMural 
 */
function loadMural(indexSection, indexMural, reloadSlide) {
    if (currentSection === indexSection && currentMural === indexMural) {
        return
    }
    currentSection = indexSection;
    currentMural = indexMural;

    let section = getSection(indexSection);
    let mural = getMural(indexSection, indexMural);
    IMAGE_TILES = mural['source-image'];
    LINE_TILES = mural['source-line'];
    if (main.offsetWidth >= WIDTH_DESKTOP) {
        IMAGE_LOCATION = '../img/isometricos/desktop/' + mural['source-isometric'];
    } else {
        IMAGE_LOCATION = '../img/isometricos/mobile/' + mural['source-isometric'];
    }
    WIDTH = mural['width'];
    HEIGHT = mural['height'];
    TILES = [
        {
            type: openSeaDragonType,
            width: WIDTH, 
            height: HEIGHT,
            tilesUrl: '..' + IMAGE_TILES 
        },
        {
            type: openSeaDragonType,
            width: WIDTH, 
            height: HEIGHT,
            tilesUrl: '..' + LINE_TILES 
        }
    ]
    let sectionName = section['name'];
    let title = mural['name'];
    let descriptions = mural['description'];
    let credits = mural['credits'];
    loadMuralTitleSection(sectionName);
    loadMuralTitle(title);
    loadMuralDescription(descriptions)
    loadMuralImageLocation(IMAGE_LOCATION);
    loadMuralCredit(credits);
    if (reloadSlide) loadSlide(section, indexSection);
    let displacement = MURAL_DISPLACEMENT.some(name => new RegExp(name, 'i').test(title))
    let zoomLevel = displacement ? 0.5 : 1;
    createSeadragonViewer("mural-image", "mural-toolbar", TILES, zoomLevel);
}

/**
 * Gets the section info from the database.
 *
 * @param {number} indexSection 
 * @returns the section object
 */
function getSection(indexSection) {
    let sections = DATABASE['sections'];
    return sections[indexSection];
}
/**
 * Gets the mural info from a section info.
 *
 * @param {number} indexSection
 * @param {number} indexMural
 * @returns the mural object
 */
function getMural(indexSection, indexMural) {
    let section = getSection(indexSection);
    return section['murales'][indexMural];
}
/**
 * Removes all the children from the element
 *
 * @param {HTMLDOMElement} element
 */
function removeAllChildren (element) {
    while (element.hasChildNodes()) {
        element.removeChild(element.firstChild);
    }
}
/**
 * Sets the content to the title section
 *
 * @param {string} sectionName 
 */
function loadMuralTitleSection(sectionName) {
    const titleSection = document.getElementsByClassName("mural-title-section")[0];
    removeAllChildren(titleSection);
    let title = document.createTextNode(sectionName);
    titleSection.appendChild(title);
}
/**
 * Sets the content in the mural title
 *
 * @param {string} titleText 
 */ 
function loadMuralTitle (titleText) {
    const titleElements = document.getElementsByClassName("mural-title");
    for (const titleElement of titleElements) {
        removeAllChildren(titleElement);
        titleElement.innerHTML = titleText;
    }
}
/**
 * Sets the content for the description info in the mural
 *
 * @param {string[]} paragraphTexts
 */
function loadMuralDescription (paragraphTexts) {
    const descriptionElement = document.getElementsByClassName("mural-section__description")[0];
    removeAllChildren(descriptionElement);
    let paragraph;
    for (const string of paragraphTexts) {
        paragraph = document.createElement("p");
        paragraph.appendChild(document.createTextNode(string));
        descriptionElement.appendChild(paragraph);
        descriptionElement.appendChild(document.createElement("br"));
    }
    descriptionElement.removeChild(descriptionElement.lastChild);
}
/**
 * Sets the content to the credit info mural
 * @param {string} creditText 
 */
function loadMuralCredit (creditText) {
    const creditElement = document.getElementsByClassName("mural-section__credits")[0];
    removeAllChildren(creditElement);
    let string = document.createTextNode(creditText);
    creditElement.appendChild(string);
}
/**
 * Sets the src to the image location for the mural
 *
 * @param {string} imageSrc 
 */
function loadMuralImageLocation (imageSrc) {
    const imageLocation = document.getElementsByClassName("mural-section__location-image")[0];
    let pictureElement = imageLocation.firstElementChild;
    let imageElement = pictureElement.firstElementChild;
    imageElement.setAttribute("src", imageSrc);
    imageElement.addEventListener("contextmenu", function(e){
        e.preventDefault();
    });
}
/**
 * Loads the images in the slide
 *
 * @param {object} section
 */
function loadSlide(section, indexSection) {
    const muralSlide = document.getElementsByClassName("mural__slide")[0];
    let murales = section["murales"];
    let index = 0;
    for (const mural of murales) {
        let figure = document.createElement("figure");
        figure.classList.add("slide__figure");
        if (index === 0) {
            figure.classList.add("active");
        }
        if (index >= 2) {
            figure.classList.add("inactive");
        }
        figure.setAttribute("muralIndex", index);
        
        let image = document.createElement("img");
        image.setAttribute("src", `../img/stamps/${mural["source-stamp"]}`);
        image.setAttribute("alt", mural["name"]);
        image.addEventListener("contextmenu", function(e) {
            e.preventDefault();
        })
        figure.appendChild(image);
        
        let figcaption = document.createElement("figcaption");
        figcaption.appendChild(document.createTextNode(mural["name"]));
        figure.appendChild(figcaption);
        figure.addEventListener("click", function() { changeMural(this, indexSection) });

        muralSlide.appendChild(figure);
        index++;
    }
    // Only when there are more than two stamps
    // display the slide 
    MURAL_COUNT = Array.from(murales).length;
    if (MURAL_COUNT > STAMPS_BY_SECTION) {
        addLeftRightSlide(muralSlide);
    }
}

let SLIDE_SECTION_MIN = 0;
let SLIDE_SECTION_MAX = 1;
let STAMPS_BY_SECTION = 2;
let MURAL_COUNT = 0;
/**
 * Adds the left and right buttons to slide the 'slide'
 *
 * @param {HTMLElement} slide 
 */
function addLeftRightSlide(slide) {
    let leftButton = document.createElement("div");
    leftButton.classList.add("slide__left-scroll");
    leftButton.addEventListener("click", scrollSlideToLeft);
    let rightButton = document.createElement("div");
    rightButton.addEventListener("click", scrollSlideToRight);
    rightButton.classList.add("slide__right-scroll");
    slide.appendChild(leftButton);
    slide.appendChild(rightButton);
}
/**
 * Sets the values for the indexes to display the stamps
 * inside the slide. Decrease de min and max indexes
 */
function scrollSlideToLeft() {
    SLIDE_SECTION_MIN = ((SLIDE_SECTION_MIN - STAMPS_BY_SECTION) + MURAL_COUNT) % MURAL_COUNT;
    SLIDE_SECTION_MAX = ((SLIDE_SECTION_MAX - STAMPS_BY_SECTION) + MURAL_COUNT) % MURAL_COUNT;
    scrollSlide()
}
/**
 * Sets the values for the indexes to display the stamps
 * inside the slide. Increase de min and max indexes
 */
function scrollSlideToRight() {
    SLIDE_SECTION_MIN = (SLIDE_SECTION_MIN + STAMPS_BY_SECTION) % MURAL_COUNT;
    SLIDE_SECTION_MAX = (SLIDE_SECTION_MAX + STAMPS_BY_SECTION) % MURAL_COUNT;
    scrollSlide()
}
/**
 * Inactives all the stamps in the slide that are not between the range
 * of the min and max index
 */
function scrollSlide() {
    let slideStamps = document.getElementsByClassName("slide__figure");
    for (const stamp of slideStamps) {
        let muralIndex = stamp.getAttribute("muralIndex");
        stamp.classList.add("inactive");
        // Only active the next items
        if (SLIDE_SECTION_MIN <= muralIndex && muralIndex <= SLIDE_SECTION_MAX) {
            stamp.classList.remove("inactive");
        }
    }
}
/**
 * Loads all the information based on the element clicked in the slide
 *
 * @param {HTMLDOMElement} stamp
 * @param {string} indexSection
 */
function changeMural(stamp, indexSection) {
    clearStampActives();
    stamp.classList.add("active");
    let muralIndex = stamp.getAttribute("muralIndex");
    muralIndex = parseInt(muralIndex);
    loadMural(indexSection, muralIndex, false);
}
/**
 * Removes the 'active' class for the 'slide__figure' elements,
 * these are the elements inside the slice element.
 */
function clearStampActives() {
    let sliceStamps = document.getElementsByClassName("slide__figure");
    let sliceStampActives = Array.from(sliceStamps)
        .filter(stamp => stamp.classList.contains("active"));
    sliceStampActives.forEach(stamp => { stamp.classList.remove("active") });
}
/**
 * Loads in a new canvas component by openseadragon to render the mural image
 *
 * @param {string} muralContentId
 * @param {string} muralToolbarId
 * @param {object} tiles
 */
function createSeadragonViewer(muralContentId, muralToolbarId, tiles, zoomLevel = 1) {
    let divContent = document.getElementById(muralContentId);
    removeAllChildren(divContent);
    let toolbar = document.getElementById(muralToolbarId);
    removeAllChildren(toolbar);
    OpenSeadragon({
        id: muralContentId,
        prefixUrl: prefixURLIcons,
        navImages: navIcons,
        tileSources: tiles,
        showNavigator: true,
        navigatorPosition: 'TOP_RIGHT',
        toolbar: muralToolbarId,
        sequenceMode: true,
        preserveViewport: true,
        defaultZoomLevel: zoomLevel,
    });
}

// Configurations to use the openseadragon

const openSeaDragonType = "zoomifytileservice"; 
const prefixURLIcons = "../img/icons/32/"; 
const navIcons = {
    zoomIn: {
        REST:   'zoom_in.svg',
        GROUP:  'zoom_in.svg',
        HOVER:  'zoom_in_hover.svg',
        DOWN:   'zoom_in_pressed.svg'
    },
    zoomOut: {
        REST:   'zoom_out.svg',
        GROUP:  'zoom_out.svg',
        HOVER:  'zoom_out_hover.svg',
        DOWN:   'zoom_out_pressed.svg'
    },
    home: {
        REST:   'focus.svg',
        GROUP:  'focus.svg',
        HOVER:  'focus_hover.svg',
        DOWN:   'focus_pressed.svg'
    },
    fullpage: {
        REST:   'expand.svg',
        GROUP:  'expand.svg',
        HOVER:  'expand_hover.svg',
        DOWN:   'expand_pressed.svg'
    },
    previous: {
        REST:   'swap_to_color.svg',
        GROUP:  'swap_to_color.svg',
        HOVER:  'swap_to_color_hover.svg',
        DOWN:   'swap_to_color_pressed.svg'
    },
    next: {
        REST:   'swap_to_line.svg',
        GROUP:  'swap_to_line.svg',
        HOVER:  'swap_to_line_hover.svg',
        DOWN:   'swap_to_line_pressed.svg'
    }
}
