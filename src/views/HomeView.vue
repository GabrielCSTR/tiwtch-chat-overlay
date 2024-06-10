<script setup lang="ts">
import ChatOverlay from "@/components/ChatOverlay.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const channelId = ref();
const route = useRoute();

onMounted(async () => {
  channelId.value = route.query.user;
});

</script>

<template>
  <main>
    <div class="container mx-auto p-5">
      <h1>CHAT OVERLAY - <span class="text-xl uppercase">{{ channelId }}</span></h1>
      <ChatOverlay :channelId="channelId" />
    </div>
  </main>
</template>
