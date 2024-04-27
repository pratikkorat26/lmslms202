export const APP_ROUTES = {
    Landing: "/",
    Dashboard: "/dashboard",
    Login: "/login",
    Register: "/register",
    Any: "/*",
    VerifyEmail: "verify-email",
  
    //driver pages
    Onboard: "/onboard",
    DriverProfile: "/driver-profile",
    MyCampaign: "/my-campaign",
    CampaignDetails: "/my-campaign/campaign-details/:id",
    DriverContract: "/driver-contract",
  
    //admin pages
    CreateAdvertisers: "/create-advertiser",
    DriverList: "/get-driver-list",
  
    //advertising pages
    CampaignsList: "/campaigns-list",
    CreateCampaign: "/advertiser-campaigns/create-campaign",
    AdvertiserCampaign: "/advertiser-campaigns",
    ApplyDriverList: "/advertiser-campaigns/apply-driver/:id",
    EditCampaign: "/edit-campaign/:id",
  
    //privacy policy page
    PrivacyPolicy: "/privacy-policy",
  
    //profile page
    Profile: "/profile",
  };
  export const status_code = {
    request: 0,
    approved: 1,
    rejected: 2,
    completed: 3,
  };
  export const USER_ROLE = {
    DRIVER: 1,
    ADMIN: 2,
    ADVERTISER: 3,
  };
  export const API_ROUTES = {
    //Genral api
    RefreshToken: "/admin/auth/refresh-token",
    Login: "/admin/auth/login",
    Register: "/admin/auth/register",
    VerifyEmail: "/admin/auth/verify-email",
    ForgotPassword: "/admin/auth/forgot-password",
    ResetPassword: "/admin/auth/reset-password",
    Logout: "/admin/auth/logout",
  
    //driver api
    Onboard: "/admin/driveronboard/create",
    GetDetial: "/admin/user/me",
    GetOnboard: "/admin/driveronboard/:id",
    DeleteImage: "/admin/driveronboard/deleteVehicleImages",
    AddImage: "/admin/driveronboard/addVehicleImages",
    UpdateOnboard: "/admin/driveronboard/update/:id",
    CampaignList: "/admin/advertise/list",
    ApplyCampaign: "/admin/advertiseapplication/create",
    GetApplyCampaign: "/admin/advertiseapplication/list",
    WithdrawalCampaign: "/admin/advertiseapplication/delete/:id",
    GetCampaignList: "/admin/advertise/listOfAdvertise",
    GetCampaigns: "/admin/advertise/:id",
    GetCampaignImage: "/admin/dailycompaign/list",
    DriverCampaignImage: "/admin/dailycompaign/add-image",
    DailyCampaignImage: "/admin/dailycompaign/create",
  
    //admine api
    CreateAdvertisement: "/admin/user/create-advertiser",
    GetAdvertiser: "/admin/user/get-all-advertisers",
    UpdateAdvertiser: "/admin/user/update-advertiser/:id",
    ChangeAdvertiserPassword: "/admin/user/change-advertiser-password/:id",
    GetDriver: "/admin/driveronboard/list",
  
    //advertiser api
    CreateCampaign: "/admin/advertise/create",
    AddCampaignImage: "/admin/advertise/addAdvertiseImages",
    DeleteCampaignImage: "/admin/advertise/deleteAdvertiseImages",
    UpdateCapmaign: "/admin/advertise/update/:id",
    GetDriverList: "/admin/advertiseapplication/list",
    AcceptDriver: "/admin/advertiseapplication/approve-application/:id",
  };
  