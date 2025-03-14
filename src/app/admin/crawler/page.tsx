'use client'

import { useState } from 'react'
import { crawlContent } from '@/utils/crawler'
import { config } from '@/config'

interface CrawlState {
  type: string
  status: 'idle' | 'running' | 'success' | 'error'
  message: string
  data?: {
    total: number
    updated: number
    failed: number
  }
}

export default function CrawlerPage() {
  const [crawlStates, setCrawlStates] = useState<Record<string, CrawlState>>({})
  const [startPage, setStartPage] = useState(1)
  const [endPage, setEndPage] = useState(1)

  const handleCrawl = async (type: string) => {
    setCrawlStates(prev => ({
      ...prev,
      [type]: {
        type,
        status: 'running',
        message: '正在采集...'
      }
    }))

    try {
      const result = await crawlContent(type as any, startPage, endPage)
      setCrawlStates(prev => ({
        ...prev,
        [type]: {
          type,
          status: result.success ? 'success' : 'error',
          message: result.message,
          data: result.data
        }
      }))
    } catch (error) {
      setCrawlStates(prev => ({
        ...prev,
        [type]: {
          type,
          status: 'error',
          message: '采集失败: ' + (error as Error).message
        }
      }))
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'text-blue-600'
      case 'success':
        return 'text-green-600'
      case 'error':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">内容采集管理</h1>

      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <div>
            <label htmlFor="startPage" className="block text-sm font-medium text-gray-700">
              起始页
            </label>
            <input
              type="number"
              id="startPage"
              min="1"
              value={startPage}
              onChange={(e) => setStartPage(parseInt(e.target.value) || 1)}
              className="mt-1 block w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="endPage" className="block text-sm font-medium text-gray-700">
              结束页
            </label>
            <input
              type="number"
              id="endPage"
              min="1"
              value={endPage}
              onChange={(e) => setEndPage(parseInt(e.target.value) || 1)}
              className="mt-1 block w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(config.categories).map(([key, name]) => {
          const state = crawlStates[key]
          return (
            <div key={key} className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">{name}</h3>
              <div className="mb-4">
                <button
                  onClick={() => handleCrawl(key)}
                  disabled={state?.status === 'running'}
                  className={`w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    state?.status === 'running'
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {state?.status === 'running' ? '采集中...' : '开始采集'}
                </button>
              </div>
              {state && (
                <div className={getStatusColor(state.status)}>
                  <p className="text-sm">{state.message}</p>
                  {state.data && (
                    <div className="mt-2 text-sm">
                      <p>总数: {state.data.total}</p>
                      <p>更新: {state.data.updated}</p>
                      <p>失败: {state.data.failed}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
} 