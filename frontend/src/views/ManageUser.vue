<template>
    <div class="min-h-screen bg-white">


        

            <!-- Form Section -->
            <main class="flex-1 bg-white shadow-lg px-8 py-4">
                <h1 class="text-xl mb-2 font-semibold text-green-800">
                    Manage User
                </h1>
                <ManageUserTable/>
            </main>
        </div>
</template>

<script>
import ManageUserTable from "../components/ManageUserTable.vue";

export default {
    name: "NavigationBar",
    components: {
        ManageUserTable,
    },
    data() {
        return {
            userAvatar: "https://i.pravatar.cc/100", // Placeholder for user avatar
            userName: "Nguyen Van A", // User's name
        };
    },
};
</script>