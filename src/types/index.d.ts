declare module 'next/image'
declare module 'next/link'
declare module '@heroicons/react/24/outline'

export interface VideoItem {
  id: string
  title: string
  pic: string
  score?: number
  year?: number
  area?: string
  lang?: string
  type?: string
  actor?: string
  director?: string
  des?: string
  total?: number
  updateTime?: string
}

export interface VideoDetail extends VideoItem {
  episodes?: Array<{
    id: string
    title: string
    url: string
  }>
}

export interface ApiResponse<T> {
  code: number
  msg: string
  list?: T[]
  detail?: T
  total?: number
}

export interface HistoryItem {
  id: string
  title: string
  pic: string
  episode: number
  timestamp: number
}

export interface Movie {
  id: number
  title: string
  cover: string
  rating: number
  year: number
}

export interface TVSeries extends Movie {
  episodes: number
  currentEpisode: number
}

export interface Anime extends TVSeries {
  originalTitle: string
} 