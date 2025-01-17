import * as THREE from 'three';
const emissiveMaterial = new THREE.ShaderMaterial({
    uniforms: {
        tDiffuse: { value: null }, // Render target texture
        time: { value: 0.0 },      // Animation time
        uScale: { value: 1.0 }     // Scale factor
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
        uniform float time;          // Time for animation
        varying vec2 vUv;            // UV coordinates
        uniform float uScale;        // Uniform for scaling the texture

        void main() {
            vec2 p = vUv;
            vec2 toCenter = vec2(0.5)-vUv;


            float distance = distance(vUv,vec2(0.5,0.5))*0.05;

            //float distancee = 5.;
            // Apply scaling centered around (0.5, 0.5)
            vec2 centeredUv = p - 0.5; // Shift UV to center
            centeredUv *= uScale;      // Apply scale factor
            p = centeredUv + 0.5;      // Shift back

            // Sample the rendered scene texture
            vec4 color = texture2D(tDiffuse, p);
            
            // Generate a brightness pattern (old TV style)
            float brightness =  0.5 + 0.5 * sin(vUv.y * 1400.0 + time * 100.0); // Sine waves for scanlines

            vec4 cr = texture2D(tDiffuse, p + vec2(0.2*distance, 0.0));
            vec4 cg = texture2D(tDiffuse, p);
            vec4 cb = texture2D(tDiffuse, p - vec2(0.2*distance, 0.0));

            vec3 preFinish = vec3(cr.r, cg.g, cb.b);
            vec3 finalColor = mix(preFinish.rgb, vec3(brightness), 0.1);
            //finalColor.g-=5.*distance;
            finalColor.r+=2.*distance;
            finalColor.b+=4.*distance;
            //finalColor-=1.6*distance;


            // Output the final color
            gl_FragColor = vec4(finalColor, color.a);
        }
    `,
    side: THREE.DoubleSide,
});
export default emissiveMaterial;