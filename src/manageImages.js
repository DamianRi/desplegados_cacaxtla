import { readDatabase } from './database.js';

var DATABASE = {}
let IMAGE_TILES = ''
let LINE_TILES = ''
let IMAGE_LOCATION = ''
let WIDTH = 1
let HEIGHT = 1
let TILES = []
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
    loadMural(sectionIndex, 0);
}
/**
 * Loads the mural into the main section
 *
 * @param {number} indexSection 
 * @param {number} indexMural 
 */
function loadMural(indexSection, indexMural) {
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
    loadMuralCredit(credits)
    createSeadragonViewer("mural-image", TILES);
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
 * Sets the content to the title section
 *
 * @param {string} sectionName 
 */
function loadMuralTitleSection(sectionName) {
    const titleSection = document.getElementsByClassName("mural-title-section")[0];
    titleSection.innerHTML = sectionName;    
}
/**
 * Sets the content in the mural title
 *
 * @param {string} titleText 
 */ 
function loadMuralTitle (titleText) {
    const titleSections = document.getElementsByClassName("mural-title");
    for (const title of titleSections) {
        title.innerHTML = titleText
    }
}
/**
 * Sets the content for the description info in the mural
 *
 * @param {string[]} descriptions 
 */
function loadMuralDescription (descriptions) {
    const description = document.getElementsByClassName("mural-section__description")[0];
    let html = "";
    for (const text of descriptions) {
        html += "<p>" + text + "</p><br>";
    }
    description.innerHTML = html;
}
/**
 * Sets the content to the credit info mural
 * @param {string} creditText 
 */
function loadMuralCredit (creditText) {
    const credit = document.getElementsByClassName("mural-section__credits")[0];
    credit.innerHTML = creditText;
}
/**
 * Sets the src to the image location for the mural
 *
 * @param {string} imageSrc 
 */
function loadMuralImageLocation (imageSrc) {
    const imageLocation = document.getElementsByClassName("mural-section__location-image")[0];
    let pictureElement = imageLocation.children[0];
    let imageElement = pictureElement.children[0];
    imageElement.setAttribute("src", imageSrc);
}

function createSeadragonViewer(elementId, tiles) {
    OpenSeadragon({
        id: elementId,
        prefixUrl: prefixURLIcons,
        navImages: navIcons,
        tileSources: tiles,
        showNavigator: true,
        navigatorPosition: 'TOP_RIGHT',
        toolbar: 'mural-toolbar',
        sequenceMode: true,
        preserveViewport: true
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
