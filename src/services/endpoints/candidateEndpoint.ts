
const candidateEndpoint = {
    candidateSignUp: '/candidate/verify-email',
    verifyOtp: '/candidate/verify-otp',
    verifyLogin: '/candidate/verify-login',
    resendOtp: '/candidate/resend-otp',
    logout: '/candidate/logout',
    home: '/candidate/home',

    getInterviewersByTech: '/candidate/get-interviewers',
    getInterviewerSlotDetails: '/candidate/get-interviewer-slots-details',

    makePayment: '/payment/create-payment',
    bookSlot: '/candidate/book-slot',
    getScheduledInterviews: '/candidate/get-scheduled-interviews'

}


export default candidateEndpoint