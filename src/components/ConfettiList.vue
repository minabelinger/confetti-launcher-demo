<template>
  <div class="confetti-list">
    <button
      v-for="(confetti, i) in confettiItems"
      @click="inspectConfetti(i)"
    >
      <ConfettiPreview
        :confetti="confetti"
        :colors="colors"
        ref="preview"
      />
    </button>
    <button @click="createNewConfetti()">
      <img src="/src/assets/plus-icon.svg" />
    </button>
  </div>
</template>

<script>
import ConfettiPreview from "./ConfettiPreview.vue";
import _ from "lodash";

export default {
  name: "ConfettiList",
  data() {
    return {
      confettiItems: _.cloneDeep(this.confettis),
    };
  },
  props: {
    confettis: {},
    colors: {},
  },
  components: {
    ConfettiPreview,
  },
  methods: {
    inspectConfetti(index) {
      this.$emit("inspectedConfetti", index);
    },
    createNewConfetti() {
      console.log("created new confetti");
    },
    rerenderConfetti(index) {
      const clone = _.cloneDeep(this.confettis);
      this.confettiItems = clone;
      this.$refs.preview[index.value].updatePreview();
    },
  },
};
</script>

<style scoped>
.confetti-list {
  background-color: #3a3f40;
  overflow-y: hidden;
  display: flex;
  padding: 5px;
  border-radius: 0px 4px 4px 4px;
}

button {
  width: 5em;
  height: 5em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1em;
  margin-left: 3px;
  border-color: #39565c;
  border-width: 5px;
}

img {
  display: block;
  width: 3em;
  height: 3em;
}
</style>
