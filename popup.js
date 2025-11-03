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

/**
  Popup window logic - vanilla JavaScript
*/

// Get services from background service worker
async function getServicesForCurrentTab() {
  const tabs = await chrome.tabs.query({active: true, currentWindow: true});
  const tabId = tabs[0].id;
  
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(
      {action: 'getServices', tabId: tabId},
      function(response) {
        resolve(response || {});
      }
    );
  });
}

// Copy URL to clipboard
async function copyToClipboard(text, button) {
  try {
    await navigator.clipboard.writeText(text);
    
    // Visual feedback
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.classList.add('copied');
    
    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('copied');
    }, 2000);
  } catch (err) {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    
    button.textContent = 'Copied!';
    button.classList.add('copied');
    setTimeout(() => {
      button.textContent = 'Copy';
      button.classList.remove('copied');
    }, 2000);
  }
}

// Render a single service entry
function renderServiceEntry(entry) {
  const li = document.createElement('li');
  li.className = 'service-item';
  
  // Content container
  const content = document.createElement('div');
  content.className = 'service-content';
  
  const label = document.createElement('span');
  label.className = 'service-label';
  label.textContent = entry.label() + ':';
  
  const link = document.createElement('a');
  link.className = 'service-link';
  link.href = entry.href();
  link.textContent = entry.linkText();
  link.target = '_blank';
  link.title = entry.href(); // Tooltip showing full URL
  
  content.appendChild(label);
  content.appendChild(link);
  
  // Copy button
  const copyButton = document.createElement('button');
  copyButton.className = 'copy-button';
  copyButton.textContent = 'Copy';
  copyButton.title = 'Copy URL to clipboard';
  copyButton.addEventListener('click', (e) => {
    e.preventDefault();
    copyToClipboard(entry.href(), copyButton);
  });
  
  li.appendChild(content);
  li.appendChild(copyButton);
  
  return li;
}

// Main initialization
async function init() {
  const rawLog = await getServicesForCurrentTab();
  
  if (!rawLog || Object.keys(rawLog).length === 0) {
    document.getElementById('services-list').innerHTML = 
      '<li class="no-services">No GIS services detected on this page</li>';
    return;
  }
  
  const urlLog = new URLLog();
  
  // Parse all URLs and create log entries
  for (const url in rawLog) {
    const type = rawLog[url];
    const entry = URLLogEntry.create(type, url);
    if (entry == null) continue;
    urlLog.pushIfUnique(entry);
  }
  
  // Fetch metadata for all entries
  const promises = urlLog.map(async (entry) => {
    try {
      const response = await fetch(entry.href() + (entry.href().includes('?') ? '&' : '?') + 'f=json');
      const data = await response.json();
      if (entry.layerName == null && data.name) {
        entry.layerName = data.name;
      }
    } catch (e) {
      // Silently fail if metadata fetch fails
    }
    return entry;
  });
  
  await Promise.all(promises);
  
  // Render all entries
  const listElement = document.getElementById('services-list');
  listElement.innerHTML = '';
  
  urlLog.entries.forEach(entry => {
    listElement.appendChild(renderServiceEntry(entry));
  });
}

// Run when popup opens
document.addEventListener('DOMContentLoaded', init);
