//You can edit ALL of the code here
// function setup() {
//   const allEpisodes = getAllEpisodes();
//   makePageForEpisodes(allEpisodes);
// }

// function makePageForEpisodes(episodeList) {
//   const rootElem = document.getElementById("root");
//   rootElem.textContent = `Got ${episodeList.length} episode(s)`;
// }

function displayEpisodes() {
  // Get the container element where the content will be displayed
  const container = document.getElementById('grid');
  

  // Get all episodes
  const episodes = getAllEpisodes();

  // Iterate through each episode
  episodes.forEach((episode) => {
    // Create the elements
    const episodeDiv = document.createElement('div');
    episodeDiv.classList.add("box"); 
    const heading = document.createElement('div');
    heading.classList.add("heading"); 
    const titleHeading = document.createElement('h3');
    titleHeading.style.textAlign='center';
    heading.append(titleHeading);
    const BoxImg = document.createElement('div');
    BoxImg.classList.add("box-img"); 
    const image = document.createElement('img');
    BoxImg.append(image);
    const contentDiv = document.createElement('div');
    contentDiv.classList.add("text");
    const summaryParagraph = document.createElement('p');
    contentDiv.append(summaryParagraph);//text

    // Set the content and attributes of the elements
    let season = episode.season < 10 ? "0"+episode.season : episode.season; 
    let number = episode.number < 10 ? "0"+episode.number : episode.number; 
    titleHeading.textContent = `${episode.name} - S${season}E${number}`;
    image.src = episode.image.medium;
    summaryParagraph.innerHTML = episode.summary;

    // Append the elements to the episode div
    episodeDiv.appendChild(heading);
    episodeDiv.appendChild(BoxImg);
    episodeDiv.appendChild(contentDiv);

    // Append the episode div to the container
    container.appendChild(episodeDiv);
  });
}

function addZero(n) {
  return n < 10 ? "0"+n : n;
}

// Call the function to display the episodes
//displayEpisodes();

//search
document.getElementById('searchInput').addEventListener('input', search);

// Function to handle search
function search() {
  var query = document.getElementById('searchInput').value.toLowerCase();
  var filteredData = getAllEpisodes().filter(function (item) {
    return item.name.toLowerCase().includes(query) || item.summary.toLowerCase().includes(query);
  });

  var searchResults = document.getElementById('grid');
  //searchResults.innerHTML = generateCards(filteredData);
  //console.log(filteredData);
  searchResults.innerHTML = ""
  const totalData = document.getElementById("totalData");
  
  totalData.innerHTML = "";

  totalData.innerHTML = `Displaying ${filteredData.length} / ${getAllEpisodes().length} episodes`;
  //console.log(filteredData.length);
  //console.log(getAllEpisodes().length);
  filteredData.forEach((episode) => {
    // Create the elements
    const episodeDiv = document.createElement('div');
    episodeDiv.classList.add("box"); 
    const heading = document.createElement('div');
    heading.classList.add("heading"); 
    const titleHeading = document.createElement('h3');
    titleHeading.style.textAlign='center';
    heading.append(titleHeading);
    const BoxImg = document.createElement('div');
    BoxImg.classList.add("box-img"); 
    const image = document.createElement('img');
    BoxImg.append(image);
    const contentDiv = document.createElement('div');
    contentDiv.classList.add("text");
    const summaryParagraph = document.createElement('p');
    contentDiv.append(summaryParagraph);//text

    // Set the content and attributes of the elements
    let season = episode.season < 10 ? "0"+episode.season : episode.season; 
    let number = episode.number < 10 ? "0"+episode.number : episode.number; 
    titleHeading.textContent = `${episode.name} - S${season}E${number}`;
    image.src = episode.image.medium;
    summaryParagraph.innerHTML = episode.summary;

    // Append the elements to the episode div
    episodeDiv.appendChild(heading);
    episodeDiv.appendChild(BoxImg);
    episodeDiv.appendChild(contentDiv);

    // Append the episode div to the container
    searchResults.appendChild(episodeDiv);
  });
}

window.onload = displayEpisodes;
