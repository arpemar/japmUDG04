// COLORES
var Colors ={
    red:0xf25346,
    white:0xd8d0d1,
    brown:0x59332e,
    pink:0xF5986E,
    brownDark:0x23190f,
    blue:0x68c3c0,
};

var scene, camera, fieldOfView, aspectRatio, nearPlane, farPlane, renderer, container;
var HEIGHT, WIDTH, mousePos = {x: 0, y: 0 };

function createScene() {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;

    scene = new THREE.Scene();
    aspectRatio = WIDTH / HEIGHT;
    fieldOfView = 60;
    nearPlane = 1;
    farPlane = 10000;
    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

    scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

    // PONER LA POSICION DE LA CAMARA:
    camera.position.x = 0;
    camera.position.z = 220;
    camera.position.y = 100;

    // CREAR EL OBJETO
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true});
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;

    container = document.getElementById('world');
    container.appendChild(renderer.domElement);
    window.addEventListener('resize', handleWindowResize, false);
}

function handleWindowResize() {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
}

//LUCES
var ambientLight, hemisphereLight, shadowLight;

function createLights() {
    hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9);
    ambientLight = new THREE.AmbientLight(0xdc8874, .5);
    shadowLight = new THREE.DirectionalLight(0xffffff, .9);

    //DIRECCION DE LA LUZ:
    shadowLight.position.set(150, 350, 350);

    shadowLight.castShadow = true;
    shadowLight.shadow.camera.left = -400;
    shadowLight.shadow.camera.right = 400;
    shadowLight.shadow.camera.top = 400;
    shadowLight.shadow.camera.bottom = -400;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 1000;

    shadowLight.shadow.mapSize.width = 2048;
    shadowLight.shadow.mapSize.height = 2048;

    scene.add(ambientLight);
    scene.add(hemisphereLight);
    scene.add(shadowLight);
}

