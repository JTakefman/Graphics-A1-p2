import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var axes = new THREE.AxesHelper(20);
scene.add(axes);

var rabbitGroup = new THREE.Group();
scene.add(rabbitGroup);

const phiStart = 0;
const phiEnd = Math.PI * 2;
const thetaStart = 0;
const thetaEnd = Math.PI / 2;

const bodyMaterial = new THREE.MeshBasicMaterial( { color: 0xFFA500 } );
var bodyGeometry = new THREE.CylinderGeometry(1,1,5,32)
var bodyCylinder = new THREE.Mesh(bodyGeometry, bodyMaterial);
scene.add(bodyCylinder);
bodyCylinder.rotateZ(THREE.MathUtils.degToRad(90));

rabbitGroup.add(bodyCylinder);
var bodyGroup = new THREE.Group();
rabbitGroup.add(bodyGroup);

const geometry = new THREE.SphereGeometry( 1, 32, 16, phiStart, phiEnd, thetaStart, thetaEnd );
const material = new THREE.MeshBasicMaterial( { color: 0xFFA500} );
var neck = new THREE.Mesh( geometry, material );
neck.position.set(-2.5,0,0);
neck.rotateZ(THREE.MathUtils.degToRad(90))
bodyGroup.add(neck);

rabbitGroup.position.set(0,0,0);

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


camera.position.set(0,0,5);
camera.lookAt(scene.position);


function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

animate();