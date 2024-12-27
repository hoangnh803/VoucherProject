<template>
    <div class="min-h-screen bg-white">



        <!-- Coupon List -->
        <main class="flex-1 bg-white shadow-lg px-8 py-4">
            <div v-if="!isReleasePage">
                <h1 class="text-xl mb-2 font-semibold text-green-800">Manage Vouchers</h1>


                <!-- Toolbar Section (Filter & Actions) -->
                <div class="flex items-center justify-between p-4 mb-4 bg-white shadow-sm rounded-lg">
                    <!-- Filter Dropdown -->
                    <div class="relative">
                        <select v-model="activeTab"
                            class="appearance-none bg-white border rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 min-w-[150px]">
                            <option value="unexpired">Chưa hết hạn</option>
                            <option value="expired">Đã hết hạn</option>
                        </select>
                        <ChevronDown
                            class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex gap-3">
                        <button @click="openCreatePopup"
                            class="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                            <User class="w-5 h-5" />
                            Tạo voucher
                        </button>
                        <button :disabled="!selectedVouchers.length" @click="goToReleasePage"
                            class="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                            <User class="w-5 h-5" />
                            Phát hành
                        </button>
                    </div>
                </div>


                <!-- Voucher List -->
                <div class="space-y-4">
                    <VoucherItemAdmin v-for="voucher in filteredVouchers" :key="voucher.id" :coupon="voucher"
                        @show-detail="openDetailPopup" @edit-voucher="openEditPopup"
                        @toggle-selection="toggleVoucherSelection" @delete-voucher="deleteVoucher" />
                </div>
            </div>
            <div v-else>
                <!-- Header -->
                <div class="p-4">
                    <h1 class="text-lg font-medium">Phát hành Voucher</h1>
                    <!-- Voucher IDs -->
                    <div class="">
                        <h2 class="text-sm font-semibold text-gray-700">Danh sách voucher đã chọn:</h2>
                        <table class="table-auto border-collapse border border-gray-300 w-full mt-4 text-left">
                            <thead>
                                <tr>
                                    <th class="border border-gray-300 px-4 py-2">Voucher ID</th>
                                    <th class="border border-gray-300 px-4 py-2">Name</th>
                                    <th class="border border-gray-300 px-4 py-2">Description</th>
                                    <th class="border border-gray-300 px-4 py-2">Type Discount</th>
                                    <th class="border border-gray-300 px-4 py-2">Discount Amount</th>
                                    <th class="border border-gray-300 px-4 py-2">Expired At</th>
                                    <th class="border border-gray-300 px-4 py-2">Is Expired</th>
                                    <th class="border border-gray-300 px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="voucher in selectedVouchers" :key="voucher.voucher.voucher.id"
                                    class="hover:bg-gray-100 cursor-pointer">
                                    <td class="border border-gray-300 px-4 py-2">{{ voucher.voucher.voucher.id }}</td>
                                    <td class="border border-gray-300 px-4 py-2">{{ voucher.voucher.voucher.name }}</td>
                                    <td class="border border-gray-300 px-4 py-2">{{ voucher.voucher.voucher.description }}</td>
                                    <td class="border border-gray-300 px-4 py-2">
                                        {{ voucher.voucher.voucher.type_discount === 0 ? 'VND' : '%' }}
                                    </td>
                                    <td class="border border-gray-300 px-4 py-2">{{ voucher.voucher.voucher.discount_amount }}
                                    </td>
                                    <td class="border border-gray-300 px-4 py-2">{{ voucher.voucher.voucher.expired_at }}</td>
                                    <td class="border border-gray-300 px-4 py-2">
                                        {{ voucher.voucher.is_expired ? 'Yes' : 'No' }}
                                    </td>
                                    <td class="border border-gray-300 px-4 py-2 text-blue-500 underline"
                                        @click="openDetailPopup(voucher.voucher)">
                                        View Details
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- User Table -->
                <ReleaseUserTable :users="users" @update:selected="updateSelectedUsers" />

                <!-- Footer -->
                <div class="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-end gap-4">
                    <button class="bg-red-500 text-white px-6 py-2 rounded" @click="goBackToList">
                        Quay lại
                    </button>
                    <button class="bg-green-500 text-white px-6 py-2 rounded" @click="confirmRelease">
                        Xác nhận
                    </button>
                </div>
            </div>


        </main>
        <!-- Modal for Coupon Detail -->
        <VoucherDetailPopup v-if="showDetailPopup" :coupon="selectedCoupon" @close="closeDetailPopup" />

        <!-- Modal for Coupon Edit -->
        <VoucherEditPopup v-if="showEditPopup" :isCreating="isCreatingVoucher" :voucherId="selectedCoupon"
            @close="closeEditPopup" @save="saveVoucher" />
    </div>
</template>

<script>
import VoucherItemAdmin from "../components/VoucherItemAdmin.vue"; // Import đúng VoucherItemAdmin
import VoucherDetailPopup from "../components/VoucherDetailPopup.vue"; // Import đúng Detail Popup
import VoucherEditPopup from "../components/VoucherEditPopup.vue"; // Import đúng Edit Popup

import { ChevronDown, User } from 'lucide-vue-next'
import ReleaseUserTable from "@/components/ReleaseUserTable.vue";
import { deleteVoucher, fetchVouchers, fetchVoucherDetail, createVoucher, updateVoucher, distributeVoucher } from '../api/adminService';

