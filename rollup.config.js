export default {
    input: "src/leaflet-layervisibility.js",
    output: {
        file: "dist/leaflet-layervisibility.js",
        format: "umd",
        sourcemap: true,
        globals: {
            leaflet: "L",
        },
    },
    external: ["leaflet"],
};
