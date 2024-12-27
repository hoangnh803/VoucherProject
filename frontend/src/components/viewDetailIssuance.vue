<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-md h-[600px] flex flex-col">
        <!-- Header -->
        <div class="flex items-center p-4 border-b">
          <div class="w-1/4 bg-purple-100 text-purple-600 text-center py-4 font-bold text-xl rounded-lg">
            {{ voucher.discount_amount }} {{ voucher.type_discount === 0 ? 'VND' : '%' }}<br />off
          </div>
          <div class="flex-grow pl-4">
            <h3 class="font-semibold text-lg">{{ voucher.name }}</h3>
          </div>
        </div>
  
        <!-- Scrollable Content -->
        <div class="flex-grow overflow-y-auto p-4">
          <div class="space-y-4 text-sm text-gray-700">
            <!-- Issued At -->
            <div>
              <h4 class="font-semibold">Ngày phát hành</h4>
              <p>{{ voucher.issued_at }}</p>
            </div>
            <!-- Valid Period -->
            <div>
              <h4 class="font-semibold">Ngày hết hạn</h4>
              <p>{{ voucher.expired_at }}</p>
            </div>
  
            <!-- Reward -->
            <div>
              <h4 class="font-semibold">Mô tả</h4>
              <p>{{ voucher.description }}</p>
            </div>
            
            <!-- Discount Amount -->
            <div>
              <h4 class="font-semibold">Giảm giá</h4>
              <p>{{ voucher.discount_amount }} {{ voucher.type_discount === 0 ? 'VND' : '%' }}</p>
            </div>
  
            <!-- Applicable Product -->
              <div v-if="voucher.products && voucher.products.length">
              <h4 class="font-semibold">Sản phẩm áp dụng</h4>
              <ul class="list-disc pl-5">
                <li v-for="product in voucher.products" :key="product.id">{{ product.name }}</li>
              </ul>
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
import { fetchInsurance } from "../api/locationService";
import { ref, onMounted } from 'vue';

  // Props
  const props = defineProps({
    voucherId: Number,
  });
  
  // Emit event để đóng popup
  const emit = defineEmits(["close"]);
  const closePopup = () => {
    emit("close");
  };


// Lấy thông tin voucher
// Data
const voucher = ref({});

// Fetch voucher details
const loadVoucherDetails = async (id) => {
  try {
    const response = await fetchInsurance(id);
    voucher.value = response.data.data;
    console.log('Voucher details:', voucher.value);
  } catch (error) {
    console.error('Error fetching voucher details:', error);
  }
};

// Watch for changes in voucherId and fetch details
onMounted(() => {
  if (props.voucherId) {
    loadVoucherDetails(props.voucherId);
  }
});  
  
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