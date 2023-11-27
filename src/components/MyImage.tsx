import type { ImageProps } from 'antd'
import { Image } from 'antd'

const baseUrl = 'http://localhost:3001/'

export default function MyImage(props: ImageProps) {
  const { src, ...restProps } = props
  return (
    <Image src={baseUrl + src} preview={false} width="100%" height="100%" {...restProps}>MyImage</Image>
  )
}
