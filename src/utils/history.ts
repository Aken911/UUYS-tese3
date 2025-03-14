import { HistoryItem } from '@/types'

const HISTORY_KEY = 'playHistory'
const MAX_HISTORY_ITEMS = 100

export const getHistory = (): HistoryItem[] => {
  const historyStr = localStorage.getItem(HISTORY_KEY)
  return historyStr ? JSON.parse(historyStr) : []
}

export const addHistory = (item: Omit<HistoryItem, 'timestamp'>) => {
  const history = getHistory()
  const newItem = { ...item, timestamp: Date.now() }
  
  // 移除相同ID的旧记录
  const filteredHistory = history.filter(h => h.id !== item.id)
  
  // 添加新记录到开头
  filteredHistory.unshift(newItem)
  
  // 限制历史记录数量
  if (filteredHistory.length > MAX_HISTORY_ITEMS) {
    filteredHistory.pop()
  }
  
  localStorage.setItem(HISTORY_KEY, JSON.stringify(filteredHistory))
}

export const clearHistory = () => {
  localStorage.removeItem(HISTORY_KEY)
} 