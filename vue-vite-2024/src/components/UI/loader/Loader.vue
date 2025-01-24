<script setup>
import { loading } from '@/app/router/index.js';
import { ref, watch } from 'vue';

const transitioning = ref(false);

watch(loading, (newVal) => {
  if (!newVal) {
    transitioning.value = true;
    setTimeout(() => {
      transitioning.value = false;
    }, 300); 
  }
});
</script>

<template>
  <div
    v-if="loading || transitioning"
    :class="['preloader', { hidden: !loading }]"
  >
    <div class="spinner"></div>
  </div>
</template>

<style lang="scss" scoped>
  .preloader {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 18px;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 1000;
    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
    opacity: 1;
    visibility: visible;
  }

  .preloader.hidden {
    opacity: 0;
    visibility: hidden;
  }

  .spinner {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    border: 5px solid rgba(0, 0, 0, 0.1);
    border-top: 5px solid #3498db;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
