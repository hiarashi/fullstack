const Filter = ({value, handleChange}) => (
    <div>
      Find countries: <input value={value} onChange={handleChange}/>
    </div>
  )

export default Filter