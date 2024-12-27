<template>
  <div class="flex items-stretch border rounded-lg shadow-sm overflow-hidden relative">
    <!-- Discount Section -->
    <div class="w-[12.5%] bg-purple-100 content-center text-purple-600 text-center py-4 font-bold text-xl relative">
      <span>{{ coupon.discount_amount }} {{ coupon.type_discount === 0 ? 'VND' : '%' }}<br />off</span>
      <template v-if="coupon.is_expired">
        <div class="absolute top-1 left-1 text-red-600 text-xs font-semibold">
          Đã hết hạn
        </div>
      </template>
      <template v-else>
        <!-- Checkbox to replace "Chưa hết hạn" text when not expired -->
        <input 
          type="checkbox" 
          v-model="selected" 
          @change="toggleSelection" 
          class="absolute top-1 left-1 w-4 h-4 cursor-pointer"
        />
      </template>
    </div>

    <!-- Details Section -->
    <div class="w-[62.5%] px-4 py-2">
      <h3 class="font-semibold text-lg">{{ coupon.name }}</h3>
      <p class="text-gray-600 mt-2 truncate-2-lines">{{ coupon.description }}</p>
    </div>

    <!-- Action Section -->
    <div class="w-[25%] flex flex-col justify-center px-4 py-2">
      <!-- Detail Button -->
      <button @click="showDetail" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mb-2">
        Chi tiết
      </button>

      <!-- Edit and Delete Buttons (Horizontal, each takes half the width of Detail button) -->
      <div class="flex gap-2">
        <button @click="editVoucher" class="w-1/2 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white">
          Chỉnh sửa
        </button>
        <template v-if="!coupon.is_expired">
          <button @click="deleteVoucher" class="w-1/2 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white">
            Xóa
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { fetchVoucherDetail } from "../api/adminService"; // Adjust the path as necessary

const emit = defineEmits(["show-detail", "edit-voucher", "delete-voucher", "toggle-selection"]);
const props = defineProps({
  coupon: {
    type: Object,
    required: true,
  },
});

const selected = ref(false); // Binding for checkbox
const voucher = ref(null); // Thông tin voucher được tải từ API


const loadVoucherDetail = async () => {
  try {
    const response = await fetchVoucherDetail(props.coupon.id);
    voucher.value = response.data.data; // Gán dữ liệu voucher
  } catch (error) {
    console.error('Error fetching voucher detail:', error);
  }
};


// Hàm gọi API và phát sự kiện toggleSelection
const toggleSelection = async () => {
  if (!voucher.value) {
    await loadVoucherDetail();
  }
  emit("toggle-selection", { voucher: voucher.value, selected: selected.value });
};

// Hàm gọi API và phát sự kiện showDetail
const showDetail = async () => {
  if (!voucher.value) {
    await loadVoucherDetail();
  }
  emit("show-detail", voucher.value);
};

// Hàm gọi API và phát sự kiện editVoucher
const editVoucher = async () => {
  if (!voucher.value) {
    await loadVoucherDetail();
  }
  emit("edit-voucher", voucher.value);
};

// Emit sự kiện xóa voucher
const deleteVoucher = () => emit("delete-voucher", props.coupon);
</script>

<style scoped>
/* Truncate description to 2 lines and add ellipsis for overflow */
p.truncate-2-lines {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /* Limits the text to 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
