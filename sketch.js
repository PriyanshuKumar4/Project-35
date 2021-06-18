//Create variables here

var dog, dogImg, happyDogImg, database, foodS, foodstock;

function preload() {
	//load images here
  dogImg = loadImage("images/dogimg.png");
  happyDogImg = loadImage("images/happydogimg.png");

}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  foodstock = database.ref("Food");
  foodstock.on("value", readStock);
  foodstock.set(20);

  dog = createSprite(250, 350, 10, 60);
  dog.addImage(dogImg);
  dog.scale=0.2;
  
}


function draw() {  
  background("green");
  if (foodS!== undefined) {
    textSize(20);
    fill(255);
    text("Note:- Press UP ARROW to feed DRAGO milk", 50, 50);
    text("Food Remaining: "+foodS, 150, 150);

    if (KeyWentDown(UP_ARROW)) {
      writeStock(foodS);
      dog.addImage(happyDogImg);
      }

    if (KeyWentUp(UP_ARROW)) {
      dog.addImage(dogImg);
     }
     
    if (foodS ===0){
      foodS=20;
      }
      
    drawSprites();  
      }
  }

   
  function writeStock(x) {
    if(x<=0) {
      x = 0;
    }
    else{
      x = x-1;
    }
    database.ref("/")({
      Food:x
    });

  }

  function readStock(data) {
    foodS = data.val();
  }



