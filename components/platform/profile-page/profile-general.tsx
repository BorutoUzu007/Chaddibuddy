import { Button } from '@/components/ui/button'
import React from 'react'
import { FaAngleRight } from 'react-icons/fa'
import ProfileDisplayName from './profile-display-name'

interface ProfileGeneral {
    username: string,
    bio: string,
    userId: string
}

export default function ProfileGeneral({username, bio, userId}: ProfileGeneral) {

    
  return (
    <div className="flex flex-col">
        <ProfileDisplayName username={username} userId={userId}  />
    </div>
  )
}
