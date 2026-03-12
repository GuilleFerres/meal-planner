<script lang="ts" setup>
import type { MealEntry } from '@/types/meal-plan.types';

defineProps<{
  meal: MealEntry
}>()
</script>

<template>
  <div class="meal-card">
    <h3 class="title">{{ meal.name }}</h3>
    <p v-if="meal.ingredients">
      <span class="section-title">Ingredientes: </span>
      {{ meal.ingredients }}
    </p>
    <p v-if="meal.notes">
      <span class="section-title">Notas: </span>
      {{ meal.notes }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
  .meal-card {
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 0;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    overflow: hidden;

    &:hover {
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
      transform: translateY(-2px);
    }

    .title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1f2937;
      margin: 0;
      padding: 16px;
      background-color: #f3f4f6;
      border-bottom: 2px solid #e5e7eb;
      letter-spacing: 0.3px;
    }

    p {
      padding: 12px 16px;
      margin: 0;
      font-size: 0.95rem;
      color: #4b5563;
      line-height: 1.6;

      &:last-child {
        padding-bottom: 16px;
      }
    }

    .section-title {
      font-weight: 700;
      color: #374151;
      text-transform: uppercase;
      font-size: 0.85rem;
      letter-spacing: 0.5px;
    }
  }
</style>
