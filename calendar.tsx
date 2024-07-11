import * as React from 'react'
import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { format, setYear, getYear } from 'date-fns'
import { th } from 'date-fns/locale'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  const initialMonth = props.defaultMonth || new Date()
  const [selectedYear, setSelectedYear] = useState<number>(initialMonth.getFullYear())
  const [selectedMonth, setSelectedMonth] = useState<number>(initialMonth.getMonth())

  const handleYearChange = (value: string) => {
    setSelectedYear(Number(value))
  }

  const handleMonthChange = (value: string) => {
    setSelectedMonth(Number(value))
  }

  const formatCaption = (date: Date): string => {
    const buddhistYear = getYear(date) + 543
    return format(setYear(date, buddhistYear), 'LLLL yyyy', { locale: th })
  }

  const limitBefore = 70
  const years = Array.from(
    new Array(limitBefore + 1), // จำนวนปีที่ต้องการ (80 ปี + ปีปัจจุบัน)
    (val, index) => new Date().getFullYear() - limitBefore + index
  ) // สร้างตัวเลือกปีในช่วง 80 ปีก่อนถึงปีปัจจุบัน

  return (
    <div className='bg-white p-2 shadow-md'>
      <div className='flex items-center justify-between space-x-4'>
        <Select value={selectedMonth.toString()} onValueChange={handleMonthChange}>
          <SelectTrigger className='w-full rounded border-none px-2 py-1 focus:outline-none'>
            <SelectValue placeholder='Select Month' />
          </SelectTrigger>
          <SelectContent>
            {months.map((month, index) => (
              <SelectItem key={index} value={index.toString()}>
                {format(new Date(0, index), 'LLLL', { locale: th })}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedYear.toString()} onValueChange={handleYearChange}>
          <SelectTrigger className='w-full rounded border-none px-2 py-1 focus:outline-none'>
            <SelectValue placeholder='Select Year' />
          </SelectTrigger>
          <SelectContent>
            {years.map(year => (
              <SelectItem key={year} value={year.toString()}>
                {year + 543} {/* แสดงปีเป็น พ.ศ. */}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <DayPicker
        locale={th}
        showOutsideDays={showOutsideDays}
        className={cn(className)}
        classNames={{
          months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
          month: 'space-y-4',
          caption: 'hidden',
          caption_label: 'hidden',
          nav: 'hidden',
          table: 'w-full border-collapse space-y-1',
          head_row: 'flex',
          head_cell: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
          row: 'flex w-full mt-2',
          cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
          day: cn(buttonVariants({ variant: 'ghost' }), 'h-9 w-9 p-0 font-normal aria-selected:opacity-100'),
          day_range_end: 'day-range-end',
          day_selected: 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
          day_today: 'bg-accent text-accent-foreground',
          day_outside: 'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
          day_disabled: 'text-muted-foreground opacity-50',
          day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
          day_hidden: 'invisible',
          ...classNames
        }}
        formatters={{
          formatCaption
        }}
        month={new Date(selectedYear, selectedMonth)}
        {...props}
      />
    </div>
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
