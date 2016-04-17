// Copyright Olivier Baudu 2015
// Published under the terms of GPL v3.0

var masterPiece, video, snapShot;
var xStamp, yStamp;
var ok;

var chemins = [];

function setup() {
    masterPiece = createCanvas(640, 480);
    masterPiece.parent('tableau');
    
    video = createCapture(VIDEO, ready);
    video.size(640, 480);
    video.hide();

    frameRate(30);
    background(255);
    noFill();
    ok = false;

    for(var i=0; i<500; i++) {
        chemins[i] = new Chemin(i);
    }

}

function ready() {
    ok = true;
}

function draw() {

    if(ok) {
        snapShot = video.get();

        snapShot.loadPixels();
        for(var i=0; i<chemins.length; i++) {
            chemins[i].dessin();
        }
    }
}

function Chemin() {

    this.X1 = width/2;
    this.Y1 = height/2;

    this.X2 = this.X1 + decalage();
    this.Y2 = this.Y1 + decalage();

    this.couleurR = 0;
    this.couleurV = 0;
    this.couleurB = 0;

    this.dessin = function() {


        if (this.X1>0 && this.X1<width && this.Y1>0 && this.Y1<height) {
            this.couleurR = snapShot.pixels[(this.X1+this.Y1*width)*4+0];
            this.couleurV = snapShot.pixels[(this.X1+this.Y1*width)*4+1];
            this.couleurB = snapShot.pixels[(this.X1+this.Y1*width)*4+2];
        }
 
        stroke(this.couleurR, this.couleurV, this.couleurB);
        line(this.X1, this.Y1, this.X2, this.Y2);
     
        this.X1 = this.X2;
        this.Y1 = this.Y2;
     
        this.X2 = this.X1 + decalage();
        this.Y2 = this.Y1 + decalage();
    }
}

function saveMasterPiece() {
    save(masterPiece, 'myMasterPiece', 'jpg');
}


function decalage() {
      return(5*(int(random(3))-1));
} 




