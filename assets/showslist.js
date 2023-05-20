
async function displayShows() {
    // Get the container element where the content will be displayed
    const container = document.getElementById('episodegrid');
    

  
    //  // Create default option
    //  const selectElement = document.getElementById('episodeslist');
    //  const defaultOption = document.createElement('option');
    //  defaultOption.value = 'all';
    //  defaultOption.text = 'All Episodes';
    //  selectElement.appendChild(defaultOption);
  
     const response = await fetch(`https://api.tvmaze.com/shows?country=US`);
      const Showlist = await response.json();
   // console.log(Showlist);
    // Iterate through each episode
     Showlist.forEach((episode) => {
      // Create the elements
      const episodeDiv = document.createElement('div');
      episodeDiv.classList.add("episodebox"); 
      episodeDiv.setAttribute('href', `episodes.html?id=${episode.id}`);
      episodeDiv.setAttribute('data-id',episode.id);
     // displayEpisodes(episode.id) 
      const titleHeading = document.createElement('h1');
     
    
      const contentDiv = document.createElement('div');
      contentDiv.classList.add("episodecontent");
   
      const imagediv = document.createElement('div');
      imagediv.classList.add("imgclass");
      const image = document.createElement('img');
      image.style.width = "250px"
      image.style.height = "150px"
      imagediv.append(image);
      contentDiv.append(imagediv);
      const paragraphdiv = document.createElement('div');
      paragraphdiv.classList.add("paragraphclass");
      const summaryParagraph = document.createElement('p');
      paragraphdiv.append(summaryParagraph);
      contentDiv.append(paragraphdiv);//text
      DetailsDiv  = document.createElement('div');
      DetailsDiv.classList.add("box-details");
      contentDiv.append(DetailsDiv);
   
    //genres
    DetailsDiv.innerHTML = `   <p>Rated : ${episode.rating.average}</p><br>
    <p>Generes : ${episode.genres}</p><br>
    <p>Status :  ${episode.status}</p><br>
    <p>Runtime :  ${episode.runtime} </p><br>`;
       
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
      //summaryParagraph.innerHTML = episode.summary;
      episode_summary = episode.summary.trim().split(' ')
      if(episode_summary.length > 85){
   
      summaryParagraph.innerHTML = episode_summary.slice(0, 85).join(' ') + '...';
      }else{
        summaryParagraph.innerHTML = episode.summary
      }
     
      // Append the elements to the episode div
      episodeDiv.appendChild(titleHeading);
      //episodeDiv.appendChild(BoxImg);
      episodeDiv.appendChild(contentDiv);
  
      // //show list
  
      const showselect = document.getElementById('showlist');
     
     
      showselect.innerHTML = "";
       // Create default option
    
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
  
    //    var selectedOption = showselect.options[showselect.selectedIndex];
    //    var selectedData = selectedOption.value;
    //    if(selectedData != 'allshows'){
    //     episodes.forEach(episode => {
    //       titlelist = `S${episode.season}E${episode.number} - ${episode.name}`; 
    //       var option = document.createElement("option");
    //       option.value = titlelist;
    //       option.textContent = titlelist;
    //       selectElement.appendChild(option);
    //     });
    //   }
   
  
      // Append the episode div to the container
      container.appendChild(episodeDiv);
      
      episodeDiv.addEventListener('click', function() {
        window.location.href = episodeDiv.getAttribute('href');
      });
  
    });
  }

  // //select shows
const showlist = document.getElementById('showlist');

// Get reference to the container where the selected data will be displayed
var displayContainer = document.getElementById("episodegrid");

// Add event listener to the select element
 showlist.addEventListener('change', selectShowdata);
