interface ToastOptions {
  title: string
  icon?: 'success' | 'error' | 'loading' | 'none'
}

export default function showToast(props: ToastOptions) {
  const { title, icon } = props
  return uni.showToast({
    title,
    icon
  })
}
