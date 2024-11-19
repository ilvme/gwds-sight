<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <n-config-provider>
    <n-notification-provider>
      <n-message-provider>
        <RouterView />
      </n-message-provider>
    </n-notification-provider>
  </n-config-provider>
</template>

<style scoped></style>
