var ang = 0.1
var x = -4
var y = -8
var z = -1
var sigma = 10
var rho = 28
var beta = 8 / 3
var dx = 1
var dy = 1
var dz = 1
var dt = 0.008
var px = []
var py = []
var pz = []
var i = 0
var img
var getX
var getY
var getZ
var rad = 2
var sclsl
var canvas
var axis_length = 100

var pause = false;
var calculate = true;


var debugging = true;		//set true when testing
var set_x_y_z = false;	//set true if want user input of inital x,y,z
var shape_closed;	//set false if want to see orignal lorenz attractor
var makeRandomXYZ = true;
var randomABC = true;

var save;

var initialX;
var initialY;
var initialZ;

