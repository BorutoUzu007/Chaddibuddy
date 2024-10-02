import { Input } from '@/components/ui/input'
import { FaBell } from "react-icons/fa";

import React from 'react'
import { CurrentTodos } from '@/components/platform/current-todos';
import { FilterTasks } from '@/components/platform/filter-tasks';

export interface AllTasksProps {
  searchParams?: {date: string}
}

function AllTasks({searchParams}: AllTasksProps) {
  return (
    <div className='my-10 w-full  px-4'>
      <div className="pl-16 flex justify-around">
        <p className='text-white text-2xl font-bold'>
        Todo List
        </p>
        <div className='w-[250px] '>
          <Input className='rounded-xl bg-white' placeholder='Search 🔎'/>
        </div>
        <div className='cursor-pointer rounded'>
          <FaBell className='' size={24} color='white'/>
        </div>
      </div>
      <div className=' flex h-full pb-16'>
        <CurrentTodos searchParams={searchParams} />
        
      </div>
    </div>
  )
}

export default AllTasks