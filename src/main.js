import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Scene, WebGLRenderer, PerspectiveCamera, DirectionalLight, HemisphereLight } from 'three';
// Vector3, BoxGeometry, MeshBasicMaterial, Mesh, AmbientLight,

let renderer = new WebGLRenderer({antialias: true});

let mousePos = [0,0];
document.addEventListener("mousemove", (e) => {mousePos[0] = e.clientX; mousePos[1] = e.clientY});

function addMask(container, ctx, sizeW, sizeH) {
    let camera = new PerspectiveCamera( 75, sizeW / sizeH, 0.1, 1000 );
    camera.position.z = 5;
    
    renderer.setSize( sizeW, sizeH );
    
    const scene = new Scene();
    
    // let light = new AmbientLight( 0x404040, 0.5 ); // soft white light
    // scene.add( light );
    
    var directionalLight = new DirectionalLight( 0xffffff, 0.6 );
    directionalLight.position.set(0,1,1);
    scene.add( directionalLight );
    
    // var light = new HemisphereLight( 0xffffbb, 0x080820, 1 );
    var light = new HemisphereLight( 0xffffff, 0x000000, 1 );
    scene.add( light );
    
    let loader = new GLTFLoader();
    let model;
    loader.load( 'head.glb', function ( gltf ) {
        console.log("ADD OBJECT");
        model = gltf.scene;
        scene.add(model);
        // directionalLight.target = model;
    }, undefined, function ( error ) {
        console.error( error );
    } );
    
    function animate() {
        if (model) {
            let bounds = container.getBoundingClientRect();
            let x = mousePos[0] - bounds.x - bounds.width/2;
            let y = mousePos[1] - bounds.y - bounds.height/2;

            model.lookAt(x, -y, 150);
        }
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
        ctx.drawImage(renderer.domElement, 0, 0);
    }
    animate();
}

let overlay = document.getElementsByClassName("overlay")[0];
function closeOverlay () {
    overlay.classList.add("hidden");
}
function openOverlay () {
    overlay.classList.remove("hidden");
}

let closeButton = document.getElementsByClassName("close")[0];

overlay.addEventListener("click", closeOverlay);
closeButton.addEventListener("click", closeOverlay);

let exhibits = document.getElementsByClassName("exhibit");
for (let i = 0; i < exhibits.length; i++) {
    let canvas = document.createElement("canvas");
    exhibits[i].appendChild(canvas);
    canvas.width = exhibits[i].clientWidth;
    canvas.height = exhibits[i].clientHeight;
    let ctx = canvas.getContext("2d");
    addMask(exhibits[i], ctx, exhibits[i].clientWidth, exhibits[i].clientHeight);
    exhibits[i].addEventListener("click", (el) => {
        console.log("CLICK", el);
        openOverlay();
    })
}

window.exhibits = exhibits;