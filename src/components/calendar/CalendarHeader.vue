<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'

library.add(faAngleRight)
library.add(faAngleLeft)
defineProps<{
  title: string
}>()

const emit = defineEmits<{
  previous: []
  next: []
}>()
</script>

<template>
  <div class="calendar-header">
    <button @click="emit('previous')" class="cursor-pointer flex items-center gap-1">
      <FontAwesomeIcon :icon="['fas', 'angle-left']" class="text-xl text-gray-400" />
    </button>
    <h2>{{ title }}</h2>
    <button @click="emit('next')" class="cursor-pointer flex items-center gap-1">
      <FontAwesomeIcon :icon="['fas', 'angle-right']" class="text-xl text-gray-400" />
    </button>
  </div>
</template>

<style scoped lang="scss">
.calendar-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem
}
</style>
