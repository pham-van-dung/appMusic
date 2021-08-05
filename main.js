

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})


let allMusic = [
  {
    name: "Cafe không đường",
    artist: "Hương Ly",
    img: "img/Cafe-khong-duong.jpg",
    src: "Cafe-khong-duong"
  },
  {
    name: "Chúng ta của hiện tại",
    artist: "Sơn Tùng MTP",
    img: "img/Chung-ta-cua-hien-tai.jpg",
    src: "Chung-Ta-Cua-Hien-Tai-Son-Tung-M-TP"
  },
  {
    name: "Cô đơn dành cho ai",
    artist: "Hương Ly",
    img: "img/Co-don-danh-cho-ai.jpg",
    src: "Co-don-danh-cho-ai"
  },
  {
    name: "Em thề đấy",
    artist: "Hương Ly",
    img: "img/Em-the-day.jpg",
    src: "Em-the-day"
  },
  {
    name: "Hạ vương còn nắng",
    artist: "Hương Ly",
    img: "img/Ha-vuong-con-nang.jpg",
    src: "Ha-con-vuong-nang"
  },
  {
    name: "Hôm nay em cưới rồi",
    artist: "Hương Ly",
    img: "img/Hom-nay-em-cuoi-roi.jpg",
    src: "Hom-nay-em-cuoi-roi"
  },
  {
    name: "Muộn rồi mà sao còn",
    artist: "Sơn Tùng MTP",
    img: "img/Muon-roi-ma-sao-con.jpg",
    src: "Muon-roi-ma-sao-con"
  },
  {
    name: "Vách ngọc ngà",
    artist: "Hương Ly",
    img: "img/Vach-ngoc-nga.jpg",
    src: "Vach-ngoc-nga"
  },
]

const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
mainAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector('.play-pause'),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
progressBar= wrapper.querySelector(".progress-bar"),
progressArea = wrapper.querySelector(".progress-area"),
indexCurrent = wrapper.querySelector(".index-current"),
musicList = wrapper.querySelector(".music-list"),
showMoreBtn = wrapper.querySelector("#more-music"),
hideMoreBtn = musicList.querySelector("#close");

console.log(wrapper);



var musicIndex = 1;
window.addEventListener("load", ()=>{
  loadMusic(musicIndex)
  playingNow()
})

// load music functions
function loadMusic(indexNumb){
  musicName.innerText = allMusic[indexNumb - 1].name;
  musicArtist.innerText = allMusic[indexNumb - 1].artist;
  musicImg.src = allMusic[indexNumb - 1].img
  // musicImg.src = `img/${allMusic[indexNumb - 1].img}.jpg`
  mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`
  indexCurrent.innerText = `${indexNumb} / ${allMusic.length}`
}
console.log(musicImg);
console.log(mainAudio.src);


// play Mucsic function
function playMusic(){
  wrapper.classList.add("paused");
  playPauseBtn.querySelector("i").innerText = "pause"
  mainAudio.play()
}

// pause Mucsic function
function pauseMusic(){
  wrapper.classList.remove("paused");
  playPauseBtn.querySelector("i").innerText = "play_arrow"
  mainAudio.pause()
}

// play or music button event
playPauseBtn.addEventListener("click", ()=>{
  const isMusicPaused = wrapper.classList.contains("paused")
  isMusicPaused ? pauseMusic() : playMusic()
})


function nextMusic(){
  musicIndex++;
  if(musicIndex > allMusic.length){
    musicIndex = 1;
  }
  loadMusic(musicIndex);
  playMusic()
}
function prevMusic(){
  if(!(mainAudio.currentTime > 3)){
    musicIndex--;
    if(musicIndex < 1){
      musicIndex = allMusic.length
    }
  }
  loadMusic(musicIndex);
  playMusic()
}
nextBtn.addEventListener("click", ()=>{
  nextMusic()
})
prevBtn.addEventListener("click", ()=>{
  prevMusic()
})
mainAudio.addEventListener("timeupdate", (e)=>{
  const currentTime = e.target.currentTime;
  // console.log(currentTime);
  const duration = e.target.duration
  // console.log(e.target.duration);
  let progressWidth = (currentTime / duration) * 100
  progressBar.style.width = `${progressWidth}%`

  let musicCurrentTime = wrapper.querySelector(".current"),
  musicDuration = wrapper.querySelector(".duration")

  mainAudio.addEventListener("loadeddata", ()=>{

    let audioDuration = mainAudio.duration
    let totalMin = Math.floor(audioDuration / 60)
    let totalSec = Math.floor(audioDuration % 60)
    if(totalSec < 10 ){
      totalSec = `0${totalSec}`
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`;


  })
    let currentMin = Math.floor(currentTime / 60)
    let currentSec = Math.floor(currentTime % 60)
    if(currentSec < 10 ){
      currentSec = `0${currentSec}`
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
})

