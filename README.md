# leaflet-layervisibility

Hide/show instances of `L.Layer` or `L.LayerGroup` without removing/re-adding them to
a `Leaflet` map. This is useful if you have a lot of features (e.g. a dataset with a
large amount of points or a more complex polygon dataset) and the
adding/removing-process takes some time. Another use case may be if you want to
hide/show features of a GeoJSON depending on a particular condition.

Extends `L.Layer` and `L.LayerGroup` with methods `hide`, `show` and `toggleVisibility`.
The methods `hide` and `show` in `L.LayerGroup` can take a filter function that has
access to the layer instance of each layer in the layergroup. It can be used to hide or
show a layer depending on a condition.

For an example you can explore the `Leaflet` geometries of the [index.html](index.html)
with which you can play around
[here](https://phloose.github.io/leaflet-layervisibility/) (open up the developer
tools...). E.g. for hiding only the circle with radius `500` of the `circleLayerGroup`
you would call `hide` on it like so:

```javascript
circleLayerGroup.hide(layer => layer.options.radius === 500)
```

The plugin does works with `Leaflet` 1.7.1 but older versions should also work, although
this has not been tested yet.

## Usage

### webpack, rollup etc.

If you are using a bundler like webpack or rollup you can install
leaflet-layervisibility via npm:

`npm install leaflet-layervisibility`

and then import it **after** importing `Leaflet`:

```javascript
import L from "leaflet"
import "leaflet-layervisibility"
```

Note that plugin does not export any functions or classes. It just needs to be executed
once to extend the described `Leaflet` classes.

### Browser

You can use `leaflet-layervisibility` from a CDN like [unpkg](https://unpkg.com/).
Include the plugin's js files *after* the links to the `Leaflet` files in the header
section of your html page. Then run your code by using the script tags in the body of
the page.

```html
<head>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" ></script>
    <script src="https://unpkg.com/leaflet-layervisibility/dist/leaflet-layervisibility.js"></script>
</head>
```
