import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as THREE from "three";
import { MTLLoader } from "node_modules/three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "node_modules/three/examples/jsm/loaders/OBJLoader.js";
import { OrbitControls } from "node_modules/three/examples/jsm/controls/OrbitControls.js";

@Component({
  selector: 'app-scenes',
  templateUrl: './scenes.component.html',
  styleUrls: ['./scenes.component.css']
})
export class ScenesComponent implements OnInit {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  light: THREE.AmbientLight;

  mtlLoader: MTLLoader;
  objLoader: OBJLoader;
  controls: OrbitControls;

  @ViewChild("object3D", { static: true }) objectToRender: ElementRef<HTMLCanvasElement>;

  constructor() {
    this.scene = new THREE.Scene();
    this.light = new THREE.AmbientLight(
      0x404040, // Light color
      1 // Light intensity
    );

    this.camera = new THREE.PerspectiveCamera(
      45, // Field of View -> degrees
      window.innerWidth / window.innerHeight, // Aspect Ratio
      0.1, // close
      10000 // far
    );

    this.mtlLoader = new MTLLoader();
  }

  ngOnInit(): void {
    this.camera.position.z = 250;
    this.scene.add(this.light);

    this.mtlLoader.setPath("../../assets/obj/");
    this.mtlLoader.load("ship_dark.mtl", (materials) => {
      materials.preload();

      this.objLoader = new OBJLoader();
      this.objLoader.setMaterials(materials);
      this.objLoader.setPath("../../assets/obj/");
      this.objLoader.load(
        "ship_dark.obj", // path to .obj file
        (object) => {
          object.position.setY(-25);
          this.scene.add(object);
        },
      );
    });

    this.controls = new OrbitControls(this.camera, this.objectToRender.nativeElement);

    this.controls.update();

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.objectToRender.nativeElement,
      alpha: true,
      antialias: true,
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.animate();
  }

  animate(): void {
    requestAnimationFrame(() => {
      this.animate();
    });

    this.controls.update();

    this.renderer.render(this.scene, this.camera);
  }
}
