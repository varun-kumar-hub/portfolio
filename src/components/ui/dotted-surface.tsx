'use client';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/ThemeProvider';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
	const { theme } = useTheme();

	const containerRef = useRef<HTMLDivElement>(null);
	const sceneRef = useRef<{
		scene: THREE.Scene;
		camera: THREE.PerspectiveCamera;
		renderer: THREE.WebGLRenderer;
		points: THREE.Points;
		animationId: number;
	} | null>(null);

	// Core WebGL Setup — Runs exactly once on mount
	useEffect(() => {
		if (!containerRef.current) return;

		// Scene setup
		const scene = new THREE.Scene();

		const camera = new THREE.PerspectiveCamera(
			60,
			window.innerWidth / window.innerHeight,
			1,
			5000
		);
		camera.position.set(0, 0, 800);

		const renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true,
		});
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setClearColor(0x000000, 0); // Transparent background

		containerRef.current.appendChild(renderer.domElement);

		// Generate random star coordinates
		const positions: number[] = [];
		const colors: number[] = [];
		const starCount = 2200;

		for (let i = 0; i < starCount; i++) {
			const x = (Math.random() - 0.5) * 2000;
			const y = (Math.random() - 0.5) * 2000;
			const z = (Math.random() - 0.5) * 2000;
			positions.push(x, y, z);
			
			// Initial colors
			colors.push(0.9, 0.9, 0.95);
		}

		const originalPositions = new Float32Array(positions);

		const geometry = new THREE.BufferGeometry();
		geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

		const colorAttribute = new THREE.Float32BufferAttribute(colors, 3);
		colorAttribute.setUsage(THREE.DynamicDrawUsage);
		geometry.setAttribute('color', colorAttribute);

		// Material for crisp small stars
		const material = new THREE.PointsMaterial({
			size: 2.2,
			vertexColors: true,
			transparent: true,
			opacity: 0.85,
			sizeAttenuation: true,
			fog: false,
		});

		// Create points object
		const points = new THREE.Points(geometry, material);
		scene.add(points);

		let animationId = 0;
		let dampedProgress = 0;

		// Animation loop (slow starfield rotation)
		const animate = () => {
			animationId = requestAnimationFrame(animate);

			points.rotation.y += 0.00015;
			points.rotation.x += 0.00006;

			// Handle Particle Gravity Well Collapse (Option 3)
			const targetProgress = typeof window !== "undefined" ? ((window as any).holdProgress || 0) : 0;
			
			dampedProgress += (targetProgress - dampedProgress) * 0.07; // Smooth damping

			const positionAttribute = points.geometry.attributes.position;
			const positionsArray = positionAttribute.array as Float32Array;

			if (dampedProgress > 0.001) {
				const ease = 1 - Math.pow(dampedProgress, 3); // Cubic acceleration
				const angle = dampedProgress * 2.0; // Dynamic spiral angle
				const cosA = Math.cos(angle);
				const sinA = Math.sin(angle);

				for (let i = 0; i < positionsArray.length; i += 3) {
					const x0 = originalPositions[i];
					const y0 = originalPositions[i + 1];
					const z0 = originalPositions[i + 2];

					// Collapse towards center
					let x = x0 * ease;
					let y = y0 * ease;
					let z = z0 * ease;

					// Swirl around Z-axis
					const rx = x * cosA - y * sinA;
					const ry = x * sinA + y * cosA;

					positionsArray[i] = rx;
					positionsArray[i + 1] = ry;
					positionsArray[i + 2] = z;
				}
				positionAttribute.needsUpdate = true;
			} else if (positionsArray[0] !== originalPositions[0]) {
				// Restore original coordinates once dampedProgress returns to 0
				for (let i = 0; i < positionsArray.length; i++) {
					positionsArray[i] = originalPositions[i];
				}
				positionAttribute.needsUpdate = true;
			}

			renderer.render(scene, camera);
		};

		// Handle window resize
		const handleResize = () => {
			if (!containerRef.current) return;
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		};

		window.addEventListener('resize', handleResize);
		animate();

		// Store refs
		sceneRef.current = {
			scene,
			camera,
			renderer,
			points,
			animationId,
		};

		// Cleanup
		return () => {
			window.removeEventListener('resize', handleResize);

			if (sceneRef.current) {
				cancelAnimationFrame(sceneRef.current.animationId);

				sceneRef.current.scene.traverse((object) => {
					if (object instanceof THREE.Points) {
						object.geometry.dispose();
						if (Array.isArray(object.material)) {
							object.material.forEach((mat) => mat.dispose());
						} else {
							object.material.dispose();
						}
					}
				});

				sceneRef.current.renderer.dispose();

				if (containerRef.current && sceneRef.current.renderer.domElement) {
					containerRef.current.removeChild(
						sceneRef.current.renderer.domElement,
					);
				}
			}
		};
	}, []);

	// React to Theme Changes — Updates colors dynamically
	useEffect(() => {
		if (!sceneRef.current) return;

		const points = sceneRef.current.points;
		const colorAttribute = points.geometry.attributes.color;
		const colorsArray = colorAttribute.array as Float32Array;

		for (let idx = 0; idx < colorsArray.length; idx += 3) {
			if (theme === 'dark') {
				// Bright white stars in dark mode
				colorsArray[idx] = 0.95;
				colorsArray[idx + 1] = 0.95;
				colorsArray[idx + 2] = 1.0;
			} else {
				// Contrast dark slate stars in light mode
				colorsArray[idx] = 0.1;
				colorsArray[idx + 1] = 0.15;
				colorsArray[idx + 2] = 0.2;
			}
		}

		colorAttribute.needsUpdate = true;
	}, [theme]);

	return (
		<div
			ref={containerRef}
			className={cn(
				'pointer-events-none fixed inset-0 z-0 opacity-80 dark:opacity-75',
				className
			)}
			{...props}
		/>
	);
}
