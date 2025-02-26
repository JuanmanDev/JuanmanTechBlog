<template>
  <canvas ref="canvasRef" class="absolute top-0 left-0 w-full h-full"></canvas>
</template>
  
<script lang="ts">
  import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
  
  export default defineComponent({
    name: 'BubbleCanvas',
    setup() {
      const canvasRef = ref<HTMLCanvasElement | null>(null);
  
      const emojis = ['💬', '💬', '💬', '💬', '📱', '📨', '📩', '📥', '💭', '🗯️', '👋', '👍', '🎉'];
  
      class Bubble {
        x: number;
        y: number;
        size: number;
        emoji: string;
        baseSpeed: number;
        wobble: number;
        wobbleSpeed: number;
        opacity: number;
        side: 'left' | 'right';
        progress: number;
        canvas: HTMLCanvasElement;
  
        constructor(canvas: HTMLCanvasElement, side: 'left' | 'right') {
          this.canvas = canvas;
          this.side = side;
  
          // Make size between 50% and 100% of canvas height
          const minSize = canvas.height * 0.5;
          const maxSize = canvas.height * 1.0;
          this.size = minSize + Math.random() * (maxSize - minSize);
  
          // Position based on side
          if (side === 'left') {
            this.x = canvas.width * 0.25;
          } else {
            this.x = canvas.width * 0.75;
          }
  
          this.y = canvas.height + this.size * 0.5;
          this.emoji = emojis[Math.floor(Math.random() * emojis.length)];
  
          // Base speed - will be modified by progress
          this.baseSpeed = 10.5 + Math.random() * 1.0; // Faster base speed
          this.wobble = Math.random() * Math.PI * 2;
          this.wobbleSpeed = 0.005 + Math.random() * 0.01;
  
          // Lower opacity for giant emojis to avoid overwhelming the screen
          this.opacity = 0.15 + Math.random() * 0.3;
  
          // Track progress from 0 (start) to 1 (end)
          this.progress = 0;
        }
  
        update() {
          // Calculate total journey length
          const totalJourney = this.canvas.height + this.size;
          const currentPosition = this.canvas.height + this.size * 0.5 - this.y;
  
          // Update progress (0 to 1)
          this.progress = currentPosition / totalJourney;
  
          // Variable speed based on progress
          // Faster at beginning (0) and end (1), slower in middle (0.5)
          // Using a sine curve for smooth transition
          const speedFactor = 1 - Math.sin(this.progress * Math.PI) * 0.7;
          const currentSpeed = this.baseSpeed * speedFactor;
  
          // Move emoji
          this.y -= currentSpeed;
          this.wobble += this.wobbleSpeed;
  
          // Gentle wobble for giant emojis
          const wobbleAmount = 15;
          if (this.side === 'left') {
            this.x = this.canvas.width * 0.25 + Math.sin(this.wobble) * wobbleAmount;
          } else {
            this.x = this.canvas.width * 0.75 + Math.sin(this.wobble) * wobbleAmount;
          }
        }
  
        draw(ctx: CanvasRenderingContext2D) {
          ctx.save();
          ctx.globalAlpha = this.opacity;
          ctx.font = `${this.size}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(this.emoji, this.x, this.y);
          ctx.restore();
        }
  
        isOffScreen() {
          return this.y < -this.size * 0.5;
        }
      }
  
      onMounted(() => {
        const canvas = canvasRef.value;
        if (!canvas) return;
  
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
  
        // Set canvas dimensions to match window size
        const resizeCanvas = () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        };
  
        // Call resize initially and add event listener
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
  
        // Track active bubbles
        let activeBubbles: Bubble[] = [];
        let lastSide: 'left' | 'right' = 'right'; // Start with right so first bubble is left
        let lastBubbleTime = 0;
        const bubbleInterval = 4000; // Interval between new bubbles
  
        // Animation loop
        const animate = (timestamp: number) => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  
          // Check if we need to add a new bubble - only if we have fewer than 2 bubbles
          if (activeBubbles.length < 2 && timestamp - lastBubbleTime > bubbleInterval) {
            // Alternate sides
            const newSide = lastSide === 'left' ? 'right' : 'left';
            activeBubbles.push(new Bubble(canvas, newSide));
            lastSide = newSide;
            lastBubbleTime = timestamp;
          }
  
          // Update and draw bubbles, remove off-screen ones
          activeBubbles = activeBubbles.filter(bubble => {
            bubble.update();
            bubble.draw(ctx);
            return !bubble.isOffScreen();
          });
  
          requestAnimationFrame(animate);
        };
  
        requestAnimationFrame(animate);
  
        // Cleanup
        onUnmounted(() => {
          window.removeEventListener('resize', resizeCanvas);
        });
      });
  
      return {
        canvasRef,
      };
    },
  });
</script>
  