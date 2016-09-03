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

let apiUrl = 'http://localhost:8087/'
if (process.env.NODE_ENV === 'production') {
  apiUrl = 'http://api.quivade.net/'
}
export { apiUrl }
