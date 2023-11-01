import L from "leaflet";

function validateFilter(filterFunc) {
    if (typeof filterFunc !== "undefined" && typeof filterFunc === "function") {
        return filterFunc;
    }
    return function () {
        return true;
    };
}

function setLayerDisplayStyle(value, context) {
    context.getElement().style.display = value;
    return context;
}

function setLayerGroupVisibility(mode, filter, context) {
    const filterFunc = validateFilter(filter);
    context.eachLayer(layer => (filterFunc(layer) ? layer[mode]() : null));
}

L.Layer.include({
    hide() {
        return setLayerDisplayStyle("none", this);
    },
    show() {
        return setLayerDisplayStyle("", this);
    },
    isHidden() {
        return this.getElement().style.display === "none";
    },
    toggleVisibility() {
        return this.isHidden() ? this.show() : this.hide();
    },
});

L.LayerGroup.include({
    hide(filter) {
        setLayerGroupVisibility("hide", filter, this);
    },
    show(filter) {
        setLayerGroupVisibility("show", filter, this);
    },
    isHidden() {
        return this.getLayers().every(layer => layer.isHidden());
    },
});

function setMarkerShadowDisplayStyle(value, context) {
    // eslint-disable no-underscore-dangle
    if (context._shadow) {
        context._shadow.style.display = value;
    }
    // eslint-enable no-underscore-dangle
    return context;
}

L.Marker.include({
    hide() {
        setMarkerShadowDisplayStyle("none", this);
        return L.Layer.prototype.hide.call(this, null);
    },
    show() {
        setMarkerShadowDisplayStyle("", this);
        return L.Layer.prototype.show.call(this, null);
    },
});
