import L from "leaflet";

/**
 * @callback filterFunc
 * @param {L.Layer} layer The current layer
 */

/**
 * Validate the filter function
 *
 * When filterFunction is undefined it will return a callback that returns true
 * @param {filterFunc} filterFunc
 * @returns {filterFunc|Function} The filter function or an anonymous callback
 */
function validateFilter(filterFunc) {
    if (typeof filterFunc !== "undefined" && typeof filterFunc === "function") {
        return filterFunc;
    }
    return function () {
        return true;
    };
}
/**
 * Set the display style of a layer
 *
 * @param {""|"none"} value The display style value
 * @param {L.Layer & L.Path} context The layer
 * @returns {L.Layer} The layer
 */
function setLayerDisplayStyle(value, context) {
    context.getElement().style.display = value;
    return context;
}
/**
 * Set the display style of a layergroup
 *
 * @param {"hide"|"show"} mode The mode to set
 * @param {filterFunc} filter Filter function to hide/show specific layers of a
 * layergroup based on a condition. Receives the current layer as argument.
 * @param {L.LayerGroup} context The layergroup
 */
function setLayerGroupVisibility(mode, filter, context) {
    const filterFunc = validateFilter(filter);
    context.eachLayer(layer => (filterFunc(layer) ? layer[mode]() : null));
}

L.Layer.include({
    /**
     * Hide a layer
     *
     * @returns {L.Layer} The layer instance
     */
    hide() {
        return setLayerDisplayStyle("none", this);
    },
    /**
     * Show a layer after it has been hidden
     *
     * @returns {L.Layer} The layer instance
     */
    show() {
        return setLayerDisplayStyle("", this);
    },
    /**
     * Determines whether a layer is hidden
     *
     * @returns {boolean} Whether the layer is hidden
     */
    isHidden() {
        return this.getElement().style.display === "none";
    },
    /**
     * Toggle visibility of a layer. Hides a layer when visibile, otherwise shows
     * it.
     *
     * @returns {L.Layer} The layer instance
     */
    toggleVisibility() {
        return this.isHidden() ? this.show() : this.hide();
    },
});

L.LayerGroup.include({
    /**
     * Hide a layergroup
     *
     * @param {filterFunc} filter Optional filter function to hide specific layers of a
     * layergroup based on a condition. Receives the current layer as argument.
     */
    hide(filter) {
        setLayerGroupVisibility("hide", filter, this);
    },
    /**
     * Show a layergroup after it has been hidden
     *
     * @param {filterFunc} filter Optional filter function to show specific layers of a
     * layergroup based on a condition. Receives the current layer as argument.
     */
    show(filter) {
        setLayerGroupVisibility("show", filter, this);
    },
    /**
     * Determines whether a layergroup is hidden. Returns true if all layers
     * contained in the layergroup are hidden.
     *
     * @returns {boolean} Whether all layers of a layergroup are hidden
     */
    isHidden() {
        return this.getLayers().every(layer => layer.isHidden());
    },
});

/**
 * Set the display style of a marker
 *
 * @param {""|"none"} value The display style value
 * @param {L.Marker} context The marker
 * @returns {L.Marker} The marker
 */
function setMarkerShadowDisplayStyle(value, context) {
    // eslint-disable-next-line no-underscore-dangle
    context._shadow.style.display = value;
    return context;
}

L.Marker.include({
    /**
     * Hide a layer
     *
     * @returns {L.Layer} The layer instance
     */
    hide() {
        setMarkerShadowDisplayStyle("none", this);
        return L.Layer.prototype.hide.call(this, null);
    },
    /**
     * Show a layer after it has been hidden
     *
     * @returns {L.Layer} The layer instance
     */
    show() {
        setMarkerShadowDisplayStyle("", this);
        return L.Layer.prototype.show.call(this, null);
    },
});
