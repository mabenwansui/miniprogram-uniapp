export async function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

export function px2rem(px: number) {
  return px * 2 || 0
}