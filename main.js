import * as THREE from 'three';
import { GUI } from "dat.gui";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Add axes to help visualization
var axes = new THREE.AxesHelper(20);
scene.add(axes);

//Initialize and add the rabbitGroup to the scene
var rabbitGroup = new THREE.Group();
scene.add(rabbitGroup);

//Create the body and add to the rabbitgroup
const bodyMaterial = new THREE.MeshBasicMaterial( { color: 0xFFA500 } );
var bodyGeometry = new THREE.CylinderGeometry(1,1,5,32)
var bodyCylinder = new THREE.Mesh(bodyGeometry, bodyMaterial);
scene.add(bodyCylinder);
bodyCylinder.rotateZ(THREE.MathUtils.degToRad(90));

rabbitGroup.add(bodyCylinder);
var bodyGroup = new THREE.Group();
rabbitGroup.add(bodyGroup);

//Define the neck and head
const neckGeometry = new THREE.SphereGeometry( 1, 32, 16, 0, Math.PI * 2, 0, Math.PI * 2);
const material = new THREE.MeshBasicMaterial( { color: 0xFFA500} );
var neck = new THREE.Mesh( neckGeometry, material );
neck.position.set(-2.5,0,0);
neck.rotateZ(THREE.MathUtils.degToRad(90))
bodyGroup.add(neck);

const headGeometry = new THREE.SphereGeometry( 1,100, 16);
headGeometry.scale(1.5,1,1)
var head = new THREE.Mesh(headGeometry, material);
head.position.set(-4,1.5,0);
rabbitGroup.add(head);

var headGroup = new THREE.Group();
rabbitGroup.add(headGroup);
headGroup.position.set(-4,1.5,0);


//Define the ears
const earMaterial = new THREE.MeshBasicMaterial( { color: 0xFFFFFF } );
var earGeometry = new THREE.CylinderGeometry(.25,0.25,2,32);
var ear1 = new THREE.Mesh(earGeometry, earMaterial);
var ear2 = new THREE.Mesh(earGeometry, earMaterial);
ear1.position.set(0.2,0.5,0.5);
ear2.position.set(0.2,0.5,-0.5);
headGroup.add(ear1, ear2);

//Define the leg cylinder and groups
var flegGroup = new THREE.Group();
bodyGroup.add(flegGroup);
var flegFoot = new THREE.Group();
flegGroup.add(flegFoot);

var legGeometry = new THREE.CylinderGeometry(0.5,0.5,2,32);
var frontLegCyl= new THREE.Mesh( legGeometry, bodyMaterial );
frontLegCyl.position.set(0,0,0);
flegGroup.add(frontLegCyl);

//Add the foot to the leg group
const frontFootGeometry = new THREE.SphereGeometry( 0.5, 32, 16, 0, Math.PI * 2, 0, Math.PI * 2 );
const frontFootMaterial = new THREE.MeshBasicMaterial( { color: 0xFF00FF} );
var frontFoot = new THREE.Mesh( frontFootGeometry, frontFootMaterial );
flegFoot.add(frontFoot);
frontFoot.position.set(0,1,0);

//Add the right leg
var rlegGroup = flegGroup.clone();
bodyGroup.add(rlegGroup);

//Set legs to relevant angles based on the provided example in the assignemnt pdf
var flegStartAngle=THREE.MathUtils.degToRad(145);
flegGroup.position.set(-1,-1,0);
flegGroup.rotateZ(flegStartAngle);

var rlegStartAngle=THREE.MathUtils.degToRad(205)
rlegGroup.position.set(1,-1,0);
rlegGroup.rotateZ(rlegStartAngle)

//Define and add the center sphere for the lookAt point
const lookAtPointGeometry = new THREE.SphereGeometry( 0.25,100, 16);
const lookAtMaterial = new THREE.MeshBasicMaterial({color: 0x0BDA51})
var lookAtPoint = new THREE.Mesh(lookAtPointGeometry, lookAtMaterial);

scene.add(lookAtPoint);
lookAtPoint.position.set(0,0,0);

//Define strucutres to hold data from certain guis
let orbitData = {radius:10, hAngle:0.0, vAngle:0.0};
let legDelta = {delta:0};

//Create gui and add appropriate sliders
var gui= new GUI();
gui.add(legDelta, "delta", THREE.MathUtils.degToRad(0), THREE.MathUtils.degToRad(60)).name("Move legs jointly");
gui.add(lookAtPoint.position, "x", -10, 10).name("LookAtX");
gui.add(lookAtPoint.position, "y", -10, 10).name("LookAtY");
gui.add(lookAtPoint.position, "z", -10, 10).name("LookAtZ");
gui.add(ear1.rotation, "z", THREE.MathUtils.degToRad(180), THREE.MathUtils.degToRad(225)).name("Move right ear");
gui.add(ear2.rotation, "z", THREE.MathUtils.degToRad(180), THREE.MathUtils.degToRad(225)).name("Move left ear");
gui.add(orbitData, "radius", 0, 10).name("viewing radius");
gui.add(orbitData, "hAngle", -360, 360).name("horizontal angle");
gui.add(orbitData, "vAngle", -360, 360).name("vertical angle");

//const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(0,0,5);
camera.lookAt(lookAtPoint.position);
rabbitGroup.position.set(0,0,0);

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );

	var yAxis = new THREE.Vector3(0,1,0);
	var xAxis = new THREE.Vector3(1,0,0);

	//Adjust camera angle based on horizontal and vertical rotation angles
	//And adjust camera position accordingly
	var cameraOverwatch = new THREE.Vector3(0,0,orbitData.radius);
	
	cameraOverwatch.applyAxisAngle(xAxis, THREE.MathUtils.degToRad(-orbitData.vAngle))
	cameraOverwatch.applyAxisAngle(yAxis, THREE.MathUtils.degToRad(orbitData.hAngle))

	var lookAtPos = new THREE.Vector3();
	lookAtPoint.getWorldPosition(lookAtPos);

	cameraOverwatch.setX(cameraOverwatch.x+lookAtPos.x);
	cameraOverwatch.setY(cameraOverwatch.y+lookAtPos.y);
	cameraOverwatch.setZ(cameraOverwatch.z+lookAtPos.z);

	//Rotate front and rear legs towards eachother jointly as perscribed in pdf
	flegGroup.rotation.z= flegStartAngle + legDelta.delta;
	rlegGroup.rotation.z= rlegStartAngle - legDelta.delta;

	camera.position.set(cameraOverwatch.x, cameraOverwatch.y, cameraOverwatch.z);
	camera.lookAt(lookAtPoint.position);
}

animate();