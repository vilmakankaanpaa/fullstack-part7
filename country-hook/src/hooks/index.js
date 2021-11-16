import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  console.log('searching for', name)
  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      .then(response => {
        setCountry(response.data[0])
      })
  }, [name],)

  const found = country ? true : false

  return {
    found,
    data: {
      name: country.name.common,
      capital: country.capital,
      population: country.population,
      flag: country.flag
    }
  }
}