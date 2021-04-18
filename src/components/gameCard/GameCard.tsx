import React, { useState } from 'react'
import _ from 'lodash'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { IconButton, withStyles } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DoneIcon from '@material-ui/icons/Done'
import ClearIcon from '@material-ui/icons/Clear'
import CircularProgress from '@material-ui/core/CircularProgress'
import DayjsUtils from '@date-io/dayjs'
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'

import ScoreCard from './ScoreCard'
import GameInfo from './GameInfo'
import BlueCard from './BlueCard'
import gamesService from '../../services/gamesService'

const useStyles = makeStyles((theme) => ({
  title: {
    color: 'white',
  },
  actionButton: {
    position: 'absolute',
    bottom: 10,
    right: 8,
    zIndex: 9999,
  },
  cancelButton: {
    position: 'absolute',
    bottom: 10,
    right: 55,
  },
  spinner: {
    padding: 5,
  },
}))

const DatePicker = withStyles({
  root: {
    '& label': {
      color: 'white',
    },
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInputBase-input': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    marginTop: 5,
    marginBottom: 10,
  },
})(DateTimePicker)

interface Props {
  game: Game,
  setGame: (game: Game) => void,
  editOnly?: boolean,
  disableScoreEditing?: boolean,
  availableConditions: Condition[],
  availableWeatherConditions: Condition[],
}

// TODO: Display course name in big font, then layout name somewhere smaller?
// TODO: When isEditing == true, hide new game button
// TODO: Position of edit button when there is no GameInfo
// TODO: 'Save' and 'Cancel' texts to buttons
// TODO: Add a button: 'Continue adding scores', that links to Game inputting view.
// TODO: View pictures. Game JSON stores how many pictures, and then use Material UI 'Skeleton' while loading.
// TODO: Ability to add user-created tags

const GameCard: React.FC<Props> = (props) => {
  const classes = useStyles()
  const {
    game,
    setGame,
    editOnly,
    disableScoreEditing,
    availableConditions,
    availableWeatherConditions
  } = props

  const [isEditing, setIsEditing] = useState(editOnly ? true : false) // to get rid of undefined
  const [updating, setUpdating] = useState(false)
  const [originalGame, setOriginalGame] = useState<Game>()
  // TODO: Fix(?) hack variable to make React render the game again.
  // Affects: when editing a stroke, the color should change after a number inputted and onfocus happens.
  // Works in commit 6ec7087d99bfdf40bd4ae977f7f572c977e04f34
  const [update, updateChildren] = useState(false)

  // TODO(?): if game.creator == user || user.isAdmin
  const allowedToEdit = true

  const toggleEdit = () => {
    if (isEditing) {
      // TODO: Check that the spinner shows up
      // TODO(?): setGame(returnedGame) in then() of gamesService.updateGame
      gamesService.updateGame(game).then(() => setUpdating(false))
      setUpdating(true)
    } else {
      setOriginalGame(_.cloneDeep(game))
    }
    setIsEditing(!isEditing)
  }

  const handleCancelEdit = () => {
    if (window.confirm('Cancel editing?')) {
      if (originalGame) {
        refreshGame(originalGame) // TODO: BUG: Original game does is not rendered
      }
      setIsEditing(!isEditing)
    }
  }

  const refreshGame = (game: Game) => {
    setGame(game)
    updateChildren(!update)
  }

  const handleStartDateChange = (date: MaterialUiPickersDate, value?: string | null | undefined) => {
    const newDate = date?.toDate()
    if (newDate) {
      game.startDate = newDate
      refreshGame(game)
    }
  }

  const handleEndDateChange = (date: MaterialUiPickersDate, value?: string | null | undefined) => {
    const newDate = date?.toDate()
    if (newDate) {
      game.endDate = newDate
      refreshGame(game)
    }
  }

  const editButton = allowedToEdit && !editOnly ? (
    <IconButton
      data-cy="editGameButton"
      aria-label="edit"
      className={classes.actionButton}
      onClick={toggleEdit}
    >
      {isEditing ? (<DoneIcon />) : (<EditIcon />)}
    </IconButton>
  ) : null

  const cancelButton = isEditing ? (
    <IconButton aria-label="edit" className={classes.cancelButton} onClick={handleCancelEdit}>
      <ClearIcon />
    </IconButton>
  ) : null

  const progressSpinner = (
    <div className={classes.actionButton}>
      <CircularProgress className={classes.spinner} size={40} />
    </div>
  )

  const dateOptions = {
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }
  const endDateTime = game.endDate.toLocaleString('fi-FI', dateOptions)
  const endTime = game.endDate.toLocaleString('fi-FI', { hour: 'numeric', minute: 'numeric' })
  const startDateTime = game.startDate ? game.startDate.toLocaleString('fi-FI', dateOptions) : null
  const dateTime = startDateTime ? startDateTime + ' - ' + endTime : endDateTime
  const gameDate = (
    <Typography variant="subtitle1" className={classes.title}>{dateTime}</Typography>
  )

  // TODO: Validation for date, calendar value picker?
  const gameDateEditing = (
    <MuiPickersUtilsProvider utils={DayjsUtils}>
      <DatePicker
        margin="normal"
        id="gamedate-start-edit"
        label="Start date"
        format="HH:mm DD.MM.YYYY"
        value={game.startDate}
        onChange={handleStartDateChange}
      />
      <DatePicker
        margin="normal"
        id="gamedate-end-edit"
        label="End date"
        format="HH:mm DD.MM.YYYY"
        value={game.endDate}
        onChange={handleEndDateChange}
      />
    </MuiPickersUtilsProvider>
  )

  return (
    <BlueCard>
      <Typography variant="h6" className={classes.title}>{game.course.name}</Typography>
      {isEditing ? gameDateEditing : gameDate}
      {isEditing && !editOnly ? cancelButton : null}
      {updating ? progressSpinner : editButton}
      <ScoreCard game={game} setGame={refreshGame} isEditing={disableScoreEditing ? false : isEditing} />
      <GameInfo
        game={game}
        setGame={refreshGame}
        isEditing={isEditing}
        availableWeatherConditions={availableWeatherConditions}
        availableConditions={availableConditions}
      />
    </BlueCard>
  )
}

export default GameCard
