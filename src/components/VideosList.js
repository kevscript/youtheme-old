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
