import * as THREE from 'three';
import { GUI } from "dat.gui";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var axes = new THREE.AxesHelper(20);
scene.add(axes);

var rabbitGroup = new THREE.Group();
scene.add(rabbitGroup);

const bodyMaterial = new THREE.MeshBasicMaterial( { color: 0xFFA500 } );
var bodyGeometry = new THREE.CylinderGeometry(1,1,5,32)
var bodyCylinder = new THREE.Mesh(bodyGeometry, bodyMaterial);
scene.add(bodyCylinder);
bodyCylinder.rotateZ(THREE.MathUtils.degToRad(90));

rabbitGroup.add(bodyCylinder);
var bodyGroup = new THREE.Group();
rabbitGroup.add(bodyGroup);


const phiStart = 0;
const phiEnd = Math.PI * 2;
const thetaStart = 0;
const thetaEnd = Math.PI / 2;


//Define the neck and head
const neckGeometry = new THREE.SphereGeometry( 1, 32, 16, phiStart, phiEnd, thetaStart, thetaEnd );
const material = new THREE.MeshBasicMaterial( { color: 0xFFA500} );
var neck = new THREE.Mesh( neckGeometry, material );
neck.position.set(-2.5,0,0);
neck.rotateZ(THREE.MathUtils.degToRad(90))
bodyGroup.add(neck);

const headGeometry = new THREE.SphereGeometry( 1,100, 16);
const headMaterial = new THREE.MeshBasicMaterial( { color: 0x173AFF} );
headGeometry.scale(1.5,1,1)
var head = new THREE.Mesh(headGeometry, material);
head.position.set(-4,1.5,0);
rabbitGroup.add(head);

var headGroup = new THREE.Group();
rabbitGroup.add(headGroup);
headGroup.position.set(-4,1.5,0);


//Define the ears
const earMaterial = new THREE.MeshBasicMaterial( { color: 0xFFFFFF } );
var earGeometry = new THREE.CylinderGeometry(.25,0.25,1,32);
var ear1 = new THREE.Mesh(earGeometry, earMaterial);
var ear2 = new THREE.Mesh(earGeometry, earMaterial);
ear1.position.set(0.2,1,0.5);
ear2.position.set(0.2,1,-0.5);
headGroup.add(ear1, ear2);

//Define the legs
var flegGroup = new THREE.Group();
bodyGroup.add(flegGroup);
var flegFoot = new THREE.Group();
flegGroup.add(flegFoot);

var legGeometry = new THREE.CylinderGeometry(0.5,0.5,2,32);
var frontLegCyl= new THREE.Mesh( legGeometry, bodyMaterial );
frontLegCyl.position.set(0,0,0);
flegGroup.add(frontLegCyl);

const frontFootGeometry = new THREE.SphereGeometry( 0.5, 32, 16, phiStart, phiEnd, thetaStart, thetaEnd );
const frontFootMaterial = new THREE.MeshBasicMaterial( { color: 0xFF00FF} );
var frontFoot = new THREE.Mesh( frontFootGeometry, frontFootMaterial );
flegFoot.add(frontFoot);
frontFoot.position.set(0,1,0);
flegGroup.rotateZ(THREE.MathUtils.degToRad(180));

var rlegGroup = flegGroup.clone();
bodyGroup.add(rlegGroup);

flegGroup.position.set(-1,-1,0)
flegGroup.rotateZ(THREE.MathUtils.degToRad(-35))

rlegGroup.position.set(1,-1,0);
rlegGroup.rotateZ(THREE.MathUtils.degToRad(35))


const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0,0,5);
camera.lookAt(scene.position);
rabbitGroup.position.set(1,2,-4);
/*
var controls = new (function () {

	this.pointCamera = function() {

	}
})();
var gui= new GUI();
gui.add(parameters, "cam_x", 0, 20);
gui.add(parameters, "cam_y", 0, 20);
gui.add(parameters, "cam_z", 0, 20);
*/

function animate() {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );
}

animate();