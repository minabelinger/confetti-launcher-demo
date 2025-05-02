<template>
  <div class="confetti-preview">
    <canvas
      id="canvas-confetti-preview"
      width="80"
      height="80"
      ref="confettiPreview"
    ></canvas>
  </div>
</template>

<script>
import { ConfettiLauncher } from "confetti-launcher";
let launcher = {};

export default {
  name: "ConfettiPreview",
  data() {
    return {
      size: 50,
      skipRerender: false,
    };
  },
  props: {
    confetti: {},
    colors: {},
  },
  mounted() {
    this.updatePreview();
  },
  updated() {
    if (this.skipRerender) {
      this.skipRerender = false;
    } else {
      this.updatePreview();
    }
  },
  methods: {
    updatePreview() {
      const confettiValue = this.confetti;

      launcher = {
        position: {
          x: 40,
          y: 40,
        },
        strength: [0, 0],
        colors: this.colors,
        amount: [1, 1],
      };

      confettiValue.velocity = {
        x: 0,
        y: 0,
        gravity: 0,
        airdrag: 0,
        maxFallspeed: 0,
      };

      const magnitude = Math.sqrt(
        Math.pow(confettiValue.shapeOptions.width, 2) + Math.pow(confettiValue.shapeOptions.height, 2)
      );

      confettiValue.shapeOptions.width /= magnitude;
      confettiValue.shapeOptions.height /= magnitude;
      confettiValue.shapeOptions.width *= this.size;
      confettiValue.shapeOptions.height *= this.size;

      confettiValue.lifetime = {
        enabled: false,
      };

      const canvas = this.$refs.confettiPreview;
      const ctx = canvas.getContext("2d");
      ctx.reset();

      const confetti_launcher = new ConfettiLauncher(launcher, [confettiValue], canvas);
      confetti_launcher.shoot();
    },
  },
};
</script>

<style scoped>
.confetti-preview {
  padding: 20px;
  text-align: center;
}

.canvas-confetti-preview {
  width: 80;
  height: 80;
}
</style>
