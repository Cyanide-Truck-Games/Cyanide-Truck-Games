var scene, camera, renderer, mesh;
var meshFloor, ambientLight, light;

var keyboard = {};
var player = {height:1.8, speed:0.2};

renderer = new THREE.WebGLRenderer();
camera = new THREE.PerspectiveCamera(90, 1280/720, 0.1, 1000);
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
	var button = document.getElementById("button");
	button.remove();

	var title = document.getElementById("title-text");
	title.remove();

	var dwe = document.getElementById("dwe");
	dwe.remove();

	var db = document.getElementById("db");
	db.remove();

	var settings = document.getElementById("settings");
	settings.remove();

	var ma = document.getElementById("ma");
	ma.remove();

	if (USE_BLOOM) {
		composer.addPass(bloomPass)
		bloomPass.renderToScreen = true;
	}

	mesh = new THREE.Mesh(
		new THREE.BoxGeometry(1,1,1),
		new THREE.MeshPhongMaterial({color:0xff4444, wireframe:USE_WIREFRAME})
	);
	mesh.position.y += 1;
	mesh.receiveShadow = true;
	mesh.castShadow = true;
	scene.add(mesh);
	
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

    mesh2 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshPhongMaterial({color:0xff4444, wireframe:USE_WIREFRAME})
    )
    mesh2.position.y += 1;
    mesh2.position.set(30, 1, 50)
	mesh2.receiveShadow = true;
	mesh2.castShadow = true;
    scene.add(mesh2);
    
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
	
	mesh3 = new THREE.Mesh(
		new THREE.BoxGeometry(1, 1, 1),
		new THREE.MeshPhongMaterial({color:0xff4444, wireframe:USE_WIREFRAME})
	)
	mesh3.position.y += 1;
    mesh3.position.set(-20, 1, 40)
	mesh3.receiveShadow = true;
	mesh3.castShadow = true;
	scene.add(mesh3);
	
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

	box = new THREE.Mesh(
		new THREE.BoxGeometry(20, 20, 20, 20),
		new THREE.MeshPhongMaterial({color:0xff4444, wireframe:USE_WIREFRAME})
	)
	box.receiveShadow = true;
    box.castShadow = true;
    box.position.set(-30, 0, 70)
	scene.add(box)

	box2 = new THREE.Mesh(
		new THREE.BoxGeometry(20, 20, 20, 20),
		new THREE.MeshPhongMaterial({color:0xff4444, wireframe:USE_WIREFRAME})
	)
	box2.receiveShadow = true;
    box2.castShadow = true;
    box2.position.set(70, 0, 20)
	scene.add(box2)

	box3 = new THREE.Mesh(
		new THREE.BoxGeometry(20, 20, 20, 20),
		new THREE.MeshPhongMaterial({color:0xff4444, wireframe:USE_WIREFRAME})
	)
	box3.receiveShadow = true;
    box3.castShadow = true;
    box3.position.set(-50, 0, 10)
	scene.add(box3)

	box4 = new THREE.Mesh(
		new THREE.BoxGeometry(20, 20, 20, 20),
		new THREE.MeshPhongMaterial({color:0xff4444, wireframe:USE_WIREFRAME})
	)
	box4.receiveShadow = true;
    box4.castShadow = true;
    box4.position.set(0, 0, -50)
	scene.add(box4)

	circleMesh = new THREE.Mesh(
		new THREE.CircleGeometry(50, 50, 50, 50),
		new THREE.MeshPhongMaterial({color:0xffffff, wireframe:USE_WIREFRAME})
	)
	circleMesh.receiveShadow = true;
    circleMesh.castShadow = true;
	circleMesh.position.set(0, -20, 0)
	circleMesh.rotation.x -= Math.PI / 2;
	scene.add(circleMesh)

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
			'GW_Theme.mp3',

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

	controls.lock()
	
	mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;
    
    mesh2.rotation.x += 0.01;
	mesh2.rotation.y += 0.02;
	
	mesh3.rotation.x += 0.01;
	mesh3.rotation.y += 0.02;

	box.rotation.x += 0.01;
	box2.rotation.x += 0.01;
	box3.rotation.x += 0.01;
	box4.rotation.x += 0.01;

	cylinderMesh.rotation.x += 0.001;
	cylinderMesh.rotation.y += 0.001;

	sphereMesh.rotation.y += 0.01

	sphereMesh2.rotation.y += 0.01

	sphereMesh3.rotation.y += 0.01

	circleMesh.rotation.z -= 0.01

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

	if(keyboard[32]){
		camera.position.y += player.speed;
	}

	if(keyboard[16]){
		camera.position.y -= player.speed;
	}

	if(keyboard[67]){
		player.speed = 0.5;
	}
	else {
		player.speed = 0.2;
	}

	composer.render();
	stats.end();
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