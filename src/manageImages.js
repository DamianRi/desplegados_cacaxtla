// Configurations to use the openseadragon
const openSeaDragonType = "zoomifytileservice"; 
const prefixURLIcons = "/desplegados_cacaxtla/img/icons/32/"; 
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

let tiles = [
    { // original
        type:       openSeaDragonType,
        width:      12846,
        height:     2019,
        tilesUrl:   "/desplegados_cacaxtla/img/tiles/1-1_150_photo/"
    },
    { // draw
        type:       openSeaDragonType,
        width:      12846,
        height:     2019,
        tilesUrl:   "/desplegados_cacaxtla/img/tiles/1-1_150_draw/"
    }
]

let originalImage = OpenSeadragon({
    id: "mural-image",
    prefixUrl: prefixURLIcons,
    navImages: navIcons,
    tileSources: tiles,
    showNavigator: true,
    navigatorPosition: 'TOP_RIGHT',
    toolbar: 'mural-toolbar',
    sequenceMode: true,
    preserveViewport: true
});