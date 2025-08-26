//C:\Users\KALPNA\Desktop\secure-coding2\frontend\src\utils\analytics.js
export const trackEvent = (eventName, payload = {}) => {
  console.log(`[Analytics] ${eventName}`, payload);
  // You can later replace this with a real analytics service
};