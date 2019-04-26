import React from 'react'
import { makeStyles } from '@material-ui/styles'

import HoleInfoBar from './HoleInfoBar'
import PlayerScoreList from './PlayerScoreList'

const useStyles = makeStyles((theme) => ({
  root: {
  },
}))

function ScoreInputPage() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <HoleInfoBar />
      <PlayerScoreList />
    </div>
  )
}

export default ScoreInputPage
