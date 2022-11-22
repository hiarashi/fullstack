const CourseHeader = ({name}) => {
    return(
    <>
      <h2>{name}</h2>
    </>
    )
  }
  
  const Part = ({name, exercises}) => {
    return (
    <>
    <p>
      {name} {exercises}
    </p>
    </>
    )
  }
  
  
  const Total = ({total}) => {
    return (
    <>
    <p>
      <b>Number of exercises {total}</b>
    </p>
    </>
    )
  }
  
  const Course = ({course}) => {
    const total = 
      course.parts.reduce((sum, part) => sum+part.exercises,0)
    return (
      <>
      <CourseHeader name={course.name} />
      {course.parts.map(part => 
      <Part key={part.id} name={part.name} exercises={part.exercises}/>
      )}
      <Total total={total} />
      </>
    )
  }

export default Course