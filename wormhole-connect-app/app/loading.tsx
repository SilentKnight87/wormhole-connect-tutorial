'use client'
import * as THREE from 'three';
import { useRef, useEffect } from 'react';

const TorusComponent: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scene, camera, and renderer setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Torus geometry
    const geometry = new THREE.TorusGeometry(5, 2, 16, 100);

    // Shader material
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0.0 },
        // Additional uniforms for colors and other properties if necessary
      },
      vertexShader: `...`, // Your GLSL vertex shader code
      fragmentShader: `...`, // Your GLSL fragment shader code
    });

    // Create torus mesh with shader material
    const torus = new THREE.Mesh(geometry, shaderMaterial);
    scene.add(torus);

    camera.position.z = 15;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Update shader uniform values here
      shaderMaterial.uniforms.time.value += 0.01;

      // Your rendering logic
      renderer.render(scene, camera);
    };

    animate();

    // Handle resizing
    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      renderer.setSize(innerWidth, innerHeight);
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} />;
};

export default TorusComponent;
