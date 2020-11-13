var scene, camera, renderer, mesh;
var meshFloor, ambientLight, light;

var keyboard = {};
var player = {height:1.8, speed:0.2};

renderer = new THREE.WebGLRenderer();
camera = new THREE.PerspectiveCamera(90, 1280/720, 0.1, 1000);
scene = new THREE.Scene();

let controls = new THREE.PointerLockControls(camera, renderer.domElement);

var USE_WIREFRAME = true;

function init(){
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

	document.body.appendChild(renderer.domElement);
	
	animate();
}

function animate(){
	requestAnimationFrame(animate);

	controls.lock()
	
	mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;
    
    mesh2.rotation.x += 0.01;
	mesh2.rotation.y += 0.02;
	
	mesh3.rotation.x += 0.01;
	mesh3.rotation.y += 0.02;

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