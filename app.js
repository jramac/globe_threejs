import * as THREE from 'three';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';
import atmosphereVertexShader from './shaders/atmosphereVertex.glsl';
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl';
import { EffectComposer, RectAreaLightHelper, RectAreaLightUniformsLib, RenderPass, ShaderPass } from 'three/examples/jsm/Addons.js';
import emissiveMaterial from './emissiveMaterial.js';
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
            globeTexture:{
                value: new THREE.TextureLoader().load('./img/globe.jpg')
            }
        }
    })
)
scene.add(sphere)
//atmosfera
const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(5,50,50),
    new THREE.ShaderMaterial({
        vertexShader: atmosphereVertexShader,
        fragmentShader: atmosphereFragmentShader,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide
    })
)
atmosphere.scale.set(3.1,3.1,3.1);
scene.add(atmosphere)

camera.position.z = 15;

const composer =  new EffectComposer(renderer);
const renderPass = new RenderPass(scene,camera);
composer.addPass(renderPass);
const shaderPass = new ShaderPass(emissiveMaterial);
composer.addPass(shaderPass);

function animate(){
    requestAnimationFrame(animate)
    composer.render(scene,camera);
    sphere.rotation.y += 0.002
}

animate();