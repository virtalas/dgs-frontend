import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import ListSubheader from '@material-ui/core/ListSubheader'

import coursesService from '../../services/coursesService'
import SortButton from './SortButton'
import { sortCourses } from '../../types/api/ModelMappers'
import baseService from '../../services/baseService'
import { getUserLocation } from '../../utils/Utils'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: 5,
    minWidth: 120,
  },
}))

interface Props {
  onCourseChange?: (course: Course) => void,
  layout?: Layout,
  setLayout?: (layout: Layout | undefined) => void,
  setGameCreatable?: (creatable: boolean) => void,
}

// TODO: Spread controls out if there is space. They are too packed together on desktop.
// TODO: Search function for courses.

const CourseSelect: React.FC<Props> = (props) => {
  const classes = useStyles()

  const { onCourseChange, layout, setLayout, setGameCreatable } = props

  const [course, setCourse] = useState<BasicCourse>()
  const [courses, setCourses] = useState<Course[]>([])
  const [sortByPopularity, setSortByPopularity] = useState(true)

  const showLayoutSelect = setLayout !== undefined

  const changeCourseTo = (selectedCourse: BasicCourse) => {
    setCourse(selectedCourse)
    if (onCourseChange) {
      onCourseChange(selectedCourse)
    }
  }

  const getActiveLayout = (forCourse?: BasicCourse): Layout | undefined => {
    if (!forCourse) {
      return undefined
    }
    const layout = forCourse.layouts.find(layout => layout.active)
    return layout
  }

  const selectActiveLayout = (forCourse: BasicCourse) => {
    const activeLayout = getActiveLayout(forCourse)
    if (setLayout) {
      setLayout(activeLayout)
    }
  }

  const handleCourseChange = (event: React.ChangeEvent<{ value: unknown }>, value: any) => {
    const selectedCourseId = value.props.value as string
    const selectedCourse = courses.find(course => course.id === selectedCourseId) as BasicCourse
    changeCourseTo(selectedCourse)
    selectActiveLayout(selectedCourse)
  }

  const handleLayoutChange = (event: React.ChangeEvent<{ value: unknown }>, value: any) => {
    const selectedLayoutId = value.props.value as string

    if (!selectedLayoutId) {
      return
    }

    const selectedLayout = course?.layouts.find(layout => layout.id === selectedLayoutId) as Layout
    if (setLayout) {
      setLayout(selectedLayout)
    }
  }

  const attemptToGetUserLocation = (completion?: (lat: number | undefined, lon: number | undefined) => void) => {
    if (!navigator.geolocation) {
      console.log('Failed to access location: navigator.geolocation not supported')
      return
    }
    getUserLocation(completion)
  }

  const attemptToSelectClosestCourse = async (sortedCourses: Course[]) => {
    attemptToGetUserLocation((userLat: number | undefined, userLon: number | undefined) => {
      if (userLat === undefined || userLon === undefined || sortedCourses.length === 0) {
        // No location information available: Choose the most visited course.
        changeCourseTo(sortedCourses[0] as BasicCourse)
        selectActiveLayout(sortedCourses[0] as BasicCourse)  
        return
      }
  
      const distance = (to: Course) => {
        if (!to.lat || !to.lon) return Number.MAX_SAFE_INTEGER
        return Math.sqrt(Math.pow(userLat - to.lat, 2) + Math.pow(userLon - to.lon, 2))
      }
    
      const closestCourse = sortedCourses.reduce((a, b) => distance(a) < distance(b) ? a : b)
      changeCourseTo(closestCourse as BasicCourse)
      selectActiveLayout(closestCourse as BasicCourse)
    })
  }

  useEffect(() => {
    const cancelTokenSource = baseService.cancelTokenSource()
    coursesService.getBasicCourses(cancelTokenSource).then(async (fetchedCourses) => {
      if (fetchedCourses.length === 0) {
        return
      }
      const sortedFetchedCourses = sortCourses(fetchedCourses, sortByPopularity)
      setCourses(sortedFetchedCourses)
      if (setGameCreatable) {
        setGameCreatable(true) // Even if the fetching of players fails, one player (user) and a course is enough.
      }
      attemptToSelectClosestCourse(sortedFetchedCourses)
    })

    // Ping the user to give their location first, then it can be accessed without a prompt once courses arrive.
    attemptToGetUserLocation()

    return () => cancelTokenSource.cancel()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Used for outlined Select's input label.
  const inputLabel = React.useRef<HTMLLabelElement>(null)
  const [labelWidth, setLabelWidth] = React.useState(0)
  useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth)
  }, [])

  const courseSelect = (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel ref={inputLabel} htmlFor="course-select">Course</InputLabel>
      <Select
        value={course?.id ?? ''}
        onChange={handleCourseChange}
        disabled={courses ? courses.length <= 1 : true}
        input={<OutlinedInput labelWidth={labelWidth} name="course" id="course-select" />}
      >
        {courses.map((course, index) => (
          <MenuItem value={course.id} key={index}>{course.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )

  const activeLayouts = course?.layouts.filter(layout => layout.active)
  const inactiveLayouts = course?.layouts.filter(layout => !layout.active)

  const layoutSelect = (
    <FormControl variant="outlined" className={classes.formControl} error={course !== undefined && layout === undefined}>
      <InputLabel ref={inputLabel} htmlFor="layout-select">Layout</InputLabel>
      <Select
        value={layout ? layout.id : ''}
        onChange={handleLayoutChange}
        disabled={course ? course.layouts.length <= 1 : true}
        input={<OutlinedInput labelWidth={labelWidth} name="layout" id="layout-select" />}
      >
        {activeLayouts && activeLayouts.length > 0 ? (
          <ListSubheader>Active</ListSubheader>
        ) : null}

        {activeLayouts?.map((layout, index) => (
          <MenuItem value={layout.id} key={index}>{layout.name}</MenuItem>
        ))}
        
        {inactiveLayouts && inactiveLayouts.length > 0 ? (
          <ListSubheader>Inactive</ListSubheader>
        ) : null}

        {inactiveLayouts?.map((layout, index) => (
          <MenuItem value={layout.id} key={index}>{layout.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )

  return (
    <div>
      {courseSelect}
      <SortButton
        courses={courses}
        setCourses={setCourses}
        sortByPopularity={sortByPopularity}
        setSortByPopularity={setSortByPopularity}
      />
      <br />
      {showLayoutSelect ? layoutSelect : null}
    </div>
  )
}

export default CourseSelect
