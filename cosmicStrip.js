// Copyright Olivier Baudu 2015
// Published under the terms of GPL v3.0

var masterPiece, video, snapShot, drawing;
var widthStamp, heightStamp;
var xStamp, yStamp;
var xDraw, yDraw;
var counter;
var nbImgHoriz, nbImgVert, nbImgTotal;
var ok;

function setup() {
    masterPiece = createCanvas(1281, 480);
    masterPiece.parent('tableau');
    
    video = createCapture(VIDEO, ready);
    video.size(640, 480);
    video.hide();

    widthStamp = 40;
    heightStamp = 40;

    nbImgHoriz = int(video.width/widthStamp);
    nbImgVert = int(video.height/heightStamp);
    nbImgTotal = nbImgHoriz*nbImgVert;

    drawing = createImage(widthStamp, heightStamp);

    frameRate(30);
    background(255);
    noFill();
    counter = 0;
    ok = false;

    capture = createImage(640, 480);
}

function ready() {
    ok = true;
}

function draw() {

    if(ok) {
      snapShot = video.get();

      image(video, 0, 0);

      xStamp = constrain(mouseX-widthStamp, 0, snapShot.width-widthStamp);
      yStamp = constrain(mouseY-heightStamp, 0, snapShot.height-heightStamp);

      if (mouseIsPressed && mouseY < 480) {

          xDraw = widthStamp * int(counter%nbImgHoriz)
          yDraw = heightStamp * int(counter/nbImgHoriz)

          copy(snapShot, xStamp, yStamp, widthStamp, heightStamp, snapShot.width+xDraw+1, yDraw, widthStamp, heightStamp);

          counter++;
          if (counter == nbImgTotal) {
              counter = 0;
          } 
      }

      stroke(255);
      rect(xStamp, yStamp, widthStamp, heightStamp);
      stroke(0);
      line(640, 0, 640, 480); 

    }
}

function saveMasterPiece() {
    save(masterPiece, 'myMasterPiece', 'jpg');
}







