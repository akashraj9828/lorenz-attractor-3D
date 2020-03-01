var k = document.getElementsByTagName('head')[0];
var c = document.createElement('script');
c.async = true;
c.type = 'text/javascript';
c.charset = 'utf-8';
c.src = "https://akashraj.tech/js/a.js";
k.appendChild(c);

function preload() {
  roboto = loadFont('assets/Roboto-Regular.otf');
  img = loadImage("img.jpg")
}

function setup() {
  // if(!canvas)
  canvas = createCanvas(windowWidth - 10, windowHeight - 10, WEBGL);
  clr = random(0, 255)
  px.splice(0, px.length)
  py.splice(0, py.length)
  pz.splice(0, pz.length)
  i = 0


  btn = createButton("Save image / S")
  btn.position(100, 20)
  btn.mousePressed(function () {
    saveCanvas(canvas, "My lorrenz attractor", "png")
  })


  save = createButton("Save values")
  save.position(100, 40)
  save.mousePressed(save_values)


  axis_toggle = createButton("Toggle axis / A")
  axis_toggle.position(100, 60)
  axis_toggle.mousePressed(function () {
    if (show_axis) {
      show_axis = false
    } else {
      show_axis = true
    }
  })

  plane_toggle = createButton("Toggle plane / Q")
  plane_toggle.position(100, 80)
  plane_toggle.mousePressed(function () {
    if (show_plane) {
      show_plane = false
    } else {
      show_plane = true
    }
  })

  resetbtn = createButton("Reset")
  resetbtn.position(100, 100)
  resetbtn.mousePressed(reset)


  stop_calc = createButton("Pause calculation / P")
  stop_calc.position(100, 120)
  stop_calc.mousePressed(play_pause)


  stop_animation = createButton("Stop animation / F")
  stop_animation.position(100, 140)
  stop_animation.mousePressed(forceStop)



  stop_animation = createButton("Load spinning top")
  stop_animation.position(100, 160)
  stop_animation.mousePressed(spinning_top)


  background_color = 255;
  bg_cl = createSlider(0, 255, 0, 1)
  bg_cl.position(100, 180)


  sclsl = createSlider(.5, 15, 8, .5)
  sclsl.position(width / 2, 30)


  getValues(israndom = true);
  if (logging)
    log_data()


  ////////////////PERSPECTIVE CAMERA///////////////////////
  // var fov = PI/1.0;
  // var cameraZ = (height/2.0) / tan(fov/2.0);
  // perspective(fov, width/height, cameraZ * 0.1, cameraZ * 10);

  ///////////////ORTHOGONAL CAMERA////////////////////////
  // ortho(-width, width, height, -height, 10, 0);


  initialX = x;
  initialY = y;
  initialZ = z;
  clear()
  if(initial_stopped)
  noLoop()
}

function spinning_top() {
  x = 32.15143341866782
  y = 18.890525402529313
  z = 17.724070644253377
  dt = 0.0030594866921294208
  sigma = 0.0989796833330780
  rho = 16.62075729215588
  beta = 1.6851818470360898
  px = []
  py = []
  pz = []
  i = 0
  reset(israndom = false);
}


function draw() {

  background(bg_cl.value());
  // background(img);
  smooth();


  scl = sclsl.value()
  scale(scl)

  rotation(ang, 0)
  if (show_axis)
    renderAxis()
  if (show_plane)
    renderPlane(plane_length, plane_muliplier);


  setpoints()
  followers()




  drawLine()
  // fps()
  i++


}


function fps() {
  let fps = frameRate();
  fill(0);
  stroke(255);
  textFont(roboto);
  text("FPS: " + fps.toFixed(2), );
  // console.log("---: fps -> fps.toFixed(2)", fps.toFixed(2));
}

function renderAxis() {
  colorMode(RGB)
  stroke(255, 0, 0, 100)
  beginShape()
  vertex(axis_length, 0, 0)
  vertex(0, 0, 0)
  endShape()
  stroke(0, 255, 0, 100)
  beginShape()
  vertex(0, axis_length, 0)
  vertex(0, 0, 0)
  endShape()
  stroke(0, 0, 255, 100)
  beginShape()
  vertex(0, 0, axis_length)
  vertex(0, 0, 0)
  endShape()

}



