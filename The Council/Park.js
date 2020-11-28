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

var composer = new THREE.EffectComposer(renderer);

var renderPass = new THREE.RenderPass(scene, camera)
composer.addPass(renderPass)
renderPass.renderToScreen = true;

const bloomparams = {
	exposure: 2,
	bloomStrength: 1,
	bloomThreshold: 0,
	bloomRadius: 1
};

var bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85);
bloomPass.threshold = bloomparams.bloomThreshold;
bloomPass.strength = bloomparams.bloomStrength;
bloomPass.radius = bloomparams.bloomRadius;

composer.addPass(bloomPass)
bloomPass.renderToScreen = true;

function init() {
    var mtlLoader = new THREE.MTLLoader();

    mtlLoader.load("models/park/materials.mtl", function(parkMaterials) {
        parkMaterials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(parkMaterials);

        objLoader.load("models/park/model.obj", function(parkMesh) {
			scene.add(parkMesh);
			parkMesh.scale.set(1000, 1000, 1000)
			parkMesh.position.y += 100
        });
    });

    ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
	scene.add(ambientLight);
	
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
    
    composer.render();
}

function keyDown(event){
	keyboard[event.keyCode] = true;
}

function keyUp(event){
	keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

camera.aspect = width / height;
camera.updateProjectionMatrix();

renderer.setSize( width, height );
composer.setSize( width, height );

window.onload = init;