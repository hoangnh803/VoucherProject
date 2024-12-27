// frontend/src/api/locationService.js
import apiClient from './axios';

export const fetchCountries = () => {
  return apiClient.get('/fetch-countries');
};

export const fetchCities = (countryId) => {
  return apiClient.post('/fetch-cities', { country_id: countryId });
};

export const updateUserProfile = (userData) => {
  return apiClient.post('/user/update-profile', userData);
};

export const fetchUserProfile = () => {
  return apiClient.get('/user/profile');
};

export const fetchVouchers = () => {
  return apiClient.get('/user/view-all-voucher'); // Đường dẫn API tương ứng với backend Laravel
};
// Hàm lấy danh sách voucher đã hết hạn
export const fetchExpiredVouchers = () => {
  return apiClient.get('/user/view-voucher-expired');
};

// Hàm lấy danh sách voucher đã sử dụng
export const fetchUsedVouchers = () => {
  return apiClient.get('/user/view-voucher-used');
};

// Hàm lấy thông tin insurrance
export const fetchInsurance = (id) => {
  return apiClient.get(`/user/view-detail/${id}`);
};