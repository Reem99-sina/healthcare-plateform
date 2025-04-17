import { useStore } from "@/lib/store";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, AlertTriangle } from "lucide-react";
import ImageComponent from "../image-component";

export default function AppointmentsSummary({
  goDoctor,
}: {
  goDoctor: () => void;
}) {
  const { appointments, cancelAppointment } = useStore();

  if (appointments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertTriangle className="h-12 w-12 text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold mb-2">No Appointments</h2>
        <p className="text-gray-500 mb-6 max-w-md">
          You don't have any appointments scheduled yet. Browse our network of
          healthcare professionals and book your first appointment to get
          started with your healthcare journey.
        </p>
        <Button variant="outline" onClick={goDoctor}>
          Find Doctors
        </Button>
      </div>
    );
  }

  return (
    <div className="my-6">
      <div className="my-6">
        <h2 className="text-xl font-semibold mb-2">
          Your Upcoming Appointments
        </h2>
        <p className="text-gray-600">
          View and manage all your scheduled healthcare appointments. You can
          cancel or reschedule as needed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 text-start">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-1/3 h-32 sm:h-auto">
                  <ImageComponent
                    src={appointment.doctorPhoto || "/placeholder.svg"}
                    alt={`Photo of ${appointment.doctorName}`}
                    className="object-cover"
                  />
                </div>

                <div className="p-4 sm:p-6 flex-1">
                  <h3 className="text-lg font-semibold mb-1">
                    {appointment.doctorName}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    {appointment.doctorSpecialty}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-start">
                      <Calendar className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
                      <span className="text-sm">{appointment.date}</span>
                    </div>

                    <div className="flex items-start">
                      <Clock className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
                      <span className="text-sm">{appointment.time}</span>
                    </div>

                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
                      <span className="text-sm">{appointment.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="bg-gray-50 px-4 py-3">
              <div className="w-full">
                <Button
                  variant="outline"
                  className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 mb-2"
                  onClick={() => cancelAppointment(appointment.id)}
                >
                  Cancel Appointment
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  Please cancel at least 24 hours in advance if possible.
                </p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