var AirPlane = function() {
    this.mesh = new THREE.Object3D();
    this.mesh.name = "airPlane";

    //CUERPO:
    var geomCuerpo = new THREE.BoxGeometry(180,120,100);
    var mateCuerpo = new THREE.MeshPhongMaterial({color: "#fbac95", shading:THREE.FlatShading});
    var cuerpo = new THREE.Mesh(geomCuerpo, mateCuerpo);
    cuerpo.castShadow = true;
    cuerpo.receiveShadow = true;
    this.mesh.add(cuerpo);

    // BOCA:
    var geomBoca = new THREE.BoxGeometry(25,55,60);
    var mateBoca = new THREE.MeshPhongMaterial({color:"#fbac95", shading:THREE.FlatShading});
    var boca = new THREE.Mesh(geomBoca, mateBoca);
    boca.position.x = 100;
    boca.position.y = -5;
    boca.castShadow = true;
    boca.receiveShadow = true;
    this.mesh.add(boca);

    //NARIZ
    var geomNariz = new THREE.BoxGeometry(20,30,60);
    var mateNariz = new THREE.MeshPhongMaterial({color:"#ffc3a2", shading:THREE.FlatShading});
    var nariz = new THREE.Mesh(geomNariz, mateNariz);
    nariz.position.x = 120;
    nariz.position.y = 7;
    nariz.castShadow = true;
    nariz.receiveShadow = true;
    this.mesh.add(nariz);

    // PATAS:
    var geomPata = new THREE.BoxGeometry(20,50,20);
    var matePata = new THREE.MeshPhongMaterial({color:"#ae6d5a", shading:THREE.FlatShading});

    var pataDelIzq = new THREE.Mesh(geomPata, matePata);
    var pataDelDer = new THREE.Mesh(geomPata, matePata);
    var pataTraIzq = new THREE.Mesh(geomPata, matePata);
    var pataTraDer = new THREE.Mesh(geomPata, matePata);

    pataDelIzq.position.x = pataDelDer.position.x = 50;
    pataTraIzq.position.x = pataTraDer.position.x = -50;
    pataDelIzq.position.y = pataDelDer.position.y = pataTraIzq.position.y = pataTraDer.position.y = -70;
    pataDelDer.position.z = pataTraDer.position.z = 30;
    pataDelIzq.position.z = pataTraIzq.position.z = -30;
    pataDelIzq.castShadow = pataDelDer.castShadow = pataTraIzq.castShadow = pataTraDer.castShadow = true;
    pataDelIzq.receiveShadow = pataDelDer.receiveShadow = pataTraIzq.receiveShadow = pataTraDer.receiveShadow = true;

    this.mesh.add(pataDelIzq);
    this.mesh.add(pataDelDer);
    this.mesh.add(pataTraIzq);
    this.mesh.add(pataTraDer);

    //COLA
    var geomCola = new THREE.BoxGeometry(40,40,40);
    var mateCola = new THREE.MeshPhongMaterial({color:"#fbac95", shading:THREE.FlatShading});
    var cola = new THREE.Mesh(geomCola, mateCola);
    cola.position.x = -85;
    cola.castShadow = true;
    cola.receiveShadow = true;
    this.mesh.add(cola);

    // OREJA:
    var geomOreja = new THREE.BoxGeometry(15,25,25);
    var mateOreja = new THREE.MeshPhongMaterial({color:"#fbac95", shading:THREE.FlatShading});
    var orejaDer = new THREE.Mesh(geomOreja, mateOreja);
    var orejaIzq = new THREE.Mesh(geomOreja, mateOreja);

    orejaDer.position.y = orejaIzq.position.y = 70;
    orejaDer.position.x = orejaIzq.position.x = 70;
    orejaDer.position.z = 20;
    orejaIzq.position.z =-20;
    this.mesh.add(orejaDer);
    this.mesh.add(orejaIzq);

    // DIENTE:
    var geomDiente = new THREE.BoxGeometry(12,15,15);
    var mateDiente = new THREE.MeshPhongMaterial({color:"#FFFFFF", shading:THREE.FlatShading});
    var dieDer = new THREE.Mesh(geomDiente, mateDiente);
    var dieIzq = new THREE.Mesh(geomDiente, mateDiente);

    dieDer.position.x = dieIzq.position.x = 115;
    dieDer.position.y = dieIzq.position.y = -25;
    dieDer.position.z = 20;
    dieIzq.position.z =-20;
    this.mesh.add(dieDer);
    this.mesh.add(dieIzq);

    // LENGUA:
    var geomLengua = new THREE.BoxGeometry(25,7,20);
    var mateLengua= new THREE.MeshPhongMaterial({color:"#f97d7d", shading:THREE.FlatShading});
    var lengua = new THREE.Mesh(geomLengua, mateLengua);
    lengua.position.x = 115;
    lengua.position.y = -15;
    this.mesh.add(lengua);

    //FOSAS:
    var geomFosa = new THREE.BoxGeometry(12,15,15);
    var mateFosa = new THREE.MeshPhongMaterial({color:"#000000", shading:THREE.FlatShading});
    var fosaDer = new THREE.Mesh(geomFosa, mateFosa);
    var fosaIzq = new THREE.Mesh(geomFosa, mateFosa);

    fosaDer.position.x = fosaIzq.position.x = 125;
    fosaDer.position.y = fosaIzq.position.y = 10;
    fosaDer.position.z = 20;
    fosaIzq.position.z =-20;
    this.mesh.add(fosaDer);
    this.mesh.add(fosaIzq);


    // OJOS:
    var geomOjo = new THREE.BoxGeometry(10,25,25);
    var mateOjo = new THREE.MeshPhongMaterial({color:"#FFFFFF", shading:THREE.FlatShading});
    var geomPupila = new THREE.BoxGeometry(12,15,15);
    var matePupila = new THREE.MeshPhongMaterial({color:"#000000", shading:THREE.FlatShading});

    var ojoDer = new THREE.Mesh(geomOjo, mateOjo);
    var ojoIzq = new THREE.Mesh(geomOjo, mateOjo);
    var pupilaDer = new THREE.Mesh(geomPupila, matePupila);
    var pupilaIzq = new THREE.Mesh(geomPupila, matePupila);

    ojoDer.position.x = ojoIzq.position.x = pupilaDer.position.x = pupilaIzq.position.x = 95;
    ojoDer.position.y = ojoIzq.position.y = pupilaDer.position.y = pupilaIzq.position.y = 40;
    ojoDer.position.z = pupilaDer.position.z = 20;
    ojoIzq.position.z = pupilaIzq.position.z =-20;

    this.mesh.add(ojoDer);
    this.mesh.add(ojoIzq);
    this.mesh.add(pupilaDer);
    this.mesh.add(pupilaIzq);

    // Correa:
    var geomCorrea = new THREE.BoxGeometry(60,140,110,1,1,1);
    var mateCorrea = new THREE.MeshPhongMaterial({color:Colors.brown, shading:THREE.FlatShading});
    var correa = new THREE.Mesh(geomCorrea, mateCorrea);
    correa.castShadow = true;
    correa.receiveShadow = true;
    this.mesh.add(correa);

    //CAJA ROJA
    var geomCaja = new THREE.BoxGeometry(40,40,40);
    var mateCaja = new THREE.MeshPhongMaterial({color:Colors.red, shading:THREE.FlatShading});
    var caja = new THREE.Mesh(geomCaja, mateCaja);
    caja.position.y = 65;
    caja.castShadow = true;
    caja.receiveShadow = true;
    this.mesh.add(caja);

    var geomAlas = new THREE.BoxGeometry(55,15,240);
    var mateAlas = new THREE.MeshPhongMaterial({color:Colors.white, shading:THREE.FlatShading});
    geomAlas.vertices[0].z-=20;
    geomAlas.vertices[2].z-=20;
    geomAlas.vertices[1].z-=20;
    geomAlas.vertices[3].z-=20;
    var alas = new THREE.Mesh(geomAlas, mateAlas);
    alas.position.y = 50;
    alas.castShadow = true;
    alas.receiveShadow = true;
    this.mesh.add(alas);

    // HELICE
    var geomPropeller = new THREE.BoxGeometry(300,10,20,1,1,1);
    var matPropeller = new THREE.MeshPhongMaterial({color:Colors.grey, shading:THREE.FlatShading});
    this.propeller = new THREE.Mesh(geomPropeller, matPropeller);
    this.propeller.castShadow = true;
    this.propeller.receiveShadow = true;

    // HOJAS
    var geomBlade = new THREE.BoxGeometry(10,80,10);
    var matBlade = new THREE.MeshPhongMaterial({color:Colors.brownDark, shading:THREE.FlatShading});
    var blade = new THREE.Mesh(geomBlade, matBlade);
    blade.position.set(0,-30,0);
    blade.castShadow = true;
    blade.receiveShadow = true;
    this.propeller.add(blade);
    this.propeller.position.set(0,120,0);
    this.mesh.add(this.propeller);
};

