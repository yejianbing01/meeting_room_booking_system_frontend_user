import { Button } from 'antd'
import { useEffect, useState } from 'react'

interface CaptchaButtonProps {
  onClick: () => Promise<void>
}
export default function CaptchaButton(props: CaptchaButtonProps) {
  const [waiting, setWaiting] = useState(false)
  const [second, setSecond] = useState(60)

  const onClick = async () => {
    try {
      await props.onClick()
      setWaiting(!waiting)
    }
    catch (error) {

    }
  }

  useEffect(() => {
    if (!waiting)
      return
    const timeId = setTimeout(() => {
      setSecond(second - 1)
    }, 1000)
    return () => clearInterval(timeId)
  }, [second, waiting])

  useEffect(() => {
    if (second === 1) {
      setWaiting(false)
      setSecond(60)
    }
  }, [second])

  return (
    !waiting
      ? <Button type="primary" onClick={onClick}>发送验证码</Button>
      : (
        <Button disabled>
          {second}
          {' '}
          秒后,重新获取
        </Button>
        )
  )
}
