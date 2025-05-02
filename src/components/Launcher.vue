<template>
  <div
    class="wrapper"
    v-if="launcherValues"
  >
    <div class="option-wrapper">
      <div>Start Position</div>
      <div class="inputs">
        <div>x</div>
        <input
          :value="launcherValues.position?.x ? launcherValues.position?.x : 0"
          @input="changeValues(Number($event.target?.value), 'position.x')"
        />
        <div>y</div>
        <input
          :value="launcherValues.position?.y ? launcherValues.position?.y : 0"
          @input="changeValues(Number($event.target?.value), 'position.y')"
        />
      </div>
    </div>
    <div class="option-wrapper">
      <div>Direction</div>
      <div class="inputs">
        <div>start</div>
        <input
          :value="launcherValues.direction?.start ? Number(launcherValues.direction?.start / Math.PI).toFixed(1) : 0"
          @input="changeValues(Number($event.target?.value) * Math.Pi, 'direction.start')"
        />
        <div>end</div>
        <input
          :value="launcherValues.direction?.end ? Number(launcherValues.direction?.end / Math.PI).toFixed(1) : 2"
          @input="changeValues(Number($event.target?.value) * Math.Pi, 'direction.end')"
        />
      </div>
    </div>
    <div class="option-wrapper">
      <div>Strength</div>
      <div class="inputs">
        <div>min</div>
        <input
          :value="launcherValues.strength[0] ? launcherValues.strength[0] : 0"
          @input="changeValues(Number($event.target?.value), 'strength.0')"
        />
        <div>max</div>
        <input
          :value="launcherValues.strength[1] ? launcherValues.strength[1] : 0"
          @input="changeValues(Number($event.target?.value), 'strength.1')"
        />
      </div>
    </div>
    <div class="option-wrapper">
      <div>Amount</div>
      <div class="inputs">
        <div>min</div>
        <input
          :value="launcherValues.amount[0] ? launcherValues.amount[0] : 0"
          @input="changeValues(Number($event.target?.value), 'amount.0')"
        />
        <div>max</div>
        <input
          :value="launcherValues.amount[1] ? launcherValues.amount[1] : 0"
          @input="changeValues(Number($event.target?.value), 'amount.1')"
        />
      </div>
    </div>
    <div class="option-wrapper">
      <div>Shoot repetition</div>
      <div class="inputs">
        <div>duration</div>
        <input
          :value="launcherValues.shootRepetition.duration ? launcherValues.shootRepetition.duration : 0"
          @input="changeValues(Number($event.target?.value), 'shootRepetition.duration')"
        />
        <div>delay</div>
        <input
          :value="launcherValues.shootRepetition.delay ? launcherValues.shootRepetition.delay : 0"
          @input="changeValues(Number($event.target?.value), 'shootRepetition.delay')"
        />
      </div>
    </div>
    <div class="option-wrapper">
      <div>Colors</div>
      <div class="color-button-wrapper">
        <div v-for="(color, i) in launcherValues.colors">
          <button
            @click="
              {
                colorToggle = true;
                currentColor = color;
                colorIndex = i;
              }
            "
            :style="{ backgroundColor: color }"
            class="color-button"
          ></button>
        </div>
        <button
          class="color-button"
          @click="launcherValues.colors.push(currentColor)"
        >
          <img src="/src/assets/plus-icon.svg" />
        </button>
      </div>
    </div>
    <div
      class="color-picker"
      v-if="colorToggle"
    >
      <button
        class="color-picker-close"
        @click="colorToggle = false"
      >
        close
      </button>
      <button
        class="color-picker-delete"
        @click="deleteColor()"
      >
        <img src="/src/assets/trash-svgrepo-com.svg" />
      </button>
      <ColorPicker
        format="hex"
        is-widget
        picker-type="chrome"
        shape="circle"
        :pureColor="currentColor"
        @pureColorChange="updateColor($event)"
      />
    </div>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component";
import { ColorPicker } from "vue3-colorpicker";
export default {
  props: {
    launcher: {},
  },
  data() {
    return {
      launcherValues: this.launcher,
      sliderValue: [0, 2],
      colorToggle: false,
      currentColor: "",
      colorIndex: 0,
    };
  },
  methods: {
    changeValues(value, path) {
      var i;
      let valueCopy = this.launcherValues;
      let p = path.split(".");
      for (i = 0; i < p.length - 1; i++) {
        valueCopy = valueCopy[p[i]];
      }

      valueCopy[p[i]] = value;
      console.log(this.launcherValues);
    },
    changeSliderValues(value) {
      this.launcherValues.direction = { start: Number(value[0] * Math.PI), end: Number(value[1]) * Math.PI };
    },
    updateColor(event) {
      this.launcherValues.colors[this.colorIndex] = event;
    },
    deleteColor() {
      this.launcherValues.colors.splice(this.colorIndex, 1);
    },
  },
  components: {
    VueSlider,
  },
};
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-rows: repeat(6, 1fr);
}

.preset-select {
  width: 100%;
}

.inputs {
  display: grid;
  grid-template-columns: 2fr 40px 1fr 40px;
  align-items: center;
}

.inputs :nth-child(odd) {
  text-align: right;
  padding-right: 3px;
}

.option-wrapper {
  display: grid;
  grid-template-columns: 2fr 4fr;
  align-items: center;
}

.color-button {
  width: 30px;
  height: 30px;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
}

.color-button-wrapper {
  display: flex;
  justify-content: flex-end;
}

img {
  width: 20px;
}

.color-picker {
  position: relative;
  white-space: nowrap;
  top: -10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.color-picker-close {
  position: absolute;
  z-index: 10000;
  font-size: 0.6em;
}

.color-picker-delete {
  position: absolute;
  bottom: 0;
  z-index: 10000;
}

.color-picker-delete img {
  width: 10px;
}

input {
  background-color: #14191a;
  color: white;
  border-radius: 5px;
}

div {
  color: white;
}
</style>
