export const port = process.env.PORT || 3000
export const host = process.env.WEBSITE_HOSTNAME ||
  `localhost:${port}`

export const databaseUrl = process.env.DATABASE_URL ||
  'sqlite:database.sqlite'

export const analytics = {
  // https://analytics.google.com/
  google: {
    trackingId: process.env.GOOGLE_TRACKING_ID || 'UA-XXXXX-X' }
}

let apiUrl = 'http://api.quivade.com/'
if (__DEV__) {
  apiUrl = 'http://localhost:8087/'
}

export { apiUrl }
