import * as THREE from 'three';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';
import vertexPost from './shaders/vertexPost.glsl';
import fragmentPost from './shaders/fragmentPost.glsl';
import { EffectComposer, RectAreaLightHelper, RectAreaLightUniformsLib, RenderPass, ShaderPass } from 'three/examples/jsm/Addons.js';
import emissiveMaterial from './emissiveMaterial.js';
import emissiveMaterialOriginal from './emissiveMaterialOriginal.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    innerWidth/innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(innerWidth,innerHeight);
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement);

//create a sphere
const sphere = new THREE.Mesh(
    new THREE.CylinderGeometry(1,1,3,7),
    new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms:{
            uMap:{
                value: new THREE.TextureLoader().load('./img/tex-modified.png')
            }
        }
    })
)
scene.add(sphere)
sphere.rotation.z = Math.PI/2;
//sphere.position.y = 4;
//sphere.position.y = 4;



camera.position.z = 3;

const composer =  new EffectComposer(renderer);
const renderPass = new RenderPass(scene,camera);
composer.addPass(renderPass);
//--------> TV SHADER <---------
const shaderPass = new ShaderPass(emissiveMaterial);
composer.addPass(shaderPass);

const shaderPass2 = new ShaderPass(emissiveMaterialOriginal);
composer.addPass(shaderPass2);

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