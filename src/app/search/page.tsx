import Image from 'next/image'
import Link from 'next/link'
import { searchContent } from '@/utils/api'

interface SearchParams {
  searchParams: { q: string }
}

interface SearchResult {
  id: string
  title: string
  pic: string
  score: number
  year: number
}

export default async function SearchPage({ searchParams }: SearchParams) {
  const query = searchParams.q || ''
  let results: SearchResult[] = []

  if (query) {
    try {
      const data = await searchContent(query)
      results = data.list || []
    } catch (error) {
      console.error('搜索失败:', error)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">搜索结果: {query}</h1>
      
      {results.length === 0 ? (
        <p className="text-gray-500">未找到相关内容</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {results.map((item) => (
            <Link href={`/detail/${item.id}`} key={item.id} className="group">
              <div className="aspect-w-2 aspect-h-3 rounded-lg overflow-hidden bg-gray-200">
                <Image
                  src={item.pic}
                  alt={item.title}
                  className="object-cover object-center group-hover:opacity-75"
                  width={300}
                  height={450}
                />
              </div>
              <div className="mt-2">
                <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{item.year}</span>
                  <span>⭐ {item.score}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
} 