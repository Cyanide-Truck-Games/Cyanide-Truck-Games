var camera, scene, renderer

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000)
renderer = new THREE.WebGLRenderer();

let controls = new THREE.PointerLockControls(camera, renderer.domElement);

var keyboard = {};
var player = {height:15, speed:2};

const width = window.innerWidth;
const height = window.innerHeight;

const audioListener = new THREE.AudioListener();

camera.add( audioListener );

const sound = new THREE.Audio( audioListener );

scene.add(sound);

const loader = new THREE.AudioLoader();

loader.load(
	'audio/The Future is Boring.mp3',

	function ( audioBuffer ) {
		sound.setBuffer( audioBuffer );
		sound.setLoop( true );
		sound.play();
	},

	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	},

	function ( err ) {
		console.log( 'There was an error loading the audio...' );
	}
);

var USE_WIREFRAME = false;

function init() {
    var mtlLoader = new THREE.MTLLoader();

    mtlLoader.load("models/corridor/corridor.mtl", function(corridorMaterials) {
        corridorMaterials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(corridorMaterials);

        objLoader.load("models/corridor/corridor.obj", function(corridorMesh) {
            scene.add(corridorMesh);
        });
    });

    mtlLoader.load("models/guard/ig1.mtl", function(guardMaterials) {
        guardMaterials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(guardMaterials);

        objLoader.load("models/guard/ig1.obj", function(guardMesh) {
            scene.add(guardMesh);
        });
    });
    ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);
    
    light = new THREE.PointLight(0xffffff, 10, 18);
    light.position.set(0, 0, 100);
	light.castShadow = true;
	light.shadow.camera.near = 0.1;
	light.shadow.camera.far = 25;
    scene.add(light);

    light2 = new THREE.PointLight(0xffffff, 10, 18);
    light2.position.set(0, 0, 37);
	light2.castShadow = true;
	light2.shadow.camera.near = 0.1;
	light2.shadow.camera.far = 25;
    scene.add(light2);
    
    camera.position.set(0, player.height, -5);
    camera.lookAt(new THREE.Vector3(0, player.height, 0));
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    document.body.appendChild(renderer.domElement);

    animate();
}

function animate() {
	requestAnimationFrame(animate);

    controls.lock()

    if(keyboard[87]){
		controls.moveForward(player.speed)
	}
	if(keyboard[83]){
		controls.moveForward(-player.speed)
	}
	if(keyboard[65]){
		controls.moveRight(-player.speed)
	}
	if(keyboard[68]){
		controls.moveRight(player.speed)
	}

	if(keyboard[67]){
		player.speed = 1;
	}
	else {
		player.speed = 0.5;
    }
    
    renderer.render(scene, camera);
}

function keyDown(event){
	keyboard[event.keyCode] = true;
}

function keyUp(event){
	keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

window.onload = init;