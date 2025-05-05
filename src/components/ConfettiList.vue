<template>
  <div class="confetti-list">
    <button
      v-for="(confetti, i) in confettiItems"
      @click="inspectConfetti(i)"
      :class="{ selected: i == selectedConfetti }"
      :style="{ backgroundColor: backgroundColor }"
    >
      <ConfettiPreview
        :confetti="confetti"
        :colors="colors"
        ref="preview"
      />
    </button>
    <button
      @click="createNewConfetti()"
      style="background-color: #14191a"
    >
      <img src="/src/assets/plus-icon-white.svg" />
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
      selectedConfetti: undefined,
    };
  },
  props: {
    confettis: {},
    colors: {},
    backgroundColor: "#ffffff",
  },
  components: {
    ConfettiPreview,
  },
  methods: {
    inspectConfetti(index) {
      this.$emit("inspectedConfetti", index);
      this.selectedConfetti = index;
    },
    createNewConfetti() {
      this.confettis.push(_.cloneDeep(this.confettis[0]));
      this.confettiItems = _.cloneDeep(this.confettis);
      this.$emit("updateConfettiLauncher");
      for (const preview of this.$refs.preview) {
        preview.skipRerender = true;
      }
    },
    rerenderConfetti() {
      for (const [i, preview] of Object.entries(this.$refs.preview)) {
        if (i != this.selectedConfetti) {
          preview.skipRerender = true;
        }
      }
      this.confettiItems = _.cloneDeep(this.confettis);
    },
  },
  watch: {
    confettis: {
      handler(newValue) {
        this.confettiItems = _.cloneDeep(newValue);
      },
      deep: true,
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
  overflow-x: scroll;
}

button {
  width: 5em;
  height: 5em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1em;
  margin-left: 3px;
  border-color: #14191a;
  border-width: 5px;
}

button.selected {
  border-color: white;
}

img {
  display: block;
  width: 3em;
  height: 3em;
}
</style>
