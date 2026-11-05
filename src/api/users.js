import axios from 'axios'

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000
})

export async function getUsers() {
  const response = await api.get('/users', {
    params: {
      limit: 8,
      select: 'firstName,lastName,username,email,image'
    }
  })
  return response.data.users
}

export async function getFeaturedUser() {
  const response = await api.get('/users/9')
  return response.data
}
