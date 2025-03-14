import Image from 'next/image'
import { fetchMovies, fetchTVSeries, fetchShortSeries } from '@/utils/api'

interface Movie {
  id: string
  title: string
  pic: string
  score: number
  year: number
}

async function getHomeData() {
  try {
    const [movies, tvSeries, shortSeries] = await Promise.all([
      fetchMovies(1),
      fetchTVSeries(1),
      fetchShortSeries(1)
    ])
    return {
      movies: movies.list || [],
      tvSeries: tvSeries.list || [],
      shortSeries: shortSeries.list || []
    }
  } catch (error) {
    console.error('获取首页数据失败:', error)
    return {
      movies: [],
      tvSeries: [],
      shortSeries: []
    }
  }
}

export default async function Home() {
  const { movies, tvSeries, shortSeries } = await getHomeData()

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-bold mb-6">最新电影</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movies.map((movie: Movie) => (
            <div key={movie.id} className="group relative">
              <div className="aspect-w-2 aspect-h-3 rounded-lg overflow-hidden bg-gray-200">
                <Image
                  src={movie.pic}
                  alt={movie.title}
                  className="object-cover object-center group-hover:opacity-75"
                  width={300}
                  height={450}
                />
              </div>
              <div className="mt-2">
                <h3 className="text-sm font-medium text-gray-900">{movie.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{movie.year}</span>
                  <span>⭐ {movie.score}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">最新电视剧</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {tvSeries.map((series: Movie) => (
            <div key={series.id} className="group relative">
              <div className="aspect-w-2 aspect-h-3 rounded-lg overflow-hidden bg-gray-200">
                <Image
                  src={series.pic}
                  alt={series.title}
                  className="object-cover object-center group-hover:opacity-75"
                  width={300}
                  height={450}
                />
              </div>
              <div className="mt-2">
                <h3 className="text-sm font-medium text-gray-900">{series.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{series.year}</span>
                  <span>⭐ {series.score}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">最新短剧</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {shortSeries.map((series: Movie) => (
            <div key={series.id} className="group relative">
              <div className="aspect-w-2 aspect-h-3 rounded-lg overflow-hidden bg-gray-200">
                <Image
                  src={series.pic}
                  alt={series.title}
                  className="object-cover object-center group-hover:opacity-75"
                  width={300}
                  height={450}
                />
              </div>
              <div className="mt-2">
                <h3 className="text-sm font-medium text-gray-900">{series.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{series.year}</span>
                  <span>⭐ {series.score}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
} 