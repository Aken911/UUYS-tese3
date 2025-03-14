'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { fetchVideoDetail } from '@/utils/api'
import { VideoDetail } from '@/types'

interface DetailParams {
  params: { id: string }
}

export default function DetailPage({ params }: DetailParams) {
  const [detail, setDetail] = useState<VideoDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDetail = async () => {
      try {
        const response = await fetchVideoDetail(params.id)
        if (response.detail) {
          setDetail(response.detail as VideoDetail)
        }
      } catch (error) {
        console.error('获取视频详情失败:', error)
      } finally {
        setLoading(false)
      }
    }

    loadDetail()
  }, [params.id])

  if (loading) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold text-gray-900">加载中...</h1>
      </div>
    )
  }

  if (!detail) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold text-gray-900">视频不存在或已下架</h1>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 lg:w-1/4">
          <div className="aspect-w-2 aspect-h-3 rounded-lg overflow-hidden bg-gray-200">
            <Image
              src={detail.pic}
              alt={detail.title}
              className="object-cover object-center"
              width={400}
              height={600}
              unoptimized
            />
          </div>
          <Link
            href={`/play/${detail.id}/1`}
            className="mt-4 w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
          >
            立即播放
          </Link>
        </div>
        
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{detail.title}</h1>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <span className="text-gray-500">评分：</span>
              <span className="text-yellow-500">⭐ {detail.score || '暂无'}</span>
            </div>
            <div>
              <span className="text-gray-500">年份：</span>
              <span>{detail.year || '未知'}</span>
            </div>
            <div>
              <span className="text-gray-500">地区：</span>
              <span>{detail.area || '未知'}</span>
            </div>
            <div>
              <span className="text-gray-500">语言：</span>
              <span>{detail.lang || '未知'}</span>
            </div>
            <div>
              <span className="text-gray-500">类型：</span>
              <span>{detail.type || '未知'}</span>
            </div>
            <div>
              <span className="text-gray-500">更新：</span>
              <span>{detail.updateTime || '未知'}</span>
            </div>
            {detail.total && detail.total > 1 && (
              <div>
                <span className="text-gray-500">集数：</span>
                <span>{detail.total}集</span>
              </div>
            )}
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">主演</h2>
            <p className="text-gray-600">{detail.actor || '暂无信息'}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">导演</h2>
            <p className="text-gray-600">{detail.director || '暂无信息'}</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">剧情简介</h2>
            <p className="text-gray-600 whitespace-pre-line">{detail.des || '暂无简介'}</p>
          </div>
        </div>
      </div>
    </div>
  )
} 