"use client";

import type { Doctor } from "@/lib/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import ImageComponent from "../image-component";

interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment: (doctor: Doctor) => void;
}

export default function DoctorCard({
  doctor,
  onBookAppointment,
}: DoctorCardProps) {
  return (
    <Card className="h-full flex flex-col text-start">
      <CardContent className="pt-6 flex-grow">
        <div className="flex flex-col items-center mb-4">
          <div className="relative w-24 h-24 rounded-full overflow-hidden mb-3">
            <ImageComponent
              src={doctor.photo || "/src/assets/doctor.png"}
              alt={`Photo of ${doctor.name}`}
              className="object-cover"
            />
          </div>
          <h3 className="text-xl font-semibold text-center">{doctor.name}</h3>
          <p className="text-gray-500 mb-2">{doctor.specialty}</p>

          <div className="flex items-center mb-2">
            <Star className="h-4 w-4 !text-yellow-500 mr-1" />
            <span>{doctor.rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div>
            <h4 className="text-sm font-medium">Location</h4>
            <p className="text-sm text-gray-500">{doctor.location}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium">Available on</h4>
            <p className="text-sm text-gray-500">
              {doctor.availability.join(", ")}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium">About</h4>
            <p className="text-sm text-gray-500 line-clamp-3">
              {doctor.bio ||
                `${doctor.name} is a highly qualified ${doctor.specialty} specialist with years of experience in patient care and treatment.`}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full !text-white"
          onClick={() => onBookAppointment(doctor)}
          aria-label={`Book appointment with ${doctor.name}`}
        >
          Book Appointment
        </Button>
      </CardFooter>
    </Card>
  );
}
