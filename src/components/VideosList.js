import React from 'react'
import '../styles/VideosList.css' 

export default function VideosList({videos}) {
  return (
    <div className="videos-container">
      <ul className="videos-list">
        {videos && videos.map((video) => (
          <li key={video.id.videoId} className='videos-item'>
            <img src={video.snippet.thumbnails.medium.url} alt=""/>
            
          </li>
        ))}
      </ul>
    </div>
  )
}


fetch(`https://www.googleapis.com/youtube/v3/search?key=${API.key}&channelId=UC29ju8bIPH5as8OGnQzwJyA&part=snippet,id&order=date&maxResults=50`)
.then(res => res.json())
.then(data => this.setState({
  data: data
}))
.catch(err => console.error(err))