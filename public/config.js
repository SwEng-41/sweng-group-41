// IAM
const IAM_BASE_URL = "http://localhost:8080/v1";
const IAM_LOGIN_URL = IAM_BASE_URL + "/users/${username}/login";
const IAM_VERIFY_URL = IAM_BASE_URL + "/users/${username}/login";
const IAM_CREATE_ACCOUNT_URL = IAM_BASE_URL + "/users";
const IAM_GET_USER_DATA_URL = IAM_BASE_URL + "/users/self";
const IAM_UPDATE_USER_DATA_URL = IAM_BASE_URL + "/users/self";

// Payments Service
const PAYMENT_BASE_URL = "http://localhost:4242";
const PAYMENT_CREATE_SESSION_URL = PAYMENT_BASE_URL + "/create-session";

// Stripe
const STRIPE_PUBLIC_KEY = 'pk_test_51IiIOMDLjBSYtQGtEwVijXa6nsMtKWarqGIvCOx5LMWkE0RvpC6EUM1QBDo6WXa99OcvFoPp2tvwZ7wRrleQc6Vv00G3B30mRk';

// Website
const SUPPORT_EMAIL = "support@netsoc.ie";
const MAIN_WEBSITE_URL = "http://localhost:4000/services/";
const BLURB = "We provide free web hosting and file storage on our servers, tech talks and tutorials for all skill levels. Learn how to build your own webpage and host it on our servers! Find out more by clicking on our logo above!";
