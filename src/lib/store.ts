import { create } from "zustand"
import { doctors } from "./data"
import type { Doctor, Appointment, Specialty } from "./types"

interface StoreState {
  doctors: Doctor[]
  filteredDoctors: Doctor[]
  appointments: Appointment[]
  specialty: Specialty
  setSpecialty: (specialty: Specialty) => void
  addAppointment: (appointment: Appointment) => void
  cancelAppointment: (appointmentId: string) => void
}

export const useStore = create<StoreState>((set) => ({
  doctors,
  filteredDoctors: doctors,
  appointments: [],
  specialty: "All",

  setSpecialty: (specialty) =>
    set((state) => {
      const filteredDoctors =
        specialty === "All" ? state.doctors : state.doctors.filter((doctor) => doctor.specialty === specialty)

      return { specialty, filteredDoctors }
    }),

  addAppointment: (appointment) =>
    set((state) => ({
      appointments: [...state.appointments, appointment],
    })),

  cancelAppointment: (appointmentId) =>
    set((state) => ({
      appointments: state.appointments.filter((app) => app.id !== appointmentId),
    })),
}))