// OBJETO CIELO:
Sky = function(){
    this.mesh = new THREE.Object3D();
    this.nClouds = 23;
    this.clouds = [];

    // LUGARES DE NUBES:
    var stepAngle = Math.PI*2 / this.nClouds;

    // CREAR NUBES:
    for(var i = 0; i < this.nClouds; i++){
        var c = new Cloud();
        this.clouds.push(c);
        var a = stepAngle * i;
        var h = 750 + Math.random()*200;

        c.mesh.position.y = Math.sin(a)*h;
        c.mesh.position.x = Math.cos(a)*h;

        c.mesh.position.z = -400-Math.random()*400;
        c.mesh.rotation.z = a + Math.PI/2;

        var s = 1+Math.random()*2;
        c.mesh.scale.set(s,s,s);

        this.mesh.add(c.mesh);
    }
};

// OBJETO MAR:
Sea = function(){
    var geom = new THREE.CylinderGeometry(600,600,800,40,10);

    // ROTAR:
    geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));

    geom.mergeVertices();
    var l = geom.vertices.length;

    this.waves = [];

    for (var i=0; i<l; i++) {
        var v = geom.vertices[i];

        this.waves.push({y:v.y, x:v.x, z:v.z, ang:Math.random()*Math.PI*2, amp:5 + Math.random()*15, speed:0.016 + Math.random()*0.032});
    }

    var mat = new THREE.MeshPhongMaterial({color:"#37C22A", transparent:false, opacity:1});

    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.receiveShadow = true;
};

