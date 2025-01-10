import React, { useEffect, useRef } from 'react';

const BlockchainBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Node class for blockchain visualization
    class Node {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      connections: Node[];

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.radius = 2;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.connections = [];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(147, 51, 234, 0.5)';
        ctx.fill();

        // Draw connections
        this.connections.forEach(node => {
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(node.x, node.y);
          ctx.strokeStyle = 'rgba(147, 51, 234, 0.1)';
          ctx.stroke();
        });
      }
    }

    // Create nodes
    const nodes: Node[] = [];
    const nodeCount = 100;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new Node(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      ));
    }

    // Connect nodes
    nodes.forEach(node => {
      const connectionsCount = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < connectionsCount; i++) {
        const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
        if (randomNode !== node && !node.connections.includes(randomNode)) {
          node.connections.push(randomNode);
        }
      }
    });

    // Animation loop
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach(node => {
        node.update();
        node.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

export default BlockchainBackground;