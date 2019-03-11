import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'

const styles = () => ({
  videosList: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  card: {
    width: 300,
    margin: '10px'
  },
  media: {
    height: 140
  }
})


function VideosList({classes, videosData}) {
  return (
    <div className={classes.videosList}>
      {videosData && videosData.map((video) => (
          <Card className={classes.card}>
            <a 
              href={`https://www.youtube.com/watch?v=${video.id.videoId ? video.id.videoId : video.id.playlistId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <CardActionArea>
                <CardMedia 
                  image="https://cdn.pixabay.com/photo/2015/03/10/17/23/youtube-667451__340.png"
                  className={classes.media}
                />
                <CardContent>
                  {video.snippet.title}
                </CardContent>
              </CardActionArea>
            </a>
          </Card>
      ))}

    </div>
  )
}


export default withStyles(styles)(VideosList)