const backendUrl = process.env.NEXT_PUBLIC_QRUPONES_NOTIFICATION_API;

export const endpoints = {
  auth: {
    login: `${backendUrl}/coupons/validateCode/`,
    logout: `${backendUrl}/coupons/deleteCode/`,
  },
};
