import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function LiquidOrb() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Setup Scene ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- Geometry & Shader Material ---
    const geometry = new THREE.IcosahedronGeometry(1, 64); // High poly for smooth distortion
    
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uColor1: { value: new THREE.Color('#0A84FF') },
        uColor2: { value: new THREE.Color('#A259FF') },
        uColor3: { value: new THREE.Color('#00E5FF') },
      },
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        varying vec3 vNormal;
        varying vec3 vPosition;

        // Simple noise function
        float noise(vec3 p) {
          return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453);
        }

        void main() {
          vNormal = normal;
          vPosition = position;

          // Base distortion (liquid)
          float dist = distance(position.xy, vec2(0.0));
          float distFromMouse = distance(position.xy, uMouse * 1.5);
          
          // Create a wave effect
          float wave = sin(position.x * 5.0 + uTime) * cos(position.y * 5.0 + uTime) * 0.05;
          
          // Mouse interaction (push inwards slightly)
          float mousePush = smoothstep(0.5, 0.0, distFromMouse) * 0.15;

          vec3 newPosition = position + normal * (wave - mousePush);

          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
          // Gradient based on normal direction
          float mix1 = smoothstep(-0.5, 0.5, vNormal.x);
          float mix2 = smoothstep(-0.5, 0.5, vNormal.y);

          vec3 color = mix(uColor1, uColor2, mix1);
          color = mix(color, uColor3, mix2 * 0.5);

          // Add a rim light effect
          float rim = 1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0));
          color += vec3(1.0) * pow(rim, 3.0) * 0.5;

          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // --- Mouse Movement ---
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // --- Animation Loop ---
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();
      
      material.uniforms.uTime.value = time;
      
      // Smooth mouse follow
      material.uniforms.uMouse.value.x += (mouseRef.current.x - material.uniforms.uMouse.value.x) * 0.05;
      material.uniforms.uMouse.value.y += (mouseRef.current.y - material.uniforms.uMouse.value.y) * 0.05;

      // Slow rotation
      sphere.rotation.y += 0.002;
      sphere.rotation.x += 0.001;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    // --- Resize ---
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="h-full w-full" />;
}