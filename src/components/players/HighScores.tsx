import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import playersService from '../../services/playersService'
import CancellableModal from '../CancellableModal'

const useStyles = makeStyles((theme) => ({
  modalTable: {
    display: 'table',
  },
  closeButton: {
    margin: theme.spacing(2),
  },
}))

interface Props {
  playerId: string,
}

const HighScores: React.FC<Props> = (props) => {
  const classes = useStyles()

  const { playerId } = props
  const [redirect, setRedirect] = useState(false)
  const [redirectGameId, setRedirectGameId] = useState('')
  const [highScores, setHighScores] = useState<HighScore[]>()
  const [highScoresOpen, setHighScoresOpen] = useState(false)

  if (redirect) {
    return <Redirect push to={'/games/view/' + redirectGameId} />
  }

  const handleHighScoresOpen = () => {
    playersService.getHighScores(playerId).then(scores => setHighScores(scores))
    setHighScoresOpen(true)
  };

  const handleHighScoresClose = () => {
    setHighScoresOpen(false)
  }

  const handleGameClick = (e: any) => {
    setRedirectGameId(e.currentTarget.value)
    setRedirect(true)
  }

  const dateOptions = {
    year: 'numeric',
    month: '2-digit',
    day: 'numeric',
  }

  return (
    <div>
      <Button data-cy="highScoresButton" size="small" onClick={handleHighScoresOpen}>
        High scores
      </Button>
      <CancellableModal modalOpen={highScoresOpen} onClose={handleHighScoresClose}>
        <Table data-cy="highScoresTable" className={classes.modalTable} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Course</TableCell>
              <TableCell>To Par</TableCell>
              <TableCell>Game Card</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {highScores?.map((score: HighScore) => (
              <TableRow key={'scoreRow' + score.courseName}>
                <TableCell align="left">{score.courseName}</TableCell>
                <TableCell align="center">{score.toPar}</TableCell>
                <TableCell align="right">
                  <Button
                    data-cy="highScoreGameButton"
                    variant="outlined"
                    size="small"
                    onClick={handleGameClick}
                    value={score.gameId}
                  >
                    {score.gameDate.toLocaleString('fi-FI', dateOptions)}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button className={classes.closeButton} data-cy="closeModal" variant="outlined" onClick={handleHighScoresClose}>
          Close
        </Button>
      </CancellableModal>
    </div>
  )
}

export default HighScores
