<template>
    <nav class="border-b border-white/10 fixed w-full top-0 z-50 transition-colors duration-300 bg-[#1F485B]">
        <div class="max-w-8xl mx-auto px-4">
            <div class="flex h-12 items-center justify-between">
                <!-- Logo -->
                <div class="flex items-center space-x-8">
                    <router-link to="/admin/profile" class="flex-shrink-0 flex items-center">
                        <img loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3ab3e43e40c7dd847fe5a21db0f8195405101e87f2adb96472ed98b714c6bfd1?placeholderIfAbsent=true&apiKey=e6fddaa1b53f41878d251139a58c0a7a"
                            class="object-contain max-w-full aspect-[1.17] w-20" alt="Company logo" />
                    </router-link>
                </div>
                <div class="">
                <button @click="logout" class="text-white bg-red-500 hover:bg-red-600 rounded-md py-2 px-4">
                    Logout
                </button>
            </div>
            </div>
        </div>
    </nav>

    <div class="min-h-screen bg-white">
        <!-- Header Section -->
        <header class="relative bg-green-200 h-24 mt-12 p-4">
            <div class="absolute inset-0">
                <img src="https://via.placeholder.com/1200x300" alt="Cover" class="object-cover w-full h-full" />
            </div>
            <div class="absolute bottom-[-70px] left-8 flex items-center space-x-4">
                <div class="relative w-24 h-24 border-4 border-white rounded-full overflow-hidden shadow-lg">
                    <img :src="userAvatar" alt="Avatar" class="object-cover w-full h-full" />
                </div>
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
                        <router-link to="/admin/profile"
                            class="block py-2 px-4 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg font-medium"
                            :class="{ 'bg-green-100 text-green-600': isActiveRoute('/admin/profile') }">
                            Edit Profile
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/admin/manage-user"
                            class="block py-2 px-4 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg font-medium"
                            :class="{ 'bg-green-100 text-green-600': isActiveRoute('/admin/manage-user') }">
                            Manage Users
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/admin/manage-voucher"
                            class="block py-2 px-4 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg font-medium"
                            :class="{ 'bg-green-100 text-green-600': isActiveRoute('/admin/manage-voucher') }">
                            Manage Voucher
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/admin/password-security"
                            class="block py-2 px-4 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg font-medium"
                            :class="{ 'bg-green-100 text-green-600': isActiveRoute('/admin/password-security') }">
                            Password & Security
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/admin/redemption-history"
                            class="block py-2 px-4 text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-lg font-medium"
                            :class="{ 'bg-green-100 text-green-600': isActiveRoute('/admin/redemption-history') }">
                            Redemption History
                        </router-link>
                    </li>
                </ul>
            </aside>

            <main class="flex-1">
                <router-view />
            </main>

        </div>
    </div>
</template>

<script>
import { adminLogout } from '../api/adminService';
export default {
    data() {
        return {
            userName: ''  // Khởi tạo giá trị mặc định
        };
    },
    mounted() {
        const adminData = localStorage.getItem('admin');
        if (adminData) {
            const admin = JSON.parse(adminData);
            this.userName = admin.adminname;  // Gán adminname vào data
        }
    },


    methods: {
        isActiveRoute(route) {
            return this.$route.path === route;
        },
        // Hàm xử lý logout
        async logout() {
            try {
                // Gọi API adminLogout
                await adminLogout();

                // Xóa dữ liệu admin khỏi localStorage
                localStorage.removeItem('admin');
                localStorage.removeItem('authToken');

                // Chuyển hướng đến trang đăng nhập
                this.$router.push('/user/login');  // Hoặc địa chỉ login mà bạn muốn chuyển hướng đến
            } catch (error) {
                console.error("Error during logout:", error);
                // Có thể thêm thông báo lỗi cho người dùng
            }
        },
    },
};
</script>