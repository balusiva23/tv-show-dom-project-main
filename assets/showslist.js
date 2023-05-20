
async function displayShows() {
 
    const container = document.getElementById('episodegrid');
    const response = await fetch(`https://api.tvmaze.com/shows?country=US`);
      const Showlist = await response.json();

     Showlist.forEach((episode) => {
 
      const episodeDiv = document.createElement('div');
      episodeDiv.classList.add("episodebox"); 
      episodeDiv.setAttribute('href', `episodes.html?id=${episode.id}`);
      episodeDiv.setAttribute('data-id',episode.id);
  
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
 
      let season = episode.season < 10 ? "0"+episode.season : episode.season; 
      let number = episode.number < 10 ? "0"+episode.number : episode.number; 
      titleHeading.textContent = `${episode.name} `;//- S${season}E${number}
      if (episode.image.medium) {
        image.src = episode.image.medium;
      } else {
        // Set alternative image source
        image.src = "https://dummyimage.com/600x400/000/fff";
      }
  
      episode_summary = episode.summary.trim().split(' ')
      if(episode_summary.length > 85){
   
      summaryParagraph.innerHTML = episode_summary.slice(0, 85).join(' ') + '...';
      }else{
        summaryParagraph.innerHTML = episode.summary
      }
     
      episodeDiv.appendChild(titleHeading);
   
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
       
        const option = document.createElement('option');
        option.value = item.id;
        option.text = item.name;
       
        showselect.appendChild(option);
      });
  
      container.appendChild(episodeDiv);
      
      episodeDiv.addEventListener('click', function() {
        window.location.href = episodeDiv.getAttribute('href');
      });
  
    });
  }

  // //select shows
const showlist = document.getElementById('showlist');
var displayContainer = document.getElementById("episodegrid");
 showlist.addEventListener('change', selectShowdata);
 async function selectShowdata(){
  try {
    displayContainer.innerHTML = "";
  var selectedOption = showlist.options[showlist.selectedIndex];
  
     var selectedData = selectedOption.value;
  if(selectedData == 'allshows'){
 
   return displayShows();
  }

  const response = await fetch(`https://api.tvmaze.com/shows?country=US`);

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
    titleHeading.textContent = `${episode.name} `;
    if (episode.image.medium) {
      image.src = episode.image.medium;
    } else {
     
      image.src = "https://dummyimage.com/600x400/000/fff";
    }
    episode_summary = episode.summary.trim().split(' ')
    if(episode_summary.length > 85){
 
    summaryParagraph.innerHTML = episode_summary.slice(0, 85).join(' ') + '...';
    }else{
      summaryParagraph.innerHTML = episode.summary
    }
   
    episodeDiv.appendChild(titleHeading);;
    episodeDiv.appendChild(contentDiv);
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

// Search shows
async function search() {
  var query = document.getElementById('searchShow').value.toLowerCase();
  try {
  const SelectShowlist = await fetch(`https://api.tvmaze.com/shows?country=US`);
  const Showlist = await SelectShowlist.json();
  var filteredData =  Showlist.filter(function (item) {
    return item.name.toLowerCase().includes(query) || item.summary.toLowerCase().includes(query);
  });

  var searchResults = document.getElementById('episodegrid');
  searchResults.innerHTML = ""
  const totalData = document.getElementById("totalData");
  
  totalData.innerHTML = "";

  totalData.innerHTML = `Displaying ${filteredData.length} / ${Showlist.length} Shows`;
 
  filteredData.forEach((episode) => {
  
    const episodeDiv = document.createElement('div');
    episodeDiv.classList.add("episodebox"); 
    episodeDiv.setAttribute('href', `episodes.html?id=${episode.id}`);
    episodeDiv.setAttribute('data-id',episode.id);

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
     
    let season = episode.season < 10 ? "0"+episode.season : episode.season; 
    let number = episode.number < 10 ? "0"+episode.number : episode.number; 
    titleHeading.textContent = `${episode.name} `;
    if (episode.image.medium) {
      image.src = episode.image.medium;
    } else {

      image.src = "https://dummyimage.com/600x400/000/fff";
    }

   episode_summary = episode.summary.trim().split(' ')
   if(episode_summary.length > 85){

   summaryParagraph.innerHTML = episode_summary.slice(0, 85).join(' ') + '...';
   }else{
     summaryParagraph.innerHTML = episode.summary
   }
    episodeDiv.appendChild(titleHeading);
    episodeDiv.appendChild(contentDiv);
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