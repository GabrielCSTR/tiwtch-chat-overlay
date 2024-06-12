<script setup lang="ts">
import ChatOverlay from "@/components/ChatOverlay.vue";
import { onMounted, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import InputText from 'primevue/inputtext'
import Checkbox from 'primevue/checkbox';
import ColorPicker from 'primevue/colorpicker';
import InputMask from 'primevue/inputmask';
import Slider from 'primevue/slider';

const channelId = ref();
const route = useRoute();

const badges = ref([
  { key: 'badge1', name: 'Show Moderator Badges', value: '1' },
  { key: 'badge2', name: 'Show Subscriber Badges', value: '2' },
  { key: 'badge3', name: 'Show Turbo Badges', value: '3' },
  { key: 'badge3', name: 'Show Twitch Prime Badges', value: '4' },
  { key: 'badge3', name: 'Show Bits Badges', value: '5' },
]);

const extraBadges = ref([
  { key: 'badge1', name: 'Enable BetterTTV Emotes', value: '1' },
  { key: 'badge2', name: 'Enable FrankerFaceZ Emotes', value: '2' },
  { key: 'badge3', name: 'Enable 7TV Emotes', value: '3' },
]);

const selectedBadges = ref<string[]>([]);
const selectedExtraBadges = ref<string[]>([]);
const bgcolorHEX = ref('FFFFFF');
const textcolorHEX = ref('FAFAFA');
const fontSize = ref(12);

const chatStyle = reactive({
  backgroundColor: bgcolorHEX.value,
  textColor: textcolorHEX.value,
  fontSize: fontSize.value,
})

watch(bgcolorHEX, (newValue) => {
  chatStyle.backgroundColor = newValue;
});

watch(textcolorHEX, (newValue) => {
  chatStyle.textColor = newValue;
});

watch(fontSize, (newValue) => {
  chatStyle.fontSize = newValue;
});

onMounted(async () => {
  channelId.value = route.query.user;
});

</script>

<template>
  <div class="container mx-auto p-5">
    <div class="flex flex-col items-center">
      <h1
        class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-300 md:text-5xl lg:text-6xl dark:text-white">
        Chat Overlay Manager</h1>
      <p class="mb-6 text-center text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        Transforme e personalize a aparência do chat da Twitch com facilidade. O Chat Overlay Manager permite que você
        gerencie estilos de mensagens em tempo real, criando uma experiência única e envolvente para seus
        espectadores. Adicione cores, fontes e layouts personalizados para destacar o chat durante suas transmissões
        ao vivo.</p>
    </div>

    <Splitter class="mb-5" layout="vertical">
      <!-- PANEL TOP -->
      <SplitterPanel class="flex flex-col items-center justify-center  min-h-96">
        <h1 class="text-center mt-5">PREVIEW CHAT OVERLAY</h1>
        <!-- <ChatOverlay :channelId="channelId" :chatDemo="false" /> -->
        <ChatOverlay class="h-96" :channelId="''" :chatDemo="true" :wrapper="true" :style="chatStyle" />
      </SplitterPanel>

      <!-- PANEL BOTTOM -->
      <SplitterPanel class="flex flex-col justify-center items-center mb-5">
        <h1 class="text-center mt-5">CHAT OVERLAY CONFIGURATION</h1>
        <div class="flex flex-col justify-center items-center mt-5 w-screen">

          <div class="flex justify-between items-center w-1/2">
            <label for="channelId" class="font-bold block mb-2">Chanel Name:</label>
            <InputText class="h-12 text-center" id="channelId" v-model="channelId" placeholder="channel name" />
          </div>

          <div class="flex justify-between items-center w-1/2 mt-5">
            <label for="badges" class="font-bold block mb-2">Badges:</label>
            <div class="flex flex-col">
              <div v-for="badge in badges" :key="badge.key" class="flex items-center mt-2">
                <Checkbox v-model="selectedBadges" :inputId="badge.key" name="badge" :value="badge.value"
                  class="mr-2" />
                <label :for="badge.key">{{ badge.name }}</label>
              </div>
            </div>
          </div>

          <div class="flex justify-between items-center w-1/2 mt-5">
            <label for="badges-extra" class="font-bold block mb-2">Extra Emotes:</label>
            <div class="flex flex-col">
              <div v-for="extra in extraBadges" :key="extra.key" class="flex items-center mt-2">
                <Checkbox v-model="selectedExtraBadges" :inputId="extra.key" name="badges-extra" :value="extra.value"
                  class="mr-2" />
                <label :for="extra.key">{{ extra.name }}</label>
              </div>
            </div>
          </div>

          <div class="flex justify-between items-center w-1/2 mt-5 mb-5">
            <label for="cp-hex" class="font-bold block mb-2"> Background Color </label>
            <span class="relative">
              <ColorPicker v-model="bgcolorHEX" inputId="cp-hex" format="hex"
                class="absolute top-2/4 -mt-2.5 right-3 " />
              <div>
                <InputMask class="h-12 text-left pl-2 uppercase" mask="#******" v-model="bgcolorHEX" />
                <p class="absolute text-xs italic mt-1">Note: This background color is for preview purposes only. It
                  will
                  not
                  be shown
                  in your
                  streaming
                  software.</p>
              </div>
            </span>
          </div>

          <div class="flex justify-between items-center w-1/2 mt-5 ">
            <label for="cp-hex" class="font-bold block mb-2"> Text Color </label>
            <span class="relative">
              <ColorPicker v-model="textcolorHEX" inputId="cp-hex" format="hex"
                class="absolute top-2/4 -mt-2.5 right-3 " />
              <InputMask class="h-12 text-left pl-2 uppercase" mask="#******" v-model="textcolorHEX" />
            </span>
          </div>

          <div class="flex justify-between items-center w-1/2  mt-5 mb-10">
            <label for="cp-hex" class="font-bold block mb-2"> Font Size</label>
            <div class="flex flex-col w-[15rem]">
              <span class="">{{ fontSize }}px</span>
              <Slider v-model="fontSize" :min="12" :max="80" class="w-full" />
            </div>
          </div>

        </div>
      </SplitterPanel>
    </Splitter>
  </div>
</template>
