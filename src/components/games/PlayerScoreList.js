import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
  },
}))

function PlayerScoreList() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
    </div>
  )
}

export default PlayerScoreList
