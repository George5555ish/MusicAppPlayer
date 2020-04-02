
//Variables

const playerContainer = document.getElementById('player-container');
const playBtn = document.getElementById('play-button');
const prevBtn = document.getElementById('backward-button');
const nextBtn = document.getElementById('forward-button');
const stopBtn = document.getElementById('stop-button');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('song-title');
const author = document.getElementById('currentSongAuthor');

const spinnerImage = document.getElementById('spinner');
const mainImage = document.getElementById('cover');
const moreControls = document.getElementById('more-controls');


//Song Titles
const songs = [
'Track 1', 'Track 2', 'Track 3','Track 4','Track 5', 'Track 6'
];

const authorArray = [
  'Author 1', 'Author 2', 'Author 3','Author 4','Author 5', 'Author 6'
  ];




// Track SongIndex


let songIndex = 0;
let authorIndex = 0;
let changeIndex = 0;

//change index increments and changes the class based on the index value.
//which in turn changes the box shadow and the svg color together.

//First, Load the song and its details.
loadSong(songs[songIndex], authorArray[authorIndex]);


function loadSong(song, authorPh){
  title.innerText = song;
  author.innerText = authorPh;
  audio.src = `sounds/${song}.mp3`;
  mainImage.src = `${song}.jpg`;
  spinnerImage.src = `${song}.jpg`;
  
}

//Play Song

function playSong(index){
  playerContainer.classList.add('play');
  playBtn.querySelector('span.major').classList.remove('fa-play');
  playBtn.querySelector('span.major').classList.add('fa-pause');

  audio.play();

 

}

//Pause Song
function pauseSong(){
  playerContainer.classList.remove('play');
  playBtn.querySelector('span.major').classList.add('fa-play');
  playBtn.querySelector('span.major').classList.remove('fa-pause');


  audio.pause();
}

//Prev song
function prevSong(){
  songIndex--;
  authorIndex--;
  changeIndex--;

  if (songIndex < 0 && authorIndex < 0){
    songIndex = songs.length - 1;
    authorIndex = authorArray.length - 1;
  }


  if (changeIndex < 0){
    changeIndex = songs.length - 1;
  }

  loadSong(songs[songIndex], authorArray[authorIndex]);
  playSong(songIndex);

  console.log(playerContainer.classList + songIndex);

}

//Next song
function nextSong(){
  songIndex++;
  authorIndex++;
  changeIndex++;

  if (songIndex > songs.length -1  && authorIndex > authorArray.length - 1){
    songIndex = 0;
    authorIndex = 0;
  }


  //This is the small challenge. The change index is incrementing fine
  //but the class is not been applied once I loop through the songs.
  if (changeIndex >=2 && changeIndex <= songs.length - 1){
    console.log(changeIndex - 1);
    playerContainer.classList.remove('change'+ changeIndex - 1);
    playerContainer.classList.add('change'+ changeIndex);
  }

  if (changeIndex > songs.length - 1){
    playerContainer.classList.remove('change'+changeIndex - 1);

    //I made it change back to zero as recommended.
    changeIndex = 0;

  

  }

 


  //Just to check the changeIndex as it increments
  console.log(changeIndex);

  //Then load and play next song when button is clicked.
  loadSong(songs[songIndex], authorArray[authorIndex]);
  playSong(songIndex);

  //should this part be removed??
  playerContainer.classList.add('change'+ changeIndex);
  


}


//Update progress bar with time.

function updateProgress(e){
const {duration, currentTime} = e.srcElement;
// console.log(duration, currentTime);

const progressPercent = (currentTime / duration) * 100;

progress.style.width = progressPercent + "%";


}


function setProgress(e){
  const width = this.clientWidth;

  const clickOffset = e.offsetX;
  const duration = audio.duration;


  audio.currentTime = (clickOffset / width) * duration;
  
}

function stopSong(){
  pauseSong();
  audio.currentTime = 0;


}


// function removeOtherClasses(index){
  



  
//   }
 

//Event listeners

playBtn.addEventListener('click', () =>{
  const isPlaying = playerContainer.classList.contains('play');

  if(isPlaying){
    pauseSong();
  }
  else{
    playSong();
  }
});

prevBtn.addEventListener('click', prevSong);

nextBtn.addEventListener('click', nextSong);



audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

stopBtn.addEventListener('click', stopSong);
moreControls.addEventListener('click',()=> {

  alert('Add more functionality here!');
})

