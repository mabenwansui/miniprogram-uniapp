let systemInfo: UniNamespace.GetSystemInfoResult
export function getSystemInfo(focusRefresh: boolean = false) {
  if (!systemInfo || focusRefresh === true) {
    systemInfo = uni.getSystemInfoSync()
  }
  return systemInfo
}