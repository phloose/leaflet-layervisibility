# Changelog

## [0.1.0post1] - 2021-02-22

### Added

- Add links to github repository to package.json

### Changed

- Republish from master branch


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
