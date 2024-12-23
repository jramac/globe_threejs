varying vec3 vertexNormal;
void main(){
    float intensity = pow(0.4 - dot(vertexNormal, vec3(0.0,0.0,1.0)),3.0);
    gl_FragColor = vec4(vec3(0.1,0.3,0.5)*intensity,1.0);
}