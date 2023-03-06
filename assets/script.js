
import playList from './playList.js';

  const language = [
    {titleChecked: 'Выберите отображаемые элементы:',
     lang: 'Выберите язык:',
     player: 'Аудиоплеер:',
     weather: 'Погода:',
     quotes: 'Цитаты:',
     links: 'Список ссылок:',
     time: 'Время:',
     greeting: 'Приветсвие:',
     date: 'Дата:',
     quote: 'цитата',
     author: 'автор',
     greetings: ['Доброй ночи,', 'Доброго утра,','Доброго дня,','Доброго вечера,'],
     blockOfWeather: ['Скорость Ветра', 'Влажность', 'м/с', 'ru'],
     dateOptions: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
     dateLang: 'ru-Ru',
     tagsOfImages: 'Введите теги для фоновых изображений:',
     srcOfImages: 'Выберите ресурс с фоновыми изображениями:',
     acceptButton: 'применить',
     city: 'Минск',
     wеatherError: 'населенный пункт не найден',
     quotePath: './assets/quote/rus.json',
     nameDefault: '[введите имя]',
     linksButton : 'Список ссылок',
     settingsTitle: 'Настройки приложения',
     buttonNewLink: 'Новая ссылка',
     linkCreateButton: 'Создать',
     linkBackButton: 'Отменить',
     linkNameDefault: 'введите название',
     linkHrefDefault: 'введите адрес',
     linkEditButton: 'изменить',
     linkDelButton: 'удалить'
     },

    {titleChecked: 'Select visibile elements:',
    lang: 'Select language:',
    player: 'Player:',
    weather: 'Weather:',
    quotes: 'Quotes:',
    links: 'Links:',
    time: 'Time:',
    greeting: 'Greeting:',
    date: 'Date:',
    quote: 'quote',
    author: 'author',
    greetings: ['Good night,', 'Good Morning,','Good Day,','Good Evening,'],
    blockOfWeather: ['Wind Speed', 'Humidity', 'm/s', 'en'],
    dateOptions: {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC'},
    dateLang: 'en-En',
    tagsOfImages: 'Select tags for background images:',
    srcOfImages: 'Select a resource with background images:',
    acceptButton: 'accept',
    city: 'Minsk',
    wеatherError: 'city not find',
    quotePath: './assets/quote/eng.json',
    nameDefault: '[enter name]',
    linksButton : 'Links',
    settingsTitle: 'Settings',
    buttonNewLink: 'New Link',
    linkCreateButton: 'Create',
    linkBackButton:  'Back',
    linkNameDefault: 'enter name',
    linkHrefDefault: 'enter link',
    linkEditButton: 'edit',
    linkDelButton: 'delete'
  }
  ]
  let timesOfDay = ['night', 'morning' , 'afternoon', 'evening'];
  
const timeElement = document.querySelector('.time');
const dateElement = document.querySelector('.date');
const greetingElement = document.querySelector('.greeting');
const nameElement = document.querySelector('.name');
const bodyElement = document.querySelector('body');
const sliderPrevElement = document.querySelector('.slide-prev');
const sliderNextElement = document.querySelector('.slide-next');

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const windSpeed = document.querySelector('.wind');
const Humidity = document.querySelector('.humidity');
const cityElement = document.querySelector('.city');
const settings = document.querySelector('.settings') ;
const settingsButton = document.querySelector('.setToggle') ;

const linksPopup = document.querySelector('.linksPopup');
const linksPopupButton = document.getElementById("linksPopupButton")

let isPlay = false;
let numOfImg = getRandomNum();
let curentlanguage = 0;
let curentSrcOfImages = 'git';
let dataOfImg;
let quotesData;
let LinksArr = [];


sliderPrevElement.addEventListener('click', getSlidePrev);
sliderNextElement.addEventListener('click', getSlideNext);

cityElement.addEventListener('change', () => {
  
  localStorage.setItem('city', cityElement.value);
})

function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    timeElement.textContent = currentTime;
    setTimeout(showTime, 1000);
    showDate(date);
    showGreeting(date)
}
showTime();

