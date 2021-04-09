var scene, camera, renderer, mesh;
var meshFloor, ambientLight, light;

var keyboard = {};
var player = {height:1.8, speed:0, ySpeed:0};

var fuel = 10000
var boost = 500
var autopilot = false;

renderer = new THREE.WebGLRenderer();
camera = new THREE.PerspectiveCamera(100, 1280/720, 0.1, 100000);
scene = new THREE.Scene();

var composer = new THREE.EffectComposer(renderer);

var renderPass = new THREE.RenderPass(scene, camera)
composer.addPass(renderPass)
renderPass.renderToScreen = true;

const bloomparams = {
	exposure: 1,
	bloomStrength: 3,
	bloomThreshold: 0,
	bloomRadius: 0
};

var bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85);
bloomPass.threshold = bloomparams.bloomThreshold;
bloomPass.strength = bloomparams.bloomStrength;
bloomPass.radius = bloomparams.bloomRadius;

let controls = new THREE.PointerLockControls(camera, renderer.domElement);

const width = window.innerWidth;
const height = window.innerHeight;

var USE_WIREFRAME = true;

var USE_BLOOM = true;
var USE_AUDIO = true;

var stats = new Stats();

stats.showPanel( 0 );
document.body.appendChild( stats.dom );

function init(){
	var bwrap = document.getElementById("bwrap");
	bwrap.remove();

	var title = document.getElementById("title-text");
	title.remove();

	if (USE_BLOOM) {
		composer.addPass(bloomPass)
		bloomPass.renderToScreen = true;
	}
	
	meshFloor = new THREE.Mesh(
		new THREE.PlaneGeometry(10,10, 10,10),
		new THREE.MeshPhongMaterial({color:0xffffff, wireframe:USE_WIREFRAME})
	);
	meshFloor.rotation.x -= Math.PI / 2;
	meshFloor.receiveShadow = true;
    scene.add(meshFloor);
    
    sphereMesh = new THREE.Mesh(
        new THREE.SphereGeometry(10, 10, 10, 10),
        new THREE.MeshPhongMaterial({color:0xffffff, wireframe:USE_WIREFRAME})
    )
    sphereMesh.receiveShadow = true;
    sphereMesh.castShadow = true;
    scene.add(sphereMesh)

	planetMesh = new THREE.Mesh(
        new THREE.SphereGeometry(1000, 1000, 10, 10),
        new THREE.MeshPhongMaterial({color:0xff0000, wireframe:false})
    )
    planetMesh.receiveShadow = true;
    planetMesh.castShadow = true;
	planetMesh.position.set(5000, 0, 0)
    scene.add(planetMesh)

	planetMesh2 = new THREE.Mesh(
        new THREE.SphereGeometry(2000, 2000, 10, 10),
        new THREE.MeshPhongMaterial({color:0x00ff00, wireframe:false})
    )
    planetMesh2.receiveShadow = true;
    planetMesh2.castShadow = true;
	planetMesh2.position.set(-4000, 1000, 0)
    scene.add(planetMesh2)

	planetMesh3 = new THREE.Mesh(
        new THREE.SphereGeometry(700, 700, 10, 10),
        new THREE.MeshPhongMaterial({color:0x800080, wireframe:false})
    )
    planetMesh3.receiveShadow = true;
    planetMesh3.castShadow = true;
	planetMesh3.position.set(0, 2000, 0)
    scene.add(planetMesh3)
    
    meshFloor2 = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 10, 10, 10),
        new THREE.MeshPhongMaterial({color:0xffffff, wireframe:USE_WIREFRAME})
    )
    meshFloor2.rotation.x -= Math.PI / 2;
    meshFloor2.position.set(30, 0, 50)
	meshFloor2.receiveShadow = true;
    scene.add(meshFloor2);

    sphereMesh2 = new THREE.Mesh(
        new THREE.SphereGeometry(10, 10, 10, 10),
        new THREE.MeshPhongMaterial({color:0xffffff, wireframe:USE_WIREFRAME})
    )
    sphereMesh2.receiveShadow = true;
    sphereMesh2.castShadow = true;
    sphereMesh2.position.set(30, 1, 50)
	scene.add(sphereMesh2)
	
	meshFloor3 = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 10, 10, 10),
        new THREE.MeshPhongMaterial({color:0xffffff, wireframe:USE_WIREFRAME})
    )
    meshFloor3.rotation.x -= Math.PI / 2;
    meshFloor3.position.set(-20, 0, 40)
	meshFloor3.receiveShadow = true;
	scene.add(meshFloor3);
	
	sphereMesh3 = new THREE.Mesh(
        new THREE.SphereGeometry(10, 10, 10, 10),
        new THREE.MeshPhongMaterial({color:0xffffff, wireframe:USE_WIREFRAME})
    )
    sphereMesh3.receiveShadow = true;
    sphereMesh3.castShadow = true;
    sphereMesh3.position.set(-20, 1, 40)
	scene.add(sphereMesh3)

	cylinderMesh = new THREE.Mesh(
		new THREE.CylinderGeometry(100, 100, 500, 100, 100, true),
		new THREE.MeshPhongMaterial({color:"rgb(0, 0, 255)", wireframe:USE_WIREFRAME})
	)
	cylinderMesh.receiveShadow = true;
	cylinderMesh.castShadow = true;
	cylinderMesh.position.set(0, 0, 0);
	cylinderMesh.rotation.x -= Math.PI / 2;
	scene.add(cylinderMesh);

	ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
	scene.add(ambientLight);
	
	light = new THREE.PointLight(0xffffff, 0.8, 18);
	light.position.set(0, 6, 0);
	light.castShadow = true;
	light.shadow.camera.near = 0.1;
	light.shadow.camera.far = 25;
	scene.add(light);

	light2 = new THREE.PointLight(0xffffff, 0.8, 18);
	light2.position.set(-20, 6, 40);
	light2.castShadow = true;
	light2.shadow.camera.near = 0.1;
	light2.shadow.camera.far = 25;
	scene.add(light2);

	light3 = new THREE.PointLight(0xffffff, 0.8, 18);
	light3.position.set(30, 6, 50);
	light3.castShadow = true;
	light3.shadow.camera.near = 0.1;
	light3.shadow.camera.far = 25;
	scene.add(light3);
	
	camera.position.set(0, player.height, -5);
	camera.lookAt(new THREE.Vector3(0, player.height, 0));
	
	renderer.setSize(window.innerWidth, window.innerHeight);
	
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.BasicShadowMap;

	window.addEventListener( 'resize', onWindowResize );

	document.body.appendChild(renderer.domElement);

	if (USE_AUDIO) {
		const audioListener = new THREE.AudioListener();

		camera.add( audioListener );

		const sound = new THREE.Audio( audioListener );

		scene.add(sound);

		const loader = new THREE.AudioLoader();

		loader.load(
			'GJ_Theme.mp3',
	
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
	}
	
	animate();
}

