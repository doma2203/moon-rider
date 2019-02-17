var container, scene, camera, renderer, controls;
var car;

init();

function deg2rad(deg) {
    return deg / 180 * Math.PI;
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
    //            }

    // if (keyboard.pressed("left") || keyboard.pressed("A")) {
    //     if (movingCube.position.x > -270)

    scene.background = new THREE.Color(0x93beff);
    camera = new THREE.PerspectiveCamera(70, screenWidth / screenHeight, 10, 1000);
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
            side: THREE.BackSide
        }));
    var skyGeometry = new THREE.CubeGeometry(1000, 1000, 1000);
    var skyMaterial = new THREE.MeshFaceMaterial(material_array);
    var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
    skyBox.rotation.y += Math.PI / 2;
    scene.add(skyBox);


    //Car
    // car=THREE.Object3D();
    // var geometry = new THREE.PlaneGeometry( 30, 30, 70, 70);
    // geometry.rotateZ(deg2rad(50));
    // var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    // var plane = new THREE.Mesh( geometry, material);
    // scene.add( plane );

    // car.
    // var carGeometry=new THREE.CubeGeometry(50,50,50,10,10,10);
    // var carMaterial=new THREE.MeshLambertMaterial({color:0xff0000});
    // car=new THREE.Mesh(carGeometry,carMaterial);
    // car.position.set(0, 0, 200);
    //Camera
    // scene.add(car);


    // camera.lookAt(new THREE.vector(0,-2,10);
    //car.add(camera);
    //camera.lookAt(car);

    function render() {

        // camera.lookAt(car.position);
        renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(render);
}