<script setup>
  import Footer from '@/components/Common/footer/Footer.vue';
  import Header from '../Common/header/Header.vue';
</script>

<template>
  <div class="full-wrapper">
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
</template>

<style lang="scss" scoped></style>
