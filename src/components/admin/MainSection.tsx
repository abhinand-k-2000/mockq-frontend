import {ReactNode} from 'react'

interface Props {
  children: ReactNode
}

const MainSection = ({children}: Props) => {
  return (
    <main className="flex-1 p-4 overflow-y-auto">
      <div className="container mx-auto">
        {/* Main content area */}
        {children}
      </div>
    </main>
  )
}

export default MainSection