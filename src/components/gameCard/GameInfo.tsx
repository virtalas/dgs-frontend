import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'

import { highScoreBlue, illegalRed } from '../../constants/Colors'
import { InputAdornment, TextField } from '@material-ui/core'

const chipHeight = 22

const useStyles = makeStyles((theme) => ({
  infoPaper: {
    marginBottom: 10,
    padding: 6,
    textAlign: 'left',
  },
  chip: {
    height: chipHeight,
    marginRight: 5,
  },
  chipRow: {
    lineHeight: '28px', // Affects spacing between chips when wrapped to two rows.
  },
  highScoreChip: {
    height: chipHeight,
    width: 90,
    fontSize: '97%',
    cursor: 'pointer',
    backgroundColor: highScoreBlue,
    color: 'white',
    position: 'relative',
    left: -5,
  },
  illegalChip: {
    height: chipHeight,
    width: 100,
    fontSize: '97%',
    cursor: 'pointer',
    backgroundColor: illegalRed,
    color: 'white',
    position: 'relative',
    left: -5,
  },
  comment: {
    marginTop: 5,
  },
  temperatureEdit: {
    width: 130,
    marginBottom: 10,
  },
  commentEdit: {
    width: '100%',
    marginTop: 10,
    marginBottom: 40, // Make room for 'Save' and 'Cancel' buttons.
  },
}))

interface Props {
  game: Game,
  setGame: (game: Game) => void,
  isEditing: boolean,
  availableWeatherConditions: Condition[],
  availableConditions: Condition[],
}

const GameInfo: React.FC<Props> = (props) => {
  const classes = useStyles()
  const { game, setGame, isEditing, availableWeatherConditions, availableConditions } = props

  const [temperature, setTemperature] = useState<string>(String(game.temperature))

  const handlePlayerClipClick = () => {
    // TODO
    alert('Coming soon: Go to clicked player\'s page!')
  }

  const handleConditionChipClick = () => {
    // TODO
    alert('Coming soon: Search games by clicked condition!')
  }

  const handleTemperatureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value
    if (input === '-') {
      setTemperature(input)
    } else if (!isNaN(Number(input)) || input === '') {
      setTemperature(input)
      game.temperature = input === '' ? null : Number(input)
      setGame(game)
    }
  }

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    game.comment = event.target.value
    setGame(game)
  }

  const handleConditionToggle = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const condition = event.currentTarget.querySelector('.MuiChip-label')?.textContent as Condition
    if (!game.conditions.includes(condition)) {
      game.conditions = game.conditions.concat(condition)
    } else {
      game.conditions = game.conditions.filter(c => c !== condition)
    }
    setGame(game)
  }

  const handleWeatherConditionToggle = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const condition = event.currentTarget.querySelector('.MuiChip-label')?.textContent as Condition
    if (!game.weatherConditions.includes(condition)) {
      game.weatherConditions = game.weatherConditions.concat(condition)
    } else {
      game.weatherConditions = game.weatherConditions.filter(c => c !== condition)
    }
    setGame(game)
  }

  const selected = (condition: Condition): boolean => {
    return game.weatherConditions.includes(condition) || game.conditions.includes(condition)
  }

  game.conditions.sort()
  game.weatherConditions.sort()

  const conditions = (
    <div className={classes.chipRow}>
      {game.temperature ? <Chip className={classes.chip} label={game.temperature + " °C"} onClick={handleConditionChipClick} /> : null}
      {game.weatherConditions.map((condition: Condition, index: number) => (
        <Chip className={classes.chip} label={condition} onClick={handleConditionChipClick} key={index} />
      ))}
      {game.conditions.map((condition: Condition, index: number) => (
        <Chip className={classes.chip} label={condition} onClick={handleConditionChipClick} key={index} />
      ))}
    </div>
  )

  const temperatureEdit = isEditing ? (
    <TextField
      className={classes.temperatureEdit}
      label="Temperature"
      size="small"
      value={temperature}
      onChange={handleTemperatureChange}
      id="temperature-edit"
      InputProps={{
        endAdornment: <InputAdornment position="end">°C</InputAdornment>,
      }}
    />
  ) : null

  const commentEdit = isEditing ? (
    <TextField
      className={classes.commentEdit}
      value={game.comment}
      multiline={true}
      rowsMax={100}
      placeholder="Comment"
      onChange={handleCommentChange}
    />
  ) : null
  
  const editableConditions = isEditing ? (
    <div className={classes.chipRow}>
      {availableWeatherConditions.map((condition: Condition, index: number) => (
        <Chip
          className={classes.chip}
          label={condition}
          variant={selected(condition) ? 'default' : 'outlined'}
          onClick={handleWeatherConditionToggle}
          key={index}
        />
      ))}
      {availableConditions.map((condition: Condition, index: number) => (
        <Chip
          className={classes.chip}
          label={condition}
          variant={selected(condition) ? 'default' : 'outlined'}
          onClick={handleConditionToggle}
          key={index}
        />
      ))}
    </div>
  ) : null

  const illegalAndHighScorers = (
    <div className={classes.chipRow}>
      {game.highScorers.map((name: string, index: number) => (
        <Chip
          classes={{ icon: classes.highScoreChip } as any}
          icon={<Chip label="High score" />}
          label={name}
          variant="outlined"
          color="primary"
          onClick={handlePlayerClipClick}
          className={classes.chip}
          key={index} />
      ))}
      {game.illegalScorers.map((name: string, index: number) => (
        <Chip
          classes={{ icon: classes.illegalChip } as any}
          icon={<Chip label="Illegal game" />}
          label={name}
          variant="outlined"
          color="secondary"
          onClick={handlePlayerClipClick}
          className={classes.chip}
          key={index} />
      ))}
    </div>
  )

  const shouldShowInfoPaper = game.temperature || game.weatherConditions.length || game.conditions.length ||
                              game.highScorers.length || game.illegalScorers.length || game.comment || game.contestName

  const normalView = shouldShowInfoPaper ? (
    <Paper className = {classes.infoPaper} elevation = { 0} >
      {conditions}
      {illegalAndHighScorers}
      <Typography className={classes.comment} align="left" variant="body1"> {game.comment}</Typography>
    </Paper>
  ) : null

  const editingView = (
    <Paper className={classes.infoPaper} elevation={0}>
      {temperatureEdit}
      {editableConditions}
      {commentEdit}
    </Paper>
  )

  return isEditing ? editingView : normalView
}

export default GameInfo
