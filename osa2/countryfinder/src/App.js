import {useEffect, useState} from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import CountryList from './components/CountryList'

function App() {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() =>{
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response=>setCountries(response.data))
  },([]))

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return(
    <div>
      {console.log(countries.filter(e => e.name.common.toLowerCase().includes(newFilter.toLowerCase())))}
      <Filter value={newFilter} handleChange={handleFilterChange} />
      <CountryList value={newFilter} countries={countries} setFilter={setNewFilter}/>
    </div>
  )
}

export default App;
