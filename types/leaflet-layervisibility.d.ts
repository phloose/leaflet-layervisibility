import "leaflet";

type filterFunc = (layer: L.Layer) => boolean;

declare module "leaflet" {
    export interface Layer<P = any> {
        /**
         * Hide a layer
         */
        hide(): L.Layer;
        /**
         * Show a layer after it has been hidden
         */
        show(): L.Layer;
        /**
         * Determines whether a layer is hidden
         */
        isHidden(): boolean,
        /**
         * Toggle visibility of a layer. Hides a layer when visibile, otherwise shows
         * it.
         */
        toggleVisibility(): L.Layer;
    }

    export interface LayerGroup<P = any> {
        /**
         * Hide a layergroup
         * @param filter Optional filter function to hide specific layers of a
         * layergroup based on a condition. Receives the current layer as argument.
         */
        hide(filter?: filterFunc): L.LayerGroup;
        /**
         * Show a layergroup after it has been hidden
         * @param filter Optional filter function to show specific layers of a
         * layergroup based on a condition. Receives the current layer as argument.
         */
        show(filter?: filterFunc): L.LayerGroup;
        /**
         * Determines whether a layergroup is hidden. Returns true if all layers
         * contained in the layergroup are hidden.
         */
        isHidden(): boolean,
        /**
         * Toggle visibility of a layergroup. Hides a layergroup when visibile,
         * otherwise shows it. If applied when only some of the contained layers are
         * hidden the remaining layers will also be hidden.
         */
        toggleVisibility(): L.LayerGroup;
    }
}
