function getProvider(): Promise<UniApp.GetProviderRes> {
  return new Promise((resolve) => {
    uni.getProvider({
      service: 'oauth',
      success(res) {
        resolve(res)
      }
    })
  })
}

function loginWeixin(): Promise<UniApp.LoginRes> {
  return new Promise((resolve) => {
    uni.login({
      provider: 'weixin',
      success(res) {
        resolve(res)
      }
    })
  })
}

export default async function login() {
  const { provider } = await getProvider()
  if ((provider as string[]).includes('weixin')) {
    const { code } = await loginWeixin()
    return code
  } else {
    const message = '登录失败, 不支持此客户端'
    uni.showModal({
      title: message,
    })
    throw new Error(message)
  }
}
