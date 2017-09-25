

function getValues() {
  if (makeRandomXYZ) {
    set_x_y_z = false;
    x = random(0, 50);
    y = random(0, 50);
    z = random(0, 50);
    dt = random(1) / 100;
    

  }
  if (makeRandomXYZ) {
    debugging = true;
    sigma = random(0, 20);
    rho = random(0, 20);
    beta = random(0, 2);

  }
  if (set_x_y_z) {		////takes inital coordinate input(x,y,z) from user
    getX = prompt("Enter value for X:range(0,20)", 1);
    getY = prompt("Enter value for Y:range(0,29)", 1);
    getZ = prompt("Enter value for Z:range(0,20)", 1);
    get_dT = prompt("Enter value for dT:range(0.01,0.2)", 0.01);
    x = parseFloat(getX);
    y = parseFloat(getY);
    z = parseFloat(getZ);
    dt = parseFloat(get_dT);


  }
  if (!debugging) {     //when not debugging takes input (sigma,rho,beta) from user
    getSigma = prompt("Enter value for sigma:range(0,30)", 10);
    getRho = prompt("Enter value for rho:range(0,99)", 28);
    getBeta = prompt("Enter value for beta:range(0,29)", 2.6666);
    sigma = parseFloat(getSigma);
    rho = parseFloat(getRho);
    beta = parseFloat(getBeta);

  }
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  clr = random(0, 255)


  btn = createButton("save image")
  btn.position(100, 20)
  btn.mousePressed(function () { saveCanvas(canvas,"My lorrenz attractor","jpg") })


  save = createButton("save value")
  save.position(100, 50)
  save.mousePressed(save_values)

  shape_closed = createCheckbox("close");
 

  sclsl = createSlider(0.001, 15, 5, 0.0001)
  sclsl.position(width / 2, 30)
  getValues();

  // console.log("x::" + x);
  // console.log("y::" + y);
  // console.log("z::" + z);
  // console.log("dt::" + dt);

  // console.log("sigma:::" + sigma)
  // console.log("rho:::" + rho)
  // console.log("beta:::" + beta)
 


  // var fov = PI/2.0;
  // var cameraZ = (height/2.0) / tan(fov/2.0);
  // perspective(fov, width/height, cameraZ * 0.1, cameraZ * 10);



  initialX = x;
  initialY = y;
  initialZ = z;

}

function renderAxis(){
  fill(255)
  beginShape()
  vertex(axis_length, 0, 0)
  vertex(0, 0, 0)
  vertex(0, axis_length, 0)
  vertex(0, 0, 0)
  vertex(0, 0, axis_length)
  endShape()

}

function draw() {

  background(0);

  scl = sclsl.value()
  scale(scl)

  rotation(ang,0)
 renderAxis()


  setpoints()
  followers()



  fill(i / 2 % 255, 100, 50, 100)
  drawLine()
  i++

 
}

function rotation(angle,increment){
  rotateX(angle * 0.1 + map(mouseY, 0, height, 0, TWO_PI));
  rotateY(angle * 0.1 + map(mouseX, 0, width, 0, TWO_PI));
  rotateZ(angle * 0.2)
  
  ang += increment
}

function followers() {


  for (j = 0; j < 10; j++) {
    push()
    translate(px[i - (j * 10)], py[i - (j * 10)], pz[i - (j * 10)])
    colorMode(RGB)
    fill(255 - (j * 20));
    sphere(rad / (j + 1))
    pop()
  }


}

function save_values() {
  var blob = new Blob(["x:" + initialX + '\n' + "y:" + initialY + '\n' + "z:" + initialZ + '\n' + "dt:" + dt + '\n' + "sigma:" + sigma + '\n' + "rho:" + rho + '\n' + "beta:" + beta + '\n'], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "saved.txt");
}


function drawLine() {


  colorMode(HSB)

  beginShape();

  for (j = 0; j < i; j += 10) {

    vertex(px[j], py[j], pz[j]);		//set vertices

    vertex(px[j + 1], py[j + 1], pz[j + 1]);
    vertex(px[j + 2], py[j + 2], pz[j + 2]);
    vertex(px[j + 3], py[j + 3], pz[j + 3]);
    vertex(px[j + 4], py[j + 4], pz[j + 4]);
    vertex(px[j + 5], py[j + 5], pz[j + 5]);
    vertex(px[j + 6], py[j + 6], pz[j + 6]);
    vertex(px[j + 7], py[j + 7], pz[j + 7]);
    vertex(px[j + 8], py[j + 8], pz[j + 8]);
    vertex(px[j + 9], py[j + 9], pz[j + 9]);
    vertex(px[j + 10], py[j + 10], pz[j + 10]);
    vertex(px[j + 11], py[j + 11], pz[j + 11]);

  }
  endShape();
}

function setpoints() {

  if (calculate) {
    dx = (sigma * (y - x)) * dt
    dy = (x * (rho - z) - y) * dt
    dz = ((x * y) - (beta * z)) * dt
    x += dx
    y += dy
    z += dz
    px[i] = x
    py[i] = y
    pz[i] = z
  }

}


function play_pause(force_stop) {
  if (pause) {
    pause = false;
    calculate = true
    if (force_stop)
      loop()
  } else if (!pause) {
    pause = true;
    calculate = false
    if (force_stop)
      noLoop();
  }

}

function keyPressed() {
  if (key == "p" || key == "P") {
    play_pause()
  }
  if (key == "f" || key == "F") {
    play_pause(true);
  }
  if (key == "s" || key == "S") {
    saveCanvas("canvas","jpg")
  }
}




