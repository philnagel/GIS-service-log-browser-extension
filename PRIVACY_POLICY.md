# Privacy Policy for GIS Service Log

**Last Updated:** January 5, 2025

## Overview

GIS Service Log ("the Extension") is a browser extension designed to help GIS developers and mapping professionals identify and access GIS web services used by web mapping applications. This privacy policy explains how the Extension handles data.

## Data Collection and Usage

### What Data We Collect

The Extension monitors network requests made by websites you visit to detect GIS web service URLs. Specifically, it detects:

- ArcGIS REST Services (MapServer, FeatureServer, GPServer, etc.)
- WMS (Web Map Service) requests
- WMTS (Web Map Tile Service) requests
- WFS (Web Feature Service) requests
- XYZ Tile service requests (OpenStreetMap, Mapbox, etc.)

### How We Use This Data

The detected service URLs are:

1. **Stored Locally Only**: All detected service URLs are stored exclusively in your browser's local storage
2. **Per-Tab Tracking**: Services are tracked separately for each browser tab
3. **Temporary Storage**: Service data is automatically cleared when you navigate to a new page or close a tab
4. **Display Only**: The stored URLs are only used to display the list of detected services when you click the extension icon

### What We DO NOT Do

- **No External Transmission**: We do not send, transmit, or upload any data to external servers
- **No Analytics**: We do not collect analytics, usage statistics, or telemetry
- **No Personal Information**: We do not collect, store, or process any personally identifiable information
- **No Tracking**: We do not track your browsing history or behavior
- **No Third-Party Sharing**: We do not share any data with third parties
- **No Cookies**: We do not use cookies or similar tracking technologies

## Permissions Explained

The Extension requires the following permissions to function:

### webRequest
- **Purpose**: Monitor network requests to detect GIS service URLs
- **Scope**: All URLs (`*://*/*`)
- **Usage**: Read-only access to identify service patterns; does not modify or block requests

### storage
- **Purpose**: Store detected service URLs locally in your browser
- **Data Stored**: Only GIS service URLs and their types
- **Location**: Local browser storage only (never transmitted externally)

### webNavigation
- **Purpose**: Detect when you navigate to a new page to clear the service list
- **Usage**: Ensures the extension shows only services relevant to the current page

### activeTab
- **Purpose**: Access the current tab's information to display detected services
- **Usage**: Only activated when you click the extension icon

### host_permissions (`*://*/*`)
- **Purpose**: Allow the extension to monitor requests on all websites
- **Necessity**: Required because GIS services can be hosted on any domain

## Data Retention

- **Duration**: Service URLs are stored only while the browser tab remains open
- **Automatic Deletion**: All data is automatically deleted when:
  - You navigate to a new page
  - You close the browser tab
  - You close the browser

## Data Security

- All data remains within your browser's secure local storage
- No data is transmitted over the network
- No external servers or databases are used
- The Extension operates entirely client-side

## Third-Party Services

The Extension does not integrate with, communicate with, or transmit data to any third-party services, analytics platforms, or external servers.

## Children's Privacy

The Extension does not knowingly collect any information from anyone, including children under the age of 13. The Extension is designed for professional use by GIS developers and mapping professionals.

## Changes to This Privacy Policy

We may update this privacy policy from time to time. Any changes will be reflected in the "Last Updated" date at the top of this document. Continued use of the Extension after changes constitutes acceptance of the updated privacy policy.

## Open Source

This Extension is open source. You can review the complete source code at:
https://github.com/philnagel/GIS-service-log-browser-extension

## Contact Information

For questions or concerns about this privacy policy, please contact:
- **Project Repository**: https://github.com/philnagel/GIS-service-log-browser-extension
- **Issue Tracker**: https://github.com/philnagel/GIS-service-log-browser-extension/issues

## Your Rights

Since the Extension does not collect, store externally, or process any personal data:
- There is no personal data to access, modify, or delete
- All data remains under your control in your local browser
- You can remove all Extension data by uninstalling the Extension

## Compliance

This Extension is designed to comply with:
- General Data Protection Regulation (GDPR)
- California Consumer Privacy Act (CCPA)
- Browser extension store policies and guidelines

## License

The Extension is licensed under the Apache License, Version 2.0. See the LICENSE file in the repository for details.

---

**Summary**: GIS Service Log is a privacy-focused tool that operates entirely within your browser. It does not collect personal information, does not transmit data externally, and automatically clears all stored data when you navigate away or close tabs.
