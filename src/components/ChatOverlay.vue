<script lang="ts" setup>

import { onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import tmi from 'tmi.js'
import type { IChatMessage } from '@/types';

const chatProps = defineProps<{
  channelId: string;
  chatDemo: boolean;
}>();

const clientTwitch = ref();
const isConnected = ref(false);
const chatMessages: any = ref([]);

const chatExample: IChatMessage[] = [
  {
    "display-name": "moltenb",
    message: "That move was POG",
    color: "#CF3400"
  },
  {
    "display-name": "GodOfHuskies",
    message: "He can still win this one",
    color: "#CEC400"
  },
  {
    "display-name": "Stauswave",
    message: "Pog",
    color: "#000000"
  },
  {
    "display-name": "Stauswave",
    message: "Its happening guys",
    color: "#FF4500"
  },
  {
    "display-name": "Pog",
    message: "yea that's life",
    color: "#CEC100"
  },
]

let currentIndex = 0;

const connectToTwitchChat = (chanelName: string) => {
  clientTwitch.value = new tmi.Client({
    connection: {
      secure: true,
      reconnect: false,
    },
    channels: [chanelName],
  });

  clientTwitch.value.connect().then(async () => {
    isConnected.value = true;
    console.log(`Connected to twitch. Listening for messages in ${chanelName}...`);
  });

  clientTwitch.value.on('message', (wat: any, tags: any, message: any, self: any) => {
    if (self) return;

    messageFormat(tags, message);
  });
}

const messageFormat = (tags: any, message: any) => {

  const badges = tags.badges || {};
  // const isBroadcaster = badges.broadcaster;
  // const isMod = badges.moderator;
  // const isVip = badges.vip;


  chatMessages.value.push({ ...tags, message });
  console.log("MESAGES", chatMessages.value);

  // nextTick(() => {
  //     scrollToBottom();
  // });

};

onMounted(async () => {
  if (chatProps.channelId) {
    console.log("CHANNEL ID: ", chatProps.channelId);
    await connectToTwitchChat(chatProps?.channelId)
  }

  if (chatProps.chatDemo) {
    loadMessageDemo()
  }

});

const loadMessageDemo = () => {
  setInterval(() => {
    chatMessages.value.push(chatExample[currentIndex]);
    currentIndex = (currentIndex + 1) % chatExample.length;
    if (chatMessages.value.length > 50) {
      chatMessages.value = [];
    }
  }, 3000);
}


onUnmounted(async () => {
  if (clientTwitch.value) {
    clientTwitch.value.disconnect();
  }
})

const icons = {
  vip: "https://static-cdn.jtvnw.net/badges/v1/b817aba4-fad8-49e2-b88a-7cc744dfa6ec/2",
  moderator: "https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/2",
  turbo: "https://static-cdn.jtvnw.net/badges/v1/bd444ec6-8f34-4bf9-91f4-af1e3428d80f/1",
  broadcaster: "https://static-cdn.jtvnw.net/badges/v1/5527c58c-fb7d-422d-b71b-f309dcb85cc1/2"
}
</script>

<template>
  <div id="log">
    <div v-for="(chatMessage, index) in chatMessages" :key="index"
      :class="[index % 2 === 0 ? 'border-blue-500' : 'border-red-500', '']">

      <span class="meta" :style="{ color: chatMessage.color ? chatMessage.color : '#cecece' }">
        <span class="badges">
        </span>
        <span class="name">{{ chatMessage['display-name'] }}: </span>
      </span>

      <span class="message">
        {{ chatMessage.message }}
      </span>

    </div>
  </div>
</template>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:700);

* {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  overflow: hidden;
}

body {
  background: gray;
  font-family: 'Roboto';
  font-weight: 700;
  font-size: 12px;
  line-height: 1.5em;
  color: #fff;
}

#log>div {
  animation: fadeInRight .3s ease forwards, fadeOut 0.5s ease 15s forwards;
  -webkit-animation: fadeInRight .3s ease forwards, fadeOut 0.5s ease 15s forwards;
}

.colon {
  display: none;
}

#log {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0 10px 10px;
  width: 100%;

}

#log>div {
  margin: 1em;
}

#log>div.deleted {
  visibility: hidden;
}

#log .emote {
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  padding: 0.4em 0.2em;
  position: relative;
}

#log .emote img {
  display: inline-block;
  height: 1em;
  opacity: 0;
}

#log .message,
#log .meta {
  vertical-align: top;
  display: table-cell;
  padding-bottom: 0.1em;
}

#log .meta {
  position: relative;
  top: 10px;
  display: inline;
  text-align: right;
  background: #fff;
  border-radius: 2px 15px 15px 15px;
  padding: 0.5em;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-left: 20px;
}

#log .message {
  color: #fff;
  padding: 1em 1em 0.8em 0.8em;
  border-radius: 15px;
  word-wrap: break-word;
  width: 65%;
  border: 2px solid white;
}

.badge {
  display: inline-block;
  margin-right: 0.2em;
  position: relative;
  height: 1em;
  vertical-align: middle;
  top: -0.1em;
}

.name {
  margin-left: 0.2em;
}
</style>