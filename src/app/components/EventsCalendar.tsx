'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Event } from "@/lib/types/event";

interface CalendarDay {
    day: number;
    isCurrentMonth: boolean;
    isWeekend: boolean;
    variant?: 'secondary' | 'green' | 'yellow' | 'gradient';
    hasEvent?: boolean;
    events?: Event[];
}

interface EventsCalendarProps {
    monthName: string;
    days: CalendarDay[];
    initialSelectedDay: number;
    initialSelectedEvent: Event | null;
}

export function EventsCalendar({ monthName, days, initialSelectedDay, initialSelectedEvent }: EventsCalendarProps) {
    const [selectedDay, setSelectedDay] = useState(initialSelectedDay);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(initialSelectedEvent);

    const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

    const handleDayClick = (day: number) => {
        if (day === selectedDay) return; // Already selected

        setSelectedDay(day);

        // Find events for this day
        const dayData = days.find(d => d.day === day && d.isCurrentMonth);
        if (dayData?.events && dayData.events.length > 0) {
            setSelectedEvent(dayData.events[0]); // Show first event
        } else {
            setSelectedEvent(null);
        }
    };

    const formatEventDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }) + 'г.';
    };

    return (
        <div className="flex flex-col lg:w-full lg:flex-row gap-12 mt-12 md:mt-16 items-stretch">
            <div className="flex flex-col flex-shrink-0">
                <div className="flex flex-col rounded-md bg-white p-6 self-center lg:self-start">
                    <h4 className="font-medium md:text-xl text-center lg:text-left">{monthName}</h4>
                    <div className="grid grid-cols-7 gap-2 mt-6">
                        {weekDays.map((day, index) => (
                            <div
                                key={day}
                                className={`px-2 py-1.5 text-muted-foreground ${index >= 5 ? 'text-red-500' : ''
                                    }`}
                            >
                                {day}
                            </div>
                        ))}
                        {days.map((calendarDay, index) => {
                            const isWeekend = index % 7 >= 5;
                            const textColor = isWeekend ? 'text-red-500' : '';
                            const isSelected = calendarDay.day === selectedDay && calendarDay.isCurrentMonth;

                            let buttonVariant: string = 'secondary';
                            let buttonClass = 'rounded-sm font-normal';

                            if (isSelected) {
                                buttonClass += ' ring-2 ring-blue-500 ring-offset-2';
                            }

                            if (calendarDay.variant === 'green') {
                                buttonVariant = 'green';
                                buttonClass += ' text-[#EC2A4D]';
                            } else if (calendarDay.variant === 'yellow') {
                                buttonVariant = 'yellow';
                                buttonClass += ' text-[#EC2A4D]';
                            } else if (calendarDay.variant === 'gradient') {
                                buttonClass += ' bg-gradient-to-r hover:bg-gradient-to-r from-[#32A535] to-[#FFC12E] hover:from-[#32A535]/90 hover:to-[#FFC12E]/90';
                            } else {
                                buttonClass += ` ${textColor}`;
                            }

                            return (
                                <Button
                                    key={index}
                                    size="icon"
                                    variant={calendarDay.variant === 'gradient' ? undefined : buttonVariant as any}
                                    className={buttonClass}
                                    disabled={!calendarDay.isCurrentMonth}
                                    title={calendarDay.hasEvent && calendarDay.events ? calendarDay.events[0].name : undefined}
                                    onClick={() => calendarDay.isCurrentMonth && handleDayClick(calendarDay.day)}
                                >
                                    {calendarDay.day}
                                </Button>
                            );
                        })}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-8 mt-4 md:mt-6">
                    <div className="flex items-center gap-3 justify-center lg:justify-start">
                        <div className="bg-[#32A535] size-6 lg:size-9 rounded-md border-[1px] border-white"></div>
                        <span className="text-white text-sm lg:text-base">- прошедшие</span>
                    </div>
                    <div className="flex items-center gap-3 justify-center lg:justify-start">
                        <div className="bg-[#FFC12E] size-6 lg:size-9 rounded-md border-[1px] border-white"></div>
                        <span className="text-white text-sm lg:text-base">- предстоящие</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col flex-grow justify-between gap-6">
                {selectedEvent ? (
                    <>
                        <div className="flex flex-col">
                            <div className="bg-white rounded-full py-2.5 text-center">
                                <p className="font-medium text-xl">{formatEventDate(selectedEvent.start_date)}</p>
                            </div>
                            <h3 className="font-medium text-balance text-2xl mt-6 text-white">{selectedEvent.name}</h3>
                            <p className="text-balance text-lg mt-4 text-white">
                                {selectedEvent.short_description}
                            </p>
                        </div>
                        <img
                            src={selectedEvent.cover_photo_url}
                            alt={selectedEvent.name}
                            className="w-full aspect-3/1 object-cover rounded-xl"
                        />
                    </>
                ) : (
                    <div className="flex flex-col justify-center items-center h-full text-white">
                        <p className="md:text-xl text-center">На {selectedDay} число мероприятий не запланировано</p>
                    </div>
                )}
            </div>
        </div>
    );
}
