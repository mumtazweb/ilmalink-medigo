import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function HeroGlobeV2() {
  const globeWrapperRef = useRef<HTMLDivElement>(null);
  const [globeSize, setGlobeSize] = useState(520);
  const [networkNodes, setNetworkNodes] = useState<Array<{ id: number; left: string; top: string; size: number; delay: number }>>([]);
  const [networkLines, setNetworkLines] = useState<Array<{ x1: number; y1: number; x2: number; y2: number }>>([]);

  // Handle responsive globe size
  useEffect(() => {
    const updateSize = () => {
      if (globeWrapperRef.current) {
        const wrapperWidth = globeWrapperRef.current.clientWidth;
        // Globe size scales with wrapper but max 520px
        const newSize = Math.min(wrapperWidth, 520);
        setGlobeSize(newSize);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Generate 50-60 nodes with varied positions, sizes, and pulse delays
  useEffect(() => {
    const nodeCount = 55; // 50-60 range
    const nodes = [];
    
    for (let i = 0; i < nodeCount; i++) {
      // Distribute nodes in a curved band below the globe
      // Use sine/cosine to create natural distribution
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 85; // percentage spread
      const x = 50 + Math.cos(angle) * radius * 0.7;
      const y = 60 + Math.sin(angle * 1.5) * 25;
      
      // Size variation: 3px to 8px
      const size = 3 + (i % 6);
      // Delay variation: 0s to 2s
      const delay = (i % 5) * 0.4;
      
      nodes.push({
        id: i,
        left: `${Math.min(95, Math.max(5, x))}%`,
        top: `${Math.min(85, Math.max(15, y))}%`,
        size,
        delay,
      });
    }
    setNetworkNodes(nodes);
  }, []);

  // Generate 20-30 connecting lines between random nodes
  useEffect(() => {
    if (networkNodes.length === 0) return;
    
    const lineCount = 25; // 20-30 range
    const lines = [];
    const usedPairs = new Set<string>();
    
    for (let i = 0; i < lineCount; i++) {
      let idx1 = Math.floor(Math.random() * networkNodes.length);
      let idx2 = Math.floor(Math.random() * networkNodes.length);
      
      // Ensure different nodes and no duplicate connections
      const key = `${Math.min(idx1, idx2)}-${Math.max(idx1, idx2)}`;
      while (idx1 === idx2 || usedPairs.has(key)) {
        idx1 = Math.floor(Math.random() * networkNodes.length);
        idx2 = Math.floor(Math.random() * networkNodes.length);
      }
      usedPairs.add(key);
      
      // Parse percentage values to numbers for line calculation
      const node1 = networkNodes[idx1];
      const node2 = networkNodes[idx2];
      
      // Store positions as percentages for CSS-based lines
      lines.push({
        x1: parseFloat(node1.left),
        y1: parseFloat(node1.top),
        x2: parseFloat(node2.left),
        y2: parseFloat(node2.top),
      });
    }
    setNetworkLines(lines);
  }, [networkNodes]);

  // Calculate line styles based on percentage positions
  const getLineStyle = (line: { x1: number; y1: number; x2: number; y2: number }) => {
    const dx = line.x2 - line.x1;
    const dy = line.y2 - line.y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    
    return {
      width: `${length}%`,
      transform: `rotate(${angle}deg)`,
      left: `${line.x1}%`,
      top: `${line.y1}%`,
    };
  };

  return (
    <>
      <div className="relative w-full h-full pt-[3%] pb-[12%] flex justify-center">
        <div
          ref={globeWrapperRef}
          className="globe-wrapper"
          style={{
            width: `${globeSize}px`,
            height: `${globeSize}px`,
          }}
        >
          {/* Soft Cyan-Blue Halo Behind Globe - Premium Educational Style */}
          <div className="globe-halo" />

          {/* Orbit Rings with Particles */}
          <div className="orbit-x">
            {[...Array(16)].map((_, i) => (
              <div
                key={`ox-${i}`}
                className="orbit-particle"
                style={{
                  animationDelay: `${(i / 16) * 12}s`,
                  transform: `rotate(${(i / 16) * 360}deg) translateX(50%)`,
                }}
              />
            ))}
          </div>
          
          <div className="orbit-y">
            {[...Array(16)].map((_, i) => (
              <div
                key={`oy-${i}`}
                className="orbit-particle"
                style={{
                  animationDelay: `${(i / 16) * 18}s`,
                  transform: `rotate(${(i / 16) * 360}deg) translateX(50%)`,
                }}
              />
            ))}
          </div>
          
          <div className="orbit-z">
            {[...Array(20)].map((_, i) => (
              <div
                key={`oz-${i}`}
                className="orbit-particle"
                style={{
                  animationDelay: `${(i / 20) * 24}s`,
                  transform: `rotate(${(i / 20) * 360}deg) translateX(50%)`,
                }}
              />
            ))}
          </div>

          {/* Globe Image - Central Focus, No Rotation */}
          <Image
            src="/globe/earthglobe.png"
            alt="Global Medical Education Globe"
            width={globeSize}
            height={globeSize}
            priority
            className="relative z-10 w-full h-auto object-contain"
            style={{ pointerEvents: "none" }}
          />

          {/* Global Digital Medical Network Base - Below Globe */}
          <div className="network-base">
            {/* Connecting Lines - 20-30 glowing lines */}
            {networkLines.map((line, idx) => (
              <div
                key={`line-${idx}`}
                className="network-line"
                style={getLineStyle(line)}
              />
            ))}
            
            {/* Network Nodes - 50-60 glowing, pulsing nodes with varied sizes */}
            {networkNodes.map((node) => (
              <div
                key={`node-${node.id}`}
                className="network-node"
                style={{
                  left: node.left,
                  top: node.top,
                  width: `${node.size}px`,
                  height: `${node.size}px`,
                  animationDelay: `${node.delay}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .globe-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1200px;
          transform-style: preserve-3d;
        }

        /* =========================
           PREMIUM EDUCATIONAL HALO
           ========================= */
        .globe-halo {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 110%;
          height: 110%;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(93, 233, 255, 0.12) 0%,
            rgba(93, 233, 255, 0.06) 40%,
            rgba(5, 16, 32, 0) 70%
          );
          filter: blur(20px);
          pointer-events: none;
          z-index: 0;
        }

        /* =========================
           ORBIT X - Clockwise, Tight Fit (+2px)
           ========================= */
        .orbit-x {
          position: absolute;
          top: -1px;
          left: -1px;
          width: calc(100% + 2px);
          height: calc(100% + 2px);
          border: 1.5px solid rgba(93, 233, 255, 0.3);
          border-radius: 50%;
          animation: orbitX 12s linear infinite;
          transform-style: preserve-3d;
          transform: rotateX(75deg) rotateY(0deg);
          pointer-events: none;
          z-index: 15;
          box-shadow: 0 0 4px rgba(93, 233, 255, 0.15);
        }

        /* =========================
           ORBIT Y - Counter-Clockwise (+4px)
           ========================= */
        .orbit-y {
          position: absolute;
          top: -2px;
          left: -2px;
          width: calc(100% + 4px);
          height: calc(100% + 4px);
          border: 1.5px solid rgba(93, 233, 255, 0.25);
          border-radius: 50%;
          animation: orbitY 18s linear infinite reverse;
          transform-style: preserve-3d;
          transform: rotateY(75deg) rotateX(0deg);
          pointer-events: none;
          z-index: 15;
          box-shadow: 0 0 4px rgba(93, 233, 255, 0.12);
        }

        /* =========================
           ORBIT Z - Slower Rotation (+6px)
           ========================= */
        .orbit-z {
          position: absolute;
          top: -3px;
          left: -3px;
          width: calc(100% + 6px);
          height: calc(100% + 6px);
          border: 1.5px solid rgba(93, 233, 255, 0.2);
          border-radius: 50%;
          animation: orbitZ 24s linear infinite;
          transform-style: preserve-3d;
          transform: rotateZ(25deg) rotateX(15deg);
          pointer-events: none;
          z-index: 15;
          box-shadow: 0 0 4px rgba(93, 233, 255, 0.1);
        }

        /* =========================
           ORBIT PARTICLES - Small Glowing Cyan
           ========================= */
        .orbit-particle {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 3px;
          height: 3px;
          background: #5de9ff;
          border-radius: 50%;
          box-shadow: 0 0 6px #5de9ff, 0 0 10px rgba(93, 233, 255, 0.5);
          animation: orbitParticle 12s linear infinite;
          transform-origin: 0 0;
          pointer-events: none;
        }

        @keyframes orbitX {
          from {
            transform: rotateX(75deg) rotateY(0deg) rotateZ(0deg);
          }
          to {
            transform: rotateX(75deg) rotateY(0deg) rotateZ(360deg);
          }
        }

        @keyframes orbitY {
          from {
            transform: rotateY(75deg) rotateX(0deg) rotateZ(0deg);
          }
          to {
            transform: rotateY(75deg) rotateX(0deg) rotateZ(360deg);
          }
        }

        @keyframes orbitZ {
          from {
            transform: rotateZ(25deg) rotateX(15deg) rotateY(0deg);
          }
          to {
            transform: rotateZ(385deg) rotateX(15deg) rotateY(0deg);
          }
        }

        @keyframes orbitParticle {
          0% {
            opacity: 0.4;
            transform: rotate(0deg) translateX(calc(50% - 1.5px));
          }
          50% {
            opacity: 1;
            transform: rotate(180deg) translateX(calc(50% - 1.5px));
          }
          100% {
            opacity: 0.4;
            transform: rotate(360deg) translateX(calc(50% - 1.5px));
          }
        }

        /* =========================
           GLOBAL NETWORK BASE
           ========================= */
        .network-base {
          position: absolute;
          bottom: -45px;
          left: -15%;
          right: -15%;
          height: 160px;
          z-index: 20;
          pointer-events: none;
        }

        /* =========================
           NETWORK CONNECTING LINES
           ========================= */
        .network-line {
          position: absolute;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(93, 233, 255, 0.5),
            rgba(93, 233, 255, 0.8),
            rgba(93, 233, 255, 0.5),
            transparent
          );
          box-shadow: 0 0 4px rgba(93, 233, 255, 0.4);
          transform-origin: left center;
          opacity: 0.6;
          animation: lineGlow 3s ease-in-out infinite;
        }

        @keyframes lineGlow {
          0%, 100% {
            opacity: 0.3;
            box-shadow: 0 0 2px rgba(93, 233, 255, 0.3);
          }
          50% {
            opacity: 0.7;
            box-shadow: 0 0 6px rgba(93, 233, 255, 0.6);
          }
        }

        /* =========================
           NETWORK NODES - Pulsing, Varied Sizes
           ========================= */
        .network-node {
          position: absolute;
          border-radius: 50%;
          background: #5de9ff;
          box-shadow: 0 0 6px #5de9ff, 0 0 12px rgba(93, 233, 255, 0.6);
          animation: pulseNode 2.5s ease-in-out infinite;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        @keyframes pulseNode {
          0%, 100% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1);
            box-shadow: 0 0 4px #5de9ff, 0 0 8px rgba(93, 233, 255, 0.4);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.5);
            box-shadow: 0 0 10px #5de9ff, 0 0 18px rgba(93, 233, 255, 0.8);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .network-base {
            bottom: -35px;
            height: 120px;
          }
          
          .orbit-particle {
            width: 2.5px;
            height: 2.5px;
          }
          
          .network-node {
            box-shadow: 0 0 4px #5de9ff, 0 0 8px rgba(93, 233, 255, 0.5);
          }
        }

        @media (max-width: 480px) {
          .network-base {
            bottom: -25px;
            height: 90px;
          }
          
          .orbit-particle {
            width: 2px;
            height: 2px;
          }
        }
      `}</style>
    </>
  );
}