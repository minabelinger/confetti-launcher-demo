<script setup>
import Sidebar from "./components/Sidebar.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { ConfettiLauncher } from "confetti-launcher";
import presetList from "./assets/preset.json";
import { useDraggable } from "@vueuse/core";
import { useTemplateRef } from "vue";
import ConfettiInspect from "./components/ConfettiInspect.vue";
import _ from "lodash";

let selectedPreset = "colorfull";
let conf_launcher = {};
const preset = ref(presetList[selectedPreset]);
let canvas = {};
const displayInpsection = ref(false);
const inspectIndex = ref(0);
let customCode = {};

const el = useTemplateRef("el");
const handle = useTemplateRef("handle");
const sidebar = ref("sidebar");
const backgroundColor = ref("#ffffff");

const { x, y, style } = useDraggable(el, {
  initialValue: { x: 40, y: 40 },
  preventDefault: true,
  handle: handle,
});

document.addEventListener(
  "keydown",
  function (e) {
    if ((e.metaKey || e.ctrlKey) && e.code === "KeyS") {
      e.preventDefault(); // Prevent default browser behavior
    }
  },
  false
);

onMounted(() => {
  window.addEventListener("resize", resizeCanvas);
  canvas = document.getElementById("confetti");
  console.log(canvas);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  constructConfettiLauncher();
});
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function handlePresetOptionChanged(event) {
  selectedPreset = event;
  preset.value = _.cloneDeep(presetList[selectedPreset]);
}

function constructConfettiLauncher() {
  const confettis = preset.value.confettis;
  const launcher = preset.value.launcher;

  conf_launcher = new ConfettiLauncher(launcher, confettis, canvas);
}

function shootConfetti() {
  conf_launcher.shoot();
}

function handleInspectConfetti(event) {
  displayInpsection.value = true;
  inspectIndex.value = event;
}

function rerenderConfetti() {
  sidebar.value.rerenderConfetti(inspectIndex);
}

function handleCodeLoad(event) {
  const code = `(function() { return (confettis, launcher, canvas, ConfettiLauncher) => {${event}}; })()`;
  try {
    customCode = eval(code);
    customCode(preset.value.confettis, preset.value.launcher, canvas, ConfettiLauncher);
  } catch (error) {
    customCode = {};
    console.error(error);
  }
}
</script>

<template>
  <main :style="{ 'background-color': preset.backgroundColor }">
    <Sidebar
      @presetOptionChanged="handlePresetOptionChanged"
      @inspectedConfetti="handleInspectConfetti"
      @loadCode="handleCodeLoad"
      :preset="preset"
      ref="sidebar"
    />
    <canvas id="confetti"></canvas>
    <div
      ref="el"
      v-if="displayInpsection"
      class="confetti-inspect"
      :style="style"
      style="position: fixed"
    >
      <div
        ref="handle"
        class="confetti-handle"
      >
        <img
          src="/src/assets/menu-symbol-of-three-parallel-lines-svgrepo-com.svg"
          height="20px"
        />
        <button
          class="inspect-close-button"
          @click="displayInpsection = false"
        >
          close
        </button>
      </div>
      <ConfettiInspect
        :confetti="preset.confettis[inspectIndex]"
        @changedConfetti="rerenderConfetti()"
      />
    </div>
    <button
      id="shoot-button"
      @click="shootConfetti"
    >
      Shoot 🎉
    </button>
  </main>
</template>

<style scoped>
div {
  font: -webkit-control;
}

#confetti {
  top: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  touch-action: none;
  pointer-events: none;
  z-index: 1;
}

#shoot-button {
  position: fixed;
  bottom: 4%;
  left: calc(50% - 120px);
  background-color: #bae1ee;
  font-size: 2em;
  padding: 10px;
  width: 240px;
  border: none;
  border-radius: 1em;
  color: white;
  transition: 0.1s all ease-out;
}

#shoot-button:hover {
  border: solid;
  padding: 12px;
  border-color: #93cee1;
}

#shoot-button:active {
  background-color: #dbebf0;
  border-color: white;
  animation: wiggle 0.1s forwards;
}

.confetti-inspect {
  width: 400px;
  height: auto;
  background-color: gray;
  z-index: 10;
  border-radius: 1em 1em;
}

.confetti-handle {
  width: 100%;
  background-color: #595959;
  display: flex;
  justify-content: center;
  border-radius: 1em 1em 0 0;
}

.inspect-close-button {
  position: absolute;
  right: 0;
}

@keyframes wiggle {
  0% {
    transform: rotate(0deg);
  }
  20% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(10deg);
  }
  80% {
    transform: rotate(-10deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
