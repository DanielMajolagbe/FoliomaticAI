import { useEffect, useRef } from "react";

interface SleekLineCursorProps {
  friction?: number;
  trails?: number;
  size?: number;
  dampening?: number;
  tension?: number;
  className?: string;
}

interface NodeType {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface WaveOptions {
  phase?: number;
  offset?: number;
  frequency?: number;
  amplitude?: number;
}

interface LineOptions {
  spring: number;
}

class Wave {
  phase: number = 0;
  offset: number = 0;
  frequency: number = 0.001;
  amplitude: number = 1;
  private e: number = 0;

  constructor(options: WaveOptions = {}) {
    this.phase = options.phase || 0;
    this.offset = options.offset || 0;
    this.frequency = options.frequency || 0.001;
    this.amplitude = options.amplitude || 1;
  }

  update(): number {
    this.phase += this.frequency;
    this.e = this.offset + Math.sin(this.phase) * this.amplitude;
    return this.e;
  }
}

class Node implements NodeType {
  x: number = 0;
  y: number = 0;
  vx: number = 0;
  vy: number = 0;
}

class Line {
  spring: number = 0;
  friction: number = 0;
  nodes: NodeType[] = [];
  E: any;
  pos: { x: number; y: number };

  constructor(options: LineOptions, E: any, pos: { x: number; y: number }) {
    this.E = E;
    this.pos = pos;
    this.spring = options.spring + 0.1 * Math.random() - 0.02;
    this.friction = E.friction + 0.01 * Math.random() - 0.002;
    this.nodes = [];

    for (let n = 0; n < E.size; n++) {
      const t = new Node();
      t.x = pos.x;
      t.y = pos.y;
      this.nodes.push(t);
    }
  }

  update(): void {
    let e = this.spring;
    let t = this.nodes[0];

    t.vx += (this.pos.x - t.x) * e;
    t.vy += (this.pos.y - t.y) * e;

    for (let i = 0, a = this.nodes.length; i < a; i++) {
      t = this.nodes[i];

      if (i > 0) {
        const n = this.nodes[i - 1];
        t.vx += (n.x - t.x) * e;
        t.vy += (n.y - t.y) * e;
        t.vx += n.vx * this.E.dampening;
        t.vy += n.vy * this.E.dampening;
      }

      t.vx *= this.friction;
      t.vy *= this.friction;
      t.x += t.vx;
      t.y += t.vy;
      e *= this.E.tension;
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    let e: NodeType, t: NodeType;
    let n = this.nodes[0].x;
    let i = this.nodes[0].y;

    ctx.beginPath();
    ctx.moveTo(n, i);

    for (let a = 1, o = this.nodes.length - 2; a < o; a++) {
      e = this.nodes[a];
      t = this.nodes[a + 1];
      n = 0.5 * (e.x + t.x);
      i = 0.5 * (e.y + t.y);
      ctx.quadraticCurveTo(e.x, e.y, n, i);
    }

    e = this.nodes[this.nodes.length - 2];
    t = this.nodes[this.nodes.length - 1];
    ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
    ctx.stroke();
    ctx.closePath();
  }
}

export function SleekLineCursor({
  friction = 0.5,
  trails = 20,
  size = 50,
  dampening = 0.25,
  tension = 0.98,
  className = "",
}: SleekLineCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D & { running?: boolean; frame?: number } | null>(null);
  const waveRef = useRef<Wave | null>(null);
  const linesRef = useRef<Line[]>([]);
  const posRef = useRef({ x: 0, y: 0 });
  const ERef = useRef({ friction, trails, size, dampening, tension });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D & {
      running?: boolean;
      frame?: number;
    };

    if (!ctx) return;

    ctx.running = true;
    ctx.frame = 1;
    contextRef.current = ctx;

    waveRef.current = new Wave({
      phase: Math.random() * 2 * Math.PI,
      amplitude: 85,
      frequency: 0.0015,
      offset: 285,
    });

    const createLines = () => {
      linesRef.current = [];
      for (let e = 0; e < ERef.current.trails; e++) {
        linesRef.current.push(
          new Line(
            { spring: 0.4 + (e / ERef.current.trails) * 0.025 },
            ERef.current,
            posRef.current
          )
        );
      }
    };

    const updatePosition = (e: MouseEvent | TouchEvent) => {
      if ("touches" in e) {
        posRef.current.x = e.touches[0].pageX;
        posRef.current.y = e.touches[0].pageY;
      } else {
        posRef.current.x = e.clientX;
        posRef.current.y = e.clientY;
      }
    };

    const render = () => {
      if (!ctx.running || !waveRef.current) return;

      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.globalCompositeOperation = "lighter";
      ctx.strokeStyle = `hsla(${Math.round(waveRef.current.update())},50%,50%,0.2)`;
      ctx.lineWidth = 1;

      for (let t = 0; t < ERef.current.trails; t++) {
        const line = linesRef.current[t];
        line.update();
        line.draw(ctx);
      }

      ctx.frame = (ctx.frame || 0) + 1;
      requestAnimationFrame(render);
    };

    const resizeCanvas = () => {
      if (ctx && ctx.canvas) {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
      }
    };

    const onMouseMove = (e: MouseEvent | TouchEvent) => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("touchstart", onMouseMove);
      document.addEventListener("mousemove", updatePosition);
      document.addEventListener("touchmove", updatePosition);
      updatePosition(e);
      createLines();
      render();
    };

    resizeCanvas();
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("touchstart", onMouseMove);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      ctx.running = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("touchstart", onMouseMove);
      document.removeEventListener("touchmove", updatePosition);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      id="cursor-canvas"
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-50 ${className}`}
    />
  );
}
