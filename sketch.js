var ang=0.1
var x=-4
var y=-8
var z=-1
var sigma=10
var rho=28
var beta=8/3
var dx=1
var dy=1
var dz=1
var dt=0.008
var px=[]
var py=[]
var pz=[]
var i=0
var img
var getX
var getY
var getZ
var rad=1.3
var sclsl
var canvas


var debugging=true;		//set true when testing
var set_x_y_z=false;	//set true if want user input of inital x,y,z
var shape_closed;	//set false if want to see orignal lorenz attractor
var makeRandomXYZ=true;
var randomABC=true;

var save;

var initialX;
var initialY;
var initialZ;




function setup() {
  canvas=createCanvas(windowWidth, windowHeight, WEBGL);
  clr=random(0,255)
  btn=createButton("save image")
  save=createButton("save value")
  save.position(100,50)
  btn.position(100,20)
  save.mousePressed(save_values)

  shape_closed=createCheckbox("close");


	if(makeRandomXYZ){
    set_x_y_z=false;
		x=random(0,50);
		y=random(0,50);
		z=random(0,50);
		dt=random(1)/100;
		console.log("x::"+x);
		console.log("y::"+y);
		console.log("z::"+z);
		console.log("dt::"+dt);

	}
	if(makeRandomXYZ){
    debugging=true;
		sigma=random(0,20);
		rho=random(0,20);
    beta=random(0,2);
		
	}

	if(set_x_y_z){		////takes inital coordinate input(x,y,z) from user
		getX = prompt("Enter value for X:range(0,20)", 1);
		getY = prompt("Enter value for Y:range(0,29)", 1);
		getZ = prompt("Enter value for Z:range(0,20)",1);
		get_dT = prompt("Enter value for dT:range(0.01,0.2)", 0.01);
		x= parseFloat(getX);
		y= parseFloat(getY);
		z= parseFloat(getZ);
		dt=parseFloat(get_dT);

	}

  btn.mousePressed(function(){save(canvas,"image.jpg")})
  // console.log("color:::"+clr);


if(!debugging){     //when not debugging takes input (sigma,rho,beta) from user
	getSigma = prompt("Enter value for sigma:range(0,30)", 10);
	getRho = prompt("Enter value for rho:range(0,99)", 28);
	getBeta = prompt("Enter value for beta:range(0,29)", 2.6666);
	sigma= parseFloat(getSigma);
	rho= parseFloat(getRho);
	beta= parseFloat(getBeta);
	
	}
console.log("sigma:::"+sigma)
console.log("rho:::"+rho)
console.log("beta:::"+beta)
sclsl=createSlider(0.001,15,5,0.0001)
sclsl.position(width/2,30)

var fov = PI/3.0;
  var cameraZ = (height/2.0) / tan(fov/2.0);
  perspective(fov, width/height, cameraZ * 0.1, cameraZ * 10);



  initialX=x;
  initialY=y;
  initialZ=z;

}

function save_values(){
var blob = new Blob(["x:"+initialX+'\n'+"y:"+initialY+'\n'+"z:"+initialZ+'\n'+"dt:"+dt+'\n'+"sigma:"+sigma+'\n'+"rho:"+rho+'\n'+"beta:"+beta+'\n'], {type: "text/plain;charset=utf-8"});
saveAs(blob, "saved.txt");
}


function drawLine(){


  colorMode(HSB)
  
  beginShape();
  
  for(j=0;j<i;j+=10){
    
    vertex(px[j], py[j],pz[j]);		//set vertices
    
    vertex(px[j+1], py[j+1],pz[j+1]);
      vertex(px[j+2], py[j+2],pz[j+2]);
      vertex(px[j+3], py[j+3],pz[j+3]);
      vertex(px[j+4], py[j+4],pz[j+4]);
      vertex(px[j+5], py[j+5],pz[j+5]);
      vertex(px[j+6], py[j+6],pz[j+6]);
      vertex(px[j+7], py[j+7],pz[j+7]);
      vertex(px[j+8], py[j+8],pz[j+8]);
      vertex(px[j+9], py[j+9],pz[j+9]);
      vertex(px[j+10], py[j+10],pz[j+10]);
      vertex(px[j+11], py[j+11],pz[j+11]);
      
  }
  endShape();
}

function setpoints(){
  
  dx=(sigma*(y-x))*dt
  dy=(x*(rho-z)-y)*dt
  dz=((x*y)-(beta*z))*dt
  x+=dx
  y+=dy
  z+=dz
  px[i]=x
  py[i]=y
  pz[i]=z

}

function draw() {

  background(0);
  
  scl=sclsl.value()
  scale(scl)
  
  rotateX(ang*0.1+map(mouseY, 0, height, 0, TWO_PI));
  rotateY(ang*0.1+map(mouseX, 0, width, 0, TWO_PI));
  rotateZ(ang*0.2)

setpoints()


  push()
  translate(x,y,z)
  colorMode(RGB)
  fill(255);
  sphere(rad)
  pop()


  push()
  translate(px[i-10],py[i-10],pz[i-10])
  colorMode(RGB)
  fill(240);
  sphere(rad*0.8)
  pop()


  push()
  translate(px[i-20],py[i-20],pz[i-20])
 colorMode(RGB)
  fill(210);
  sphere(rad*0.6)
  pop()

   push()
  translate(px[i-30],py[i-30],pz[i-30])
colorMode(RGB)
  fill(180);
  sphere(rad*0.4)
  pop()

  fill(i/2%255,100,50,100)
 drawLine()
  i++

  ang+=0.01

}

