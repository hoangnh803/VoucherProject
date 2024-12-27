<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md h-[600px] flex flex-col">
      <!-- Header -->
      <div class="flex items-center p-4 border-b">
        <div class="w-1/4 bg-purple-100 text-purple-600 text-center py-4 font-bold text-xl rounded-lg">
          {{ coupon.discount_amount }} {{ coupon.type_discount === 0 ? 'VND' : '%' }}<br />off
        </div>
        <div class="flex-grow pl-4">
          <h3 class="font-semibold text-lg">{{ coupon.name }}</h3>
        </div>
      </div>

      <!-- Scrollable Content -->
      <div class="flex-grow overflow-y-auto p-4">
        <div class="space-y-4 text-sm text-gray-700">
          <!-- Valid Period -->
          <div v-if="coupon.expired_at || coupon.used_at">
            <h4 class="font-semibold">Ngày hết hạn</h4>
            <p>{{ formatPeriod(coupon) }}</p>
          </div>

          <!-- Reward -->
          <div v-if="coupon.description">
            <h4 class="font-semibold">Mô tả</h4>
            <p>{{ coupon.description }}</p>
          </div>
          
          <!-- Discount Amount -->
          <div v-if="coupon.discount_amount">
            <h4 class="font-semibold">Giảm giá</h4>
            <p>{{ coupon.discount_amount }} {{ coupon.type_discount === 0 ? 'VND' : '%' }}</p>
          </div>

          <!-- Applicable Product -->
            <div v-if="products && products.length">
            <h4 class="font-semibold">Sản phẩm áp dụng</h4>
            <ul class="list-disc pl-5">
              <li v-for="product in products" :key="product.id">{{ product.name }}</li>
            </ul>
            </div>

          <!-- Payment -->
          <div v-if="coupon.payment_methods">
            <h4 class="font-semibold">Payment</h4>
            <p>{{ coupon.payment_methods }}</p>
          </div>

          <!-- More Details -->
          <div v-if="coupon.more_details">
            <h4 class="font-semibold">More Details</h4>
            <p>{{ coupon.more_details }}</p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="border-t p-4">
        <button @click="closePopup" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Close
        </button>
      </div>
    </div>
  </div>
</template>


<script setup>

// Props
const props = defineProps({
  coupon: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});
const coupon = props.coupon.voucher;
const products = props.coupon.eligible_products;
console.log(props);

// Emit event để đóng popup
const emit = defineEmits(["close"]);
const closePopup = () => {
  emit("close");
};

// Định dạng thời gian
const formatPeriod = (coupon) => {
  const end = coupon.expired_at || "N/A";
  return `${end}`;
};
</script>


<style scoped>
/* Custom scrollbar styles */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #CBD5E0 #EDF2F7;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #EDF2F7;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #CBD5E0;
  border-radius: 4px;
}
</style>