function showDate(date) {
    dateElement.textContent = date.toLocaleDateString(language[curentlanguage]['dateLang'], language[curentlanguage]['dateOptions']);//currentDate;
}

function getTimeOfDay(hours){
    if (hours<6) return 0
    if (hours<12) return 1
    if (hours<18) return 2
    return 3
}

function timesOfDay2 (){
    const date = new Date();    
    return getTimeOfDay(date.getHours());
}

function showGreeting(date) {
   greetingElement.textContent = language[curentlanguage]['greetings'][getTimeOfDay(date.getHours())]
}

function setLocalStorage() {
    localStorage.setItem('name', nameElement.value);
    localStorage.setItem('lang', curentlanguage);
    localStorage.setItem('player', document.getElementById('player').checked);
    localStorage.setItem('weather', document.getElementById('weather').checked);
    localStorage.setItem('quotes', document.getElementById('quotes').checked);
    localStorage.setItem('links', document.getElementById('links').checked);
    localStorage.setItem('time', document.getElementById('time').checked);
    localStorage.setItem('greeting', document.getElementById('greeting').checked);
    localStorage.setItem('date', document.getElementById('date').checked);
    localStorage.setItem('imgSrc', curentSrcOfImages);
    localStorage.setItem('tags', document.getElementById('tagsOfImages').value);
    // let i = 0;
    
    // LinksArr.forEach(elem, ()=>{
    //   localStorage.setItem(`${i++}`, elem[0]);
    //   console.log(elem)
    //   localStorage.setItem(`${i++}`, elem[1]);
    // })
    // создаём объект
//    const user = { name: 'Ivan', age: 23 };
// преобразовываем объект в строку и сохраняем в localStorage
   localStorage.setItem('LinksArr', JSON.stringify(LinksArr));
   console.log(LinksArr)
   console.log(JSON.stringify(LinksArr))
// извлекаем данные и преобразовываем в объект
//const savedUser = JSON.parse(localStorage.getItem('user'));
  }

  function getLocalStorage() {
    if (localStorage.getItem('player') === 'false') {
      document.getElementById('player').removeAttribute('checked');
      playerOnOff()
    }
    if (localStorage.getItem('weather') === 'false') {
      document.getElementById('weather').removeAttribute('checked');
      weatherOnOff()
    }
    if (localStorage.getItem('quotes') === 'false') {
      document.getElementById('quotes').removeAttribute('checked');
      quotesOnOff()
    }
    if (localStorage.getItem('links') === 'false') {
      document.getElementById('links').removeAttribute('checked');
      linksOnOff()
    }
    if (localStorage.getItem('time') === 'false') {
      document.getElementById('time').removeAttribute('checked');
      timeOnOff()
    }
    if (localStorage.getItem('greeting') === 'false') {
      document.getElementById('greeting').removeAttribute('checked');
      greetingOnOff()
    }
    if (localStorage.getItem('date') === 'false') {
      document.getElementById('date').removeAttribute('checked');
      dateOnOff()
    }
    if (localStorage.getItem('lang')) {
      document.getElementById('lang').selectedIndex=localStorage.getItem('lang');
      let func = langChange.bind(document.getElementById('lang'));
      func(); 
   }
   if (localStorage.getItem('tags')) {
    document.getElementById('tagsOfImages').value = localStorage.getItem('tags')
  }
   if (localStorage.getItem('imgSrc')) {
    let s = ['git','flickr','unsplash'];
    document.getElementById('srcOfImages').selectedIndex = s.indexOf(localStorage.getItem('imgSrc'));
    let func2 = selectSrcOfImages.bind(document.getElementById('srcOfImages'));
    func2(); 
    acceptBG();
 }
    if (localStorage.getItem('name')) nameElement.value = localStorage.getItem('name')
    else nameElement.setAttribute('placeholder', language[curentlanguage].nameDefault);
    if (localStorage.getItem('city')) {cityElement.value = localStorage.getItem('city')
      getWeather();  
    };

    if (localStorage.getItem('LinksArr')) {LinksArr = JSON.parse(localStorage.getItem('LinksArr'));
    createLinksList();
  }
  }
  
  window.addEventListener('load', getLocalStorage)
  window.addEventListener('beforeunload', setLocalStorage)

  function getRandomNum(max=20) {
    let result =  Math.floor(Math.random() * max)+1;
    return result    
  }

