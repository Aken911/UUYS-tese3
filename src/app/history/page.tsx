'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getHistory, clearHistory } from '@/utils/history'

interface HistoryItem {
  id: string
  title: string
  pic: string
  episode?: number
  timestamp: number
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([])

  useEffect(() => {
    setHistory(getHistory())
  }, [])

  const handleClearHistory = () => {
    if (confirm('确定要清空播放历史吗？')) {
      clearHistory()
      setHistory([])
    }
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">播放历史</h1>
        {history.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="text-red-600 hover:text-red-700"
          >
            清空历史
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">暂无播放历史</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {history.map((item) => (
            <Link
              key={`${item.id}-${item.episode || 0}`}
              href={item.episode ? `/play/${item.id}/${item.episode}` : `/detail/${item.id}`}
              className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50"
            >
              <div className="flex-shrink-0 w-24 h-32 relative">
                <Image
                  src={item.pic}
                  alt={item.title}
                  className="rounded-lg object-cover"
                  fill
                  sizes="(max-width: 96px) 100vw, 96px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-medium text-gray-900 truncate">
                  {item.title}
                </h2>
                {item.episode && (
                  <p className="text-sm text-gray-500">
                    观看至第 {item.episode} 集
                  </p>
                )}
                <p className="text-sm text-gray-500">
                  {formatDate(item.timestamp)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
} 