<script setup lang="ts">
import ChatOverlay from "@/components/ChatOverlay.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import type { IChatMessage } from "@/types";

const channelId = ref();
const route = useRoute();
const chatMessages: any = ref([]);

onMounted(async () => {
  channelId.value = route.query.user;
});

</script>

<template>
  <main>
    <div class="container mx-auto p-5">
      <h1 class="text-center">CHAT OVERLAY MANAGER</h1>
      <Splitter style="height: 300px" class="mb-5" layout="vertical">
        <!-- PANEL TOP -->
        <SplitterPanel class="flex items-center justify-center">
          <h1 class="text-center">PREVIEW CHAT OVERLAY</h1>
          <!-- <ChatOverlay :channelId="channelId" :chatDemo="false" /> -->
          <ChatOverlay :channelId="''" :chatDemo="true" />
        </SplitterPanel>

        <!-- PANEL BOTTOM -->
        <SplitterPanel class="flex items-center justify-center">

          <h1 class="text-center">CHAT OVERLAY CONFIGURATION</h1>
          <div class="flex flex-col">

          </div>
        </SplitterPanel>

      </Splitter>
    </div>
  </main>
</template>
