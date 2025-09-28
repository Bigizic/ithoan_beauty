import axios, { AxiosRequestConfig } from 'axios'
import endpoints from './links.json'

const BASE_URL = 'http://localhost:3000/api'

type RequestOptions = {
  type: string
  id?: string
  params?: Record<string, any>
  data?: any
  config?: AxiosRequestConfig
}

class API_URL {
  private static buildUrl(type: string, id?: string) {
    const endpoint = (endpoints as Record<string, string>)[type]
    if (!endpoint) throw new Error(`endpoint for type "${type}" not found`)
    return id ? `${BASE_URL}${endpoint}/${id}` : `${BASE_URL}${endpoint}`
  }

  static async get({ type, id, params, config }: RequestOptions) {
    const url = this.buildUrl(type, id)
    const response = await axios.get(url, { params, ...config })
    return response.data
  }

  static async post({ type, id, data, config }: RequestOptions) {
    const url = this.buildUrl(type, id)
    const response = await axios.post(url, data, config)
    return response.data
  }

  static async put({ type, id, data, config }: RequestOptions) {
    const url = this.buildUrl(type, id)
    const response = await axios.put(url, data, config)
    return response.data
  }

  static async delete({ type, id, config }: RequestOptions) {
    const url = this.buildUrl(type, id)
    const response = await axios.delete(url, config)
    return response.data
  }
}

export default API_URL
