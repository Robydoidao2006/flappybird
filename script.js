var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// load images
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";


// some variables
var gap = 85;
var constant;

//bird  initial position
var bX = 10;
var bY = 150;

//setting up gravity
var gravity = 1.5;
//score count
var score = 0;

// audio files
var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

// on key down(any key)
document.addEventListener("keydown",moveUp);

function moveUp(){
    //moves  y.pixel
    bY -= 25;
    fly.play();//fly sound
}

// pipe coordinates
var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};

// draw images
function draw(){
    
    ctx.drawImage(bg,0,0);//background 
    
    //generating pipes
    for(var i = 0; i < pipe.length; i++){
        //
        constant = pipeNorth.height+gap;
        //drawing pipes
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
             
        pipe[i].x--;//pipes moving horizontaly 
        
        if( pipe[i].x == 5 ){ //speed in which the pipes apear
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            }); 
        }

        // detect collision bird hits pipes = reload
        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width 
            && (bY <= pipe[i].y + pipeNorth.height 
            || bY+bird.height >= pipe[i].y+constant) 
            || bY + bird.height >=  cvs.height - fg.height){ //bird hits the floor = reload
            location.reload(); // reload the page
        }
        //increment score when passing througth pipes.
        if(pipe[i].x == 5){
            score++;
            scor.play();
        }
        
        
    }

    ctx.drawImage(fg,0,cvs.height - fg.height);//displays floor
    
    ctx.drawImage(bird,bX,bY);//displays bird
    
    bY += gravity;
    //displays the score
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    
    //animates 
    requestAnimationFrame(draw);
    
}

draw();
























