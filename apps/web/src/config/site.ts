export const siteConfig = {
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3030',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
} as const;


