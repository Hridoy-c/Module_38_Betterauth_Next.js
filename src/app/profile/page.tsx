import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
      <h1>Profile</h1>

        <h4>Updata Profile</h4>
      <Link className='text-blue-500' href="/profile/updata">Updata Profile here</Link>
        <h4>Change Password</h4> 
      <Link className='text-blue-500' href="/profile/change-password">Change Password here</Link>
       

      
    </div>
  )
}

export default page
