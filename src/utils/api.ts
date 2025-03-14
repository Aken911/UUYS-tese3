import axios from 'axios'
import { config } from '@/config'

export interface VideoItem {
  id: string
  title: string
  pic: string
  score: number
  year: number
  area?: string
  lang?: string
  type?: string
  actor?: string
  director?: string
  des?: string
  total?: number
  updateTime?: string
}

export interface ApiResponse<T> {
  code: number
  msg: string
  list?: T[]
  detail?: T
  total?: number
}

const api = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

export const searchContent = async (query: string): Promise<ApiResponse<VideoItem>> => {
  try {
    const response = await api.get(`/index.php/ajax/suggest?mid=1&wd=${encodeURIComponent(query)}`)
    return response.data
  } catch (error) {
    console.error('搜索失败:', error)
    throw error
  }
}

export const fetchMovies = async (page = 1): Promise<ApiResponse<VideoItem>> => {
  try {
    const response = await api.get(`/index.php/ajax/data?mid=1&tid=1&page=${page}&limit=${config.defaultPageSize}`)
    return response.data
  } catch (error) {
    console.error('获取电影列表失败:', error)
    throw error
  }
}

export const fetchTVSeries = async (page = 1): Promise<ApiResponse<VideoItem>> => {
  try {
    const response = await api.get(`/index.php/ajax/data?mid=1&tid=2&page=${page}&limit=${config.defaultPageSize}`)
    return response.data
  } catch (error) {
    console.error('获取电视剧列表失败:', error)
    throw error
  }
}

export const fetchShortSeries = async (page = 1): Promise<ApiResponse<VideoItem>> => {
  try {
    const response = await api.get(`/index.php/ajax/data?mid=1&tid=3&page=${page}&limit=${config.defaultPageSize}`)
    return response.data
  } catch (error) {
    console.error('获取短剧列表失败:', error)
    throw error
  }
}

export const fetchVariety = async (page = 1): Promise<ApiResponse<VideoItem>> => {
  try {
    const response = await api.get(`/index.php/ajax/data?mid=1&tid=4&page=${page}&limit=${config.defaultPageSize}`)
    return response.data
  } catch (error) {
    console.error('获取综艺列表失败:', error)
    throw error
  }
}

export const fetchAnime = async (page = 1): Promise<ApiResponse<VideoItem>> => {
  try {
    const response = await api.get(`/index.php/ajax/data?mid=1&tid=5&page=${page}&limit=${config.defaultPageSize}`)
    return response.data
  } catch (error) {
    console.error('获取动漫列表失败:', error)
    throw error
  }
}

export const fetchVideoDetail = async (id: string): Promise<ApiResponse<VideoItem>> => {
  try {
    const response = await api.get(`/index.php/ajax/detail?mid=1&id=${id}`)
    return response.data
  } catch (error) {
    console.error('获取视频详情失败:', error)
    throw error
  }
}

export const fetchVideoPlayUrl = async (id: string, episode: number = 1): Promise<{ url: string }> => {
  try {
    const response = await api.get(`/index.php/ajax/play?mid=1&id=${id}&ep=${episode}`)
    return response.data
  } catch (error) {
    console.error('获取播放地址失败:', error)
    throw error
  }
}

// 其他API请求函数... 