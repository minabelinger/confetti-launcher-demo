<script setup>
import Sidebar from "./components/Sidebar.vue";
import { onMounted, onUpdated, ref } from "vue";
import { ConfettiLauncher } from "confetti-launcher";
import presetList from "./assets/preset.json";
import { useDraggable } from "@vueuse/core";
import { useTemplateRef } from "vue";
import ConfettiInspect from "./components/ConfettiInspect.vue";
import _ from "lodash";

let selectedPreset = "colorfull";
let conf_launcher = {};
const preset = ref();
let canvas = {};
const displayInpsection = ref(false);
const inspectedConfetti = ref();
let inspectIndex;
let customCode = {};

const el = useTemplateRef("el");
const handle = useTemplateRef("handle");
const sidebarRef = useTemplateRef("sidebar");

const { x, y, style } = useDraggable(el, {
  initialValue: { x: 40, y: 40 },
  preventDefault: true,
  handle: handle,
});

preset.value = _.cloneDeep(presetList[selectedPreset]);

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
  preset.value;
  window.addEventListener("resize", resizeCanvas);
  canvas = document.getElementById("confetti");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  constructConfettiLauncher();
  handleCodeLoad(preset.value.customCode);
});
onUpdated(() => {
  constructConfettiLauncher();
  handleCodeLoad(preset.value.customCode);
});
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function handlePresetOptionChanged(event) {
  selectedPreset = event;
  console.log(selectedPreset);
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

function handleInspectConfetti(index) {
  displayInpsection.value = true;
  inspectIndex = index;
  inspectedConfetti.value = preset.value.confettis[index];
}

function rerenderConfetti() {
  sidebarRef.value.rerenderConfetti(inspectIndex);
}

function handleCodeLoad(event) {
  const cleanCode = event.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "");
  const code = `(function() { return (confettis, launcher, canvas, ConfettiLauncher, window) => {${cleanCode}}; })()`;
  try {
    customCode = eval(code);
    customCode(preset.value.confettis, preset.value.launcher, canvas, ConfettiLauncher, window);
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
      @updateConfettiLauncher="constructConfettiLauncher"
      :preset="preset"
      ref="sidebar"
      style="z-index: 2"
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
        :confetti="inspectedConfetti"
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
main {
  height: 100vh;
}

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
  width: 300px;
  height: auto;
  background-color: #3a3f40;
  z-index: 10;
  border-radius: 4px 4px;
}

.confetti-handle {
  width: 100%;
  background-color: #6e7272;
  display: flex;
  justify-content: center;
  border-radius: 4px 4px 0 0;
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
