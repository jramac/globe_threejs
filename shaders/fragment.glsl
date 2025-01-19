uniform sampler2D uMap;
varying vec2 vUv;
varying vec3 vertexNormal;
void main(){
    vec4 c = texture2D(uMap,vUv.yx);
    gl_FragColor = vec4(vUv,0.0,1.);
    gl_FragColor = vec4(vec3(1. - c.r),1.);
}