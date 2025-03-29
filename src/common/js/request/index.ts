import login from '../login'
import { ERROR_CODE } from '@/common/constants/error-code'

const prefix = 'https://localhost:4000'

type Data = object | FormData

interface RequestProps {
  url: string
  method: 'GET' | 'POST'
  data?: object | FormData
}
interface ResponseProps<T> {
  flag: 1 | 0
  data: T
  code?: string
  msg?: string
}
interface TokenStore {
  token: string
}
interface Options {
  useToken?: boolean
  _loop?: boolean
}
const tokenkey = 'token'

async function requestToken() {
  const code = await login()
  return await post<{ token: string }>('/api/auth/weixin/login', { code }, { useToken: false })
}

function getToken(): Promise<TokenStore> {
  return new Promise((resolve) => {
    uni.getStorage({
      key: tokenkey,
      success: async (res) => {
        resolve(res.data)
      },
      fail: async () => {
        const data = await setToken()
        resolve(data)
      }
    })
  })
}

async function setToken() {
  const { flag, data } = await requestToken()
  if (flag === 1) {
    const { token } = data
    uni.setStorage({
      key: tokenkey,
      data: { token }
    })
    return { token }
  } else {
    const message = 'token获取失败, 请刷新重试'
    uni.showModal({
      title: message
    })
    throw new Error(message)
  }
}

function request<T>(props: RequestProps, options?: Options): Promise<ResponseProps<T>> {
  const { url, method, data } = props
  const { useToken = true, _loop } = options || {}
  return new Promise(async (resolve) => {
    let header: any = {}
    if (useToken === true) {
      const { token } = await getToken()
      header['Authorization'] = `Bearer ${token}`
    }
    uni.request({
      url: `${prefix}${url}`,
      method,
      data: data,
      header,
      success: async (res) => {
        const { flag, data, code, msg } = res.data as ResponseProps<T>
        if (flag === 0) {
          if (code === ERROR_CODE.AUTH_CHECK_ERROR) {
            if (_loop === true) {
              uni.showModal({
                title: '请求失败, 请刷新重试'
              })
              return
            }            
            await setToken()
            uni.showModal({
              title: msg
            })
            const { flag, data } = await request<T>(props, { ...options, _loop: true })
            resolve({ flag, data })
          }
        } else {
          resolve({ flag, data })
        }
      }
    })
  })
}
export function post<T>(url: string, data: Data, options?: Options): Promise<ResponseProps<T>> {
  return request<T>({ url, data, method: 'POST' }, options)
}
