import * as THREE from 'three';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';
import { EffectComposer, RectAreaLightHelper, RectAreaLightUniformsLib, RenderPass, ShaderPass } from 'three/examples/jsm/Addons.js';
import emissiveMaterial from './emissiveMaterial.js';
import emissiveMaterialOriginal from './emissiveMaterialOriginal.js';
import original from './original.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    innerWidth/innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({antialias:true});
const renderer2 = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(innerWidth,innerHeight);
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement);

renderer2.setSize(innerWidth,200);
renderer2.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer2.domElement);

//create a sphere
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('./img/text.jpeg');
const sphere = new THREE.Mesh(
    new THREE.CylinderGeometry(1,1,6,6),
    new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms:{
            uMap:{
                value: texture
            }
        }
    })
   //new THREE.MeshBasicMaterial({map:texture})
)

const plane  = new THREE.Mesh(
    new THREE.BoxGeometry(0.5,0.5,0.5),
    new THREE.MeshNormalMaterial()
);
plane.position.z = -4
plane.position.y = 0
sphere.position.z = -6

scene.add(plane)
scene.add(sphere)
sphere.rotation.z = Math.PI/2;
sphere.position.y = 5;



camera.position.z = 5;

const composer =  new EffectComposer(renderer);
const renderPass = new RenderPass(scene,camera);
composer.addPass(renderPass);
//--------> light spill <---------
const shaderPass = new ShaderPass(emissiveMaterial);
composer.addPass(shaderPass);

// const orig = new ShaderPass(original);
// composer.addPass(orig);
//--------> TV SHADER <---------
const shaderPass2 = new ShaderPass(emissiveMaterialOriginal);
//composer.addPass(shaderPass2);

let scrollPosition = 0;
window.addEventListener("wheel", (event) => {
    event.preventDefault(); // Prevent page scrolling
    scrollPosition -= event.deltaY * 0.001; // Adjust sensitivity
    sphere.rotation.x = scrollPosition; // Rotate based on scroll
  }, { passive: false });

function animate(){
    requestAnimationFrame(animate)
    composer.render(scene,camera);
    //sphere.rotation.y -= 0.002
}

animate();