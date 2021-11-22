import axios from 'axios'
const baseUrl = '/api/users'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (user) => {
  const request = axios.post(baseUrl, user)
  return request.then(response => response.data)
}

const update = (user) => {
  const request = axios.put(`${baseUrl}/${user.id}`, user)
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default { getAll, create, update, remove }