export default {
    name: "VoucherPage",
    components: {
        VoucherItemAdmin,
        VoucherDetailPopup,
        VoucherEditPopup,
        ChevronDown,
        User,
        ReleaseUserTable
    },
    data() {
        return {
            userAvatar: "https://i.pravatar.cc/100",
            userName: "Nguyen Van A",
            activeTab: "unexpired",
            vouchers: [], // Danh sách voucher từ API

            showDetailPopup: false,
            showEditPopup: false,
            selectedCoupon: null,
            isCreatingVoucher: false,
            isReleasePage: false, // Điều khiển hiển thị giao diện phát hành
            selectedVouchers: [], // Các voucher đã chọn
            effectiveDate: null,
            expiryDate: null,
            selectedUsers: [],
            users: [ // Dữ liệu người dùng mẫu
                { id: 1, name: "Nguyễn Văn A" },
                { id: 2, name: "Trần Thị B" },
                { id: 3, name: "Lê Hoàng C" },
            ],
        };
    },
    computed: {
        filteredVouchers() {
            if (this.activeTab === "unexpired") {
                return this.vouchers.filter(voucher => !voucher.is_expired);
            } else if (this.activeTab === "expired") {
                return this.vouchers.filter(voucher => voucher.is_expired);
            }
            return this.vouchers;
        },
    },
    methods: {
        openCreatePopup() {
            
            this.isCreatingVoucher = true;
            this.showEditPopup = true;
        },
        openDetailPopup(coupon) {
            this.selectedCoupon = coupon;
            console.log("Opening detail popup:", coupon);
            this.showDetailPopup = true;
        },
        openEditPopup(coupon) {
            console.log("Opening edit popup:", coupon);
            this.selectedCoupon = coupon.voucher.id;
            this.isCreatingVoucher = false;
            this.showEditPopup = true;
        },
        closeDetailPopup() {
            this.showDetailPopup = false;
            this.selectedCoupon = null;
        },
        closeEditPopup() {
            this.showEditPopup = false;
            this.selectedCoupon = null;
        },
        async saveVoucher(voucher) {
            console.log("Saving voucher:", voucher);
            try {
                if (voucher.id) {
                    // Gọi API update nếu có ID
                    await updateVoucher(voucher.id, voucher);

                    // Gọi API lấy thông tin voucher sau khi update
                } else {
                    // Gọi API create nếu không có ID
                    await createVoucher(voucher);
                }
                this.loadVouchers();
                this.showEditPopup = false;
            } catch (error) {
                console.error('Error saving voucher:', error);
            }
        },
        async deleteVoucher(coupon) {
            try {
                await deleteVoucher(coupon.id); // API xóa voucher
                this.loadVouchers();
            } catch (error) {
                console.error('Error deleting voucher:', error);
            }
        },
        toggleVoucherSelection(voucher) {
            console.log("Toggling voucher selection:", voucher);
            if (voucher.selected) {
                // Nếu voucher đã được chọn (selected: true), thêm vào selectedVouchers
                if (!this.selectedVouchers.includes(voucher)) {
                    this.selectedVouchers.push(voucher);
                }
            } else {
                // Nếu voucher không được chọn, không làm gì (hoặc xóa khỏi danh sách nếu cần)
                this.selectedVouchers = this.selectedVouchers.filter(v => v.id !== voucher.id);
            }
            console.log("Selected vouchers:", this.selectedVouchers);
        },
        goToReleasePage() {
            if (this.selectedVouchers.length) {
                this.isReleasePage = true;
            } else {
                alert("Vui lòng chọn ít nhất một voucher để phát hành!");
            }
        },
        goBackToList() {
            this.isReleasePage = false;
            // Reset dữ liệu khi quay lại
            this.selectedUsers = [];
            this.selectedVouchers = [];
        },
        // Cập nhật người dùng đã chọn
        updateSelectedUsers(selected) {
            this.selectedUsers = selected;
        },
        async confirmRelease() {
            if (this.selectedVouchers.length === 0 || this.selectedUsers.length === 0) {
                alert("Vui lòng chọn ít nhất một voucher và một người dùng để phát hành!");
                return;
            }
            

            try {
                for (const voucher of this.selectedVouchers) {
                    for (const user of this.selectedUsers) {
                        await distributeVoucher({
                            voucher_id: voucher.voucher.voucher.id,
                            user_id: user,
                        });
                    }
                }
                alert("Phát hành voucher thành công!");
                this.goBackToList();
            } catch (error) {
                console.error('Error distributing vouchers:', error);
                alert("Đã xảy ra lỗi khi phát hành voucher!");
            }
        },

        async loadVouchers() {
            try {
                const response = await fetchVouchers();
                this.vouchers = response.data.data;
            } catch (error) {
                console.error('Error fetching vouchers:', error);
            }
        },
        async loadVoucherDetail(id) {
            try {
                const response = await fetchVoucherDetail(id);
                this.selectedCoupon = response.data.data;

                this.showDetailPopup = true;
            } catch (error) {
                console.error('Error fetching voucher detail:', error);
            }
        },
        async distributeVoucher(voucherData) {
            try {
                await distributeVoucher(voucherData);
                this.loadVouchers();
            } catch (error) {
                console.error('Error distributing voucher:', error);
            }
        },
    },
    mounted() {
        this.loadVouchers();
    },
};
</script>