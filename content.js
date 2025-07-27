async function getTargetUrls() {
  const result = await chrome.storage.local.get(['target_urls']);
  return result.target_urls || ["x.com", "reddit.com", "twitter.com", "netflix.com", "tiktok.com", "instagram.com"];
}

async function matchesTargetUrl(currentUrl) {
  const targetUrls = await getTargetUrls();
  return targetUrls.some((targetUrl) => currentUrl.includes(targetUrl));
}

// Inject CSS immediately to hide content (prevents flash)
function injectHidingCSS() {
  const style = document.createElement("style");
  style.id = "enough-hide-style";
  style.textContent = `
        html, body {
            display: none !important;
            visibility: hidden !important;
            overflow: hidden !important;
        }
    `;

  // Inject into head if it exists, otherwise into document
  if (document.head) {
    document.head.appendChild(style);
  } else {
    document.documentElement.appendChild(style);
  }
}

function removeHidingCSS() {
  const hideStyle = document.getElementById("enough-hide-style");
  if (hideStyle) {
    hideStyle.remove();
  }
}

function modifyDOM() {
  if (!document.body) {
    setTimeout(modifyDOM, 10);
    return;
  }
  
  // Remove the hiding CSS first
  removeHidingCSS();
  
  // Clear existing body content and set background
  document.body.innerHTML = '';
  document.body.style.cssText = `
    margin: 0;
    padding: 0;
    background-color: black;
    overflow: hidden;
    height: 100vh;
    width: 100vw;
  `;
  
  // Also disable scroll on html element
  document.documentElement.style.overflow = 'hidden';
  
  // Create and inject the image
  const img = document.createElement("img");
  img.src = "https://eforms.com/images/2018/03/Employment-Job-Application.png";
  img.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100vh;
    width: auto;
    z-index: 9999;
    display: block;
  `;
  
  document.body.appendChild(img);
}

async function checkSite() {
  const currentUrl = window.location.href;
  
  if (await matchesTargetUrl(currentUrl)) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", modifyDOM);
    } else {
      modifyDOM();
    }
  } else {
    removeHidingCSS();
  }
}

async function init() {
  if (await matchesTargetUrl(window.location.href)) {
    injectHidingCSS();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", checkSite);
  } else {
    checkSite();
  }
}

init();
