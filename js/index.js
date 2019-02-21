var container, scene, camera, renderer, controls;
var car,stone;
var acceleration=1;

init();

function deg2rad(deg) {
    return deg / 180 * Math.PI;
}



function onKey(event) {
    var keycode=event.which;
    // if (keycode == 228 || keycode==38)
        // acceleration+=2;
    // else if (keycode==227 || keycode==40)
       // acceleration-=2;
     if (keycode==177||keycode==37)
        car.position.x-=3;
    else if (keycode==176|| keycode==39)
        car.position.x+=3;
    
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
    // skyBox.rotation.y += Math.PI / 2;
    scene.add(skyBox);
    // skyBox.frustumCulled=false;

    var stoneGeometry=new THREE.SphereGeometry(5,8,8);
    var stoneMaterial=new THREE.MeshBasicMaterial({color:0x00ff00});
    stone=new THREE.Mesh(stoneGeometry,stoneMaterial);
    stone.position.set(0,1,13);
    scene.add(stone);

    // car.
    var carGeometry=new THREE.BoxGeometry(5,5,5);
    var carMaterial=new THREE.MeshBasicMaterial({color:0xff0000,wireframe:true,opacity:0.5});
    car=new THREE.Mesh(carGeometry,carMaterial);
    // car.position.set(0, 1,200); //15
    car.position.set(0, 1,15); //15
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
        // car.position.z-=acceleration;
        // skyBox.position.z-=0.2;
        renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(render);
}