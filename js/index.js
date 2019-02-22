var container, scene, camera, renderer, controls;
var car, stone;
var stoneList = [];
var stoneTexture = new THREE.TextureLoader().load('stone.jpg');
//var stoneMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
var stoneMaterial = new THREE.MeshStandardMaterial({
    map: stoneTexture,
    normalMap: stoneNormalMap,
    displacementMap: stoneDisplacementMap,
    metalness: 0
});
var stoneNormalMap = new THREE.TextureLoader().load('NormalMap.png');
var stoneDisplacementMap = new THREE.TextureLoader().load('DisplacementMap.png');
var score = 0;
var id=0;
var scoreText = document.getElementById('score');
var crash = 0;
var crashId = "";
var lastCrashId = "";
var collideMeshList=[];
var posOffset=6;

init();

function deg2rad(deg) {
    return deg / 180 * Math.PI;
}

function setStartPositionOnX(){

}

function rotateStone(s) {
    var angle = 10;
    var mult = s.position.z / -100;
    s.position.x += (mult * getRandomSpeed(0.01,0.4));
    s.rotateOnAxis(new THREE.Vector3(1, 0, 0), mult * deg2rad(angle));
}

function getRandomInt(lower,upper){
    return Math.floor((Math.random()*upper)+lower);
}

function getRandomSpeed(upper,lower) {
    return Math.random()*upper+lower;
}

function count_score() {
    var originPoint=car.position.clone();
    // for (var vertexIndex=0;vertexIndex<car.geometry.vertices.length;vertexIndex++) {
    //     var localVertex = car.geometry.vertices[vertexIndex].clone();
    //     var globalVertex = localVertex.applyMatrix4(car.matrix);
    //     var directionVector = globalVertex.sub(car.position);
    //     var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
    //         var collisionResults=ray.intersectObject(collideMeshList); //empty
    //         if (collisionResults.length>0 && collisionResults[0].distance()<directionVector.length()){
    //             crash=true;
    //             crashId=collisionResults[0].object.name;
    //             break;
    //         }
    //         crash=false;
    //     }
    //     if (crash) {
    //         car.material.transparent = false;
    //         car.material.opacity = 0.2;
    //         if (crashId == lastCrashId) {
    //             score -= 10;
    //             lastCrashId = crashId;
    //         }
    //     }else {
    //             car.material.transparent=True;
    //             car.material.opacity=0.5;
    //         }
    //     }
    //     if (Math.random()<0.03 && stoneList.length<5)
    //         create_random_stone();
    // }
    if (Math.random()<0.02)
        create_random_stone();
    // else {
    //     stoneList=[];
    // }
    score += 0.1;
    scoreText.innerText = "Score: " + Math.floor(score);
}


function create_random_stone() {
    x=[-200,200,-200,200];
    stoneRadius=getRandomInt(1,4);
    var stoneGeometry = new THREE.SphereGeometry(1, 18, 18);
    var z1=car.position.z-3*getRandomInt(3,posOffset);
    var x1=x[getRandomInt(0,x.length)];
    var y1=0;
    stone = new THREE.Mesh(stoneGeometry, stoneMaterial);
    stone.position.set(x1, y1, z1);
    // var box=THREE.BoxHelper(stone);
    stoneList.push(stone);
    // box.name="box_"+id;
    // id++;
    // collideMeshList.push(stone);
    scene.add(stone);
    // rotateStone(stone);
    // posOffset++;
    // rotateStone(stone);
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
            side: THREE.BackSide
        }));
    var skyGeometry = new THREE.CubeGeometry(1000, 1000, 1000);
    var skyMaterial = new THREE.MeshFaceMaterial(material_array);
    var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
    skyBox.rotation.y += Math.PI / 2;
    scene.add(skyBox);
    // var stoneGeometry = new THREE.SphereGeometry(1, 18, 18);
    // stone = new THREE.Mesh(stoneGeometry, stoneMaterial);
    // stone.position.set(-100, 0, 390);
    // stone.geometry.shadow=true;
    // var stoneLight = new THREE.SpotLight(0xf0e4f9, 300, 15, deg2rad(10), 1, 1);
    // stoneLight.position.set(4, 12, -4);
    // var stoneLightHelper = new THREE.SpotLightHelper(stoneLight);
    // stone.add(stoneLight);
    // scene.add(stone);
    // car.
    var carGeometry = new THREE.BoxGeometry(5, 5, 5);
    var carMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: false, transparent: true});
    car = new THREE.Mesh(carGeometry, carMaterial);
    // car.position.set(0, 1,200); //15
    car.position.set(0, 0, 410); //15
    //Camera
    scene.add(car);
    car.add(camera);
    document.addEventListener("keydown", onKey, false);

    // var points=document.getElementById('score-container');
    // points.innerHTML="aaa";


    function render() {
        count_score();
        // rotateStone(100);
        for (var j=0;j<stoneList.length;j++)
            rotateStone(stoneList[j])
        car.position.z -= 0.1;
        renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(render);
}