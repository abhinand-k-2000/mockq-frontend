import  { ReactNode } from 'react'
import InterviewerSidebar from './InterviewerSidebar'

interface Props {
    children: ReactNode
}

const InterviewerLayout = ({children}: Props) => {
  return (
    
    <div className='flex h-screen'>
        <InterviewerSidebar/>
        <div className='flex flex-col w-full'>
            <main className='flex-1 p-4 overflow-y-auto'>{children}</main>
        </div>
    </div>
  )
}

export default InterviewerLayout