Sea.prototype.moveWaves = function (){
    var verts = this.mesh.geometry.vertices;
    var l = verts.length;

    for (var i=0; i<l; i++){
        var v = verts[i];

        var vprops = this.waves[i];

        v.x = vprops.x + Math.cos(vprops.ang)*vprops.amp;
        v.y = vprops.y + Math.sin(vprops.ang)*vprops.amp;

        vprops.ang += vprops.speed;
    }
    this.mesh.geometry.verticesNeedUpdate=true;
    sea.mesh.rotation.z += .005;
};


// CREAR UNA NUBE:
Cloud = function(){
    this.mesh = new THREE.Object3D();
    this.mesh.name = "cloud";
    // CREAR UN CUBO:
    var geom = new THREE.BoxGeometry(20,10,20);

    var mat = new THREE.MeshPhongMaterial({
        color:Colors.white,
    });

    // CREAR COPIA DE CUBO CON VALORES RANDOM:
    var nBlocs = 3+Math.floor(Math.random()*3);

    for (var i=0; i<nBlocs; i++ ){
        var m = new THREE.Mesh(geom.clone(), mat);

        m.position.x = i*15;
        m.position.y = Math.random()*10;
        m.position.z = Math.random()*10;

        m.rotation.z = Math.random()*Math.PI*2;
        m.rotation.y = Math.random()*Math.PI*2;

        var s = .1 + Math.random()*.9;
        m.scale.set(s,s,s);
        m.castShadow = true;
        m.receiveShadow = true;
        this.mesh.add(m);
    }
};

// INSTANCIAR:
var sea;
var airplane;

// CREAR AVION
function createPlane(){
    airplane = new AirPlane();
    airplane.mesh.scale.set(.23,.23,.23);
    airplane.mesh.position.y = 100;
    scene.add(airplane.mesh);
}

function createSea(){
    sea = new Sea();
    sea.mesh.position.y = -600;
    scene.add(sea.mesh);
}

function createSky(){
    sky = new Sky();
    sky.mesh.position.y = -600;
    scene.add(sky.mesh);
}

function loop(){
    updatePlane();

    //airplane.propeller.rotation.y += 0.04;
    updateCameraFov();
    //sea.mesh.rotation.z += .005;
    sea.moveWaves();
    sky.mesh.rotation.z += .01;

    renderer.render(scene, camera);
    requestAnimationFrame(loop);

}

function updatePlane(){
    var targetY = normalize(mousePos.y,-.75,.75,25, 175);
    var targetX = normalize(mousePos.x,-.75,.75,-100, 100);

    airplane.mesh.position.x = targetX;

    airplane.mesh.position.y += (targetY-airplane.mesh.position.y)*0.1;

    airplane.mesh.rotation.z = (targetY-airplane.mesh.position.y)*0.0128;
    airplane.mesh.rotation.x = (airplane.mesh.position.y-targetY)*0.0064;

    airplane.propeller.rotation.y += 0.3;
}

function updateCameraFov() {
    camera.fov = normalize(mousePos.x, -1, 1, 40, 90);
    camera.updateProjectionMatrix();
}

function normalize(v,vmin,vmax,tmin, tmax){
    var nv = Math.max(Math.min(v,vmax), vmin);
    var dv = vmax-vmin;
    var pc = (nv-vmin)/dv;
    var dt = tmax-tmin;
    var tv = tmin + (pc*dt);
    return tv;
}

function init(event) {
    document.addEventListener('mousemove', handleMouseMove, false);

    createScene();
    createLights();
    createPlane();
    createSea();
    createSky();
    loop();
}

var mousePos = {x: 0, y: 0};

function handleMouseMove(event) {
    var tx = -1 + (event.clientX / WIDTH) * 2;
    var ty = 1 - (event.clientY / HEIGHT)*2;
    mousePos = {x:tx, y:ty};
}

window.addEventListener('load', init, false);