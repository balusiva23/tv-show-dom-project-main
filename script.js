//You can edit ALL of the code here
// function setup() {
//   const allEpisodes = getAllEpisodes();
//   makePageForEpisodes(allEpisodes);
// }

// function makePageForEpisodes(episodeList) {
//   const rootElem = document.getElementById("root");
//   rootElem.textContent = `Got ${episodeList.length} episode(s)`;
// }





//  function getAllEpisodes(){

//   fetch('https://api.tvmaze.com/shows/82/episodes')
//   .then(response => response.json())
//   .then(data => {
//     // Process the data here
//     console.log(data);
   
//     return data;
//   })
//   .catch(error => {
//     // Handle any errors here
//     console.error('Error:', error);
//   });


// }

async function getAllEpisodes() {
  try {
    const response = await fetch('https://api.tvmaze.com/shows/82/episodes');
    const data = await response.json();
    //console.log(data)
    return data;
    
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}


async function displayEpisodes() {
  // Get the container element where the content will be displayed
  const container = document.getElementById('grid');
  

  // Get all episodes
  const episodes = await getAllEpisodes(); 

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

    //episode dropdown
    const selectElement = document.getElementById('episodeslist');
    titlelist = `S${season}E${number} - ${episode.name}`; 
    var option = document.createElement("option");
    option.value = titlelist;
     option.textContent = titlelist;

    // Append the option element to the select element
     selectElement.appendChild(option);
 

    // Append the episode div to the container
    container.appendChild(episodeDiv);


  });
}



// Call the function to display the episodes
//displayEpisodes();

//search
document.getElementById('searchInput').addEventListener('input', search);

// Function to handle search
async function search() {
  var query = document.getElementById('searchInput').value.toLowerCase();
  try {
    const episodes = await getAllEpisodes();
  var filteredData =  episodes.filter(function (item) {
    return item.name.toLowerCase().includes(query) || item.summary.toLowerCase().includes(query);
  });

  var searchResults = document.getElementById('grid');
  //searchResults.innerHTML = generateCards(filteredData);
  //console.log(filteredData);
  searchResults.innerHTML = ""
  const totalData = document.getElementById("totalData");
  
  totalData.innerHTML = "";

  totalData.innerHTML = `Displaying ${filteredData.length} / ${episodes.length} episodes`;
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
  } catch (error) {
    console.error('Error:', error);
  }
  
}

//select episode
const selectElement = document.getElementById('episodeslist');

// Get reference to the container where the selected data will be displayed
var displayContainer = document.getElementById("grid");
displayContainer.innerHTML = ""
// Add event listener to the select element
selectElement.addEventListener("change", function() {
  displayContainer.innerHTML = ""
  // Get the selected option
  var selectedOption = selectElement.options[selectElement.selectedIndex];

  var selectedData = selectedOption.value;
  var parts = selectedData.split("-");
  var episodeName = parts[1];

  if(selectedData == 'all'){
   return displayEpisodes();
  }
  
  var filteredData = getAllEpisodes().filter(function(item) {
   // console.log(item.name.toLowerCase());
    //console.log(episodeName.toLowerCase().trim());
    return item.name.toLowerCase() === episodeName.toLowerCase().trim();
  });
  
 // console.log("Filtered Data:", filteredData);
  filteredData.forEach((episode) => {
   // console.log(episode.name.toLowerCase());
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
    displayContainer.appendChild(episodeDiv);
  });
  
});



window.onload = displayEpisodes;
