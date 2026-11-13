import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:3000' })

export const getGladiators = () => api.get('/gladiators').then((response) => response.data)
export const getGladiator = (id) => api.get(`/gladiators/${id}`).then((response) => response.data)
export const createGladiator = (data) => api.post('/gladiators', data).then((response) => response.data)
export const updateGladiator = (id, data) => api.patch(`/gladiators/${id}`, data).then((response) => response.data)
export const deleteGladiator = (id) => api.delete(`/gladiators/${id}`).then((response) => response.data)
