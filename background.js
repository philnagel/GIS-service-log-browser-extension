/**
  Copyright 2015 Esri

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

  See the License for the specific language governing permissions and
  limitations under the License.​
*/

// TODO(bkietz) add tests for these
const serviceRegexes = {
  /**
    ### URL format for [ArcGIS rest API][]

    Catalog:     `http://<host>/<instance>/rest/services[/<folderName>]`
    Xyz Service: `http://<catalog-url>/<serviceName>/XyzServer`

    [ArcGIS rest API]: http://resources.arcgis.com/en/help/rest/apiref
   */
    ArcGIS: /^http[^\?]*\/rest\/services\/[^\?]*\/\w*Server/i,

  /**
    ### URL format for [OGC Web Map Service][]

    [OGC Web Map Service]: http://www.opengeospatial.org/standards/wms
   */
    WMS:    /^http[^\?]*\?[^\?]*SERVICE=WMS/i,

  /**
    ### URL format for [OGC Web Map Tile Service][]
    
    [OGC Web Map Tile Service]: http://www.opengeospatial.org/standards/wmts
   */
    WMTS:   /^http[^\?]*\?[^\?]*SERVICE=WMTS/i,

  /**
    ### URL format for [OGC Web Feature Service][]
    
    [OGC Web Feature Service]: http://www.opengeospatial.org/standards/wfs
   */
    WFS:    /^http[^\?]*\?[^\?]*SERVICE=WFS/i,

  /**
    ### URL format for XYZ/Slippy Tile Maps
    
    Common patterns:
    - OpenStreetMap: https://tile.openstreetmap.org/{z}/{x}/{y}.png
    - Mapbox: https://api.mapbox.com/styles/v1/{user}/{style}/tiles/{z}/{x}/{y}
    - Generic: http://example.com/tiles/{z}/{x}/{y}.png
    - With subdomain: http://{s}.example.com/{z}/{x}/{y}.png
    
    Matches URLs with /{z}/{x}/{y} or /{zoom}/{x}/{y} pattern
   */
    XYZ: /\/(?:\{z\}|\{zoom\}|\d+)\/(?:\{x\}|\d+)\/(?:\{y\}|\d+)(?:\.\w+)?(?:\?|$)/i

};

/**
  Check if the url refers to a GIS service.
  Returns an the name of the RegEx which matchedl or null.
*/
function parseServiceURL(url) {
  for(const type in serviceRegexes) {
    if(serviceRegexes[type].test(url)) {
      return type;
    }
  }
  return null;
}

// Helper to get services for a tab from storage
async function getServicesForTab(tabId) {
  const key = `tab_${tabId}`;
  const result = await chrome.storage.local.get(key);
  return result[key] || {};
}

// Helper to save services for a tab to storage
async function saveServicesForTab(tabId, services) {
  const key = `tab_${tabId}`;
  await chrome.storage.local.set({ [key]: services });
  
  // Update icon to active state when services are detected
  const hasServices = Object.keys(services).length > 0;
  if (hasServices) {
    await chrome.action.setIcon({
      tabId: tabId,
      path: {
        "16": "icon-active-16.png",
        "32": "icon-active-32.png",
        "48": "icon-active-48.png",
        "128": "icon-active-128.png"
      }
    });
  }
}

// use onRequestStart or something...
chrome.webRequest.onBeforeRequest.addListener(async function(info) {
  const tabId = info.tabId;
  if (tabId < 0) return;

  const serviceType = parseServiceURL(info.url);
  if (serviceType == null) return;

  // Get existing services for this tab
  const services = await getServicesForTab(tabId);

  // if we have already observed this service, return
  if (info.url in services) return;

  // store this service URL
  services[info.url] = serviceType;
  await saveServicesForTab(tabId, services);
},
// filters
{
  urls: [ "*://*/*" ]
});

// Message handler to allow popup to access servicesByTab
chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse){
    if (message.action === 'getServices' && message.tabId) {
      getServicesForTab(message.tabId).then(services => {
        sendResponse(services);
      });
      return true; // Keep message channel open for async response
    }
  });

// Clean up storage when tabs are closed
chrome.tabs.onRemoved.addListener(async (tabId) => {
  const key = `tab_${tabId}`;
  await chrome.storage.local.remove(key);
  
  // Icon will be automatically cleaned up when tab closes
});

// Clear services when navigating to a new page
chrome.webNavigation.onCommitted.addListener(async (details) => {
  // Only clear on main frame navigation (not iframes) and actual navigation (not in-page)
  if (details.frameId === 0 && details.transitionType !== 'auto_subframe') {
    const key = `tab_${details.tabId}`;
    await chrome.storage.local.remove(key);
    
    // Reset icon to default state
    await chrome.action.setIcon({
      tabId: details.tabId,
      path: {
        "16": "icon-default-16.png",
        "32": "icon-default-32.png",
        "48": "icon-default-48.png",
        "128": "icon-default-128.png"
      }
    });
  }
});
