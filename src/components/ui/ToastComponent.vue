<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useMealPlannerStore } from '@/stores/mealPlanner.store'

const mealStore = useMealPlannerStore()
const show = ref(true)

defineProps<{
  message: string
  theme: 'success' | 'error' | 'info'
}>()

const closeToast = () => {
  show.value = false
  mealStore.cleanToast()
}

onMounted(() => {
  setTimeout(() => {
    closeToast()
  }, 1000)
})
</script>

<template>
  <transition name="toast" @after-leave="mealStore.cleanToast()">
    <div v-if="show" :class="theme" class="toast">
      <span>{{ message }}</span>
      <span @click="closeToast" class="close-toast">&times;</span>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
  .success {
    background-color: rgba(85, 189, 126, 0.8);
    color: white;
    border: 1px solid #2e9e5b;
  }

  .error {
    background-color: #f8d7da;
    color: #721c24;
  }

  .info {
    background-color: #d1ecf1;
    color: #0c5460;
  }

  .toast {
    width: 80%;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    text-align: center;
    font-weight: bold;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .close-toast {
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: bold;
    position: absolute;
    top: 0.10rem;
    right: 0.9rem;
  }

  .toast-enter-active,
  .toast-leave-active {
    transition: all 0.3s ease;
  }

  .toast-enter-from {
    transform: translate(-50%, 100%);
    opacity: 0;
  }

  .toast-leave-to {
    transform: translate(-50%, 100%);
    opacity: 0;
  }
</style>