function animate(){
	stats.begin();
	requestAnimationFrame(animate);

	document.getElementById("boostamount").innerHTML = boost;
	document.getElementById("fuelamount").innerHTML = fuel;

	cylinderMesh.rotation.x += 0.001;
	cylinderMesh.rotation.y += 0.001;

	sphereMesh.rotation.y += 0.01
	sphereMesh2.rotation.y += 0.01
	sphereMesh3.rotation.y += 0.01

	if (fuel > 0)
	{
		controls.moveForward(player.speed)
	}

	if (fuel < 0)
	{
		fuel = 0;
	}

	if(keyboard[87]){
		controls.lock()

		fuel--;

		if (player.speed < 2)
		{
			if (fuel > 0)
			{
				player.speed += 0.001;
			}
		}
	}
	else {
		if (player.speed > 0)
		{
			player.speed -= 0.001;
		}
	}

	if(keyboard[32]){
		fuel--;
		camera.position.y += player.speed;
	}

	if(keyboard[16]){
		fuel--;
		camera.position.y -= player.speed;
	}

	if (keyboard[67]) {
		boost -= 1;

		if (boost > 0)
		{
			fuel -= 2;
			player.speed *= 1.005
		}

		if (boost < 0)
		{
			boost = 0;
		}
	}

	if (keyboard[83]) {
		fuel--;
		if (player.speed > -0.5)
		{
			if (fuel > 0)
			{
				player.speed -= 0.0001;
			}

			if (fuel < 0)
			{
				fuel = 0;
			}
		}
	}
	else {
		if (player.speed < 0)
		{
			player.speed += 0.001;
		}
	}

	if (autopilot) {
		fuel--;

		if (fuel > 0) {
			player.speed = 0.5
		}

		if (fuel < 0) {
			fuel = 0;
		}
	}

	composer.render();
	stats.end();
}

function toggleAutoPilot() {
	if (autopilot) {
		autopilot = false;
	}
	else {
		autopilot = true;
	}
}

function keyDown(event){
	keyboard[event.keyCode] = true;
}

function keyUp(event){
	keyboard[event.keyCode] = false;
}

function onWindowResize() {
	camera.aspect = width / height;
	camera.updateProjectionMatrix();

	renderer.setSize( width, height );
	composer.setSize( width, height );
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

camera.aspect = width / height;
camera.updateProjectionMatrix();

renderer.setSize( width, height );
composer.setSize( width, height );