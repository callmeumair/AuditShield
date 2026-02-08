"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface DateRangePickerProps {
    value?: DateRange;
    onChange: (range: DateRange | undefined) => void;
    className?: string;
}

export function DateRangePicker({
    value,
    onChange,
    className,
}: DateRangePickerProps) {
    const [date, setDate] = React.useState<DateRange | undefined>(value);

    const presets = [
        { label: "Last 7 days", days: 7 },
        { label: "Last 30 days", days: 30 },
        { label: "Last 90 days", days: 90 },
    ];

    const handlePresetSelect = (days: number) => {
        const range = {
            from: addDays(new Date(), -days),
            to: new Date(),
        };
        setDate(range);
        onChange(range);
    };

    const handleDateChange = (range: DateRange | undefined) => {
        setDate(range);
        onChange(range);
    };

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[300px] justify-start text-left font-normal border-border/60",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date range</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <div className="p-3 border-b border-border">
                        <Select onValueChange={(value) => handlePresetSelect(parseInt(value))}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select preset" />
                            </SelectTrigger>
                            <SelectContent>
                                {presets.map((preset) => (
                                    <SelectItem key={preset.days} value={preset.days.toString()}>
                                        {preset.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={handleDateChange}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
