<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 mt-10">
    <div class="bg-white rounded-2xl w-full max-w-md">
      <!-- Header -->
      <div class="p-6 pb-0">
        <h2 class="text-xl font-semibold">
          {{ props.isCreating ? 'Tạo Voucher' : 'Chỉnh sửa Voucher' }}
        </h2>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="p-6">
        <div class="space-y-2">
          <!-- Voucher Name -->
          <div>
            <label class="block text-sm text-gray-700 mb-2">
              Tên voucher
            </label>
            <input type="text" v-model="voucherName"
              :placeholder="props.isCreating ? 'Nhập tên voucher mới' : 'Nhập tên voucher'"
              class="w-full border-gray-300 border-b focus:border-green-500 focus:ring-0 px-0 pb-2" />
            <p v-if="errors.voucherName" class="text-red-500 text-sm mt-1">{{ errors.voucherName }}</p>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm text-gray-700 mb-2">
              Mô tả
            </label>
            <textarea v-model="description" rows="4"
              :placeholder="props.isCreating ? 'Nhập mô tả cho voucher mới' : 'Nhập mô tả voucher'"
              class="w-full border-gray-300 border-b focus:border-green-500 focus:ring-0 px-0 pb-2 resize-none" />
            <p v-if="errors.description" class="text-red-500 text-sm mt-1">{{ errors.description }}</p>

          </div>

          <!-- Discount -->
          <div>
            <label class="block text-sm text-gray-700 mb-2">Giảm</label>
            <div class="flex items-center gap-2">
              <select v-model="discountType"
                class="border-gray-300 border-b focus:border-green-500 focus:ring-0 px-0 pb-1">
                <option value="1">%</option>
                <option value="0">VND</option>
              </select>
              <input type="number" v-model="discountValue"
                class="flex-grow border-gray-300 border-b focus:border-green-500 focus:ring-0 px-0 pb-2" />
            </div>
            <p v-if="errors.discountValue" class="text-red-500 text-sm mt-1">{{ errors.discountValue }}</p>
          </div>
          <!-- Product Selection -->
          <!-- Product Selection -->
          <div>
            <label class="block text-sm text-gray-700 mb-2">Sản phẩm áp dụng</label>
            <div class="space-y-2 max-h-24 overflow-y-auto border border-gray-300 rounded-md p-2">
              <div v-for="product in products" :key="product.id" class="flex items-center gap-2">
                <input type="checkbox" :value="product.id" v-model="selectedProducts" 
                  class="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300 rounded" />
                <label>{{ product.name }} - {{ product.price.toLocaleString() }} VND</label>
              </div>
            </div>
            <p v-if="errors.selectedProducts" class="text-red-500 text-sm mt-1">{{ errors.selectedProducts }}</p>
          </div>

          <!-- Expiry Date -->
          <div>
            <label class="block text-sm text-gray-700 mb-2">Ngày hết hạn</label>
            <input type="date" v-model="expiryDate"
              class="w-full border-gray-300 border-b focus:border-green-500 focus:ring-0 px-0 pb-2" />
            <p v-if="errors.expiryDate" class="text-red-500 text-sm mt-1">{{ errors.expiryDate }}</p>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex gap-4 mt-2">
          <button type="button" @click="$emit('close')"
            class="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg">
            Hủy
          </button>
          <button type="submit" class="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg">
            {{ props.isCreating ? 'Tạo' : 'Lưu' }}
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchProducts, fetchVoucherDetail } from "../api/adminService";

const emit = defineEmits(["close", "save"]);
const props = defineProps({
  isCreating: Boolean,
  voucherId: Number,
});

const voucherName = ref("");
const description = ref("");
const discountType = ref("");
const discountValue = ref(0);
const expiryDate = ref("");
const selectedProducts = ref([]); // Các sản phẩm được chọn
const products = ref([]); // Danh sách sản phẩm từ API
const errors = ref({
  voucherName: "",
  description: "",
  discountValue: "",
  expiryDate: "",
  selectedProducts: "",
});

// Lấy danh sách sản phẩm từ API
const fetchProductList = async () => {
  try {
    const response = await fetchProducts();
    products.value = response.data.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const loadVoucherDetail = async (voucherId) => {
  try {
    console.log(voucherId);
    const response = await fetchVoucherDetail(voucherId);
    const voucher = response.data.data;
    console.log(voucher);
    voucherName.value = voucher.voucher.name || "";
    description.value = voucher.voucher.description || "";
    discountType.value = voucher.voucher.type_discount; // Chuyển đổi type
    discountValue.value = voucher.voucher.discount_amount || 0;
    expiryDate.value = voucher.voucher.expired_at ? formatDate(voucher.voucher.expired_at) : "";
    selectedProducts.value = voucher.eligible_products.map(product => product.id);
  } catch (error) {
    console.error("Error fetching voucher detail:", error);
  }
};

onMounted(() => {
  fetchProductList();
  if (!props.isCreating) {
    loadVoucherDetail(props.voucherId);
  }
});

const validateForm = () => {
  let isValid = true;

  // Validate voucher name
  if (!voucherName.value.trim()) {
    errors.value.voucherName = "Tên voucher không được để trống.";
    isValid = false;
  } else {
    errors.value.voucherName = "";
  }

  // Validate description
  if (!description.value.trim()) {
    errors.value.description = "Mô tả không được để trống.";
    isValid = false;
  } else {
    errors.value.description = "";
  }

  // Validate discount value
  if (discountValue.value <= 0) {
    errors.value.discountValue = "Giá trị giảm giá phải lớn hơn 0.";
    isValid = false;
  } else {
    errors.value.discountValue = "";
  }
  // Validate selected products
  if (!selectedProducts.value.length) {
    errors.value.selectedProducts = "Bạn phải chọn ít nhất một sản phẩm.";
    isValid = false;
  } else {
    errors.value.selectedProducts = "";
  }

  const date = new Date();
  const now = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;


  // Validate expiry date
  if (!expiryDate.value) {
    errors.value.expiryDate = "Ngày hết hạn không được để trống.";
    isValid = false;
  } else {
    // Chuyển expiryDate.value thành đối tượng Date
    console.log(expiryDate.value);

    // So sánh ngày hết hạn với ngày hiện tại
    if (expiryDate.value < now) {
      errors.value.expiryDate = "Ngày hết hạn phải lớn hơn ngày hiện tại.";
      isValid = false;
    } else {
      errors.value.expiryDate = "";
    }
  }

  return isValid;
};


function formatDate(dateString) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return ""; // Kiểm tra ngày hợp lệ
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}



const handleSubmit = () => {
  if (!validateForm()) return;
  emit("save", {
    id: props.voucherId || null,
    name: voucherName.value,
    description: description.value,
    type_discount: discountType.value,
    discount_amount: discountValue.value,
    expired_at: expiryDate.value, // Gửi giá trị ngày hết hạn
    rule: selectedProducts.value, // Gửi danh sách sản phẩm được chọn
    product_ids: selectedProducts.value,
  });
};
</script>

<style scoped>
/* Remove number input spinners */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
