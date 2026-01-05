<template>
  <Transition
    mode="out-in"
    name="animate__slide"
    :duration="duration"
    :appear="appear"
    :enter-active-class="`animated ${enter}`"
    :leave-active-class="`animated ${leave}`"
  >
    <slot></slot>
  </Transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TransitionSlide',

  props: {
    enter: {
      type: String,
      default: 'fadeIn',
    },

    leave: {
      type: String,
      default: 'fadeOut',
    },

    duration: {
      type: Number,
      default: 1000,
    },

    appear: {
      type: Boolean,
      default: true,
    },
  },
});
</script>
