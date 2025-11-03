import React, { useRef, useEffect, useMemo, useCallback } from 'react';
import * as THREE from 'three';

const BloodCells3D = ({ 
  className = "", 
  cellCount = 2, 
  speed = 0.3,
  cellSize = 60, // Much larger size
  worldHeight = 5000,
  worldWidth = 2000
}) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const cellsRef = useRef([]);
  const animationRef = useRef(null);
  const lastTime = useRef(0);
  const lastScrollY = useRef(0);
  const lastScrollX = useRef(0);

  // Performance monitoring
  const performanceMode = useMemo(() => {
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    return isMobile || isLowEnd ? 'low' : 'high';
  }, []);

  // Create detailed blood cell geometry and materials
  const { geometry, materials } = useMemo(() => {
    // Create detailed blood cell geometry with biconcave shape
    const geo = new THREE.SphereGeometry(cellSize, 120, 96); // Higher resolution for larger size
    
    // Modify vertices to create biconcave shape
    const positions = geo.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const z = positions.getZ(i);
      
      // Calculate distance from center
      const distance = Math.sqrt(x * x + z * z);
      const normalizedDistance = distance / cellSize;
      
      // Create biconcave indentation
      const indentation = Math.pow(normalizedDistance, 2) * 0.4;
      const newY = y * (0.3 - indentation);
      
      positions.setY(i, newY);
    }
    
    geo.computeVertexNormals();
    geo.computeTangents();

    // Create multiple materials for realistic appearance
    const mainMaterial = new THREE.MeshPhongMaterial({
      color: 0xff1a1a,
      emissive: 0x330000,
      shininess: 80,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide
    });

    const glowMaterial = new THREE.MeshLambertMaterial({
      color: 0xff0040,
      emissive: 0xff0020,
      transparent: true,
      opacity: 0.3,
      side: THREE.BackSide
    });

    return { 
      geometry: geo, 
      materials: { main: mainMaterial, glow: glowMaterial }
    };
  }, [cellSize]);

  // Handle scroll to update camera position
  const handleScroll = useCallback(() => {
    if (!cameraRef.current) return;
    
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    
    // Convert scroll position to world coordinates
    // Invert Y because Three.js Y-axis is opposite to page scroll
    cameraRef.current.position.x = (scrollX - window.innerWidth / 2) * 0.5;
    cameraRef.current.position.y = -(scrollY - window.innerHeight / 5) * 1.2;
    
    lastScrollY.current = scrollY;
    lastScrollX.current = scrollX;
  }, []);

  // Throttled resize handler
  const handleResize = useCallback(() => {
    if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
    
    const rect = mountRef.current.getBoundingClientRect();
    
    cameraRef.current.aspect = rect.width / rect.height;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(rect.width, rect.height);
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;

    const mount = mountRef.current;
    const rect = mount.getBoundingClientRect();
    
    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup - positioned to follow scroll
    const camera = new THREE.PerspectiveCamera(
      75, // Wider field of view to see larger cells better
      rect.width / rect.height,
      1,
      4000 // Increased far plane for larger world
    );
    camera.position.z = 1200; // Further back to accommodate larger cells
    cameraRef.current = camera;

    // Renderer setup with performance optimizations
    const renderer = new THREE.WebGLRenderer({ 
      antialias: performanceMode === 'high',
      alpha: true,
      powerPreference: "high-performance",
      stencil: false,
      depth: true
    });
    renderer.setSize(rect.width, rect.height);
    renderer.setPixelRatio(performanceMode === 'high' ? Math.min(window.devicePixelRatio, 2) : 1);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = false;
    rendererRef.current = renderer;

    // Enhanced lighting setup for better blood cell appearance
    const ambientLight = new THREE.AmbientLight(0x401010, 0.4);
    scene.add(ambientLight);

    // Main directional light
    const directionalLight1 = new THREE.DirectionalLight(0xff2040, 1.2);
    directionalLight1.position.set(100, 100, 200);
    scene.add(directionalLight1);

    // Secondary light for depth
    const directionalLight2 = new THREE.DirectionalLight(0xff4060, 0.6);
    directionalLight2.position.set(-100, -50, 100);
    scene.add(directionalLight2);

    // Rim lighting
    const rimLight = new THREE.DirectionalLight(0xff8080, 0.8);
    rimLight.position.set(0, 0, -200);
    scene.add(rimLight);

    // Create blood cells positioned throughout the document space
    const cells = [];
    for (let i = 0; i < cellCount; i++) {
      // Create cell group for multiple layers
      const cellGroup = new THREE.Group();
      
      // Main cell body
      const mainCell = new THREE.Mesh(geometry, materials.main);
      cellGroup.add(mainCell);
      
      // Glow effect (slightly larger)
      const glowCell = new THREE.Mesh(geometry, materials.glow);
      glowCell.scale.setScalar(1.08); // Slightly more glow for larger cells
      cellGroup.add(glowCell);
      
      // Position cells strategically in document space
      // Ensure good distribution and visibility
      let worldX, worldY, worldZ;
      
        if (i === 0) {
        // First cell - upper area, a bit left and more down
        worldX = -window.innerWidth * 0.15; // 20% left of center
        worldY = window.innerHeight * 0.2; // 35% from top
        worldZ = 0;
        } else {
        // Second cell - lower area, a bit left and more down
        worldX = -window.innerWidth * 0.08; // 20% left of center
        worldY = window.innerHeight * 0.85; // 80% from top (further down)
        worldZ = 0;
        }
      cellGroup.position.set(worldX, worldY, worldZ);
      
      // Store movement properties for larger swimming area
      cellGroup.userData = {
        homePosition: { x: worldX, y: worldY, z: worldZ },
        swimRadius: 3000 + Math.random() * 200, // Much larger swimming area
        swimSpeed: speed * (0.5 + Math.random() * 0.8),
        rotationSpeed: {
          x: 0.02 + Math.random() * 0.003,
          y: 0.01 + Math.random() * 0.002,
          z: 0.001 + Math.random() * 0.001
        },
        floatPhase: Math.random() * Math.PI * 2,
        verticalPhase: Math.random() * Math.PI * 2,
        horizontalPhase: Math.random() * Math.PI * 2,
        // Add larger movement patterns
        largeOrbitRadius: 400 + Math.random() * 300,
        largeOrbitSpeed: 0.0008 + Math.random() * 0.0004,
        largeOrbitPhase: Math.random() * Math.PI * 2
      };
      
      scene.add(cellGroup);
      cells.push(cellGroup);
      
      console.log(`Blood cell ${i + 1} positioned at:`, { x: worldX, y: worldY, z: worldZ });
    }
    cellsRef.current = cells;

    mount.appendChild(renderer.domElement);

    // Initial scroll position setup
    handleScroll();

    // Animation loop
    const animate = (currentTime) => {
      animationRef.current = requestAnimationFrame(animate);
      
      // Throttle animation for performance
      if (currentTime - lastTime.current < (performanceMode === 'high' ? 16 : 33)) {
        return;
      }
      lastTime.current = currentTime;
      
      const time = currentTime * 0.001;
      
      cells.forEach((cellGroup, index) => {
        const userData = cellGroup.userData;
        const home = userData.homePosition;
        
        // Large orbital movement around home position
        const largeOrbitAngle = time * userData.largeOrbitSpeed + userData.largeOrbitPhase;
        const largeOrbitX = Math.cos(largeOrbitAngle) * userData.largeOrbitRadius;
        const largeOrbitY = Math.sin(largeOrbitAngle) * userData.largeOrbitRadius * 0.7;
        
        // Local swimming motion for organic feel
        const swimX = Math.sin(time * userData.swimSpeed + userData.horizontalPhase) * userData.swimRadius * 0.3;
        const swimY = Math.cos(time * userData.swimSpeed * 0.8 + userData.verticalPhase) * userData.swimRadius * 0.2;
        const swimZ = Math.sin(time * userData.swimSpeed * 0.6 + userData.floatPhase) * (userData.swimRadius * 0.15);
        
        // Combine large orbital movement with local swimming
        cellGroup.position.x = home.x + largeOrbitX + swimX;
        cellGroup.position.y = home.y + largeOrbitY + swimY;
        cellGroup.position.z = home.z + swimZ;
        
        // Smooth realistic rotation
        cellGroup.rotation.x += userData.rotationSpeed.x;
        cellGroup.rotation.y += userData.rotationSpeed.y;
        cellGroup.rotation.z += userData.rotationSpeed.z;
        
        // Subtle pulsing effect
        const pulseScale = 1 + Math.sin(time * 1.5 + index * 2) * 0.08;
        cellGroup.scale.setScalar(pulseScale);
      });
      
      renderer.render(scene, camera);
    };

    animate(0);

    // Add scroll listener
    let scrollTimeout;
    const throttledScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 10);
    };

    // Add resize listener
    let resizeTimeout;
    const throttledResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 100);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    window.addEventListener('resize', throttledResize);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('resize', throttledResize);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      
      // Dispose of Three.js resources
      cells.forEach(cellGroup => {
        if (scene) scene.remove(cellGroup);
        cellGroup.children.forEach(mesh => {
          if (mesh.geometry) mesh.geometry.dispose();
          if (mesh.material) {
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach(mat => mat.dispose());
            } else {
              mesh.material.dispose();
            }
          }
        });
      });
      
      if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
      }
      
      // Clear references
      cellsRef.current = [];
    };
  }, [cellCount, speed, cellSize, worldHeight, worldWidth, geometry, materials, performanceMode, handleResize, handleScroll]);

  return (
    <div 
      ref={mountRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ 
        width: '100vw', 
        height: '200vh',
        overflow: 'hidden'
      }}
    />
  );
};

export default BloodCells3D;