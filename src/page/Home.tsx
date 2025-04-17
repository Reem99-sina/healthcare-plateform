import { Blood } from "@/assets";
import AppointmentsSummary from "@/components/common/apointment/apointment";
import BookingModal from "@/components/common/booking/booking-modal";
import DoctorDirectory from "@/components/common/home/doctors";
import ImageComponent from "@/components/common/image-component";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Doctor } from "@/lib/types";
import { useState } from "react";

const Home = () => {
  const [tab, setTab] = useState("doctor");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookAppointment = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  return (
    <div
      className={`flex flex-col gap-5  text-center justify-center items-center pt-9 relative z-10`}
    >
      <div className=" w-full   flex flex-col gap-5 h-[550px] justify-center items-center ">
        <h3 className="text-2xl font-black">Healthcare Appointment Booking</h3>
        <p className="text-xl w-[50%]">
          Find and book appointments with top healthcare professionals. Our
          platform makes it easy to connect with specialists across various
          medical fields and manage your healthcare schedule.
        </p>
      </div>
      <Tabs
        defaultValue="account"
        className=""
        value={tab}
        onValueChange={setTab}
      >
        <TabsList className="w-full p-6">
          <TabsTrigger value="doctor" className="p-6">
            Find Doctors
          </TabsTrigger>
          <TabsTrigger value="appointment" className="p-6">
            My Appointments
          </TabsTrigger>
        </TabsList>
        <TabsContent value="doctor">
          <DoctorDirectory onBookAppointment={handleBookAppointment} />
        </TabsContent>
        <TabsContent value="appointment">
          <AppointmentsSummary goDoctor={() => setTab("doctor")} />
        </TabsContent>
      </Tabs>
      {isModalOpen && selectedDoctor && (
        <BookingModal
          doctor={selectedDoctor}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          goPointment={() => setTab("appointment")}
        />
      )}
    </div>
  );
};

export default Home;
