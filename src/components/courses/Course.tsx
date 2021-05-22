import React, { useEffect, useRef, useState } from 'react'
import { CancelTokenSource } from 'axios'

import { makeStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Grid, IconButton, Table, TableCell, TableHead, TableRow, TableBody } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'

import coursesService from '../../services/coursesService'
import LayoutPaper from './LayoutPaper'
import EditCourse from './EditCourse'
import CancellableModal from '../CancellableModal'
import baseService from '../../services/baseService'

const useStyles = makeStyles((theme) => ({
  page: {
    maxWidth: 600,
    margin: theme.spacing(1),
  },
  image: {
    width: '100%',
  },
  imageContainer: {
    width: '100%',
    height: 180,
    borderRadius: 5,
    overflow: 'hidden',
  },
  mapPlaceholder: {
    backgroundColor: 'lightgrey',
    width: '100%',
    height: '100%',
  },
  title: {
    marginTop: theme.spacing(2),
  },
  editCourseButton: {
    marginLeft: theme.spacing(1),
  },
}))

interface Props {
  match: any,
}

// TODO: Current weather conditions?
// TODO: Use ghosting after opening Accordion and fetching data
// TODO: Upload cover picture
// TODO: Use accordion, because more than 2 layouts already makes scrolling tedious for high scores etc.

const Course: React.FC<Props> = (props) => {
  const classes = useStyles()

  const { match } = props
  const courseId = match.params.id

  const [course, setCourse] = useState<Course>()
  const [editCourseOpen, setEditCourseOpen] = useState(false)
  const [imgError, setImgError] = useState(false)

  const cancelTokenSourceRef = useRef<CancelTokenSource | null>(null)

  useEffect(() => {
    cancelTokenSourceRef.current = baseService.cancelTokenSource()
    coursesService.getCourse(courseId, cancelTokenSourceRef.current).then(c => setCourse(c))

    return () => cancelTokenSourceRef.current?.cancel()
  }, [courseId])

  const coverPictureURL = undefined // TODO: ability to upload a picture, course.coverPictureURL

  const handleEditCourse = () => setEditCourseOpen(true)

  const handleEditCourseFinished = (course: Course) => {
    cancelTokenSourceRef.current = baseService.cancelTokenSource()
    coursesService.updateCourse(course, cancelTokenSourceRef.current).then((c) => {
      setCourse(c)
      setEditCourseOpen(false)
    })
  }

  const handleLayoutUpdated = (layout: Layout) => {
    setImgError(false)
    if (course) {
      const layoutIndex = course.layouts.findIndex(l => l.id === layout.id)
      const layouts = [...course.layouts]
      layouts[layoutIndex] = layout
      course.layouts = layouts
      setCourse({...course, layouts: layouts})
    }
  }

  const editCourseButton = course?.allowedToEdit ? (
    <IconButton id="editCourseButton" className={classes.editCourseButton} onClick={handleEditCourse}>
      <EditIcon />
    </IconButton>
  ) : null

  const editCourseModal = course?.allowedToEdit ? (
    <CancellableModal modalOpen={editCourseOpen} onClose={() => setEditCourseOpen(false)}>
      <EditCourse
        course={course}
        handleFinish={handleEditCourseFinished}
        handleCancel={() => setEditCourseOpen(false)}
      />
    </CancellableModal>
  ) : null

  const imageContainer = course ? (
    <div className={classes.imageContainer}>
      {(coverPictureURL && !imgError) ? (
        <img
          id="courseImage"
          className={classes.image}
          src={coverPictureURL}
          alt="Course map"
          onError={() => setImgError(true)}
        />
      ) : (
        <Button
          className={classes.mapPlaceholder}
          size="small"
          onClick={handleEditCourse}
        >
          Upload a picture
        </Button>
      )}
    </div>
  ) : (
    <Skeleton className={classes.imageContainer} variant="rect" />
  )

  const courseTitleRow = course ? (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
    >
      <Typography id="courseNameCity" className={classes.title} variant="h4">
        {course?.name}, {course?.city} {editCourseButton}
      </Typography>
    </Grid>
  ) : (
    <Skeleton variant="text" width={200} height={40} />
  )

  const statsTable = (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>Me</TableCell>
          <TableCell>All</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Games played</TableCell>
          <TableCell>{course?.numberOfGames}</TableCell>
          <TableCell>x</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Latest game</TableCell>
          <TableCell>[x.x.x]</TableCell>
          <TableCell>[x.x.x]</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Average score</TableCell>
          <TableCell>x</TableCell>
          <TableCell>x</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )

  const activeLayouts = course?.layouts.filter(layout => layout.active)
  const inactiveLayouts = course?.layouts.filter(layout => !layout.active)

  return (
    <div id="coursePage" className={classes.page}>
      {imageContainer}
      
      {courseTitleRow}
      
      {editCourseModal}

      {statsTable}

      <br />

      <Typography component="p">
        On this course:
        <Button disabled size="small">My games</Button>
        <Button disabled size="small">All games</Button>
      </Typography>

      <br />

      <Typography variant="h5">Active layouts</Typography>

      <br />

      {course ? activeLayouts?.map(layout => (
        <LayoutPaper
          key={'layout-paper-' + layout.id}
          layout={layout}
          course={course}
          handleLayoutUpdated={handleLayoutUpdated}
        />
      )) : null}

      <Typography variant="h5">Inactive layouts</Typography>

      <br />

      {course ? inactiveLayouts?.map(layout => (
        <LayoutPaper
          key={'layout-paper-' + layout.id}
          layout={layout}
          course={course}
          handleLayoutUpdated={handleLayoutUpdated}
        />
      )) : null}

      <Typography variant="h5">High scores</Typography>
      <Typography>[All scores] [My scores]</Typography>

      <Typography variant="h5">Scores per hole</Typography>

      <Typography variant="h5">Development of high scores</Typography>
    </div>
  )
}

export default Course
