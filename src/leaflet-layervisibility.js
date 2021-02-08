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
