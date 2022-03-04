import { readDatabase } from './database.js';

const WIDTH_DESKTOP = 768;
const main = document.getElementsByTagName("main")[0];
main.onload = loadContent();

let IMAGE_TILES = ''
let LINE_TILES = ''
let IMAGE_LOCATION = ''
let WIDTH = 1
let HEIGHT = 1
let TILES = []

async function loadContent() {
    let url = window.location.search;
    let params = new URLSearchParams(url);
    let sectionIndex = params.get("section") - 1;
    let database = await readDatabase();
    let sections = database.sections;
    let murals = sections[sectionIndex]['murales'];
    let muralInfo = murals[0];
    IMAGE_TILES = muralInfo['source-image'];
    LINE_TILES = muralInfo['source-line'];
    let imageLocation = muralInfo['source-isometric'];
    if (main.offsetWidth >= WIDTH_DESKTOP) {
        IMAGE_LOCATION = '../img/isometricos/desktop/' + imageLocation;
    } else {
        IMAGE_LOCATION = '../img/isometricos/mobile/' + imageLocation;
    }
    console.log('Location ', IMAGE_LOCATION);
    WIDTH = parseFloat(muralInfo['width']);
    HEIGHT = parseInt(muralInfo['height']);
    TILES = [
        { // original
            type:       openSeaDragonType,
            width:      WIDTH,
            height:     HEIGHT,
            tilesUrl:   `..${IMAGE_TILES}`
        },
        { // line
            type:       openSeaDragonType,
            width:      WIDTH,
            height:     HEIGHT,
            tilesUrl:   `..${LINE_TILES}`
        }
    ]
    loadMuralImageLocation(IMAGE_LOCATION);
    createSeadragonViewer("mural-image", TILES);
}

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
