# Enough - Website Blocker Chrome Extension

A Chrome extension designed to block access to distracting websites by replacing their content with a motivational image.

## Features

- **Customizable Site Blocking**: Add websites to block through the popup interface
- **Default Blocked Sites**: Comes pre-configured with common distracting sites (x.com, reddit.com, netflix.com, tiktok.com, instagram.com)
- **Instant Content Replacement**: Replaces blocked site content with a job application image to encourage productivity
- **Clean UI**: Simple popup interface for managing blocked sites

## How It Works

When you visit a blocked website, the extension:
1. Immediately hides the original page content
2. Replaces the entire page with a black background
3. Displays a job application image as a reminder to stay focused

## Installation

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension folder
5. The "Enough" extension will now appear in your Chrome toolbar

## Usage

### Managing Blocked Sites

1. Click the "Enough" extension icon in the Chrome toolbar
2. In the popup, enter a website URL (e.g., "example.com") in the text field
3. Click "Add" or press Enter to add the site to your block list
4. View all blocked sites in the "Blocked Sites" section

### Default Blocked Sites

The extension comes with these sites pre-blocked:
- x.com (Twitter/X)
- reddit.com
- netflix.com
- tiktok.com
- instagram.com

## File Structure

```
enough/
├── assets/                 # Extension icons and images
├── content.js             # Content script that modifies blocked pages
├── manifest.json          # Extension configuration
├── popup.html            # Popup interface HTML
├── popup.js              # Popup interface functionality
└── README.md             # This file
```

## Technical Details

- **Manifest Version**: 3 (Chrome Extensions Manifest V3)
- **Permissions**: 
  - `storage` - For saving blocked sites list
  - `<all_urls>` - For content script injection on all websites
- **Content Script**: Runs at `document_start` for immediate page blocking

## Privacy

This extension stores your blocked sites list locally using Chrome's storage API. No data is transmitted to external servers.