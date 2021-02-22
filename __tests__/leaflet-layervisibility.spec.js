import L from "leaflet";
import "../src/leaflet-layervisibility";

describe("leaflet-layervisibility", () => {
    let map;

    const mapHeight = 600;
    const mapWidth = 800;

    beforeEach(() => {
        const mapDiv = document.createElement("div");
        // We use a virtual DOM so the clientHeight/clientWidth will be zero. Define
        // them so the map gets a fake viewport.
        Object.defineProperty(mapDiv, "clientHeight", {
            configurable: true,
            value: mapHeight,
        });
        Object.defineProperty(mapDiv, "clientWidth", {
            configurable: true,
            value: mapWidth,
        });
        map = L.map(mapDiv, {
            renderer: new L.SVG(), // from: https://github.com/oliverroick/Leaflet.Deflate/blob/master/tests/L.Deflate.test.js
            center: [0, 0],
            zoom: 10,
        });
    });

    afterEach(() => {
        map.remove();
    });
    describe("Layer", () => {
        test("hiding/showing a layer sets css display attribute to 'none'/empty string", () => {
            const layer = L.circle([0, 0], { radius: 200 }).addTo(map);
            layer.hide();
            expect(layer.getElement().style.display).toEqual("none");
            layer.show();
            expect(layer.getElement().style.display).toEqual("");
        });
        test("hiding a layer", () => {
            const layer = L.circle([0, 0], { radius: 200 }).addTo(map);
            layer.hide();
            expect(layer.isHidden()).toBeTruthy();
        });
        test("showing a layer after being hidden", () => {
            const layer = L.circle([0, 0], { radius: 200 }).addTo(map);
            layer.hide();
            expect(layer.isHidden()).toBeTruthy();
            layer.show();
            expect(layer.isHidden()).toBeFalsy();
        });
        test("toggle visibility", () => {
            const layer = L.circle([0, 0], { radius: 200 }).addTo(map);
            layer.toggleVisibility();
            expect(layer.isHidden()).toBeTruthy();
            layer.toggleVisibility();
            expect(layer.isHidden()).toBeFalsy();
        });
    });
    describe("LayerGroup", () => {
        let layer1;
        let layer2;
        let layer3;
        let layer4;

        beforeEach(() => {
            layer1 = L.circle([0, 0], {
                radius: 200,
                name: "layer1",
                quantitity: 50,
            });
            layer2 = L.circle([5, 0], { radius: 200, quantitity: 60 });
            layer3 = L.circle([10, 0], { radius: 200, quantitity: 200 });
            layer4 = L.circle([15, 0], { radius: 200, quantitity: 500 });
        });

        afterEach(() => {
            layer1 = null;
            layer2 = null;
            layer3 = null;
            layer4 = null;
        });

        test("hiding a LayerGroup", () => {
            const layergroup = L.layerGroup([layer1, layer2]).addTo(map);
            layergroup.hide();
            expect(layer1.isHidden()).toBeTruthy();
            expect(layer2.isHidden()).toBeTruthy();
        });

        test("toggle visibility of a LayerGroup", () => {
            const layergroup = L.layerGroup([layer1, layer2]).addTo(map);
            layergroup.toggleVisibility();
            expect(layer1.isHidden()).toBeTruthy();
            expect(layer2.isHidden()).toBeTruthy();
            layergroup.toggleVisibility();
            expect(layer1.isHidden()).toBeFalsy();
            expect(layer2.isHidden()).toBeFalsy();
        });
        test("hiding layers by filter function", () => {
            const layergroup = L.layerGroup([
                layer1,
                layer2,
                layer3,
                layer4,
            ]).addTo(map);
            layergroup.hide(
                layer =>
                    layer.options.name === "layer1" ||
                    layer.options.quantitity >= 500,
            );
            expect(layer1.isHidden()).toBeTruthy();
            expect(layer2.isHidden()).toBeFalsy();
            expect(layer3.isHidden()).toBeFalsy();
            expect(layer4.isHidden()).toBeTruthy();
        });
        test("showing hidden layers by filter function", () => {
            const layergroup = L.layerGroup([
                layer1,
                layer2,
                layer3,
                layer4,
            ]).addTo(map);
            layergroup.hide();
            layergroup.show(
                layer =>
                    layer.options.name === "layer1" ||
                    layer.options.quantitity >= 500,
            );
            expect(layer1.isHidden()).toBeFalsy();
            expect(layer2.isHidden()).toBeTruthy();
            expect(layer3.isHidden()).toBeTruthy();
            expect(layer4.isHidden()).toBeFalsy();
        });

        test("geojson/FeatureGroup", () => {
            const geojson = L.geoJSON({
                type: "FeatureCollection",
                features: [
                    {
                        type: "Feature",
                        properties: { name: "feature1", amount: 10.5 },
                        geometry: {
                            type: "Point",
                            coordinates: [0, 0],
                        },
                    },
                    {
                        type: "Feature",
                        properties: { name: "feature2", amount: 11.5 },
                        geometry: {
                            type: "Point",
                            coordinates: [1, 1],
                        },
                    },
                    {
                        type: "Feature",
                        properties: { name: "feature3", amount: 13.5 },
                        geometry: {
                            type: "Point",
                            coordinates: [-1, 2],
                        },
                    },
                ],
            }).addTo(map);
            geojson.hide(layer => layer.feature.properties.name === "feature3");
            const [feature1, feature2, feature3] = geojson.getLayers();
            expect(feature1.isHidden()).toBeFalsy();
            expect(feature2.isHidden()).toBeFalsy();
            expect(feature3.isHidden()).toBeTruthy();
        });
    });
    describe("Marker", () => {
        test("hide/show also hides/shows a markers shadow", () => {
            const marker = L.marker([0, 0]).addTo(map);
            // eslint-disable-next-line no-underscore-dangle
            expect(marker._shadow.style.display).toEqual("");
            marker.hide();
            // eslint-disable-next-line no-underscore-dangle
            expect(marker._shadow.style.display).toEqual("none");
            marker.show();
            // eslint-disable-next-line no-underscore-dangle
            expect(marker._shadow.style.display).toEqual("");
        });
    });
});