//selectElement.addEventListener("change", function() {
 async function selectShowdata(){
  try {
    displayContainer.innerHTML = "";
  // Get the selected option
  var selectedOption = showlist.options[showlist.selectedIndex];
  
     var selectedData = selectedOption.value;


  //console.log(selectedData);
  if(selectedData == 'allshows'){
 
   return displayShows();
  }

  const response = await fetch(`https://api.tvmaze.com/shows?country=US`);
  //const response = await fetch(`https://api.tvmaze.com/shows/${selectedData}?country=US`);
  const SelectShowlist = await response.json();

  var filteredShowData = SelectShowlist.filter(function(item) {
   
     return item.id == selectedData;
   });
   

   displayContainer.innerHTML = "";
   filteredShowData.forEach((episode) => {
    // Create the elements
    const episodeDiv = document.createElement('div');
    episodeDiv.classList.add("episodebox"); 
    episodeDiv.setAttribute('href', `episodes.html?id=${episode.id}`);
    episodeDiv.setAttribute('data-id',episode.id);
   // displayEpisodes(episode.id) 
    const titleHeading = document.createElement('h1');
   
  
    const contentDiv = document.createElement('div');
    contentDiv.classList.add("episodecontent");
 
    const imagediv = document.createElement('div');
    imagediv.classList.add("imgclass");
    const image = document.createElement('img');
    image.style.width = "250px"
    image.style.height = "150px"
    imagediv.append(image);
    contentDiv.append(imagediv);
    const paragraphdiv = document.createElement('div');
    paragraphdiv.classList.add("paragraphclass");
    const summaryParagraph = document.createElement('p');
    paragraphdiv.append(summaryParagraph);
    contentDiv.append(paragraphdiv);//text
    DetailsDiv  = document.createElement('div');
    DetailsDiv.classList.add("box-details");
    contentDiv.append(DetailsDiv);
 
  //genres
  DetailsDiv.innerHTML = `   <p>Rated : ${episode.rating.average}</p><br>
  <p>Generes : ${episode.genres}</p><br>
  <p>Status :  ${episode.status}</p><br>
  <p>Runtime :  ${episode.runtime} </p><br>`;
     
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
    //summaryParagraph.innerHTML = episode.summary;
    episode_summary = episode.summary.trim().split(' ')
    if(episode_summary.length > 85){
 
    summaryParagraph.innerHTML = episode_summary.slice(0, 85).join(' ') + '...';
    }else{
      summaryParagraph.innerHTML = episode.summary
    }
   
    // Append the elements to the episode div
    episodeDiv.appendChild(titleHeading);
    //episodeDiv.appendChild(BoxImg);
    episodeDiv.appendChild(contentDiv);

    // Append the episode div to the container
    displayContainer.appendChild(episodeDiv);
    
    episodeDiv.addEventListener('click', function() {
      window.location.href = episodeDiv.getAttribute('href');
    });

  });
}catch (error) {
  console.log('Error:', error);
}
};

//search
document.getElementById('searchShow').addEventListener('input', search);

// Function to handle search
async function search() {
  var query = document.getElementById('searchShow').value.toLowerCase();
  try {
  const SelectShowlist = await fetch(`https://api.tvmaze.com/shows?country=US`);
  const Showlist = await SelectShowlist.json();
  var filteredData =  Showlist.filter(function (item) {
    return item.name.toLowerCase().includes(query) || item.summary.toLowerCase().includes(query);
  });

  var searchResults = document.getElementById('episodegrid');
  //searchResults.innerHTML = generateCards(filteredData);
  //console.log(filteredData);
  searchResults.innerHTML = ""
  const totalData = document.getElementById("totalData");
  
  totalData.innerHTML = "";

  totalData.innerHTML = `Displaying ${filteredData.length} / ${Showlist.length} Shows`;
 
  filteredData.forEach((episode) => {
    // Create the elements
    const episodeDiv = document.createElement('div');
    episodeDiv.classList.add("episodebox"); 
    episodeDiv.setAttribute('href', `episodes.html?id=${episode.id}`);
    episodeDiv.setAttribute('data-id',episode.id);
   // displayEpisodes(episode.id) 
    const titleHeading = document.createElement('h1');
   
  
    const contentDiv = document.createElement('div');
    contentDiv.classList.add("episodecontent");
 
    const imagediv = document.createElement('div');
    imagediv.classList.add("imgclass");
    const image = document.createElement('img');
    image.style.width = "250px"
    image.style.height = "150px"
    imagediv.append(image);
    contentDiv.append(imagediv);
    const paragraphdiv = document.createElement('div');
    paragraphdiv.classList.add("paragraphclass");
    const summaryParagraph = document.createElement('p');
    paragraphdiv.append(summaryParagraph);
    contentDiv.append(paragraphdiv);//text
    DetailsDiv  = document.createElement('div');
    DetailsDiv.classList.add("box-details");
    contentDiv.append(DetailsDiv);
 
  //genres
  DetailsDiv.innerHTML = `   <p>Rated : ${episode.rating.average}</p><br>
  <p>Generes : ${episode.genres}</p><br>
  <p>Status :  ${episode.status}</p><br>
  <p>Runtime :  ${episode.runtime} </p><br>`;
     
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
   // summaryParagraph.innerHTML = episode.summary;
   episode_summary = episode.summary.trim().split(' ')
   if(episode_summary.length > 85){

   summaryParagraph.innerHTML = episode_summary.slice(0, 85).join(' ') + '...';
   }else{
     summaryParagraph.innerHTML = episode.summary
   }
  

    // Append the elements to the episode div
    episodeDiv.appendChild(titleHeading);
    //episodeDiv.appendChild(BoxImg);
    episodeDiv.appendChild(contentDiv);

    // Append the episode div to the container
    displayContainer.appendChild(episodeDiv);
    
    episodeDiv.addEventListener('click', function() {
      window.location.href = episodeDiv.getAttribute('href');
    });

  });
  } catch (error) {
    console.error('Error:', error);
  }
  
}
  displayShows();