// Create context menu item
browser.contextMenus.create({
  id: "open-yewtu",
  title: "Open in YewTu.be",
  contexts: ["link"]
});

// Listen to click event
browser.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "open-yewtu":
      // Get the linkUrl property from the info object 
      let linkUrl = info.linkUrl; 
      // Replace youtube with yewtube 
      let newLinkUrl = linkUrl.replace("youtube.com", "yewtu.be"); 
      // Open in new tab
      browser.tabs.create({url: newLinkUrl});   
      break;
  }
});
