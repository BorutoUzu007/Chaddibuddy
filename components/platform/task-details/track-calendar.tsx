'use client'
import { DayPicker } from "react-day-picker";

interface TrackCalendarProps {
    completedDates: string[] | null | undefined
}

export const TrackCalendar = ({completedDates}: TrackCalendarProps) => {
  console.log(completedDates)
  var completed_datetime :  Date[] = []
  completedDates?.map((date) => {
    completed_datetime.push(new Date(date))
  })
  console.log(completed_datetime)
  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-white font-bold text-white font-bold text-md sm:text-xl px-2 py-5">
        <h1>Task History:</h1>
      </div>
      <div className="w-full flex justify-center ">
        <div className="w-fit ">
          <DayPicker
            className="text-white calendar-padding"
            
            modifiers={{ booked: completed_datetime }}
            modifiersClassNames={{
              booked: "completed-dates-class"
            }}
          />
        </div>
      </div>
    </div>
  );
}