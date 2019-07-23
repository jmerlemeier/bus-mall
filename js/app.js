'use strict';

//Get from HTML using ID
var imageOneEl = document.getElementById('prod-one');//dynamic
var imageTwoEl = document.getElementById('prod-two');
var imageThreeEl = document.getElementById('prod-three');
var prodContainerEl = document.getElementById('prod-container');
var ulEl = document.getElementById('list');

// GLOBAL VARIABLES
var totalVotes = 0; //can do votes remaining and decrement later
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

//New Instances of Images/Products (do with for loop)
for(var i = 0; i < images.length; i++) {
  new Product(images[i]);
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

//This is my Event Handler
function handleClick(){
  var chosenImg = event.target.title;//figuring out which title was clicked on
  totalVotes++;//could decrement here (see totalVotes above)

  for(var i = 0; i < allProducts.length; i++) {
    if(allProducts[i].name === chosenImg){
      allProducts[i].votes++;
    }
  }
  if(totalVotes > 24){
    prodContainerEl.removeEventListener('click', handleClick, true);//turns off voting after 25 //true means bubbling is set to true. If put false, then NO bubbling, you would event CAPTURE
    generateList();
    generateArrays();
    generateChart();
  }
  render();
}

prodContainerEl.addEventListener('click', handleClick, true);

render();


// prototype because eaach object is rendering something
Product.prototype.generateResults = function() {//each object instance only renders its own li.

  //append the list to the DOM
  //make li
  var liEl = document.createElement('li');
  //give it context
  liEl.textContent = `${this.votes} votes for ${this.name}`;
  //append to DOM ul
  ulEl.appendChild(liEl);

};

function generateList() { //helper function
  for(var i = 0; i < allProducts.length; i++){
    allProducts[i].generateResults();
  }
}

//loop over all instances and push just the NAMES in a new array
//loop over all instances and push just the VOTES in a new array
function generateArrays(){
  for(i = 0; i < allProducts.length;i++){
    namesArray.push(allProducts[i].name);
    votesArray.push(allProducts[i].votes);
  }
}

function generateChart() {
  //--------------- Chart.js --------------------

  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: namesArray,
      datasets: [{
        label: '# of Votes',
        data: votesArray,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',//0.2 opacity
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
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

