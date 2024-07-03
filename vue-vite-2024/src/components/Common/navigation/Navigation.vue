<script setup lang="ts">
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';

  defineProps({
    navActive: Boolean,
  });

  const menu = ref([
    { to: '/', icon: 'icon-user', text: 'Home' },
    { to: '/search', icon: 'icon-search', text: 'Search' },
    { to: '/ui', icon: 'icon-pacman', text: 'UI' },
  ]);

  const route = useRoute();
</script>

<template>
  <nav class="nav">
    <ul class="nav-list">
      <li
        v-for="item in menu"
        :key="item.to"
        class="nav-list__item"
      >
        <router-link
          :to="item.to"
          class="nav-link"
        >
          <i :class="item.icon"></i>
          <span>{{ item.text }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
  .nav-list {
    display: flex;
    gap: 20px;
    padding: 20px 0;
    justify-content: center;
  }

  .nav-link {
    display: inline-flex;
    gap: 12px;
    font-size: 22px;
    @include nunito-r20;
  }

  .router-link-active {
    color: $success-main;
  }
</style>
