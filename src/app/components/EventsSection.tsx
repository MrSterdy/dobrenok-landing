import { getProjectEvents } from "@/lib/api/projects/project/get-project-events";
import { Event } from "@/lib/types/event";
import { EventsCalendar } from "./EventsCalendar";

interface CalendarDay {
    day: number;
    isCurrentMonth: boolean;
    isWeekend: boolean;
    variant?: 'secondary' | 'green' | 'yellow' | 'gradient';
    hasEvent?: boolean;
    events?: Event[];
}

async function getAllEventsForMonth(month: number): Promise<Event[]> {
    try {
        const allEvents: Event[] = [];
        let currentPage = 1;
        let lastPage = 1;

        // Fetch first page to get pagination info
        const firstResponse = await getProjectEvents({
            month: month + 1, // API expects 1-12, JS Date uses 0-11
            page: 1,
            per_page: 50,
            sort_by: 'start_date',
            sort_direction: 'asc'
        });

        if (!firstResponse.success) {
            return [];
        }

        allEvents.push(...firstResponse.data);
        lastPage = firstResponse.meta?.pagination.last_page || 1;

        // If there are more pages, fetch them all in parallel
        if (lastPage > 1) {
            const pagePromises = [];

            // Create promises for all remaining pages
            for (let page = 2; page <= lastPage; page++) {
                pagePromises.push(
                    getProjectEvents({
                        month: month + 1, // API expects 1-12, JS Date uses 0-11
                        page,
                        per_page: 50,
                        sort_by: 'start_date',
                        sort_direction: 'asc'
                    })
                );
            }

            // Execute all requests in parallel
            const responses = await Promise.all(pagePromises);

            // Collect all successful responses
            responses.forEach(response => {
                if (response.success) {
                    allEvents.push(...response.data);
                }
            });
        }

        return allEvents;
    } catch (error) {
        console.error('Failed to fetch events:', error);
        return [];
    }
}

async function generateCalendarDays(): Promise<{ monthName: string; days: CalendarDay[] }> {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Get month name in Russian
    const monthNames = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];

    const monthName = monthNames[currentMonth];

    // Fetch events for current month
    const events = await getAllEventsForMonth(currentMonth);

    // Create a map of day -> events
    const eventsByDay = new Map<number, Event[]>();
    events.forEach(event => {
        const eventDate = new Date(event.start_date);
        if (eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear) {
            const day = eventDate.getDate();
            if (!eventsByDay.has(day)) {
                eventsByDay.set(day, []);
            }
            eventsByDay.get(day)!.push(event);
        }
    });

    // Get first day of the month and how many days in month
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();

    // Get day of week for first day (0 = Sunday, 1 = Monday, etc.)
    // Convert to Monday = 0, Sunday = 6
    let firstDayOfWeek = firstDay.getDay();
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    const days: CalendarDay[] = [];

    // Add days from previous month to fill the first week
    const prevMonth = new Date(currentYear, currentMonth, 0);
    const daysInPrevMonth = prevMonth.getDate();

    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        const dayOfWeek = (firstDayOfWeek - 1 - i + 7) % 7;
        days.push({
            day,
            isCurrentMonth: false,
            isWeekend: dayOfWeek === 5 || dayOfWeek === 6, // Saturday or Sunday
        });
    }

    // Add days of current month
    const today = now.getDate();
    for (let day = 1; day <= daysInMonth; day++) {
        const dayOfWeek = (firstDayOfWeek + day - 1) % 7;
        const isWeekend = dayOfWeek === 5 || dayOfWeek === 6; // Saturday or Sunday
        const dayEvents = eventsByDay.get(day) || [];

        let variant: CalendarDay['variant'] = 'secondary';
        let hasEvent = false;

        if (dayEvents.length > 0) {
            hasEvent = true;

            // Determine variant based on event date vs today
            if (day === today) {
                variant = 'gradient'; // Today's events
            } else if (day < today) {
                variant = 'green'; // Past events
            } else if (day > today) {
                variant = 'yellow'; // Future events
            }
        }

        days.push({
            day,
            isCurrentMonth: true,
            isWeekend,
            variant,
            hasEvent,
            events: dayEvents
        });
    }

    // Add days from next month to fill the last week (up to 42 days total for 6 weeks)
    const totalCells = 42;
    let nextMonthDay = 1;

    while (days.length < totalCells) {
        const dayOfWeek = days.length % 7;
        days.push({
            day: nextMonthDay,
            isCurrentMonth: false,
            isWeekend: dayOfWeek === 5 || dayOfWeek === 6, // Saturday or Sunday
        });
        nextMonthDay++;
    }

    return { monthName, days };
}

export async function EventsSection() {
    const { monthName, days } = await generateCalendarDays();

    // Get today's date and find today's event for SSR
    const today = new Date().getDate();
    const todayData = days.find(d => d.day === today && d.isCurrentMonth);
    const initialSelectedEvent = todayData?.events && todayData.events.length > 0 ? todayData.events[0] : null;

    return (
        <section className="mt-18 mx-auto max-w-screen-xl w-full px-6" id="events">
            <div className="pt-12 md:pt-18 pb-10 md:pb-14 flex flex-col items-center rounded-lg bg-gradient-to-t from-[#1EBCEE] to-[#2C85EB] px-4 md:px-9 lg:px-18">
                <h2 className="font-benzin text-center text-balance uppercase text-white text-xl md:text-3xl lg:text-4xl">Мероприятия фонда</h2>
                <EventsCalendar
                    monthName={monthName}
                    days={days}
                    initialSelectedDay={today}
                    initialSelectedEvent={initialSelectedEvent}
                />
            </div>
        </section>
    );
}
