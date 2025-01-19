import * as THREE from 'three';
const original = new THREE.ShaderMaterial({
    uniforms: {
        tDiffuse: { value: null }, // Render target texture
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform sampler2D tDiffuse;  // Rendered scene texture
        varying vec2 vUv;            // UV coordinates
        void main() {
            vec4 c = texture2D(tDiffuse, vUv);
            gl_FragColor = c;
        }
    `,
    side: THREE.DoubleSide,
});
export default original;