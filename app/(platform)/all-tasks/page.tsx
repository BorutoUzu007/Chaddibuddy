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
    <div className='w-full px-4 py-9'>
      <div className="pl-16 flex justify-around">
        <p className='text-white text-2xl font-bold'>
          Todo List
        </p>
        <div className='w-fit'>
          <SearchAllTasks />
        </div>
        
        <div className='flex space-x-5'>
          <div className='flex cursor-pointer rounded space-x-5 justify-end items-center'>
            <FaBell className='' size={24} color='white'/>
          </div>
          <div>
          <ProfileSection />
          </div>
        </div>
      </div>
      <div className=' flex h-full'>
        <CurrentTodos searchParams={searchParams} />
        
      </div>
    </div>
  )
}

export default AllTasks