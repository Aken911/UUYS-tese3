'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { searchContent } from '@/utils/api'
import { VideoItem } from '@/types'

const navigation = [
  { name: '首页', href: '/' },
  { name: '电影', href: '/movies' },
  { name: '短剧', href: '/short-series' },
  { name: '午夜AV', href: '/adult' },
  { name: '电视剧', href: '/tv-series' },
  { name: '综艺', href: '/variety' },
  { name: '动漫', href: '/anime' },
]

export default function Navbar() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<VideoItem[]>([])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    try {
      setIsSearching(true)
      const results = await searchContent(searchQuery)
      setSearchResults(results.list || [])
      // 跳转到搜索结果页面
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    } catch (error) {
      console.error('搜索失败:', error)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-white text-2xl font-bold">
                UU影视
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link href="/search" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  搜索
                </Link>
                <Link href="/history" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  历史记录
                </Link>
                <Link href="/admin/crawler" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  采集管理
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
            <form className="w-full max-w-lg lg:max-w-xs" onSubmit={handleSearch}>
              <label htmlFor="search" className="sr-only">搜索</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-white focus:text-gray-900 focus:placeholder-gray-500 sm:text-sm"
                  placeholder="搜索全站内容"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  disabled={isSearching}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </nav>
  )
} 