var container, scene, camera, renderer, controls;
var car,stone;
var stoneList=[];
var acceleration=1;

init();

function deg2rad(deg) {
    return deg / 180 * Math.PI;
}

function getRandomArbitrary(min, max){
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function make_random_stones(material)
{
    var a=1*50;
    var b=getRandomInt()
}


function onKey(event) {
    var keycode=event.which;
    if (keycode == 228 || keycode==38)
        car.position.z-=5;
        // acceleration+=2;
    else if (keycode==227 || keycode==40)
        car.position.z+=5;
       // acceleration-=2;
    else if (keycode==177||keycode==37)
        car.position.x-=5;
    else if (keycode==176|| keycode==39)
        car.position.x+=5;
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
    var globalLight = new THREE.AmbientLight( 0x404040 ,2);
    scene.add( globalLight );
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

        }));
    var skyGeometry = new THREE.CubeGeometry(1000, 1000, 1000);
    var skyMaterial = new THREE.MeshFaceMaterial(material_array);
    var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
    skyBox.rotation.y += Math.PI / 2;
    scene.add(skyBox);
    // skyBox.frustumCulled=false;

    var stoneGeometry=new THREE.SphereGeometry(1,18,18);
    var stoneMaterial=new THREE.MeshBasicMaterial({color:0x00ff00});
    var stoneTexture=new THREE.TextureLoader().load('stone.jpg');
    var stoneNormalMap=new THREE.TextureLoader().load('NormalMap.png');
    var stoneDisplacementMap=new THREE.TextureLoader().load('DisplacementMap.png');
    var stoneMaterial=new THREE.MeshStandardMaterial({map:stoneTexture,normalMap:stoneNormalMap,displacementMap:stoneDisplacementMap,metalness:0});
    stone=new THREE.Mesh(stoneGeometry,stoneMaterial);
    stone.position.set(100,0,380);

    var stoneLight=new THREE.SpotLight(0xf0e4f9,300,15,deg2rad(10),1,1);
    stoneLight.position.set(4,12,-4);
    var stoneLightHelper=new THREE.SpotLightHelper(stoneLight);
    stone.add(stoneLight);
    scene.add(stone);
    // car.
    var carGeometry=new THREE.BoxGeometry(5,5,5);
    var carMaterial=new THREE.MeshBasicMaterial({color:0xff0000,wireframe:false,opacity:0.9,transparent:true});
    car=new THREE.Mesh(carGeometry,carMaterial);
    // car.position.set(0, 1,200); //15
    car.position.set(0, 0,400); //15
    //Camera
    scene.add(car);
    car.add(camera)
    document.addEventListener("keydown", onKey,false);

    //stone
    // var stoneTexture=new THREE.TextureLoader().load('stone.jpg');
    // var stoneNormalMap=new THREE.TextureLoader().load('NormalMap.png');
    // var stoneDisplacementMap=new THREE.TextureLoader().load('DisplacementMap.png');

    // var stoneMaterial=new THREE.MeshStandardMaterial({map:stoneTexture,normalMap:stoneNormalMap,displacementMap:stoneDisplacementMap});



    function render() {
        // stone.position.x-=0.1; //TODO: Animacja kulki
        // stone.rotate(2);
        // car.position.z-=1;
        // skyBox.position.z-=0.2;
        renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(render);
}