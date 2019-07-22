'use strict';

//Get from HTML using ID
var imageOneEl = document.getElementById('prod-one');//dynamic
var imageTwoEl = document.getElementById('prod-two');
var imageThreeEl = document.getElementById('prod-three');
var prodContainerEl = document.getElementById('prod-container');

// GLOBAL VARIABLES
var totalVotes = 0;
var recentRandomNumbers = [];
var allProducts = [];
var images = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

//Constructor
function Product(name) {
  this.name = name.split('.')[0];
  this.filepath = `img/${name}`;
  this.votes = 0;
  this.views = 0;

  allProducts.push(this);
}

//New Instances of Images/Products (do with for loop)
for(var i = 0; i < images.length; i++) {
  new Product(images[i]);
}


function render() {
  var randomIndex = getUniqueIndex();
  allProducts[randomIndex].views++;
  //Need to display the randomly chosen photos
  imageOneEl.src = allProducts[randomIndex].filepath;
  imageOneEl.alt = allProducts[randomIndex].name;
  imageOneEl.title = allProducts[randomIndex].name;

  var randomIndex = getUniqueIndex();
  allProducts[randomIndex].views++;
  //Need to display the randomly chosen photos
  imageTwoEl.src = allProducts[randomIndex].filepath;
  imageTwoEl.alt = allProducts[randomIndex].name;
  imageTwoEl.title = allProducts[randomIndex].name;

  var randomIndex = getUniqueIndex();
  allProducts[randomIndex].views++;
  //Need to display the randomly chosen photos
  imageThreeEl.src = allProducts[randomIndex].filepath;
  imageThreeEl.alt = allProducts[randomIndex].name;
  imageThreeEl.title = allProducts[randomIndex].name;

}

//Helper Functions
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getUniqueIndex(){

  var randomIndex = randomNumber(0, allProducts.length-1);

  while(recentRandomNumbers.includes(randomIndex)){
    randomIndex = randomNumber(0, allProducts.length-1);
  }

  if(recentRandomNumbers.length > 5) {//comparing THIS image with 5 others (3 previous and 2 new)
    recentRandomNumbers.shift();
  }

  recentRandomNumbers.push(randomIndex);
  return randomIndex;
}

function handleClick(){
  var chosenImg = event.target.title;
  totalVotes++;
  for(var i = 0; i < allProducts.length; i++) {
    if(allProducts[i].name === chosenImg){
      allProducts[i].votes++;
    }
  }
  if(totalVotes > 25){
    prodContainerEl.removeEventListener('click', handleClick, true);//turns off voting after 25
  }
  render();
}

prodContainerEl.addEventListener('click', handleClick, true);

render();

