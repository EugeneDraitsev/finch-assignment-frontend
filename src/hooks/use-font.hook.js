import { useEffect, useState } from 'react'

import { loadFont } from '../utils'

export const useFont = () => {
  const [font, setFont] = useState(null)

  useEffect(() => {
    loadFont().then(setFont)
  }, [])

  return font
}
