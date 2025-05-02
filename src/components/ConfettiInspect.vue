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
  updated() {
    this.confettiValue = this.confetti;
  },
};
</script>

<template>
  <div class="wrapper">
    <h4>shapeOptions</h4>
    <div>
      <div class="option-wrapper">
        <div>Shape</div>
        <select v-model="confettiValue.shapeOptions.type">
          <option value="ellipse">ellipse</option>
          <option value="rectangle">rectangle</option>
          <option value="image">image</option>
        </select>
      </div>
      <div class="option-wrapper">
        <div>Width</div>
        <input v-model="confettiValue.shapeOptions.width" />
      </div>
      <div class="option-wrapper">
        <div>Height</div>
        <input v-model="confettiValue.shapeOptions.height" />
      </div>
      <div class="option-wrapper">
        <div>Shininess</div>
        <input v-model="confettiValue.shapeOptions.shininess" />
      </div>
      <div class="option-wrapper">
        <div>Shadows</div>
        <input v-model="confettiValue.shapeOptions.shadows" />
      </div>
    </div>
    <h4>velocity</h4>
    <div>
      <div class="option-wrapper">
        <div>Gravity</div>
        <input v-model="confettiValue.velocity.gravity" />
      </div>
      <div class="option-wrapper">
        <div>Airdrag</div>
        <input v-model="confettiValue.velocity.airdrag" />
      </div>
      <div class="option-wrapper">
        <div>Max Fallspeed</div>
        <input v-model="confettiValue.velocity.maxFallspeed" />
      </div>
    </div>
    <h4>lifetime</h4>
    <div>
      <div class="option-wrapper">
        <div>Enbabled</div>
        <input
          type="checkbox"
          v-model="confettiValue.lifetime.enabled"
        />
      </div>
      <div
        v-if="confettiValue.lifetime.enabled"
        class="option-wrapper"
      >
        <div>Onset</div>
        <input v-model="confettiValue.lifetime.onset" />
      </div>
      <div
        v-if="confettiValue.lifetime.enabled"
        class="option-wrapper"
      >
        <div>Duration</div>
        <input v-model="confettiValue.lifetime.duration" />
      </div>
    </div>
    <h4>Randomness</h4>
    <div class="option-wrapper">
      <div>Random Rotation</div>
      <input
        type="checkbox"
        v-model="confettiValue.randomRotation"
      />
    </div>
    <div class="option-wrapper">
      <div>Random Color</div>
      <input
        type="checkbox"
        v-model="confettiValue.randomColor"
      />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  padding: 1em;
}

.option-wrapper {
  display: grid;
  grid-template-columns: 4fr 80px;
  align-items: center;
}

input {
  background-color: #14191a;
  color: white;
  border-radius: 5px;
}

select {
  background-color: #14191a;
  color: white;
  border-radius: 5px;
}

div {
  color: white;
}
</style>
