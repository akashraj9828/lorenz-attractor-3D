var ang=0.1
var x=-4
var y=-8
var z=-1
var a=10
var b=28
var c=8/3
var dx=1
var dy=1
var dz=1
var dt=0.008
var xp=[]
var yp=[]
var zp=[]
var i=0
var clr
var img
var getX
var getY
var getZ
var rad=2
var sclsl
var canvas


function setup() {
  canvas=createCanvas(windowWidth, windowHeight, WEBGL);
  clr=random(0,255)
  btn=createButton("save image")
  btn.position(100,20)
  btn.mouseClicked(saveimg)
//   console.log("color:::"+clr);
// var getX = prompt("Enter value for sigma:range(0,30)", 10);
// var getY = prompt("Enter value for rho:range(0,99)", 28);
// var getZ = prompt("Enter value for beta:range(0,29)", 2.6666);
// a= parseFloat(getX);
// b= parseFloat(getY);
// c= parseFloat(getZ);
// console.log("a:::"+a)
// console.log("b:::"+b)
// console.log("c:::"+c)
sclsl=createSlider(0.0001,9,5,0.0001)
sclsl.position(width/2,30)

// var fov = PI/3.0;
//   var cameraZ = (height/2.0) / tan(fov/2.0);
//   perspective(fov, width/height, cameraZ * 0.1, cameraZ * 10);

}

function saveimg(){
	save(canvas,"image.jpg")
}

function drawLine(){


  colorMode(HSB)
  fill(clr%255,255,255,70)

  beginShape();
  for(j=0;j<i;j++){

    vertex(xp[j],yp[j],zp[j])

  }
  endShape();
  clr+=0.1
}


function draw() {

  background(10);
  orbitControl();
  scl=sclsl.value()
  scale(scl)
  
  // rotateX(map(mouseY, 0, height, 0, TWO_PI));
  // rotateY(map(mouseX, 0, width, 0, TWO_PI));
  // rotateZ(ang*0.5)

  dx=(a*(y-x))*dt
  dy=(x*(b-z)-y)*dt
  dz=((x*y)-(c*z))*dt
  x+=dx
  y+=dy
  z+=dz
  xp[i]=x
  yp[i]=y
  zp[i]=z



  push()
  translate(x,y,z)
  colorMode(RGB)
  fill(255);
  sphere(rad)
  pop()


  push()
  translate(xp[i-10],yp[i-10],zp[i-10])
  colorMode(RGB)
  fill(240);
  sphere(rad*0.8)
  pop()


  push()
  translate(xp[i-20],yp[i-20],zp[i-20])
 colorMode(RGB)
  fill(210);
  sphere(rad*0.6)
  pop()

   push()
  translate(xp[i-30],yp[i-30],zp[i-30])
colorMode(RGB)
  fill(180);
  sphere(rad*0.4)
  pop()

 
 drawLine()
  i++

  ang+=0.01

}

