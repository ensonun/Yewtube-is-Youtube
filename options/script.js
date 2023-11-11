// Storage section //
async function restoreOptions() {
  let res = await browser.storage.local.get('yturl');
  document.getElementById("current-yt-url").innerText = res.yturl || "yewtu.be";
}

async function saveOptions(e) {
  e.preventDefault();
  await browser.storage.local.set({
    yturl: document.getElementById("new-yt-url").value
  });

  restoreOptions();
  document.getElementById("new-yt-url").value = "";
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById("submit-button").addEventListener('click', saveOptions);

// Fetching JSON section and return url when list item is clicked //
document.addEventListener('DOMContentLoaded', function () {
    const dataList = document.getElementById('data-list');

    const jsonUrl = 'https://api.invidious.io/instances.json?pretty=1&sort_by=type,users';

    // Fetch JSON data
    fetch(jsonUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Only use the first 10 items from the JSON data
            const firstTenItems = data.slice(0, 10);

            // Populate list
            firstTenItems.forEach(innerArray => {
                // Check if the inner array contains an object
                if (innerArray.length > 1 && typeof innerArray[1] === 'object') {
                    // Access the properties of the inner object
                    const item = innerArray[1];

                    const listItem = document.createElement('li');
                    // Display the properties you need from the inner object
                    listItem.textContent = `${item.uri} ${item.flag} (Users: ${item.stats.usage.users.total})`;
                    dataList.appendChild(listItem);

                    // Add click event listener to each list item
                    listItem.addEventListener('click', function (event) {
                        // Access the text content of the clicked item
                        const clickedText = event.target.textContent.split('://')[1].split(' ')[0];
                        document.getElementById("new-yt-url").value = clickedText;
                    });
                }
            });
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
});