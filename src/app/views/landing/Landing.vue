<script setup lang="ts">
import { Drawer } from '@/uiComponents';
import { ref } from 'vue';

const openLeft = ref(false);
const openBottom = ref(false);
</script>

<template>
  <button
    class="px-4 py-2 rounded-md bg-blue-600 text-white mr-2"
    @click="openLeft = true"
  >
    Open left drawer
  </button>

  <button
    class="px-4 py-2 rounded-md bg-emerald-600 text-white"
    @click="openBottom = true"
  >
    Open bottom drawer
  </button>

  <Drawer v-model="openLeft" placement="left" size="md" title="Left Drawer">
    <p>Content in left drawer.</p>

    <template #footer>
      <button
        class="px-3 py-1.5 rounded-md border text-gray-700 hover:bg-gray-50"
        @click="openLeft = false"
      >
        Close
      </button>
    </template>
  </Drawer>

  <Drawer
    v-model="openBottom"
    placement="bottom"
    size="lg"
    title="Bottom Drawer"
  >
    <p>Content in bottom drawer.</p>
  </Drawer>
</template>
