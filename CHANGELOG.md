# Changelog

## [0.1.0] - 2021-02-22

### Added

- Extend `L.Layer` to be able to hide/show a layer by CSS `display` property:
  - `hide()`
  - `show()`
  - `isHidden()`
  - `toggleVisibility()`
- Extend `L.LayerGroup` to be able to hide/show single layers by condition:
  - `hide(filter)`
  - `show(filter)`
  - `isHidden()`
- Extend `L.Marker` to handle shadows:
  - `hide()`
  - `show()`
