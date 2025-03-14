'use client'

import { useEffect, useState } from 'react'
import { fetchVideoDetail, fetchVideoPlayUrl } from '@/utils/api'
import { addHistory } from '@/utils/history'
import { VideoDetail } from '@/types'

interface PlayParams {
  params: { 
    id: string
    episode: string 
  }
}

interface PlayUrl {
  url: string
}

export default function PlayPage({ params }: PlayParams) {
  const [detail, setDetail] = useState<VideoDetail | null>(null)
  const [playUrl, setPlayUrl] = useState<PlayUrl | null>(null)
  const [loading, setLoading] = useState(true)
  const episode = parseInt(params.episode, 10)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [detailData, playData] = await Promise.all([
          fetchVideoDetail(params.id),
          fetchVideoPlayUrl(params.id, episode)
        ])
        
        if (detailData.detail) {
          const videoDetail = detailData.detail as VideoDetail
          setDetail(videoDetail)
          setPlayUrl(playData)

          // 添加到播放历史
          addHistory({
            id: videoDetail.id,
            title: videoDetail.title,
            pic: videoDetail.pic || '',
            episode: episode
          })
        }
      } catch (error) {
        console.error('获取视频信息失败:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [params.id, episode])

  if (loading) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold text-gray-900">加载中...</h1>
      </div>
    )
  }

  if (!detail || !playUrl) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold text-gray-900">视频不存在或已下架</h1>
      </div>
    )
  }

  const totalEpisodes = detail.total || 1

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        {detail.title} {totalEpisodes > 1 ? `第${episode}集` : ''}
      </h1>

      <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden mb-6">
        <iframe
          src={playUrl.url}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>

      {totalEpisodes > 1 && (
        <div className="mt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">选集</h2>
          <div className="grid grid-cols-8 md:grid-cols-12 lg:grid-cols-16 gap-2">
            {Array.from({ length: totalEpisodes }).map((_, i) => {
              const ep = i + 1
              return (
                <a
                  key={ep}
                  href={`/play/${detail.id}/${ep}`}
                  className={`
                    px-3 py-1 text-center rounded
                    ${ep === episode
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }
                  `}
                >
                  {ep}
                </a>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
} 