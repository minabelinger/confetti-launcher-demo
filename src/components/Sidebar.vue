<script>
import Launcher from "./Launcher.vue";
import ConfettiList from "./ConfettiList.vue";
import { Codemirror } from "vue-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

const presetOptions = ["colorfull", "golden", "custom"];

export default {
  props: {
    preset: {},
  },
  data() {
    return {
      presetOptions,
      presetValues: this.preset,
      folded: true,
    };
  },
  setup() {
    const extensions = [javascript(), oneDark];

    return {
      extensions,
    };
  },
  methods: {
    inspectedConfetti(index) {
      this.$emit("inspectedConfetti", index);
    },
    rerenderConfetti(index) {
      this.$refs.confettiList.rerenderConfetti(index);
    },
    readCode() {
      console.log(this.presetValues.customCode);
      this.$emit("loadCode", this.presetValues.customCode);
    },
    displayJSON() {
      console.log(JSON.stringify(this.presetValues));
    },
  },
  components: {
    Launcher,
    ConfettiList,
    Codemirror,
  },
  expose: ["rerenderConfetti"],
};
</script>

<template>
  <div
    class="sidebar"
    :class="{ folded: !folded }"
  >
    <div class="content">
      <div style="display: grid; grid-template-columns: 5fr 1fr 1fr">
        <select class="preset-select">
          <option
            v-for="x in presetOptions"
            :value="x"
          >
            {{ x }}
          </option>
        </select>
        <button class="background-color">
          <div :style="{ 'background-color': presetValues.backgroundColor }"></div>
          <div></div>
        </button>
        <button
          class="json-button"
          @click="displayJSON()"
        >
          JSON
        </button>
      </div>
      <div>
        <div class="highlight-text">Confetti List:</div>
        <ConfettiList
          :confettis="presetValues.confettis"
          :colors="presetValues.launcher.colors"
          :backgroundColor="presetValues.backgroundColor"
          @inspectedConfetti="inspectedConfetti"
          @updateConfettiLauncher="this.$emit('updateConfettiLauncher')"
          ref="confettiList"
          class="confetti-list"
        />
      </div>
      <div>
        <div class="highlight-text">Launcher Options:</div>
        <Launcher
          class="launcher"
          :launcher="preset.launcher"
        />
      </div>
      <div style="height: calc(100% - 1em - 20px)">
        <div class="highlight-text">Custom Code:</div>
        <codemirror
          class="custom-code"
          placeholder="Code goes here..."
          v-model="presetValues.customCode"
          :extensions="extensions"
          @blur="readCode()"
          @keydown.ctrl.s="readCode()"
          :style="{ height: '100%' }"
          ref="textarea"
        />
      </div>
    </div>
    <button
      class="slide-button"
      :class="{ folded: !folded }"
      @click="folded = !folded"
    >
      <img src="/src/assets/double-arrow-right-icon.svg" />
    </button>
  </div>
</template>

<style scoped>
.sidebar {
  max-height: 100vh;
  height: 100vh;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.highlight-text {
  color: #c0c0c0;
  background-color: #454b4d;
  padding: 5px;
  border-radius: 4px 4px 0 0;
  margin-top: 1em;
  width: max-content;
}

.content {
  background-color: #6e7272;
  height: 100%;
  padding: 1.2em;
  max-width: 100%;
  display: grid;
  grid-template-rows: auto auto auto 1fr;
  grid-template-columns: 100%;
  box-sizing: border-box;
}

@media only screen and (min-width: 640px) {
  .sidebar {
    position: relative;
    width: 35em;
    left: 0;
    transition: 0.2s left ease-out;
  }
  .sidebar.folded {
    position: relative;
    left: calc(-35em + 3em);
  }
  .content {
    width: calc(100% - 3em);
  }
  .slide-button img {
    transition: 0.5s all ease-out;
    rotate: 180deg;
  }
  .slide-button.folded img {
    rotate: 0deg;
  }
  .slide-button {
    border-radius: 0 1em 1em 0;
  }
}

@media only screen and (max-width: 640px) {
  .sidebar {
    position: fixed;
    bottom: 0;
    height: 80%;
    width: 100%;
    flex-direction: column-reverse;
    transition: 0.2s bottom ease-out;
  }
  .sidebar.folded {
    bottom: calc(-80% + 3em);
  }
  .content {
    width: 100%;
  }
  .slide-button img {
    transition: 0.5s all ease-out;
    rotate: 90deg;
  }
  .slide-button.folded img {
    rotate: -90deg;
  }
  .slide-button {
    border-radius: 1em 1em 0 0;
  }
}

select {
  background-color: #3a3f40;
  color: white;
  border-radius: 4px;
  padding: 0.5em;
  border: none;
  z-index: 0;
  width: 100%;
}

select,
::picker(select) {
  appearance: base-select;
}

::picker(select) {
  position: relative;
  top: -5px;
  border-radius: 0 0 1em 1em;
  height: 0;
  opacity: 0;
  overflow-y: scroll;
  overflow-x: hidden;
  transition: 0.4s all allow-discrete;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

::picker(select):popover-open {
  height: 100px;
  opacity: 1;
}

@starting-style {
  ::picker(select):popover-open {
    height: 0;
    opacity: 0;
  }
}

select::picker-icon {
  color: #999;
  transition: 0.4s;
}

select:open::picker-icon {
  scale: 1.5 0.2;
  rotate: -450deg;
  background-color: #999;
}

option {
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  color: white;

  border: 2px solid #3a3f40;
  border-left: none;
  border-right: none;
  background: #3a3f40;
  padding: 5px;
  transition: 0.4s;
}

option:nth-of-type(odd) {
  background: #757575;
}

option:hover {
  background: #d4d4d4;
}

option:first-of-type {
  border-top: none;
}

option:last-of-type {
  border-bottom: none;
}

.slide-button {
  position: relative;
  background-color: #3a3f40;
  width: 3em;
  height: 3em;
  padding: 4px;
}

.launcher {
  padding: 5px;
  border-radius: 0 4px 4px 4px;
  background-color: #3a3f40;
}

.background-color {
  margin-left: 10px;
  background-color: #3a3f40;
  border: none;
  border-radius: 4px;
}

.background-color :nth-child(1) {
  width: 15px;
  height: 15px;
  border-radius: 2px;
  border-color: #14191a;
  border-width: 2px;
  border-style: solid;
}

.json-button {
  background-color: #3a3f40;
  margin-left: 10px;
  border-radius: 4px;
}
</style>
