import { Input } from '@/components/ui/input'
import { FaBell } from "react-icons/fa";

import React from 'react'
import { CurrentTodos } from '@/components/platform/current-todos';
import { SearchAllTasks } from '@/components/platform/search-all-tasks';
import { ProfileSection } from '@/components/platform/profile-section';

export interface AllTasksProps {
  searchParams?: {date: string}
}

function AllTasks({searchParams}: AllTasksProps) {
  return (
    <div className='h-full w-full px-4'>
      <div className=' flex h-full'>
        <CurrentTodos searchParams={searchParams} />
        
      </div>
    </div>
  )
}

export default AllTasks