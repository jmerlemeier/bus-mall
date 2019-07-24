'use strict';

//Get from HTML using ID
var imageOneEl = document.getElementById('prod-one');//dynamic
var imageTwoEl = document.getElementById('prod-two');
var imageThreeEl = document.getElementById('prod-three');
var prodContainerEl = document.getElementById('prod-container');

// GLOBAL VARIABLES
var votesRemaining = 5; //Count down  variable here
var recentRandomNumbers = [];
var allProducts = [];
var images = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];//can loop through this array to create new instances rather than creating a huge list of instances.
var namesArray = [];
var votesArray = [];

//Constructor
function Product(name) {
  // console.log('splitting the name', name.split('.')[0]);
  this.name = name.split('.')[0];//literally takes an string and splits it on whatever you want ["bag", "jpg"]. Turns a string into an array. (also it gets rid of the character you split on)
  this.filepath = `img/${name}`;
  this.votes = 0;
  this.views = 0;

  allProducts.push(this);
}

//========= INSTANTIATION STATION ===========
//New Instances of Images/Products (do with for loop)
function stringify = {
  var stringify = JSON.stringify(allProducts);
  localStorage.setItem('skeletonkey', stringify);
  for(var i = 0; i < images.length; i++) {
    new Product(images[i]);
  }
}


function render() { //REfactor and DRY this code, please
  var randomIndex = getUniqueIndex();//Index passed the test
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

  var randomIndex = randomNumber(0, allProducts.length-1);//minus 1 because start at 0 and not 1

  while(recentRandomNumbers.includes(randomIndex)){//checking to see if random index is in the random array (returns true or false)
    randomIndex = randomNumber(0, allProducts.length-1);//if it IS in the array, we re-run the random number function
  }

  if(recentRandomNumbers.length > 5) {//comparing THIS image with 5 others (3 previous and 2 new)If allowed more than 5, we would run out of numbers
    recentRandomNumbers.shift();//removes from the beginning (the oldest random number)
  }

  recentRandomNumbers.push(randomIndex);//pushes new index onto the end of array. (if did unshift, you would need to pop on line 71)
  return randomIndex;
}

//loop over all instances and push just the NAMES in a new array
//loop over all instances and push just the VOTES in a new array
function generateArrays(){
  for(i = 0; i < allProducts.length;i++){
    namesArray.push(allProducts[i].name);
    votesArray.push(allProducts[i].votes);
  }
}
//This is my Event Handler
function handleClick(){
  var chosenImg = event.target.title;//figuring out which title was clicked on
  votesRemaining--;//could decrement here (see votesRemaining above)

  for(var i = 0; i < allProducts.length; i++) {
    if(allProducts[i].name === chosenImg){
      allProducts[i].votes++;
    }
  }
  if(votesRemaining === 0){
    prodContainerEl.removeEventListener('click', handleClick, true);//turns off voting after 25 //true means bubbling is set to true. If put false, then NO bubbling, you would event CAPTURE
    generateArrays();
    generateChart();
  }
  render();
  stringify();
}

prodContainerEl.addEventListener('click', handleClick, true);

render();

function generateChart() {
  //--------------- Chart.js BARCHART --------------------
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: namesArray,
      datasets: [{
        label: 'Number of Votes',
        data: votesArray,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',//0.2 opacity
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',//5
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',//10
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',//15
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',//20
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',//5
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',//10
          'rgba(153, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',//15
          'rgba(153, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',//20
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

}

//--------------- LOCAL STORAGE --------------------
//TIMELINE:
//1. User loads page
//2.if empty (localStorage.length === 0) ---> instantiate and put in allProducts and render page ---> store data
if (localStorage.length === 0) {
  //instantiate
}

//(length != 0) else pull out from local storage and add to AllProducts (grab the data from local storage and get ready to add votes to it).  

//2. user votes.
//3. Store the votes.
//4. New User loads page.


//allProducts is my array of objects
//put in function and after 25 votes call (in hander)

//get out
// var parse = localStorage.getItem('skeletonkey');
// JSON.parse(parse);


