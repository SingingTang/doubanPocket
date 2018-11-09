
const topics = {
  book: '图书',
  movie: '电影',
  music: '音乐'
}

const topicIcon = {
  book: ['#icon-tushu1-copy', '#icon-tushu-copy'],
  movie: ['#icon-weibiaoti2-copy', '#icon-weibiaoti2-copy1'],
  music: ['#icon-changpianCD-copy', '#icon-changpianCD']

}

const url = 'https://api.douban.com/v2/'
const topicList = [
  { book: '图书' },
  { movie: '电影' },
  { music: '音乐' }
]
const placeholder = {
  book: '书名、作者、ISBN',
  movie: '电影、影人、影院、电视剧',
  music: '唱片名、表演者、条码、ISRC'
}

export default { topics, topicIcon, url, topicList, placeholder }
