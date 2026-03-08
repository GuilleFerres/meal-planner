<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
const { title } = props

const emit = defineEmits<{
  previous: []
  next: []
}>()
</script>

<template>
  <div class="calendar-header">
    <button @click="emit('previous')" class="cursor-pointer">
      Anterior
    </button>
    <h2>{{ title }}</h2>
    <button @click="emit('next')" class="cursor-pointer">
      Siguiente
    </button>
  </div>
</template>

<style scoped lang="scss">
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
</style>