function getSlideNext(){
    numOfImg = numOfImg===20?1:++numOfImg
     setBg();
}

function getSlidePrev(){
    numOfImg = numOfImg===1?20:--numOfImg;
     setBg();
}

 async function getWeather() {  
    const error = document.querySelector('.weather-error');
    try{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityElement.value}&lang=${language[curentlanguage]['blockOfWeather'][3]}&appid=16fa0802d0aea76c2e14dec04c53f35e&units=metric`;
    const res = await fetch(url);
    const data = await res.json(); 
    document.querySelector('.weather-error').textContent = '';
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
    windSpeed.textContent = `${language[curentlanguage]['blockOfWeather'][0]}: ${data.wind.speed}${language[curentlanguage]['blockOfWeather'][2]}`;
    Humidity.textContent = `${language[curentlanguage]['blockOfWeather'][1]}: ${data.main.humidity}%`  //}
    }
    catch(err) {
      temperature.textContent = '---',
      weatherDescription.textContent = '---',
      windSpeed.textContent = '--',
      Humidity.textContent = '--'
      document.querySelector('.weather-error').textContent = language[curentlanguage].wеatherError
    }
  }
  getWeather()

  cityElement.addEventListener('change', () =>  getWeather())
  
  ////-----------------player

let playNum = 0;
let currentVolume;
let currentTime = 0;
let updateTimer;
let mute = 0;
const buttonPlay = document.querySelector('.play');
const buttonNext = document.querySelector('.play-next');
const buttonPrev = document.querySelector('.play-prev');
const buttonVolume = document.querySelector('.volumeOn')
const playListContainer = document.querySelector('.play-list');
let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
const trackName = document.querySelector('.track-name');
const audio = new Audio();

function playAudio() {
  if (!audio.src) audio.src = playList[playNum].src;

  if (this == buttonPlay){
     if (isPlay) audio.pause()
     else audio.play();
     isPlay = 1-isPlay;
    }
    else{
      audio.src = playList[playNum].src;
        if(isPlay) audio.play()
    }

  if (isPlay){
      buttonPlay.classList.add('pause');
      buttonPlay.classList.remove('play');
      document.querySelector('.play-list').children[playNum].classList.add('item-play');
  }
  else{
      buttonPlay.classList.remove('pause');
      buttonPlay.classList.add('play');
      document.querySelector('.play-list').children[playNum].classList.remove('item-play');
    
  }

  trackName.innerHTML = playList[playNum].title;
  updateTimer = setInterval(setUpdate, 1000);
}

buttonVolume.addEventListener('click', () => {
  buttonVolume.classList.toggle('volumeOn');
  buttonVolume.classList.toggle('volumeOff');
  if (buttonVolume.classList.contains('volumeOff')){
    currentVolume = audio.volume;
    mute = 1;
    audio.volume = 0;
  }
  else {
    mute = 0;
    setVolume()
  }
})

audio.addEventListener('ended', playNext);

function createPlayList() {
    for (let key in playList){
        const li = document.createElement('li');
        li.classList.add('play-item');
        li.textContent =  playList[key]['title'] + ': ' + playList[key]['duration'];
        li.setAttribute('Num', key);
        li.addEventListener('click', playOnClick)
        playListContainer.append(li);
    }
    document.querySelector('.play-list').children[playNum].classList.toggle('item-active')
}

function  playNext(){changeSong(playNum==playList.length-1?0:playNum+1)}
function  playPrev(){changeSong(playNum==0?playList.length-1:playNum-1)}
function  playOnClick(){changeSong(Number(this.getAttribute('Num')))}

function  changeSong(numOfSong){  
  document.querySelector('.play-list').children[playNum].classList.toggle('item-active');
  document.querySelector('.play-list').children[playNum].classList.remove('item-play');
  if (numOfSong === playNum) isPlay = 1-isPlay
  else isPlay = 1;
  playNum = numOfSong;
  document.querySelector('.play-list').children[playNum].classList.toggle('item-active');
  playAudio();
}

function setCurrentTime(){
//  console.log(event)
 // if (audio.src){
  let seekto = audio.duration * (seek_slider.value / 100);
  audio.currentTime =  Math.trunc(seekto);//}
}

function setVolume(){
  if (!mute)  audio.volume = volume_slider.value / 100;
}

seek_slider.oninput = setCurrentTime;
volume_slider.addEventListener('input', setVolume)

function setUpdate(){
  let seekPosition = 0;
  if(!isNaN(audio.duration)){
      seekPosition = audio.currentTime * (100 / audio.duration);
      seek_slider.value = seekPosition;

      let currentMinutes = Math.floor(audio.currentTime / 60);
      let currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(audio.duration / 60);
      let durationSeconds = Math.floor(audio.duration - durationMinutes * 60);

      if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
      if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
      if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
      if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

      curr_time.textContent = currentMinutes + ":" + currentSeconds;
      total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

createPlayList();

buttonPlay.addEventListener('click', playAudio);
buttonNext.addEventListener('click', playNext);
buttonPrev.addEventListener('click', playPrev);

////////////////////////////////////// settings

document.getElementById("player").addEventListener('change', playerOnOff)
document.getElementById("weather").addEventListener('change', weatherOnOff)
document.getElementById('quotes').addEventListener('change', quotesOnOff)
document.getElementById('links').addEventListener('change', linksOnOff)
document.getElementById('time').addEventListener('change', timeOnOff)
document.getElementById('greeting').addEventListener('change', greetingOnOff)
document.getElementById('date').addEventListener('change', dateOnOff)
document.getElementById('lang').addEventListener('change', langChange)
document.getElementById('accept').addEventListener('click', acceptBG)
document.getElementById('srcOfImages').addEventListener('change', selectSrcOfImages)



function playerOnOff(){ 
  document.querySelector('.player').classList.toggle('playerHidden')}
function weatherOnOff(){
   document.querySelector('.weather').classList.toggle('weatherHidden')
}
function quotesOnOff(){
  document.querySelector('.quotes').classList.toggle('quotesHidden')
}
function linksOnOff(){
  document.querySelector('.links').classList.toggle('linksHidden')
}
function timeOnOff(){
  document.querySelector('.time').classList.toggle('timeHidden')
}
function greetingOnOff(){
  document.querySelector('.greeting').classList.toggle('greetingHidden')
  document.querySelector('.name').classList.toggle('nameHidden')
}
function dateOnOff(){
  document.querySelector('.date').classList.toggle('dateHidden')
}

function langChange(){
  let languages = ['rus','eng'];
  curentlanguage = languages.indexOf(this.value);
  let translateElements = document.querySelectorAll('[translate]');
  translateElements.forEach(elem => {
    elem.textContent = language[curentlanguage][elem.getAttribute("translate")]
  })
  if (!localStorage.getItem('city'))  cityElement.value = language[curentlanguage].city;
  nameElement.setAttribute('placeholder', language[curentlanguage].nameDefault);
  linkName.setAttribute('placeholder', language[curentlanguage].linkNameDefault);
  linkHref.setAttribute('placeholder', language[curentlanguage].linkHrefDefault);
  getWeather(); 
  getQuotes();
}

function selectSrcOfImages(){
  curentSrcOfImages = this.value;
   if (curentSrcOfImages === 'git') document.getElementById('tagsOfImages').disabled = true
   else document.getElementById('tagsOfImages').removeAttribute('disabled')
}

function acceptBG(){  
  settings.classList.remove('settingsVisible')
  let tags = document.getElementById('tagsOfImages').value;
  if (curentSrcOfImages == 'git' || tags ==''){
    tags = timesOfDay[timesOfDay2()]
 }
  let SrcOfImages = {
    git: `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${tags}/${numOfImg<10?'0'+numOfImg:numOfImg}.jpg')`,
    flickr: `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=82b32a6de93e4301826e53cb94b49155&tags=${tags}&extras=url_l&format=json&nojsoncallback=1` ,
    unsplash: `https://api.unsplash.com/search/photos?page=1&query=${tags}&client_id=S9hlp_3zNum9JqF3z3I5HUpMEqi-yqJ4w9uJDGGnv44&orientation=landscape&per_page=100`
  }
  if (curentSrcOfImages != 'git')  getDataFromSrcOfImages(SrcOfImages[curentSrcOfImages])
  else setBg()

}

