<template>
  <div class="flex items-stretch border rounded-lg shadow-sm overflow-hidden">
    <!-- Discount Section (1/8 of total width) -->
    <div class="w-[12.5%] bg-purple-100 content-center text-purple-600 text-center py-4 font-bold text-xl">
      {{ coupon.discount_amount }} {{ coupon.type_discount === 0 ? 'VND' : '%' }}<br />off
    </div>

    <!-- Details Section (5/8 of total width) -->
    <div class="w-[62.5%] px-4 py-2">
      <h3 class="font-semibold text-lg">{{ coupon.name }}</h3>
      <p class="text-gray-600 mt-2 truncate-2-lines">{{ coupon.description }}</p>
    </div>

    <!-- Action Section (1/4 of total width) -->
    <div class="w-[25%] flex flex-col items-center justify-between px-4 py-2">
      <!-- Detail Button -->
      <button @click="showDetail" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mt-2">
        Detail
      </button>

      <!-- Verified Information (use invisible class to hide it but preserve space) -->
      <div :class="{'invisible': !coupon.verified}" class="flex items-center text-sm text-gray-500 mt-2 h-8">
        <BadgeCheck class="w-4 h-4 text-blue-500 mr-1" />
        <span>Voucher verified</span>
      </div>

      <!-- Used Information -->
      <span class="text-sm text-gray-500 mt-2">{{ coupon.usedToday }}</span>
    </div>
  </div>
</template>

<script setup>
import { BadgeCheck } from 'lucide-vue-next';

const emit = defineEmits(['show-detail']);



// Emit 'show-detail' event to parent when the button is clicked
const props = defineProps({
  coupon: {
    type: Object,
    required: true
  }
});

// Emit 'show-detail' event to parent when the button is clicked
const showDetail = () => {
  emit('show-detail', props.coupon);
};
</script>

<style scoped>
/* Truncate description to 2 lines and add ellipsis for overflow */
p.truncate-2-lines {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limits the text to 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
