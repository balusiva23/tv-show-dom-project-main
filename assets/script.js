const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
//et all episode
async function getAllEpisodes() {
  try {
  

    //select shows
    const showlist = document.getElementById('showlist');
    if(id){
      var selectedData = id;
    }else{
      var selectedData = showlist.value;
    }//new
    
    
    const response = await fetch(`https://api.tvmaze.com/shows/${selectedData}/episodes`);
    //const response = await fetch('https://api.tvmaze.com/shows/82/episodes');
    const data = await response.json();
    
    return data;
    
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

//display episodes and shows
async function displayEpisodes() {
  // Get the container element where the content will be displayed
  const container = document.getElementById('grid');

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const episodes = await getAllEpisodes(); 
   const selectElement = document.getElementById('episodeslist');
   const defaultOption = document.createElement('option');
   defaultOption.value = 'all';
   defaultOption.text = 'All Episodes';
   selectElement.appendChild(defaultOption);
    //set value
    if(!id){
      
    
    const response = await fetch(`https://api.tvmaze.com/shows?country=US`);
    const Showlist = await response.json();

    Showlist.forEach((episode) => {
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
    titleHeading.textContent = `${episode.name} `;//- S${season}E${number}
    //image.src = episode.image.medium;
    if (episode.image.medium) {
      image.src = episode.image.medium;
    } else {
      // Set alternative image source
      image.src = "https://dummyimage.com/600x400/000/fff";
    }
    //console.log(image.src);
    summaryParagraph.innerHTML = episode.summary;

    // Append the elements to the episode div
    episodeDiv.appendChild(heading);
    episodeDiv.appendChild(BoxImg);
    episodeDiv.appendChild(contentDiv);

    // //show list

    const showselect = document.getElementById('showlist');
    showselect.innerHTML = "";
    const defaultOption = document.createElement('option');
     defaultOption.value = 'allshows';
     defaultOption.text = 'All Shows';
     showselect.appendChild(defaultOption);
     //episode list

      Showlist.forEach(item => {
      //selectvalue = `S${item.season}E${item.number} - ${item.name}`; 
      const option = document.createElement('option');
      option.value = item.id;
      option.text = item.name;
     
      showselect.appendChild(option);
    });
    ///------
    
     //episode dropdown

      episodes.forEach(episode => {
        titlelist = `S${episode.season}E${episode.number} - ${episode.name}`; 
        var option = document.createElement("option");
        option.value = titlelist;
        option.textContent = titlelist;
        selectElement.appendChild(option);
      });
    //}
 

    // Append the episode div to the container
    container.appendChild(episodeDiv);
    
   

  });
}else{

  const episodes = await getAllEpisodes();
  container.innerHTML = ""

  var selectedData = id;

  if(selectedData == 'allshows'){

    document.getElementById('episodeslist').innerHTML = '';
   return displayEpisodes();
  }
  
  const response = await fetch(`https://api.tvmaze.com/shows/${selectedData}/episodes`);
  const ShowfilteredData = await response.json();

  const totalData = document.getElementById("totalData");
  
  totalData.innerHTML = "";

  totalData.innerHTML = `Displaying ${ShowfilteredData.length} / ${ShowfilteredData.length} episodes`;
  
  const selectepisodeElement = document.getElementById('episodeslist');
 

  selectepisodeElement.innerHTML = "";
   // Create default option

   const defaultOption = document.createElement('option');
   defaultOption.value = 'all';
   defaultOption.text = 'All Episodes';
   selectepisodeElement.appendChild(defaultOption);
   //episode list
  ShowfilteredData.forEach(item => {
    selectvalue = `S${item.season}E${item.number} - ${item.name}`; 
    const option = document.createElement('option');
    option.value = selectvalue;
    option.text = selectvalue;
    selectepisodeElement.appendChild(option);


  });

  ShowfilteredData.forEach((episode) => {
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
    let season = episode.season < 10 ? "0"+episode.season : episode.season; 
    let number = episode.number < 10 ? "0"+episode.number : episode.number; 
    titleHeading.textContent = `${episode.name} - S${season}E${number}`;
   
   if (episode.image) {
    image.src = episode.image.medium;
  } else {
   
    fetch('https://picsum.photos/200')
      .then(response => {
      
        image.src = response.url;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  episode_summary = episode.summary.trim().split(' ')
  if(episode_summary.length > 85){

  summaryParagraph.innerHTML = episode_summary.slice(0, 85).join(' ') + '...';
  }else{
    summaryParagraph.innerHTML = episode.summary
  }
  
    episodeDiv.appendChild(heading);
    episodeDiv.appendChild(BoxImg);
    episodeDiv.appendChild(contentDiv);

    // Append the episode div to the container
    displayContainer.appendChild(episodeDiv);
  });
}
}


//search episode
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
  searchResults.innerHTML = ""
  const totalData = document.getElementById("totalData");
  totalData.innerHTML = "";
  totalData.innerHTML = `Displaying ${filteredData.length} / ${episodes.length} episodes`;

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
    let season = episode.season < 10 ? "0"+episode.season : episode.season; 
    let number = episode.number < 10 ? "0"+episode.number : episode.number; 
    titleHeading.textContent = `${episode.name} - S${season}E${number}`;
    image.src = episode.image.medium;
    summaryParagraph.innerHTML = episode.summary;
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

var displayContainer = document.getElementById("grid");
displayContainer.innerHTML = ""
selectElement.addEventListener('change', getSelecteddata);

 async function getSelecteddata(){
  try {
    const episodes = await getAllEpisodes();
   
  displayContainer.innerHTML = ""
  var selectedOption = selectElement.options[selectElement.selectedIndex];

  var selectedData = selectedOption.value;
  var parts = selectedData.split("-");
  var episodeName = parts[1];
  if(selectedData == 'all'){
   return displayEpisodes();
  }
  var filteredData = episodes.filter(function(item) {

    return item.name.toLowerCase() === episodeName.toLowerCase().trim();
  });
  

  const totalData = document.getElementById("totalData");
  
  totalData.innerHTML = "";

  totalData.innerHTML = `Displaying ${filteredData.length} / ${episodes.length} episodes`;

 // console.log("Filtered Data:", filteredData);
  filteredData.forEach((episode) => {
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
    //image.src = episode.image.medium;
    if (episode.image) {
      image.src = episode.image.medium;
    } else {

      fetch('https://picsum.photos/200')
        .then(response => {
         
          image.src = response.url;
 
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
    episode_summary = episode.summary.trim().split(' ')
    if(episode_summary.length > 85){

    summaryParagraph.innerHTML = episode_summary.slice(0, 85).join(' ') + '...';
    }else{
      summaryParagraph.innerHTML = episode.summary
    }
    // Append the elements to the episode div
    episodeDiv.appendChild(heading);
    episodeDiv.appendChild(BoxImg);
    episodeDiv.appendChild(contentDiv);

    // Append the episode div to the container
    displayContainer.appendChild(episodeDiv);
  });
}catch (error) {
  console.log('Error:', error);
}
};
// //select shows
const showlist = document.getElementById('showlist');


var displayContainer = document.getElementById("grid");
displayContainer.innerHTML = ""

 async function getShowdata(){
  try {
   
  const episodes = await getAllEpisodes();
  displayContainer.innerHTML = ""
  // Get the selected option
  var selectedOption = showlist.options[showlist.selectedIndex];
  if(id)
  {
    var selectedData = id;
  }else{
     var selectedData = selectedOption.value;
  }
 

  if(selectedData == 'allshows'){
    document.getElementById('episodeslist').innerHTML = '';
   return displayEpisodes();
  }
  
  const response = await fetch(`https://api.tvmaze.com/shows/${selectedData}/episodes`);
  const ShowfilteredData = await response.json();

  const totalData = document.getElementById("totalData");
  
  totalData.innerHTML = "";

  totalData.innerHTML = `Displaying ${ShowfilteredData.length} / ${ShowfilteredData.length} episodes`;
  
  const selectepisodeElement = document.getElementById('episodeslist');
 

  selectepisodeElement.innerHTML = "";
   // Create default option

   const defaultOption = document.createElement('option');
   defaultOption.value = 'all';
   defaultOption.text = 'All Episodes';
   selectepisodeElement.appendChild(defaultOption);
   //episode list
  ShowfilteredData.forEach(item => {
    selectvalue = `S${item.season}E${item.number} - ${item.name}`; 
    const option = document.createElement('option');
    option.value = selectvalue;
    option.text = selectvalue;
    selectepisodeElement.appendChild(option);
  });

  ShowfilteredData.forEach((episode) => {
 
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

    let season = episode.season < 10 ? "0"+episode.season : episode.season; 
    let number = episode.number < 10 ? "0"+episode.number : episode.number; 
    titleHeading.textContent = `${episode.name} - S${season}E${number}`;
 
   if (episode.image) {
    image.src = episode.image.medium;
  } else {

    fetch('https://picsum.photos/200')
      .then(response => {
    
        image.src = response.url;

       
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }


    summaryParagraph.innerHTML = episode.summary;
   


    // Append the elements to the episode div
    episodeDiv.appendChild(heading);
    episodeDiv.appendChild(BoxImg);
    episodeDiv.appendChild(contentDiv);

    // Append the episode div to the container
    displayContainer.appendChild(episodeDiv);
  });
}catch (error) {
  console.log('Error:', error);
}
};

window.onload = displayEpisodes;
