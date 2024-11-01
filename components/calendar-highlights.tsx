"use client";

import * as React from "react";
import { addDays, isSameDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

type HighlightedDate = {
    date: Date;
    color: string;
    title: string;
    description: string;
}

const highlightedDates: HighlightedDate[] = [
    {
        date: new Date("2:19 PM Oct 29, 2024"), color: "rgba(241, 196, 15, 1)",
        title: "Launch",
        description: `This entire project will be run off a Samsung 636L AI Family Hub Fridge at my local mall EswvJvhPy8A8rWPdLJ5ATYW6cY5x483oS4QWWroZpump`
    },
    {
        date: new Date("7:17 AM Oct 30, 2024"), color: "rgba(231, 76, 60, 1)",
        title: "Circumcision",
        description: `Can I get a nurse or something in here?

        Where tf is my foreskin at?

        If the doctor hasn’t respected my request to keep it I’m taking the knife to his

        I will not leave foreskinless`
    },
    {
        date: new Date("12:52 AM Oct 31, 2024"), color: "rgba(46, 204, 113, 1)",
        title: "Fridge secured",
        description: `The fridge boys are absolutely cooking, MOVE IN DAY 1

        So horny about the plans it hurts, nah seriously erections are feeling worse than childbirth (probably) 

        Fridge world order mfers`
    }
];

export default function CalendarHighlights() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [selectedDate, setSelectedDate] = React.useState<HighlightedDate | undefined>();

    const handleSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate)
        const highlightedDate = highlightedDates.find(
            (d) => selectedDate && isSameDay(d.date, selectedDate)
        )
        setSelectedDate(highlightedDate ? highlightedDate : undefined);
    }

    return (
        <div
            className="flex flex-row"
        >
            <Calendar
                mode="single"
                selected={date}
                onSelect={handleSelect}
                components={{
                    DayContent: ({ date: dayDate, activeModifiers }) => {
                        const highlightedDate = highlightedDates.find((d) => isSameDay(d.date, dayDate))
                        return (
                            <div
                                className={cn(
                                    `relative flex h-8 w-8 items-center justify-center rounded-md`,
                                    activeModifiers.selected ? 'bg-primary text-primary-foreground' : '',
                                )}
                            >
                                {!activeModifiers.selected && highlightedDate && (
                                    <div
                                        className="absolute inset-0 rounded-full z-20"
                                        style={{ backgroundColor: highlightedDate.color }}
                                    />
                                )}
                                <span className="relative z-30">{dayDate.getDate()}</span>
                            </div>
                        )
                    },
                }}
            />
            <div
                className="w-48 px-2 pt-6 pb-2 text-left text-wrap break-words"
            >
                <div
                    className="text-lg font-semibold"
                >
                    {selectedDate ? selectedDate.title : ""}
                </div>
                <div>
                    {selectedDate ? selectedDate.description : ""}
                </div>
            </div>
        </div>
    )
}