import { FC, ReactNode } from "react"
import { font } from "src/theme"

interface FontProviderProps {
  children: ReactNode
}

const FontProvider: FC<FontProviderProps> = ({ children }) => {
  return <div className={font.variable}>{children}</div>
}

export default FontProvider
