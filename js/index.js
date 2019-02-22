var container, scene, camera, renderer, controls;
var car, stone;
var stoneList = [];
var stoneTexture = new THREE.TextureLoader().load('stone.jpg');
var stoneMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
var stoneNormalMap = new THREE.TextureLoader().load('NormalMap.png');
var stoneDisplacementMap = new THREE.TextureLoader().load('DisplacementMap.png');
var score = 0;
var scoreText = document.getElementById('score');
var crash = 0;
var crashId = "";
var lastCrashId = "";


init();

function deg2rad(deg) {
    return deg / 180 * Math.PI;
}

function rotateStone(initPosX) {
    var angle = 8;
    var mult = initPosX / -100;
    stone.position.x += (mult * 0.1);
    stone.rotateOnAxis(new THREE.Vector3(1, 0, 0), mult * deg2rad(angle))

}


function count_score() {
    if (crash) {
        car.material.transparent = false;
        car.material.opacity = 0.2;
    //     if (crashId == lastCrashId) {
    //         score -= 100;
    //         lastCrashId = crashId;
    //     }
    // }else {
    //         car.material.transparent=True;
    //         car.material.opacity=0.5;
    //     }
    }
    score += 0.1;
    scoreText.innerText = "Score: " + Math.floor(score);
}


function create_random_stones(material) {
    var stoneGeometry = new THREE.SphereGeometry(1, 18, 18);

    var stoneMaterial = new THREE.MeshStandardMaterial({
        map: stoneTexture,
        normalMap: stoneNormalMap,
        displacementMap: stoneDisplacementMap,
        metalness: 0
    });
    stone = new THREE.Mesh(stoneGeometry, stoneMaterial);
    stone.position.set(-100, 0, 380);

    // var stoneLight=new THREE.SpotLight(0xf0e4f9,300,15,deg2rad(10),1,1);
    // stoneLight.position.set(4,12,-4);
    // var stoneLightHelper=new THREE.SpotLightHelper(stoneLight);
    // stone.add(stoneLight);
    scene.add(stone);

    // var a=1*50;
    // var b=getRandomInt()
}


function onKey(event) {
    var keycode = event.which;
    if (keycode == 228 || keycode == 38)
        car.position.z -= 5;
    // acceleration+=2;
    else if (keycode == 227 || keycode == 40)
        car.position.z += 5;
    // acceleration-=2;
    else if (keycode == 177 || keycode == 37)
        car.position.x -= 5;
    else if (keycode == 176 || keycode == 39)
        car.position.x += 5;
    document.a
}

function init() {
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(screenWidth, screenHeight);
    renderer.vr.enabled = true;
    document.body.appendChild(renderer.domElement);
    document.body.appendChild(WEBVR.createButton(renderer));
    scene = new THREE.Scene();

    scene.background = new THREE.Color(0x93beff);
    camera = new THREE.PerspectiveCamera(30000, screenWidth / screenHeight, 1, 10000);
    // camera.position.set(0, 0, 0);
    scene.add(camera);
    var globalLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(globalLight);
    var light = new THREE.DirectionalLight(0xfff0f0, 0.8);
    light.position.set(-30, 25, 0);
    // var helper = new THREE.DirectionalLightHelper( light, 15 );
    scene.add(light);

    var skybox_dest = "ame_purple/purplevalley_";
    // var skybox_dirs=["rt","lf","up","dn","bk","ft"];
    var skybox_dirs = ["ft", "bk", "up", "dn", "rt", "lf"];
    // var skybox_dirs=["rt","lf","dn","bk","up","ft"];
    var skybox_suffix = ".tga";
    var material_array = [];
    var TextureLoader = new THREE.TGALoader();

    for (var i = 0; i < 6; i++)
        material_array.push(new THREE.MeshBasicMaterial({
            map: TextureLoader.load(skybox_dest + skybox_dirs[i] + skybox_suffix),
            side: THREE.BackSide,
            normalMap: new TextureLoader.load(skybox_dest + skybox_dirs[i] + "_nm" + skybox_suffix)
        }));
    var skyGeometry = new THREE.CubeGeometry(1000, 1000, 1000);
    var skyMaterial = new THREE.MeshFaceMaterial(material_array);
    var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
    skyBox.rotation.y += Math.PI / 2;
    scene.add(skyBox);
    var stoneGeometry = new THREE.SphereGeometry(1, 18, 18);
    var stoneMaterial = new THREE.MeshStandardMaterial({
        map: stoneTexture,
        normalMap: stoneNormalMap,
        displacementMap: stoneDisplacementMap,
        metalness: 0
    });
    stone = new THREE.Mesh(stoneGeometry, stoneMaterial);
    stone.position.set(-100, 0, 380);

    var stoneLight = new THREE.SpotLight(0xf0e4f9, 300, 15, deg2rad(10), 1, 1);
    stoneLight.position.set(4, 12, -4);
    var stoneLightHelper = new THREE.SpotLightHelper(stoneLight);
    stone.add(stoneLight);
    scene.add(stone);
    // car.
    var carGeometry = new THREE.BoxGeometry(5, 5, 5);
    var carMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: false, transparent: true});
    car = new THREE.Mesh(carGeometry, carMaterial);
    // car.position.set(0, 1,200); //15
    car.position.set(0, 0, 400); //15
    //Camera
    scene.add(car);
    car.add(camera);
    document.addEventListener("keydown", onKey, false);

    // var points=document.getElementById('score-container');
    // points.innerHTML="aaa";


    function render() {
        count_score();
        rotateStone(-100);
        car.position.z -= 0.1;
        renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(render);
}