export const config = {
  siteName: 'UU影视',
  siteDescription: '您的在线影视娱乐平台',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
  categories: {
    movies: '电影',
    tvSeries: '电视剧',
    shortSeries: '短剧',
    adult: '午夜AV',
    variety: '综艺',
    anime: '动漫'
  },
  defaultPageSize: 24,
  imageBaseUrl: process.env.NEXT_PUBLIC_IMAGE_BASE_URL || '/images',
}

export const apiEndpoints = {
  search: '/search',
  movies: '/movies',
  tvSeries: '/tv-series',
  shortSeries: '/short-series',
  adult: '/adult',
  variety: '/variety',
  anime: '/anime',
} 