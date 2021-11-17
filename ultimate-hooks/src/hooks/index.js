import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset,
    params: {type, value, onChange}
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const getAll = async () => {
    const response = await axios.get(baseUrl)
    console.log(response)
    setResources(response.data)
  }

  useEffect(() => {
    getAll()
  },[])
  
  const create = async (resource) => {
    await axios.post(baseUrl, resource)
    getAll()
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}