progressArea.addEventListener("click", (e)=>{
  let progressWidthval = progressArea.clientWidth
  let clickedOffSetX = e.offsetX
  let songDuration = mainAudio.duration
  
  mainAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration
  console.log(progressWidthval);
  console.log(clickedOffSetX);
  console.log(songDuration);
  console.log(mainAudio.currentTime);
  playMusic()
})


const repeatBtn = wrapper.querySelector("#repeat-plist");
$('#repeat-plist').tooltip({title: 'Bật phát lại một bài'})
let getText = repeatBtn.innerText= "repeat"
// let getTitle = repeatBtn.setAttribute = "bật phát lại 1 bài"
repeatBtn.addEventListener("click", ()=>{
  let getText = repeatBtn.innerText

  switch(getText){
    case "repeat":
      repeatBtn.innerText = "repeat_one"
      $('#repeat-plist').tooltip('dispose').tooltip({title: 'Bật phát lại tất cả'}).tooltip('show');
    break;
    case "repeat_one":
      repeatBtn.innerText = "repeat_on"
      $('#repeat-plist').tooltip('dispose').tooltip({title: 'Bật phát ngẫu nhiên'}).tooltip('show');
      break
    case "repeat_on":
      repeatBtn.innerText = "shuffle"
      $('#repeat-plist').tooltip('dispose').tooltip({title: 'Tắt phát lại'}).tooltip('show');
      break
    case "shuffle":
      repeatBtn.innerText = "repeat"
      $('#repeat-plist').tooltip('dispose').tooltip({title: 'Bật phát lại một bài'}).tooltip('show');
      break
}
})

mainAudio.addEventListener("ended", ()=>{
  let getText = repeatBtn.innerText
  switch(getText){
    case "repeat":
      
      if(musicIndex !== allMusic.length){
        nextMusic();
      }else{
        musicIndex = 1;
        mainAudio.currentTime = 0
        progressBar.style.width = 0
        loadMusic(musicIndex)
        pauseMusic()
        
      }
      break
    case "repeat_one":
     mainAudio.currentTime = 0
     loadMusic(musicIndex)
     playMusic()
     break
    case "repeat_on":
      nextMusic()
      break
    case "shuffle":
      let randIndex = Math.floor((Math.random() * allMusic.length) + 1)
      do{
        randIndex = Math.floor((Math.random() * allMusic.length) + 1)
        }while(musicIndex == randIndex);
        musicIndex = randIndex
        loadMusic(musicIndex)
        playMusic()
      break
}
})


showMoreBtn.addEventListener("click", ()=>{
  musicList.classList.toggle("show")
})
hideMoreBtn.addEventListener("click", ()=>{
  showMoreBtn.click()
})

const ulTag = wrapper.querySelector("ul")
for(let i = 0; i < allMusic.length; i++) {
  let liTag = `
  <li li-index="${i + 1}" class="d-flex justify-content-between align-items-center">
    <div class="row-1">
      <span>${allMusic[i].name}</span>
      <p>${allMusic[i].artist}</p>
    </div>
    <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
    <span id="${allMusic[i].src}" class="audio-duration">3:53</span>
  </li>`

  ulTag.insertAdjacentHTML("beforeend",liTag)
  let liAudioTagDuaration = ulTag.querySelector(`#${allMusic[i].src}`)
  
  let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`)
  
  liAudioTag.addEventListener("loadeddata", ()=>{
    let audioDuration = liAudioTag.duration
    let totalMin = Math.floor(audioDuration / 60)
    let totalSec = Math.floor(audioDuration % 60)
    if(totalSec < 10 ){
      totalSec = `0${totalSec}`
    }
    liAudioTagDuaration.innerText = `${totalMin}:${totalSec}`;
    liAudioTagDuaration.setAttribute("t-duration", `${totalMin}:${totalSec}`)
  })
}

const allLiTags = ulTag.querySelectorAll("li")

function playingNow(){
  for (let j = 0; j < allLiTags.length; j++){
    let audioTag = allLiTags[j].querySelector(".audio-duration")
    console.log(audioTag);
    if(allLiTags[j].classList.contains("playing")){
      allLiTags[j].classList.remove("playing")
      let adDuration = audioTag.getAttribute("t-duration")
      audioTag.innerText = adDuration
    }
    if(allLiTags[j].getAttribute("li-index") == musicIndex){

      allLiTags[j].classList.add("playing")
      audioTag.innerText = "Đang phát"
    }
    allLiTags[j].setAttribute("onclick", "clicked(this)")
  }
}

function clicked(e){
  let getLiIndex = e.getAttribute("li-index")
  musicIndex = getLiIndex;
  loadMusic(musicIndex)
  playMusic()
  playingNow()
}