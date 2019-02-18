import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  videosList: {
    width: '100%',
  },
  videosItem: {
    cursor: 'pointer',
    border: '1px solid rgba(0,0,0,0.2)',
  },
})

function VideosList({classes, videosData}) {
  return (
    <ul className={classes.videosList}>
      {videosData.items && videosData.items.map((video) => (
        <a 
          href={`https://www.youtube.com/watch?v=${video.id.videoId}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          key={video.id.videoId} 
          className={classes.videosItem}
        >
          <img src={video.snippet.thumbnails.medium.url} alt=""/>
        </a>
      ))}
    </ul>
  )
}

export default withStyles(styles)(VideosList)