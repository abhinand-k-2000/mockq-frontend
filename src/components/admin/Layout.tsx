import {ReactNode} from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'   


interface Props {
    children: ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />
        <main className="flex-1 p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}

export default Layout