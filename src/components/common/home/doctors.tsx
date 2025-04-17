"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import type { Doctor, Specialty } from "@/lib/types";
import { specialties } from "@/lib/data";
import DoctorCard from "./doctor-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DoctorDirectoryProps {
  onBookAppointment: (doctor: Doctor) => void;
}

export default function DoctorDirectory({
  onBookAppointment
}: DoctorDirectoryProps) {
  const { filteredDoctors, specialty, setSpecialty } = useStore();
  const [availabilityFilter, setAvailabilityFilter] = useState<string>("Any");
  const [displayedDoctors, setDisplayedDoctors] =
    useState<Doctor[]>(filteredDoctors);

  const days = [
    "Any",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    let doctors = filteredDoctors;

    if (availabilityFilter !== "Any") {
      doctors = doctors.filter((doctor) =>
        doctor.availability.includes(availabilityFilter)
      );
    }

    setDisplayedDoctors(doctors);
  }, [filteredDoctors, availabilityFilter]);

  return (
    <div className="flex flex-col items-center justify-center pt-7">
      
      <div className="mb-6 md:w-[50%]">
        <h2 className="text-xl font-semibold mb-2">Find Your Doctor</h2>
        <p className="text-gray-600">
          Browse our network of qualified healthcare professionals and filter by
          specialty or availability to find the perfect match for your needs.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-6 w-full text-center">
        <div className="w-1/2">
          <label
            htmlFor="specialty-filter"
            className="block text-sm font-medium mb-2"
          >
            Filter by Specialty
          </label>
          <Select
            value={specialty}
            onValueChange={(value) => setSpecialty(value as Specialty)}
            
          >
            <SelectTrigger id="specialty-filter" className="!bg-white w-full">
              <SelectValue placeholder="Select specialty" />
            </SelectTrigger>
            <SelectContent >
              {specialties.map((spec) => (
                <SelectItem key={spec} value={spec}>
                  {spec}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-1/2 ">
          <label
            htmlFor="availability-filter"
            className="block text-sm font-medium mb-2"
          >
            Filter by Availability
          </label>
          <Select
            value={availabilityFilter}
            onValueChange={setAvailabilityFilter}
          >
            <SelectTrigger id="availability-filter" className="!bg-white w-full">
              <SelectValue placeholder="Select day" />
            </SelectTrigger>
            <SelectContent>
              {days.map((day) => (
                <SelectItem key={day} value={day}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {displayedDoctors.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg text-gray-500 mb-2">
            No doctors match your filters.
          </p>
          <p className="text-gray-500">
            Try selecting different specialty or availability options to see
            more results.
          </p>
        </div>
      ) : (
        <div className="grid  md:grid-cols-1 lg:grid-cols-3 gap-6 grid-cols-1">
          {displayedDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onBookAppointment={onBookAppointment}
            />
          ))}
        </div>
      )}
    </div>
  );
}
