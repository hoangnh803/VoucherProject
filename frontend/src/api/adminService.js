// frontend/src/api/voucherService.js
import apiClient from './axios';

export const fetchVouchers = () => {
  return apiClient.get('/admin/view-list-voucher');
};

export const fetchVoucherDetail = (id) => {
  return apiClient.get(`/admin/view-detail/${id}`);
};

export const createVoucher = (voucherData) => {
  return apiClient.post('/admin/create-voucher', voucherData);
};

export const updateVoucher = (id, voucherData) => {
  return apiClient.put(`/admin/update-voucher/${id}`, voucherData);
};
export const deleteVoucher = (id) => {
  return apiClient.delete(`/admin/delete-voucher/${id}`);
}
export const distributeVoucher = (voucherData) => {
  return apiClient.post('/admin/distribute-voucher', voucherData);
};

export const fetchAdminProfile = async () => {
  const response = await apiClient.get('/admin/profile');  // Call the API using the custom axios client
  return response.data;  // Return the response data
}

export const updateAdminProfile = async (adminData) => {
  const response = await apiClient.post('/admin/update-profile', adminData);  // Call the API using the custom axios client
  return response.data;  // Return the response data
};
// Fetch the list of users (Added API call for users)
export const fetchUsers = () => {
  return apiClient.get('/admin/users');  // API call to get the list of users
};
// Fetch user details (Added API call for user details)
export const fetchUserDetail = (id) => {
  return apiClient.get(`/admin/users/${id}`);  // API call to get the user details
};
export const lockUser = (id) => {
  return apiClient.post(`/admin/users/${id}/lock`); // Gọi API khóa người dùng
};

export const unlockUser = (id) => {
  return apiClient.post(`/admin/users/${id}/unlock`); // Gọi API mở khóa người dùng
};
export function changePassword(payload) {
  return apiClient.post('/admin/change-password', payload);
}
// Admin Logout API call
export function adminLogout() {
  return apiClient.post('/admin/logout');
}
// Fetch the list of products 
export const fetchProducts = () => {
  return apiClient.get('/admin/products');
};

export const fetchRedemption = () => {
  return apiClient.get('/admin/view-redemption');
}