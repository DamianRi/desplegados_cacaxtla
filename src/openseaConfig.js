
let openSeaDragonType = "zoomifytileservice"; 

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
    }
}

let originalImage = OpenSeadragon({
    id: "mural-image",
    prefixUrl: prefixURLIcons,
    navImages: navIcons,
    tileSources: [{
        type:       openSeaDragonType,
        width:      13416,
        height:     1949,
        tilesUrl:   "../img/tiles/Batalla_ote150-gris/"
    }]
});

let drawImage = OpenSeadragon({
    id: "mural-draw",
    prefixUrl: prefixURLIcons,
    navImages: navIcons,
    tileSources: [{
        type:       openSeaDragonType,
        width:      14427,
        height:     1949,
        tilesUrl:   "../img/tiles/Batalla_ote150/"
    }]
});