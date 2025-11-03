# GIS Service Log - Chrome Extension

A Chrome extension that automatically detects and logs GIS web service requests, making it easy to identify and access the services used by web mapping applications.

![Screenshot](Screenshot.png)

## Features

* **Automatic Detection** - Monitors network requests and detects GIS services in real-time
* **Dynamic Icon** - Extension icon changes from gray to green when services are detected
* **Service Details** - Click the icon to view all detected services with direct links
* **Multiple Service Types** - Supports the most common GIS web services:
  - **ArcGIS REST Services** (MapServer, FeatureServer, GPServer, etc.)
  - **WMS** (Web Map Service)
  - **WMTS** (Web Map Tile Service)
  - **WFS** (Web Feature Service)
  - **XYZ Tiles** (OpenStreetMap, Mapbox, etc.)
* **Per-Tab Tracking** - Services are tracked separately for each browser tab
* **Auto-Cleanup** - Service list clears when navigating to a new page

## Installation

### For Development/Testing

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer mode** (toggle in top-right corner)
4. Click **Load unpacked**
5. Select the extension directory

### For Production Use

The extension can be distributed internally via:
- Chrome Web Store (unlisted listing)
- Chrome Enterprise Policy (for managed deployments)

## Usage

1. Navigate to any website that uses GIS web services
2. The extension icon will turn **green** when services are detected
3. Click the icon to see a list of all detected services
4. Click any service link to view its details or capabilities

## Examples

Try the extension on these sites:
- [ArcGIS Online World Topo Map](http://services.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer?f=jsapi)
- [OpenStreetMap](https://www.openstreetmap.org/)
- Any site using Leaflet, OpenLayers, or ArcGIS API for JavaScript

## Building & Packaging

### Prerequisites

- Node.js (for build scripts)
- `zip` command (pre-installed on macOS/Linux, available via Git Bash on Windows)

### Package for Distribution

```bash
npm run package
```

This creates a `gis-service-log-v{version}.zip` file ready for Chrome Web Store submission.

### Clean Build Artifacts

```bash
npm run clean
```

Removes all generated ZIP files and build artifacts.

## Technical Details

- **Manifest Version**: 3 (latest Chrome extension standard)
- **Permissions**: webRequest, storage, webNavigation, activeTab
- **Storage**: Uses chrome.storage.local for persistence
- **Service Worker**: Background script runs as a service worker

## Requirements

* Google Chrome (version 88 or later recommended)
* Websites that use GIS web services

## Version History

- **v0.6** - Added WMTS, WFS, and XYZ tile detection
- **v0.5** - Added XYZ tile service detection
- **v0.4** - New vector icons with dynamic state
- **v0.3** - Migrated to Manifest V3
- **v0.2** - Original version (Manifest V2, Angular-based)

## Development

The extension is built with vanilla JavaScript (no frameworks) for maximum compatibility and minimal overhead.

### Project Structure

```
├── manifest.json          # Extension configuration
├── background.js          # Service worker (detection logic)
├── popup.html/js          # Popup UI
├── options.html/js        # Options page
├── urllog.js             # Service URL parsing logic
├── icon-*.png            # Extension icons
├── license.txt           # Apache 2.0 license
├── package.json          # NPM scripts
└── scripts/              # Build scripts
    ├── package.js        # Creates distribution ZIP
    └── clean.js          # Cleans build artifacts
```

## License

Copyright 2015 Esri

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.

You may obtain a copy of the License at
  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

See the License for the specific language governing permissions and
limitations under the License.

A copy of the license is available in the repository's [license.txt](license.txt) file.

## Resources

* [ArcGIS for JavaScript API](https://developers.arcgis.com/javascript/)
* [OGC Web Services](https://www.ogc.org/standards/wms)
* [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)

## Credits

Originally created by Esri. Updated and modernized for Manifest V3 with expanded service type support.
