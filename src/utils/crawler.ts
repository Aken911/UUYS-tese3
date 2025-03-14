import axios from 'axios'
import { config } from '@/config'

interface CrawlResult {
  success: boolean
  message: string
  data?: {
    total: number
    updated: number
    failed: number
  }
}

const sourceUrls = {
  movies: 'https://vv.xunboe.cn/index.php/ajax/data?mid=1&tid=1',
  tvSeries: 'https://vv.xunboe.cn/index.php/ajax/data?mid=1&tid=2',
  shortSeries: 'https://vv.xunboe.cn/index.php/ajax/data?mid=1&tid=3',
  variety: 'https://vv.xunboe.cn/index.php/ajax/data?mid=1&tid=4',
  anime: 'https://vv.xunboe.cn/index.php/ajax/data?mid=1&tid=5'
}

export async function crawlContent(type: keyof typeof sourceUrls, startPage = 1, endPage = 1): Promise<CrawlResult> {
  try {
    let total = 0
    let updated = 0
    let failed = 0
    
    for (let page = startPage; page <= endPage; page++) {
      const url = `${sourceUrls[type]}&page=${page}&limit=${config.defaultPageSize}`
      
      try {
        const response = await axios.get(url)
        const data = response.data
        
        if (data && data.list && Array.isArray(data.list)) {
          total += data.list.length
          updated += data.list.length
          
          // 这里可以添加数据存储逻辑
          // 例如：保存到数据库或文件系统
          console.log(`成功采集第 ${page} 页数据，共 ${data.list.length} 条`)
        }
        
        // 添加延迟，避免请求过于频繁
        await new Promise(resolve => setTimeout(resolve, 1000))
      } catch (error) {
        console.error(`采集第 ${page} 页失败:`, error)
        failed++
      }
    }
    
    return {
      success: true,
      message: '采集完成',
      data: {
        total,
        updated,
        failed
      }
    }
  } catch (error) {
    console.error('采集过程出错:', error)
    return {
      success: false,
      message: '采集失败: ' + (error as Error).message
    }
  }
} 