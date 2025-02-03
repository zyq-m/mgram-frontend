import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Filter } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "../ui/label";

export default function FilterResult({
  onDate,
}: {
  onDate: (date?: Date) => void;
}) {
  const [date, setDate] = useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          Filter <Filter />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <div className="space-y-2">
          {/* date picker */}
          <div>
            <Label>Timestamp</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex gap-1 justify-end mt-4">
          <Button variant="outline">Clear</Button>
          <Button onClick={() => onDate(date)}>Apply</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
