<script>
export default {
  name: "ConfettiInspect",
  data() {
    return {
      confettiValue: this.confetti,
    };
  },
  props: {
    confetti: {
      type: Object,
      required: true,
    },
  },
  watch: {
    confettiValue: {
      handler() {
        this.$emit("changedConfetti");
      },
      deep: true,
    },
  },
  methods: {},
};
</script>

<template>
  <div class="wrapper">
    <h4>shapeOptions</h4>
    <div>
      <select v-model="confettiValue.shapeOptions.type">
        <option value="ellipse">ellipse</option>
        <option value="rectangle">rectangle</option>
        <option value="image">image</option>
      </select>
      <input v-model="confettiValue.shapeOptions.width" />
      <input v-model="confettiValue.shapeOptions.height" />
      <input v-model="confettiValue.shapeOptions.shininess" />
      <input v-model="confettiValue.shapeOptions.shadows" />
    </div>
    <h4>velocity</h4>
    <div>
      <input v-model="confettiValue.velocity.gravity" />
      <input v-model="confettiValue.velocity.airdrag" />
      <input v-model="confettiValue.velocity.maxFallspeed" />
    </div>
    <h4>lifetime</h4>
    <div>
      <input
        type="checkbox"
        v-model="confettiValue.lifetime.enabled"
      />
      <input v-model="confettiValue.lifetime.onset" />
      <input v-model="confettiValue.lifetime.duration" />
    </div>
    <input
      type="checkbox"
      v-model="confettiValue.randomRotation"
    />
    <input
      type="checkbox"
      v-model="confettiValue.randomColor"
    />
  </div>
</template>

<style scoped>
.wrapper {
  padding: 1em;
}
</style>
