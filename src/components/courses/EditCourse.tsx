import React, { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { allowedToEditExplanation } from '../../constants/Strings'

const inputMaxWidth = 400
const inputWidth = '90%'

const useStyles = makeStyles((theme) => ({
  page: {
    margin: theme.spacing(2),
  },
  formControl: {
    maxWidth: inputMaxWidth,
    width: inputWidth,
    marginTop: theme.spacing(1),
  },
  createButton: {
    margin: theme.spacing(3),
    marginBottom: 0,
  },
  deleteButton: {
    margin: theme.spacing(2),
    marginBottom: 0,
  },
  explanation: {
    marginTop: theme.spacing(2),
    width: '70%',
    textAlign: 'left',
  },
}))

interface Props {
  course?: Course, // Course to edit, undefined if it's new.
  handleFinish: (course: Course) => void,
  handleCancel?: () => void,
  handleDelete?: () => void,
}

// TODO: Feature for uploading a picture of the course. (use same preview as NewLayout.tsx)

const EditCourse: React.FC<Props> = (props) => {
  const classes = useStyles()

  const { course, handleFinish, handleCancel, handleDelete } = props

  const [name, setName] = useState('')
  const [city, setCity] = useState('')

  const newCourse = course ? false : true

  useEffect(() => {
    if (!newCourse) {
      setName(course ? course.name : '')
      setCity(course ? course.city : '')
    }
  }, [course, newCourse])

  const handleFinishClicked = () => {
    const inputtedCourse = {
      id: course?.id ?? '',
      name: name,
      city: city,
      layouts: course ? course.layouts : [],
      allowedToEdit: course?.allowedToEdit,
      numberOfGames: course?.numberOfGames ?? 0,
    }
    handleFinish(inputtedCourse)
  }

  const deleteButton = !newCourse ? (
    <Button
      className={classes.deleteButton}
      color="secondary"
      onClick={() => handleDelete ? handleDelete() : null}
    >
      Delete
    </Button>
  ) : null

  return (
    <div className={classes.page}>
      <Typography variant="h5">
        {newCourse ? 'New' : 'Edit'} Course
      </Typography>

      <TextField
        className={classes.formControl}
        label="Name"
        data-cy="courseNameInput"
        value={name}
        required
        onChange={e => setName(e.target.value)}
      />

      <TextField
        className={classes.formControl}
        label="City"
        data-cy="courseCityInput"
        value={city}
        required
        onChange={e => setCity(e.target.value)}
      />

      {newCourse ? null : (
        <Button
          className={classes.createButton}
          variant="contained"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      )}

      <Button
        className={classes.createButton}
        variant="contained"
        id="submitCourseButton"
        color="primary"
        onClick={handleFinishClicked}
        disabled={name.length === 0 || city.length === 0}
      >
        {newCourse ? 'Create' : 'Update'}
      </Button>

      <Typography className={classes.explanation} component="p" variant="caption">
        {allowedToEditExplanation + 'course.'}
      </Typography>

      {deleteButton}
    </div>
  )
}

export default EditCourse
