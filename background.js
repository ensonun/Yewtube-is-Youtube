// Create context menu item
browser.contextMenus.create({
  id: "open-yewtu",
  title: "Open in YewTu.be",
  contexts: ["link"]
});

browser.contextMenus.onClicked.addListener(async (info, tab) => {
  switch (info.menuItemId) {
    case "open-yewtu":
      // Get the linkUrl property from the info object 
      let linkUrl = info.linkUrl; 
      // Replace youtube with yewtube
      let res = await browser.storage.local.get('yturl');
      let replaceUrl = res.yturl || "yewtu.be";
      let newLinkUrl = linkUrl.replace("www.youtube.com", replaceUrl); 
      // Open in new tab
      browser.tabs.create({url: newLinkUrl});
      break;
  }
});
