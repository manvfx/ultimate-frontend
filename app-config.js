export const AppConfig = {
  sarv: {
    baseUrl:`https://api.checkotik.com`,
    websiteUrl: 'https://api.checkotik.com',
    // baseUrl:`http://localhost:8004`,
    // websiteUrl: 'http://localhost:8004',
  },
  cartax: {
    baseUrl:`https://cartax.shiraz.ir`
  },
  authentication: {
    ssoBaseUrl: 'https://sso-sarv.shiraz.ir',
    myGovSsoUrl: `https://ssokeshvar.moi.ir/oauth2/authorize?response_type=code&scope=openid profile&client_id=sarv.shiraz&state=state1&redirect_uri=${encodeURIComponent('https://sarv.shiraz.ir/auth/sso/my-gov-ir')}`,
    myGovSsoLogoutUrl: `https://ssokeshvar.moi.ir/logout`,
  },
  locale: {
    default: 'en',
  },
};
