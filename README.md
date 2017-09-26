# lorrentz-attracctor-3D (WEBGL)
modified version of previous lorrentz attractor added 3D support using WEBGL

[![N|Solid](https://upload.wikimedia.org/wikipedia/commons/1/13/A_Trajectory_Through_Phase_Space_in_a_Lorenz_Attractor.gif)](https://upload.wikimedia.org/wikipedia/commons/1/13/A_Trajectory_Through_Phase_Space_in_a_Lorenz_Attractor.gif)
This chaotic system works on a set of simple maths equation given below :


```sh
1. dX/dT	=	sigma(Y-X)	=>  dX	=	sigma(Y-X)*dT
2. dY/dT	=	X(rho-Z)-Y	=>  dY	=	(X(rho-Z)-Y)*dT
3. dZ/dT	=	XY-beta(Z)  =>  dZ	=	(XY-beta(Z))*dT

4. x=x+dX
5. y=y+dY
6. z=z+dZ
```

 ### Keyboard Shortcuts
```sh
- A: Toggle axis
- Q: Toggle planes
- P: Pause caluculation (you can move while calcualtions are halted)
- F: Force stop (stops calculations and animation loop)
- R: Reset(start over)
- S- Save current canvas as image(.jpg)
```
#### By default enabled values
```
debugging = true;       //set true when testing (wont take any user input for variables)
logging=true;		    //logs values of variables in browsers console  
makeRandomXYZ = true;   //choses random x,y,z values for initialization 
randomABC = true;       //chooses random value for sigma,rho and beta
show_plane=true;        //by default plane is visible
show_axis=true;         //by default axis is visible
```
Here x,y,z make up the system state,T is time, and sigma ,rho ,beta  are the system parameters;

### Values used by lorrenz: 
>x=0
>y=0
>z=0
>sigma =10,
>beta =8/3
>rho =28

The system exhibits chaotic behavior for these (and nearby) values.

Since this is a 3D version it uses a lot of computaion and some pretty cool visualizations are added to this
check those out in experimental branch of this repo.




you can change these values and experiment with the equation as you like to create more beautiful patterns :)
