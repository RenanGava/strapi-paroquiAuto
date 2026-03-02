
export default ({ env }) => ({
  // "auth-cookie": {
  //   // enabled: true,
  //   // config: {
  //   //   enabled: true,
  //   //   cookieName: "access_token",
  //   //   // signatureCookieName: "access_token.sig",
  //   //   signatureEnabled: true,
  //   //   signatureHttpOnly: true,
  //   //   path: "/",
  //   //   domain: null,
  //   //   secure: true,
  //   //   httpOnly: true,
  //   //   sameSite: "lax",
  //   //   maxAge: 30 * 60 * 60 * 24,
  //   // },
  // },
  "email":{
    config:{
      provider: 'nodemailer',
      providerOptions:{
        host: env('SMTP_SERVER'),
        port: env('SMTP_PORT'),
        secure: false,
        auth:{
          user: env('SMTP_LOGIN'),
          pass: env('SMTP_PASSWORD')
        }
      },
      settings:{
        defaultFrom: 'renan.gava.dev@gmail.com'
      }
    }
  },
  "users-permissions": {
    config: {
      jwtManagement: "refresh",
      sessions: {
        accessTokenLifespan: 604800, // 1 week (default)
        maxRefreshTokenLifespan: 2592000, // 30 days
        idleRefreshTokenLifespan: 604800, // 7 days
        httpOnly: false, // Set to true for HTTP-only cookies
        cookie: {
          name: "strapi_up_refresh",
          sameSite: "lax",
          path: "/",
          secure: true, // true in production
        },
      },
    },
  },
});
