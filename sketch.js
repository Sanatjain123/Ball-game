var Ball, database;
var position;
var database;

function setup(){
database=firebase.database();

  console.log(database);
  createCanvas(500,500);

  Ball = createSprite(250,250,10,10);
  Ball.shapeColor = "red";

  //referring to database for the ball position 
  var ballPosition=database.ref("position");
// creating a tracker for monitoring changes of the ball position
  ballPosition.on("value",readPosition,showError);

}

function draw(){
  background("white");
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  
}

function writePosition(x,y){
 //update the ball position change in program
database.ref("position").set({
  "x":position.x+x,
  "y":position.y+y,
})
}

function readPosition(data){
 //read the data from database
position=data.val();
Ball.x=position.x;
Ball.y=position.y;
}

function showError(){
console.log("Error in database");

}
