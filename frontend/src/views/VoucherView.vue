<template>
    <div class="min-h-screen bg-white">
        <!-- Header Section -->
        <header class="relative bg-green-200 h-24 mt-12 p-4">
            <!-- Cover Image -->
            <div class="absolute inset-0">
                <img src="https://png.pngtree.com/thumb_back/fw800/background/20200821/pngtree-plain-dark-green-wallpaper-image_396569.jpg" alt="Cover" class="object-cover w-full h-full" />
            </div>
            <!-- Avatar and User Info -->
            <div class="absolute bottom-[-70px] left-8 flex items-center space-x-4">
                <!-- Avatar -->
                <div class="relative w-24 h-24 border-4 border-white rounded-full overflow-hidden shadow-lg">
                    <img src="https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg" alt="Avatar" class="object-cover w-full h-full" />
                    <button
                        class="absolute bottom-2 right-2 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </button>
                </div>
                <!-- User Info -->
                <div>
                    <h1 class="font-semibold text-black">{{ userName }}</h1>
                    <p class="text-xs text-black">Your account is ready, you can now apply for advice.</p>
                </div>
            </div>
        </header>

        <!-- Main Content Section -->
        <div class="mt-12 flex p-4">
            <!-- Sidebar -->
            <aside class="w-64 bg-white p-4">
                <ul class="space-y-2">
                    <li>
                        <router-link to="/profile"
                            class="block py-2 px-4 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg font-medium">
                            Edit Profile
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/notifications"
                            class="block py-2 px-4 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg font-medium">
                            Notifications
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/voucher"
                            class="block py-2 px-4 text-green-600 bg-green-100 rounded-lg font-medium">
                            My Voucher
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/password-security"
                            class="block py-2 px-4 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg font-medium">
                            Password & Security
                        </router-link>
                    </li>
                </ul>
            </aside>

            <!-- Coupon List -->
            <main class="flex-1 bg-white shadow-lg px-8 py-4">
                <h1 class="text-xl mb-2 font-semibold text-green-800">My Vouchers</h1>

                <!-- Tabs -->
                <div class="flex space-x-4 mb-4 border-b">
                    <button @click="switchTab('all')"
                        :class="{ 'pb-2 border-b-2 border-blue-500 text-blue-500': activeTab === 'all' }">
                        All Coupons ({{ allCoupons.length }})
                    </button>
                    <button @click="switchTab('invalid')"
                        :class="{ 'pb-2 border-b-2 border-blue-500 text-blue-500': activeTab === 'invalid' }">
                        Invalid Vouchers ({{ invalidCoupons.length }})
                    </button>
                    <button @click="switchTab('used')"
                        :class="{ 'pb-2 border-b-2 border-blue-500 text-blue-500': activeTab === 'used' }">
                        Used Vouchers ({{ usedCoupons.length }})
                    </button>
                </div>

                <!-- Voucher List -->
                <div class="space-y-4">
                    <VoucherItem v-for="coupon in filteredCoupons" :key="coupon.id" :coupon="coupon"
                        @show-detail="openDetailPopup" />
                </div>
            </main>
            <!-- Modal for Coupon Detail -->
            <viewDetailIssuance v-if="showPopup" :voucherId="selectedCoupon.id" @close="closePopup" />
        </div>
    </div>
</template>

<script>
import { fetchVouchers, fetchExpiredVouchers, fetchUsedVouchers } from "../api/locationService";
import VoucherItem from "../components/VoucherItem.vue";
import viewDetailIssuance from "../components/viewDetailIssuance.vue";

export default {
    name: "VoucherPage",
    components: {
        VoucherItem,
        viewDetailIssuance,
    },
    data() {
        return {
            userAvatar: "",
            userName: "",
            activeTab: 'all', // Tab hiện tại: all, invalid, used
            allCoupons: [], // Danh sách tất cả voucher
            invalidCoupons: [], // Danh sách voucher đã hết hạn
            usedCoupons: [], // Danh sách voucher đã sử dụng
            showPopup: false,
            selectedCoupon: null,
        };
    },
    created() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.userAvatar = user.avatar || "https://i.pravatar.cc/100";
            this.userName = user.username || "User";
        }
        this.fetchAllVouchers(); // Lấy tất cả danh sách voucher
    },
    methods: {
        // Gọi API để lấy danh sách cho cả ba loại voucher
        async fetchAllVouchers() {
            try {
                const [allResponse, invalidResponse, usedResponse] = await Promise.all([
                    fetchVouchers(),
                    fetchExpiredVouchers(),
                    fetchUsedVouchers(),
                ]);
                console.log(allResponse, invalidResponse, usedResponse);

                if (allResponse.data.status === 'success') {
                    this.allCoupons = this.mapCoupons(allResponse.data.data);
                }
                if (invalidResponse.data.status === 'success') {
                    this.invalidCoupons = this.mapCoupons(invalidResponse.data.data);
                }
                if (usedResponse.data.status === 'success') {
                    this.usedCoupons = this.mapCoupons(usedResponse.data.data);
                }
            } catch (error) {
                console.error('Error fetching vouchers:', error);
            }
        },
        // Ánh xạ dữ liệu voucher
        mapCoupons(data) {
            return data.map((voucher, index) => ({
                id: voucher.issuance_id,
                name: voucher.voucher_name,
                description: voucher.voucher_description,
                discount_amount: voucher.discount_amount,
                type_discount: voucher.type_discount,
                expired_at: voucher.expired_at,
                is_active: voucher.is_active,
                used_at: voucher.used_at || null,
                product_name: voucher.product_name || null,
            }));
        },
        // Chuyển đổi tab
        switchTab(tab) {
            this.activeTab = tab;
        },
        openDetailPopup(coupon) {
            this.selectedCoupon = coupon;
            this.showPopup = true;
        },
        closePopup() {
            this.showPopup = false;
            this.selectedCoupon = null;
        },
    },
    computed: {
        filteredCoupons() {
            if (this.activeTab === 'all') return this.allCoupons;
            if (this.activeTab === 'invalid') return this.invalidCoupons;
            if (this.activeTab === 'used') return this.usedCoupons;
            return [];
        },
    },
};
</script>