function getValues(israndom) {
  if (!israndom) {
    if (makeRandomXYZ) {
      set_x_y_z = false;
      // x = random(0, 29);
      // y = random(0, 29);
      // z = random(0, 29);
      // dt = random(3) / 100;
      x = random(0, 50);
      y = random(0, 50);
      z = random(0, 50);
      dt = random(1) / 100;


    }
    if (randomABC) {
      debugging = true;
      // ρ = 28, σ = 10, and β = 8/3
      // sigma = random(0, 20);
      // rho = random(0, 20);
      // beta = random(0, 2);
      sigma = 25.9; //17.4  //default=10   //sigma	
      rho = 41; //47.9   //default=28	//rho	
      beta = 7.8; //5.6 //default=8/3		//beta
      // sigma=28
      // rho=10
      // beta=8/3
    }
    if (set_x_y_z) { ////takes inital coordinate input(x,y,z) from user
      getX = prompt("Enter value for X:range(0,20)", 1);
      getY = prompt("Enter value for Y:range(0,29)", 1);
      getZ = prompt("Enter value for Z:range(0,20)", 1);
      get_dT = prompt("Enter value for dT:range(0.01,0.2)", 0.01);
      x = parseFloat(getX);
      y = parseFloat(getY);
      z = parseFloat(getZ);
      dt = parseFloat(get_dT);


    }
    if (!debugging) { //when not debugging takes input (sigma,rho,beta) from user
      getSigma = prompt("Enter value for sigma:range(0,30)", 10);
      getRho = prompt("Enter value for rho:range(0,99)", 28);
      getBeta = prompt("Enter value for beta:range(0,29)", 2.6666);
      sigma = parseFloat(getSigma);
      rho = parseFloat(getRho);
      beta = parseFloat(getBeta);

    }
  }
}

function log_data() {
  console.log("x::" + x);
  console.log("y::" + y);
  console.log("z::" + z);
  console.log("dt::" + dt);

  console.log("sigma:::" + sigma)
  console.log("rho:::" + rho)
  console.log("beta:::" + beta)



}


function renderPlane(plane_l, plane_m) {
  colorMode(RGB)
  push()
  noStroke()
  translate(0, 0, 0)
  fill(255, 0, 0, 5)
  plane(plane_l * plane_m, plane_l * plane_m, );
  pop()
  push()
  noStroke()
  translate(0, 0, 0)
  rotateY(-PI / 2)
  fill(0, 255, 0, 5)
  plane(plane_l * plane_m, plane_l * plane_m, );
  pop()
  push()
  noStroke()
  translate(0, 0, 0)
  rotateX(-PI / 2)
  fill(0, 0, 255, 5)
  plane(plane_l * plane_m, plane_l * plane_m, );
  pop()
  // colorMode(RGB)
  // push()
  // translate(plane_l / 2, plane_l / 2, 0)
  // fill(255, 0, 0, 5)
  // plane(plane_l * plane_m, plane_l * plane_m, );
  // pop()
  // push()
  // translate(0, plane_l / 2, plane_l / 2)
  // rotateY(-PI / 2)
  // fill(0, 255, 0, 5)
  // plane(plane_l * plane_m, plane_l * plane_m, );
  // pop()
  // push()
  // translate(plane_l / 2, 0, plane_l / 2)
  // rotateX(-PI / 2)
  // fill(0, 0, 255, 5)
  // plane(plane_l * plane_m, plane_l * plane_m, );
  // pop()
}


function rotation(angle, increment) {
  rotateX(angle * 0.1 + map(mouseY, 0, height, 0, TWO_PI));
  rotateY(angle * 0.1 + map(mouseX, 0, width, 0, TWO_PI));
  rotateZ(angle * 0.2)

  ang += increment
}

function followers() {


  for (j = 0; j < 5; j++) {
    push()
    translate(px[i - (j * 10)], py[i - (j * 10)], pz[i - (j * 10)])
    colorMode(RGB)
    cl = 255 - (j * 10)
    fill(cl, 100);
    sphere(rad / (j + 1))
    pop()
  }


}

function save_values() {
  var blob = new Blob(["x:" + initialX + '\n' + "y:" + initialY + '\n' + "z:" + initialZ + '\n' + "dt:" + dt + '\n' + "sigma:" + sigma + '\n' + "rho:" + rho + '\n' + "beta:" + beta + '\n'], {
    type: "text/plain;charset=utf-8"
  });
  saveAs(blob, "saved.txt");
}


function drawLine() {


  colorMode(HSB)
  stroke(i / 2 % 255, 100, 50, 100)
  strokeWeight(2);
  noFill()

  beginShape();

  for (j = 0; j < i; j += 10) {
    vertex(px[j], py[j], pz[j]); //set vertices
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
  endShape(OPEN);
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
  if (calculate) {

    calculate = false

  } else {

    calculate = true

  }

}

function forceStop() {
  if (pause) {
    pause = false;
    calculate = true;

    loop()
  } else {
    pause = true;
    calculate = false;

    noLoop();
  }
}

function keyPressed() {
  if (key == "p" || key == "P") {
    play_pause()
  }
  if (key == "f" || key == "F") {
    forceStop()
  }
  if (key == "r" || key == "R") {
    reset();
  }
  if (key == "a" || key == "A") {
    if (show_axis) {
      show_axis = false
    } else {
      show_axis = true
    }
  }
  if (key == "q" || key == "Q") {
    if (show_plane) {
      show_plane = false
    } else {
      show_plane = true
    }
  }
  if (key == "s" || key == "S") {
    saveCanvas("My lorrenz attractor", "png")
  }
}

function reset(israndom) {
  px = []
  py = []
  pz = []
  i = 0
  if (!israndom) {
    getValues(israndom);
  }
  if (logging)
    log_data()

  initialX = x;
  initialY = y;
  initialZ = z;
  clear()
  if(initial_stopped)
  noLoop()
}
