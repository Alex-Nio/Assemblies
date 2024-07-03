<script setup>
  import Page from '@/components/layout/Page.vue';
  import Loader from './components/UI/loader/Loader.vue';
</script>

<template>
  <Loader />
  <Page>
    <router-view />
  </Page>
</template>

<style lang="scss" scope></style>
