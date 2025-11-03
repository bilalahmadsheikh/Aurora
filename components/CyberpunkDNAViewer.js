import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const BackgroundDNAViewer = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const dnaGroupRef = useRef(null);
  const animationRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedBase, setSelectedBase] = useState(null);
  const [speed, setSpeed] = useState(0.5);
  const [highComplexity, setHighComplexity] = useState(true);
  const [isExploded, setIsExploded] = useState(false);
  const [atomPositions, setAtomPositions] = useState(new Map());
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup - positioned even further back for small DNA appearance
    const camera = new THREE.PerspectiveCamera(
      20,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(-100, 60, 100);
    cameraRef.current = camera;

    // Renderer setup with transparent background
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance" 
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xff0080, 5, 400);
    pointLight1.position.set(120, 120, 120);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x00ffff, 4.5, 400);
    pointLight2.position.set(-120, -120, -120);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x00ff80, 4, 400);
    pointLight3.position.set(0, 150, 0);
    scene.add(pointLight3);

    // Manual orbit controls
    let isMouseDown = false;
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let rotationX = 0;
    let rotationY = 0;

    const onMouseDown = (event) => {
      isMouseDown = true;
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const onMouseUp = () => {
      isMouseDown = false;
    };

    const onMouseMove = (event) => {
      if (!isMouseDown) return;
      
      const deltaX = event.clientX - mouseX;
      const deltaY = event.clientY - mouseY;
      
      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.008;
      
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const onWheel = (event) => {
      event.preventDefault();
      const distance = camera.position.length();
      const newDistance = Math.max(60, Math.min(200, distance + event.deltaY * 0.2));
      camera.position.normalize().multiplyScalar(newDistance);
    };

    renderer.domElement.addEventListener('mousedown', onMouseDown);
    renderer.domElement.addEventListener('mouseup', onMouseUp);
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('wheel', onWheel);

    // Create larger DNA structure with explosion capability
    const createDNAHelix = () => {
      const dnaGroup = new THREE.Group();
      // Position DNA slightly to right for left-tilted camera view
      dnaGroup.position.x = 5;
      
      // Much smaller dimensions to fit completely in screen
      const height = highComplexity ? 12 : 8;
      const radius = 2.5;
      const turns = highComplexity ? 5 : 3;
      const segments = highComplexity ? 80 : 50;

      // Enhanced materials with stronger emission for background effect
      const strand1Material = new THREE.MeshStandardMaterial({
        color: 0xff0080,
        emissive: 0xff0080,
        emissiveIntensity: 0.4,
        metalness: 0.2,
        roughness: 0.2
      });

      const strand2Material = new THREE.MeshStandardMaterial({
        color: 0x00ffff,
        emissive: 0x00ffff,
        emissiveIntensity: 0.4,
        metalness: 0.2,
        roughness: 0.2
      });

      const baseMaterial = new THREE.MeshStandardMaterial({
        color: 0x00ff80,
        emissive: 0x00ff80,
        emissiveIntensity: 0.5,
        metalness: 0.1,
        roughness: 0.15
      });

      // Appropriately sized geometries for distant camera
      const sphereGeometry = new THREE.SphereGeometry(0.15, 12, 12);
      const cylinderGeometry = new THREE.CylinderGeometry(0.04, 0.04, radius * 2);

      // Store original positions for explosion effect
      const positions = new Map();

      // Create strands with more detail
      for (let i = 0; i <= segments; i++) {
        const y = (i / segments) * height - height / 2;
        const angle = (i / segments) * turns * Math.PI * 2;

        // Strand 1 atoms
        const atom1 = new THREE.Mesh(sphereGeometry, strand1Material);
        const pos1 = new THREE.Vector3(
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius
        );
        atom1.position.copy(pos1);
        atom1.userData = { type: 'strand1', index: i };
        positions.set(`strand1_${i}`, { original: pos1.clone(), exploded: pos1.clone().multiplyScalar(3).add(new THREE.Vector3(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5)) });
        dnaGroup.add(atom1);

        // Strand 2 atoms
        const atom2 = new THREE.Mesh(sphereGeometry, strand2Material);
        const pos2 = new THREE.Vector3(
          Math.cos(angle + Math.PI) * radius,
          y,
          Math.sin(angle + Math.PI) * radius
        );
        atom2.position.copy(pos2);
        atom2.userData = { type: 'strand2', index: i };
        positions.set(`strand2_${i}`, { original: pos2.clone(), exploded: pos2.clone().multiplyScalar(3).add(new THREE.Vector3(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5)) });
        dnaGroup.add(atom2);

        // Base pairs
        if (i % 8 === 0) {
          const basePair = new THREE.Mesh(cylinderGeometry, baseMaterial.clone());
          const pos3 = new THREE.Vector3(0, y, 0);
          basePair.position.copy(pos3);
          basePair.rotation.z = Math.PI / 2;
          basePair.userData = { type: 'basePair', index: i };
          positions.set(`basePair_${i}`, { original: pos3.clone(), exploded: pos3.clone().add(new THREE.Vector3(Math.random() * 15 - 7.5, Math.random() * 15 - 7.5, Math.random() * 15 - 7.5)) });
          dnaGroup.add(basePair);
        }
      }

      setAtomPositions(positions);
      return dnaGroup;
    };

    const dnaGroup = createDNAHelix();
    scene.add(dnaGroup);
    dnaGroupRef.current = dnaGroup;

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      // Smooth camera controls
      rotationX += (targetRotationX - rotationX) * 0.08;
      rotationY += (targetRotationY - rotationY) * 0.08;

      // Orbit camera around center
      const time = Date.now() * 0.001;
      const distance = camera.position.length();
      camera.position.x = Math.cos(rotationY) * Math.cos(rotationX) * distance;
      camera.position.y = Math.sin(rotationX) * distance;
      camera.position.z = Math.sin(rotationY) * Math.cos(rotationX) * distance;
      camera.lookAt(0, 0, 0);

      // DNA rotation with variable speed and tilt
      if (dnaGroupRef.current) {
        // Only apply rotation and tilt when NOT exploded
        if (!isExploded) {
          dnaGroupRef.current.rotation.y = time * 0.08 * speed;
          dnaGroupRef.current.rotation.x = Math.sin(time * 0.5) * 0.1; // Gentle tilt animation
          dnaGroupRef.current.rotation.z = 0.3; // Permanent diagonal tilt
        }
        
        // Animate explosion/reconstruction - this should take priority
        dnaGroupRef.current.children.forEach((child) => {
          const key = `${child.userData.type}_${child.userData.index}`;
          const posData = atomPositions.get(key);
          if (posData) {
            const targetPos = isExploded ? posData.exploded : posData.original;
            child.position.lerp(targetPos, 0.08); // Faster transition
            
            // Add rotation to exploded particles
            if (isExploded) {
              child.rotation.x += 0.03;
              child.rotation.y += 0.04;
              child.rotation.z += 0.02;
            } else {
              // Reset rotation when reforming
              child.rotation.x *= 0.9;
              child.rotation.y *= 0.9;
              child.rotation.z *= 0.9;
            }
          }
        });
        
        // Subtle pulsing effect when hovered
        const scale = isHovered ? 1 + Math.sin(time * 6) * 0.03 : 1;
        dnaGroupRef.current.scale.setScalar(scale);
      }

      // Highlight selected base pair
      if (selectedBase !== null && dnaGroupRef.current) {
        dnaGroupRef.current.children.forEach((child) => {
          if (child.userData.type === 'basePair' && child.userData.index === selectedBase) {
            child.material.emissiveIntensity = 0.9 + Math.sin(time * 12) * 0.3;
            child.material.color.setHex(0xffff00);
            child.material.emissive.setHex(0xffff00);
            // Make selected base pair larger
            child.scale.setScalar(1.5);
          } else if (child.userData.type === 'basePair') {
            child.material.emissiveIntensity = 0.5;
            child.material.color.setHex(0x00ff80);
            child.material.emissive.setHex(0x00ff80);
            child.scale.setScalar(1);
          }
        });
      }

      renderer.render(scene, camera);
    };

    // Enhanced raycaster for interactions
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Hover detection for cursor change and highlighting
    const onMouseHover = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      let hovering = intersects.length > 0;
      
      if (hovering) {
        renderer.domElement.style.cursor = 'pointer';
      } else {
        renderer.domElement.style.cursor = 'auto';
      }
      
      setIsHovered(hovering);
    };

    // Double-click to toggle explosion state
    const onDoubleClick = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      // Only toggle explosion if we're clicking on the DNA
      if (intersects.length > 0) {
        setIsExploded(!isExploded);
      }
    };

    // Keyboard controls for hidden features
    const onKeyDown = (event) => {
      switch(event.key) {
        case ' ':
          event.preventDefault();
          setSpeed(speed === 0 ? 0.5 : 0);
          break;
        case 'e':
        case 'E':
          // Manual explosion toggle with keyboard
          setIsExploded(!isExploded);
          break;
        case 'r':
        case 'R':
          setSelectedBase(null);
          setIsExploded(false);
          // Reset camera position
          targetRotationX = 0;
          targetRotationY = 0;
          camera.position.set(-100, 60, 100);
          break;
        case 'c':
        case 'C':
          setHighComplexity(!highComplexity);
          break;
        case '+':
        case '=':
          setSpeed(Math.min(3, speed + 0.2));
          break;
        case '-':
          setSpeed(Math.max(0, speed - 0.2));
          break;
      }
    };

    renderer.domElement.addEventListener('mousemove', onMouseHover);
    renderer.domElement.addEventListener('dblclick', onDoubleClick);
    window.addEventListener('keydown', onKeyDown);

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Start animation
    animate();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', onKeyDown);
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      renderer.domElement.removeEventListener('mouseup', onMouseUp);
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('wheel', onWheel);
      renderer.domElement.removeEventListener('mousemove', onMouseHover);
      renderer.domElement.removeEventListener('dblclick', onDoubleClick);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of Three.js objects
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      
      renderer.dispose();
    };
  }, [isExploded]); // Add isExploded as dependency

  // Rebuild DNA when complexity changes
  useEffect(() => {
    if (!sceneRef.current || !dnaGroupRef.current) return;

    // Remove old DNA
    sceneRef.current.remove(dnaGroupRef.current);
    
    // Create new DNA with updated complexity and explosion positions
    const createDNAHelix = () => {
      const dnaGroup = new THREE.Group();
      // Position DNA to the right to account for left camera position
      dnaGroup.position.x = 3;
      
      // 2.5x larger dimensions
      const height = highComplexity ? 25 : 15;
      const radius = 5;
      const turns = highComplexity ? 8 : 5;
      const segments = highComplexity ? 200 : 100;

      const strand1Material = new THREE.MeshStandardMaterial({
      color: 0x6366F1,        // Indigo
      emissive: 0x4338CA,
      emissiveIntensity: 0.3,
      metalness: 0.4,
      roughness: 0.1
    });

    const strand2Material = new THREE.MeshStandardMaterial({
      color: 0xEC4899,        // Pink
      emissive: 0xDB2777,
      emissiveIntensity: 0.3,
      metalness: 0.4,
      roughness: 0.1
    });

    const baseMaterial = new THREE.MeshStandardMaterial({
      color: 0x10B981,        // Teal
      emissive: 0x059669,
      emissiveIntensity: 0.4,
      metalness: 0.2,
      roughness: 0.15
    });

      const sphereGeometry = new THREE.SphereGeometry(0.25, 16, 16);
      const cylinderGeometry = new THREE.CylinderGeometry(0.08, 0.08, radius * 2);

      // Store positions for explosion effect
      const positions = new Map();

      for (let i = 0; i <= segments; i++) {
        const y = (i / segments) * height - height / 2;
        const angle = (i / segments) * turns * Math.PI * 2;

        // Strand 1
        const atom1 = new THREE.Mesh(sphereGeometry, strand1Material);
        const pos1 = new THREE.Vector3(
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius
        );
        atom1.position.copy(pos1);
        atom1.userData = { type: 'strand1', index: i };
        positions.set(`strand1_${i}`, { 
          original: pos1.clone(), 
          exploded: pos1.clone().multiplyScalar(4).add(new THREE.Vector3(
            Math.random() * 20 - 10, 
            Math.random() * 20 - 10, 
            Math.random() * 20 - 10
          )) 
        });
        dnaGroup.add(atom1);

        // Strand 2
        const atom2 = new THREE.Mesh(sphereGeometry, strand2Material);
        const pos2 = new THREE.Vector3(
          Math.cos(angle + Math.PI) * radius,
          y,
          Math.sin(angle + Math.PI) * radius
        );
        atom2.position.copy(pos2);
        atom2.userData = { type: 'strand2', index: i };
        positions.set(`strand2_${i}`, { 
          original: pos2.clone(), 
          exploded: pos2.clone().multiplyScalar(4).add(new THREE.Vector3(
            Math.random() * 20 - 10, 
            Math.random() * 20 - 10, 
            Math.random() * 20 - 10
          )) 
        });
        dnaGroup.add(atom2);

        // Base pairs - every 6th segment
        if (i % 6 === 0) {
          const basePair = new THREE.Mesh(cylinderGeometry, baseMaterial.clone());
          const pos3 = new THREE.Vector3(0, y, 0);
          basePair.position.copy(pos3);
          basePair.rotation.z = Math.PI / 2;
          basePair.userData = { type: 'basePair', index: i };
          positions.set(`basePair_${i}`, { 
            original: pos3.clone(), 
            exploded: pos3.clone().add(new THREE.Vector3(
              Math.random() * 25 - 12.5, 
              Math.random() * 25 - 12.5, 
              Math.random() * 25 - 12.5
            )) 
          });
          dnaGroup.add(basePair);
        }
      }

      setAtomPositions(positions);
      return dnaGroup;
    };

    const newDNA = createDNAHelix();
    sceneRef.current.add(newDNA);
    dnaGroupRef.current = newDNA;
  }, [highComplexity]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-transparent">
      {/* Three.js mount point - full screen */}
      <div ref={mountRef} className="w-full h-full" />
      
      {/* Hidden speed control overlay (only visible on hover at bottom) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="bg-black bg-opacity-40 px-4 py-2 rounded-full border border-cyan-500 border-opacity-30">
          <input 
            type="range" 
            min="0" 
            max="2" 
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-32 h-1 bg-gray-700 bg-opacity-50 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #2ECC71 0%, #2ECC71 ${(speed/2)*100}%, rgba(255,255,255,0.2) ${(speed/2)*100}%, rgba(255,255,255,0.2) 100%)`
            }}
          />
        </div>
      </div>

      {/* Minimal complexity toggle (only visible on hover at top right) */}
      <div className="absolute top-4 right-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <button 
          onClick={() => setHighComplexity(!highComplexity)}
          className="w-8 h-8 bg-black bg-opacity-40 border border-cyan-500 border-opacity-30 rounded-full flex items-center justify-center text-cyan-400 hover:bg-cyan-900 hover:bg-opacity-40 transition-all duration-200"
          title={highComplexity ? 'Switch to Simple' : 'Switch to Complex'}
        >
          {highComplexity ? '●' : '○'}
        </button>
      </div>

      {/* Keyboard shortcuts info button - positioned to the right of DNA strand */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
        <div 
          className="relative"
          onMouseEnter={() => setShowKeyboardHelp(true)}
          onMouseLeave={() => setShowKeyboardHelp(false)}
        >
          <div className="w-6 h-6 bg-black bg-opacity-40 border border-cyan-500 border-opacity-30 rounded-full flex items-center justify-center text-cyan-400 text-xs font-bold cursor-help hover:bg-cyan-900 hover:bg-opacity-40 transition-all duration-200">
            ?
          </div>
          
          {/* Keyboard shortcuts tooltip */}
          {showKeyboardHelp && (
            <div className="absolute top-0 right-8 w-64 bg-black bg-opacity-90 border border-cyan-500 border-opacity-50 rounded-lg p-3 text-cyan-400 text-xs shadow-lg z-50">
              <div className="font-semibold text-cyan-300 mb-2">Keyboard Controls:</div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-cyan-500">Space</span>
                  <span>Pause/Play rotation</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-500">E</span>
                  <span>Explode/Reform DNA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-500">R</span>
                  <span>Reset view & state</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-500">C</span>
                  <span>Toggle complexity</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-500">+ / -</span>
                  <span>Speed up/down</span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-cyan-700 border-opacity-50">
                <div className="font-semibold text-cyan-300 mb-1">Mouse:</div>
                <div className="text-xs opacity-80">
                  • Drag to rotate view<br/>
                  • Scroll to zoom<br/>
                  • Double-click DNA to explode
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BackgroundDNAViewer;