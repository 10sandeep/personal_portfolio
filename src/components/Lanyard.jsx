/* eslint-disable react/no-unknown-property */
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

import cardGLB from '../assets/lanyard/card.glb';
import lanyardPNG from '../assets/lanyard/lanyard.png';

extend({ MeshLineGeometry, MeshLineMaterial });

// Builds a canvas texture that replicates the old HTML id-card content
function useIDCardTexture() {
  const [cardTexture, setCardTexture] = useState(null);

  useEffect(() => {
    // The card face UV covers U: 0→0.5, V: 0→1 on the texture.
    // Draw everything in the LEFT half of the canvas so it maps correctly.
    // Face aspect ratio matches physical card collider (0.8 : 1.125 ≈ 0.711)
    // Texture face = left 512×720; double canvas for sharpness
    const W = 1024, H = 720;
    const F = W / 2;          // face width = 512
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    const draw = (photo) => {
      // ── photo: full card bleed ───────────────────────────────────
      const photoH = H;
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, F, H);
      ctx.clip();
      if (photo) {
        const scale = F / photo.naturalWidth;
        ctx.filter = 'grayscale(100%) contrast(1.05) brightness(0.9)';
        ctx.drawImage(photo, 0, 0, F, photo.naturalHeight * scale);
        ctx.filter = 'none';
      } else {
        ctx.fillStyle = '#c8c4bc';
        ctx.fillRect(0, 0, F, H);
      }
      ctx.restore();

      // ── gradient overlay at bottom for text readability ──────────
      const gradStart = Math.round(H * 0.42);
      const grad = ctx.createLinearGradient(0, gradStart, 0, H);
      grad.addColorStop(0, 'rgba(245,242,238,0)');
      grad.addColorStop(0.35, 'rgba(245,242,238,0.92)');
      grad.addColorStop(1, 'rgba(245,242,238,1)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, gradStart, F, H - gradStart);

      // ── card hole over photo ─────────────────────────────────────
      ctx.beginPath();
      ctx.arc(F / 2, 36, 16, 0, Math.PI * 2);
      ctx.fillStyle = '#dedad4';
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.25)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // ── name ─────────────────────────────────────────────────────
      ctx.fillStyle = '#0a0a0a';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'alphabetic';

      // auto-fit: shrink font until text is narrower than face
      let fontSize = 44;
      ctx.font = `900 ${fontSize}px "Roboto Mono", monospace`;
      while (ctx.measureText('SANDEEP NAYAK').width > F - 80 && fontSize > 24) {
        fontSize -= 2;
        ctx.font = `900 ${fontSize}px "Roboto Mono", monospace`;
      }
      const nameY = Math.round(H * 0.60) + Math.round(fontSize * 0.9);
      ctx.fillText('SANDEEP NAYAK', F / 2, nameY);

      // ── available for work badge ─────────────────────────────────
      const bH = 38, bW = Math.min(F - 120, 280), bX = (F - bW) / 2;
      const bY = nameY + Math.round(fontSize * 0.18) + 6;
      ctx.beginPath();
      ctx.roundRect(bX, bY, bW, bH, 45);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = '#bbbbbb';
      ctx.lineWidth = 3;
      ctx.stroke();

      // green dot + glow
      const dotX = bX + 22, dotY = bY + bH / 2;
      ctx.beginPath();
      ctx.arc(dotX, dotY, 7, 0, Math.PI * 2);
      ctx.fillStyle = '#22c55e';
      ctx.fill();

      // badge text
      ctx.fillStyle = '#111111';
      ctx.font = 'bold 20px "Roboto Mono", monospace';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText('Available for work', bX + 36, dotY);

      const tex = new THREE.CanvasTexture(canvas);
      tex.flipY = false;
      setCardTexture(tex);
    };

    const img = new Image();
    img.onload = () => draw(img);
    img.onerror = () => draw(null);
    img.src = '/sandeep.jpeg';
  }, []);

  return cardTexture;
}

export default function Lanyard({ position = [0, 0, 30], gravity = [0, -40, 0], fov = 20, transparent = true }) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        style={{ position: 'absolute', inset: 0, zIndex: 100, pointerEvents: 'auto' }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band isMobile={isMobile} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false }) {
  const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef();
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3();
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 40, linearDamping: 4 };
  const { nodes, materials } = useGLTF(cardGLB);
  const texture = useTexture(lanyardPNG);
  const cardTexture = useIDCardTexture();
  const [curve] = useState(() =>
    new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.5, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[2, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'} enabledRotations={[true, false, true]}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={e => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={e => (
              e.target.setPointerCapture(e.pointerId),
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
            )}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardTexture || materials.base.map}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.3}
                metalness={0.05}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}
