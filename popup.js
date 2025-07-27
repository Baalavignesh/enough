async function getTargetUrls() {
  const result = await chrome.storage.local.get(['target_urls']);
  return result.target_urls || ["x.com", "reddit.com", "netflix.com", "tiktok.com", "instagram.com"];
}

async function addUrl(url) {
  if (!url.trim()) return;
  
  const targetUrls = await getTargetUrls();
  if (!targetUrls.includes(url)) {
    targetUrls.push(url);
    await chrome.storage.local.set({target_urls: targetUrls});
    updateSitesList();
  }
}

async function updateSitesList() {
  const sitesList = document.getElementById("sites-list");
  const targetUrls = await getTargetUrls();
  
  if (targetUrls.length === 0) {
    sitesList.innerHTML = '<div class="empty-state">No sites blocked yet</div>';
    return;
  }
  
  sitesList.innerHTML = targetUrls.map(url => 
    `<div class="site-item">
      <span class="site-url">${url}</span>
    </div>`
  ).join('');
}

document.addEventListener('DOMContentLoaded', function() {
  const addButton = document.getElementById('add-button');
  const siteInput = document.getElementById('site-input');
  
  addButton.addEventListener('click', async function() {
    await addUrl(siteInput.value);
    siteInput.value = '';
  });
  
  siteInput.addEventListener('keypress', async function(e) {
    if (e.key === 'Enter') {
      await addUrl(siteInput.value);
      siteInput.value = '';
    }
  });
  
  updateSitesList();
});