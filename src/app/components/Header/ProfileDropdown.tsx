import Link from 'next/link'
import React from 'react'

const ProfileDropdown = ({onClose}:{onClose:any}) => {
  return (
    <div>
        <div onClick={onClose} className='hover:bg-slate-100 px-10 py-2 text-md '>
        <Link  href={'/dashboard'}>DashBoard</Link>
        </div>
        <div className='hover:bg-slate-100 hover:rounded-b-md px-10 py-2 text-md'>
        <Link href={'/dashboard'}>Profile</Link>
        </div>
    </div>
  )
}

export default ProfileDropdown