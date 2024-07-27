const candidateEndpoint = {
  candidateSignUp: "/candidate/verify-email",
  verifyOtp: "/candidate/verify-otp",
  verifyLogin: "/candidate/verify-login",
  resendOtp: "/candidate/resend-otp",
  logout: "/candidate/logout",
  home: "/candidate/home",

  getInterviewersByTech: "/candidate/get-interviewers",
  getInterviewerSlotDetails: "/candidate/get-interviewer-slots-details",

  makePayment: "/payment/create-payment",
  bookSlot: "/candidate/book-slot",
  getScheduledInterviews: "/candidate/get-scheduled-interviews",
  forgorPassword: "/candidate/forgot-password",
  resetPassword: "/candidate/reset-password",

  getFeebackDetails: "/candidate/get-feedback-details",

  isCandidatePremium: "/candidate/is-premium",

  getAllPremiumCandidates: "/candidate/get-all-premium-users",

  createGroup: "/chat/group",

  getAllChats: "/chat",

  getAllMessages: "/chat/messages",

  sendMessage: "/chat/send-message",

  giveInterviewerRating: "/candidate/give-interviewer-rating",

  getAnalytics: "/candidate/get-analytics",

  verifyCandidateVideoConference: "/candidate/verify-video-conference",

  getNotifications: "/candidate/get-notifications"
};

export default candidateEndpoint;