async function getDataFromSrcOfImages(curentSrcOfImages) {
  const url = curentSrcOfImages;  //'https://api.unsplash.com/photos/random?orientation=landscape&query=nigth&client_id=S9hlp_3zNum9JqF3z3I5HUpMEqi-yqJ4w9uJDGGnv44';
  const res = await fetch(url);
  dataOfImg = await res.json();
  console.log(dataOfImg);
  setBg()
}

    function setBg(){
       let backgroundPath
      const img = new Image();
      if (curentSrcOfImages === 'git') backgroundPath = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timesOfDay[timesOfDay2()]}/${numOfImg<10?'0'+numOfImg:numOfImg}.jpg`
      if (curentSrcOfImages === 'flickr') backgroundPath = dataOfImg.photos.photo[numOfImg].url_l ;
      if (curentSrcOfImages === 'unsplash') backgroundPath = dataOfImg.results[numOfImg].urls.regular;
      img.src = backgroundPath;
          img.onload = () => {      
            bodyElement.style.backgroundImage = `url(${backgroundPath})`;
          }; 
    }

  settingsButton.addEventListener('click', () => {settings.classList.toggle('settingsVisible')})

    bodyElement.addEventListener('click', function(){
     
    if (!settings.contains(event.target)&& !settingsButton.contains(event.target)) settings.classList.remove('settingsVisible');
    if (!linksPopup.contains(event.target)&& !linksPopupButton.contains(event.target)) linksPopup.classList.remove('linksPopupVisible');
    if (linksPopup.contains(event.target)&& !event.target.classList.contains('editLinkButton'))   document.querySelector('.editLinkPopup').classList.remove('visible')
  })      
       
async function getQuotes() {
   const res = await fetch(language[curentlanguage].quotePath);
   quotesData = await res.json();
   getQuote();
}  

getQuotes()

  document.querySelector('.change-quote').addEventListener('click', getQuote)

  function getQuote(){    
    let num = getRandomNum(quotesData.length);
    document.querySelector('.quote').textContent = quotesData[num].text;
    document.querySelector('.author').textContent = quotesData[num].author;
  }

////////////////// links list

const linksList = document.querySelector('.linksList')
const linkName = document.getElementById('linkName');
const linkHref=  document.getElementById('linkHref');

let linksMainContent = document.querySelector(".linksMainContent");
let linksAddcontent  = document.querySelector(".linksAddcontent");
let NewLinck = document.querySelector('.NewLinck');
let CreateLink = document.querySelector('.CreateLinck');

NewLinck.addEventListener('click', () => {

 // console.log(linkName.value, linkHref.value)
  linksMainContent.classList.add('linksAddVisible');
  linksAddcontent.classList.add('linksAddVisible')
})

function checkLinkEnter(){
  let error = 0;
  if (!linkName.value) {
    linkName.classList.add('linkError');
    error = 1;
 //   console.log(1, linkName.value);
  }else linkName.classList.remove('linkError');

  if (!linkHref.value) { linkHref.classList.add('linkError');
    error = 1;}
  else linkHref.classList.remove('linkError')
  return error;

}

function CreateLinkButton() {


 // console.log(linkName.value, linkHref.value)
  if (!checkLinkEnter()){
    LinksArr.push([linkName.value, linkHref.value])
   // console.log(LinksList);
    linkHref.value = '';
    linkName.value = '';

    createLinksList();
  linksMainContent.classList.remove('linksAddVisible');
  linksAddcontent.classList.remove('linksAddVisible')
  }
}



CreateLink.addEventListener('click', CreateLinkButton)

linksPopupButton.addEventListener('click',() => linksPopup.classList.toggle('linksPopupVisible'));


function createLinksList() {
  linksList.innerHTML = '';

  LinksArr.forEach((link, index) => {
    const button = document.createElement('button')
    // button.innerText = '...';
    button.setAttribute('Num', index);
    button.addEventListener('click', editCurentLink)
    button.classList.add('editLinkButton');

    const li = document.createElement('li');
    li.innerHTML = `<a href="http://${link[1]}"  class="linkOfList" target="_blank">${link[0]}</a>`;
    li.append(button);
    li.setAttribute('Num', index);
    li.classList.add('linksItem');

      // const a = document.createElement('a');
     // li.classList.add('play-item');
      //li.textContent =  playList[key]['title'] + ': ' + playList[key]['duration'];
     // li.setAttribute('Num', index);
    //  li.addEventListener('click', playOnClick)
    linksList.append(li);
  })
 // document.querySelector('.play-list').children[playNum].classList.toggle('item-active')
}

let NumberLink;
function editCurentLink(){
  NumberLink = +this.getAttribute('Num');
  document.querySelector('.editLinkPopup').classList.toggle('visible')
  console.log(event)
}

document.querySelector('.editLinkPopup_del').addEventListener('click', () => {
  LinksArr.splice(NumberLink,1);
  document.querySelector('.editLinkPopup').classList.remove('visible')
  createLinksList();

})

document.querySelector('.editLinkPopup_change').addEventListener('click', () => {
  linksMainContent.classList.add('linksAddVisible');
  linksAddcontent.classList.add('linksAddVisible');
  CreateLink.removeEventListener('click', CreateLinkButton);
  CreateLink.addEventListener('click', changeLink );
  CreateLink.textContent = language[curentlanguage].linkEditButton[0].toUpperCase() + language[curentlanguage].linkEditButton.slice(1) ;
  linkName.value = LinksArr[NumberLink][0];
  linkHref.value = LinksArr[NumberLink][1];
  document.querySelector('.editLinkPopup').classList.remove('visible')

})

function changeLink(){
  if (!checkLinkEnter()){
  LinksArr[NumberLink][0] = linkName.value;
  LinksArr[NumberLink][1] = linkHref.value;
  linkHref.value = '';
  linkName.value = '';
  createLinksList();
  LinkListBack();
}
}

function LinkListBack(){
  linksMainContent.classList.remove('linksAddVisible');
  linksAddcontent.classList.remove('linksAddVisible');
  CreateLink.addEventListener('click', CreateLinkButton);
  CreateLink.removeEventListener('click', changeLink );
  CreateLink.textContent =  language[curentlanguage].linkCreateButton;

}

document.querySelector('.NotCreateLinck').addEventListener('click', LinkListBack)


// addEventListener('click', () => {settings.classList.toggle('settingsVisible')})