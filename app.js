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
    new THREE.SphereGeometry(5,50,50),
    new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms:{
            uMap:{
                value: new THREE.TextureLoader().load('./img/map.jpg')
            }
        }
    })
)
scene.add(sphere)
//atmosfera
const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5,30,30),
    new THREE.ShaderMaterial({
        vertexShader: vertexPost,
        fragmentShader: fragmentPost,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide
    })
)
atmosphere.scale.set(3.1,3.1,3.1);
//scene.add(atmosphere)

camera.position.z = 10;

const composer =  new EffectComposer(renderer);
const renderPass = new RenderPass(scene,camera);
composer.addPass(renderPass);
//--------> TV SHADER <---------
const shaderPass = new ShaderPass(emissiveMaterial);
composer.addPass(shaderPass);

const shaderPass2 = new ShaderPass(emissiveMaterialOriginal);
composer.addPass(shaderPass2);

function animate(){
    requestAnimationFrame(animate)
    composer.render(scene,camera);
    sphere.rotation.y -= 0.002
}

animate();