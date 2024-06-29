console.log("start");
let currentsong = new Audio();
let songs;

// ---------- time converter --------------------
function formatTime(seconds) {
  // Calculate the minutes and remaining seconds

  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  // Pad the minutes and seconds with leading zeros if necessary
  const minutesStr = minutes.toString().padStart(2, "0");
  const secondsStr = remainingSeconds.toString().padStart(2, "0");

  // Return the formatted time string
  return `${minutesStr}:${secondsStr}`;
}

// -----------------play music function-------------------

const playmusic = (track) => {
  // let audio = new Audio("/spo/songs/" + track);
  currentsong.src = "/spo/songs/" + track;
  console.log(track);
  console.log("123");

  currentsong.play();
  document.querySelector(".play").src = "pause.svg";
  // console.log(track);
  document.querySelector(".songinfo").innerHTML = track.split(".mp3")[0];
  // const ball = document.querySelector('.ball');
  // document.querySelector(".song-name").style.color = "green";

  // ball.style.left = "-43%";
};

async function getsongs() {
  let a = await fetch("http://127.0.0.1:3000/spo/songs/");
  let response = await a.text();
  console.log(response);
  let div = document.createElement("div");
  div.innerHTML = response;
  //tds
  let tds = div.getElementsByTagName("td");
  //   console.log(tds);
  // as
  let as = div.getElementsByTagName("a");
  //   console.log(as);
  songs = [];
  for (let i = 0; i < as.length; i++) {
    const element = as[i];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("/songs/")[1]);
    }
  }
  //   console.log(songs);
  return songs;
}

async function main() {
  let songs = await getsongs();
  console.log(songs);

  // currentsong.src=songs[0];
  // playmusic(currentsong);
  // var audio = new Audio(songs[2]);
  // audio.play();
  // console.log(songs);
  let songul = document
    .querySelector(".songlist")
    .getElementsByTagName("ul")[0];

  for (const song of songs) {
    songul.innerHTML =
      songul.innerHTML +
      `
    <li class="flex song-box">
                <div>
                  <img class="music-img" src="music.svg" alt="" />
                </div>
                <div class="info">
                  <div class="song-name">${song.replaceAll("%20", " ")}</div>
                  <div class="song-artist">jatin</div>
                </div>
                
                <img class="play-img"src="play.svg" alt="" />
                <!-- <div class="info">PLAY NOW</div> -->
    </li>`;
  }

  //attach th event listener to each song
  Array.from(
    document.querySelector(".songlist").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", (element) => {
      // console.log(e.querySelector(".info").firstElementChild.innerHTML);
      playmusic(e.querySelector(".info").firstElementChild.innerHTML);
      // document.querySelector(".ball").style.left=((currentsong.currentTime/currentsong.duration)*100-43) + "%";
      

    
     

     

     
    });
  });

  currentsong.src = "/spo/songs/" + songs[0];

  currentsong.addEventListener("timeupdate", () => {
    // console.log(currentsong.currentTime, currentsong.duration);
    document.querySelector(".songtime").innerHTML =
      formatTime(currentsong.currentTime) +
      "/" +
      formatTime(currentsong.duration);
    const ball = document.querySelector(".ball");
    let b = (currentsong.currentTime / currentsong.duration) * 100;
    // console.log(b);
    ball.style.left = (b)+ "%";
  });
}

// -----------------------PLAY AND PAUSE BUTTON IN PLAY BAR----------------------
document.querySelector(".play").addEventListener("click", (e) => {
  if (currentsong.paused) {
    currentsong.play();
    document.querySelector(".play").src = "pause.svg";
  } else {
    currentsong.pause();
    document.querySelector(".play").src = "play.svg";
  }
});

document.querySelector(".scale").addEventListener("click", (e) => {
  // console.log(e);

  let percent =
    (e.offsetX / e.target.getBoundingClientRect().width ) * 100;
  document.querySelector(".ball").style.left = percent+ "%";
  currentsong.currentTime = (currentsong.duration * (percent )) / 100;
});

// ------------------------hamburger icon /menu icon in media file ----------------------
document.querySelector(".ham").addEventListener("click", (e) => {
  document.querySelector(".left").style.left = "0%";
  document.querySelector(".left").style.width = "60%";
});
document.querySelector(".close").addEventListener("click", (e) => {
  document.querySelector(".left").style.left = "-100%";
  document.querySelector(".left").style.width = "60%";
});

// -------------------------------------------------------------------------------------------
// ------------------PREV SONG---------------------------------
document.querySelector(".prevsong").addEventListener("click", (e) => {
  // console.log(currentsong.src);
  let index = songs.indexOf(currentsong.src.split("/songs/")[1]);
  // console.log(currentsong.src.split("/songs/")[1]);
  console.log(index);
  if (index >= 1) {
    playmusic(songs[index - 1]);
  }
});
// ------------------next SONG---------------------------------
document.querySelector(".nextsong").addEventListener("click", (e) => {
  let index = songs.indexOf(currentsong.src.split("/songs/")[1]);
  // console.log(currentsong.src.split("/songs/")[1]);
  // console.log(index);
  playmusic(songs[index + 1]);
});
// --------------------------------------------
//-------------------------------------VOLUME-------------------------------

document.querySelector(".volume").addEventListener('mouseenter', () => {
  document.querySelector(".range").style.display = "block";
  
});
document.querySelector(".volume").addEventListener("mouseleave", () => {
  document.querySelector(".range").style.display = "none";
  
});

document.querySelector(".range").addEventListener("change", (e) => {
  console.log(e.target.value);
  currentsong.volume = parseFloat(e.target.value)/100;


});


main();
