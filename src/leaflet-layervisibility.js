import L from "leaflet";

function validateFilter(filterFunc) {
    if (typeof filterFunc !== "undefined" && typeof filterFunc === "function") {
        return filterFunc;
    }
    return function () {
        return true;
    };
}

L.Layer.include({
    hide() {
        this.getElement().style.display = "none";
        return this;
    },
    show() {
        this.getElement().style.display = "";
        return this;
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
        const filterFunc = validateFilter(filter);
        this.eachLayer(layer => (filterFunc(layer) ? layer.hide() : null));
    },
    show(filter) {
        const filterFunc = validateFilter(filter);
        this.eachLayer(layer => (filterFunc(layer) ? layer.show() : null));
    },
    isHidden() {
        return this.getLayers().every(layer => layer.isHidden());
    },
});
