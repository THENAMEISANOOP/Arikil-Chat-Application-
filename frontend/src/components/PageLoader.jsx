import React from 'react'
import { LoaderIcon } from 'lucide-react'

const PageLoader = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
        <LoaderIcon className='animate-spin h-10 w-10 text-pink-500' />


    </div>
  )
}

export default PageLoader
