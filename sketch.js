var ang=0.1
var x=1
var y=1
var z=1
var a=10
var b=28
var c=8/3
var dx=1
var dy=1
var dz=1
var dt=0.01
var xp=[]
var yp=[]
var zp=[]
var i=0
var clr
var img
var getX
var getY
var getZ



function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  clr=random(0,255)
  console.log("color:::"+clr);
var getX = prompt("Enter value for sigma:range(0,30)", 10);
var getY = prompt("Enter value for rho:range(0,99)", 28);
var getZ = prompt("Enter value for beta:range(0,29)", 2.6666);
a= parseFloat(getX);
b= parseFloat(getY);
c= parseFloat(getZ);
console.log("a:::"+a)
console.log("b:::"+b)
console.log("c:::"+c)
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
  scale(5)
  angx=map(mouseX,0,width,0,TWO_PI)
  angy=map(mouseY,0,width,0,TWO_PI)
  rotateX(angx+ang*0.1)
  rotateZ(angy+ang*0.1)
  rotateY(ang)
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
  fill(255,255,255,255);
  sphere(1)
  pop()
  drawLine()
  i++

  ang+=0.01

}
