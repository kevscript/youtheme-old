import React from 'react'
import '../styles/VideosList.css' 

export default function VideosList({videosData}) {
  return (
    <div className="videos-container">
      <ul className="videos-list">
        {videosData.items && videosData.items.map((video) => (
          <a 
            href={`https://www.youtube.com/watch?v=${video.id.videoId}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            key={video.id.videoId} 
            className='videos-item'
          >
            <img src={video.snippet.thumbnails.medium.url} alt=""/>
          </a>
        ))}
      </ul>
    </div>
  )
}
