import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import type { Doctor, TimeSlot } from "@/lib/types";
import { generateTimeSlots } from "@/lib/data";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import ImageComponent from "../image-component";
import clsx from "clsx";

interface BookingModalProps {
  doctor: Doctor;
  isOpen: boolean;
  onClose: () => void;
  goPointment: () => void;
}

export default function BookingModal({
  doctor,
  isOpen,
  onClose,
  goPointment,
}: BookingModalProps) {
  const { addAppointment } = useStore();
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    // Generate mock time slots for this doctor
    setTimeSlots(generateTimeSlots(doctor.id));
  }, [doctor.id]);

  useEffect(() => {
    if (selectedDate) {
      const dateString = format(selectedDate, "EEEE, MMMM d");
      const slots = timeSlots.filter(
        (slot) => slot.date === dateString && slot.available
      );
      setAvailableSlots(slots);
      setSelectedSlot(null);
    } else {
      setAvailableSlots([]);
    }
  }, [selectedDate, timeSlots]);

  const handleConfirmBooking = () => {
    if (selectedSlot && selectedDate) {
      const appointment = {
        id: uuidv4(),
        doctorId: doctor.id,
        doctorName: doctor.name,
        doctorSpecialty: doctor.specialty,
        doctorPhoto: doctor.photo,
        location: doctor.location,
        date: format(selectedDate, "EEEE, MMMM d"),
        time: selectedSlot.time,
      };

      addAppointment(appointment);
      setBookingConfirmed(true);
    }
  };

  const handleClose = () => {
    setSelectedDate(undefined);
    setSelectedSlot(null);
    setBookingConfirmed(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {bookingConfirmed
              ? "Appointment Confirmed!"
              : `Book Appointment with ${doctor.name}`}
          </DialogTitle>
          <DialogDescription>
            {bookingConfirmed
              ? "Your appointment has been successfully booked. You'll receive a confirmation email shortly."
              : `Schedule your visit with ${doctor.name}, ${doctor.specialty} specialist at ${doctor.location}. Please select a date and time that works for you.`}
          </DialogDescription>
        </DialogHeader>

        {bookingConfirmed ? (
          <div className="flex flex-col items-center py-6">
            <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4">
              <ImageComponent
                src={doctor.photo || "/placeholder.svg"}
                alt={`Photo of ${doctor.name}`}
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">{doctor.name}</h3>
            <p className="text-gray-500 mb-4">{doctor.specialty}</p>

            <div className="bg-gray-50 p-4 rounded-lg w-full mb-4">
              <div className="flex items-center mb-2">
                <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                <span>
                  {selectedDate && format(selectedDate, "EEEE, MMMM d, yyyy")}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-gray-500" />
                <span>{selectedSlot?.time}</span>
              </div>
            </div>

            <Button
              onClick={() => {
                handleClose();
                goPointment();
              }}
              className="w-full !text-white"
            >
              View My Appointments
            </Button>
          </div>
        ) : (
          <>
            <div className="flex flex-col space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Select a date</h3>
                <p className="text-xs text-gray-500 mb-2">
                  Appointments are available for the next 30 days
                </p>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) =>
                    date < new Date() ||
                    date >
                      new Date(new Date().setDate(new Date().getDate() + 30))
                  }
                  className="rounded-md border"
                />
              </div>

              {selectedDate && (
                <div>
                  <h3 className="text-sm font-medium mb-2">
                    Available time slots
                  </h3>
                  {availableSlots.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {availableSlots.map((slot) => (
                        <Button
                          key={slot.id}
                          variant={
                            selectedSlot?.id === slot.id ? "default" : "outline"
                          }
                          onClick={() => setSelectedSlot(slot)}
                          className={clsx(
                            "justify-start",
                            selectedSlot?.id === slot.id ? "!text-white" : ""
                          )}
                        >
                          <Clock className="mr-2 h-4 w-4" />
                          {slot.time}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No available slots for this date.
                    </p>
                  )}
                </div>
              )}
            </div>

            <DialogFooter className="flex flex-col justify-center items-center">
              <Button
                onClick={handleConfirmBooking}
                disabled={!selectedSlot}
                className="w-full sm:w-auto !text-white"
              >
                Confirm Appointment
              </Button>
              <p className="text-xs text-gray-500 mt-2 w-full text-center">
                You can cancel or reschedule your appointment at any time from
                your appointments page.
              </p>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
