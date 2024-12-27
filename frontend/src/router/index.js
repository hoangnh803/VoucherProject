import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../layouts/UserLayout.vue'
import SignUp from '../views/SignUpView.vue'
import Login from '../views/LoginView.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import Profile from '../views/ProfileView.vue'
import Voucher from '../views/VoucherView.vue'
import ChangePassword from '../views/ChangePassword.vue'
import AdminLayout from '../layouts/AdminLayout.vue'
import AdminProfile from '../views/AdminProfile.vue'
import ManageUser from '../views/ManageUser.vue'
import ManageVoucher from '../views/ManageVoucher.vue'
import PasswordSecurity from '../views/PasswordSecurity.vue'
import RedemptionHistory from '../views/RedemptionHistory.vue'
import LoginAdmin from '../views/LoginAdmin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      children: [
        {
          path: '/forgotpassword',
          name: 'forgotpassword',
          component: ForgotPassword,
        },
        {
          path: '/profile',
          name: 'profile',
          component: Profile,
        },
        {
          path: '/voucher',
          name: 'voucher',
          component: Voucher,
        },
        {
          path: '/password-security',
          name: 'change-password',
          component: ChangePassword,
        },
      ],
    },
    {
      path: '/user/register',
      name: 'signup',
      component: SignUp,
    },
    {
      path: '/user/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: LoginAdmin,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminLayout,
      children: [
        {
          path: '/admin/profile',
          name: 'admin-profile',
          component: AdminProfile,
        },
        {
          path: '/admin/manage-user',
          name: 'manage-user',
          component: ManageUser,
        },
        {
          path: '/admin/manage-voucher',
          name: 'manage-voucher',
          component: ManageVoucher,
        },
        {
          path: '/admin/password-security',
          name: 'password-security',
          component: PasswordSecurity,
        },
        {
          path: '/admin/redemption-history',
          name: 'redemption-history',
          component: RedemptionHistory,
        },
      ],
    }
  ],
})

export default router
