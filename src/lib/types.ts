export interface Doctor {
    id: string
    name: string
    photo: string
    specialty: string
    rating: number
    availability: string[]
    location: string
    bio?:string
  }
  
  export interface TimeSlot {
    id: string
    time: string
    date: string
    available: boolean
  }
  
  export interface Appointment {
    id: string
    doctorId: string
    doctorName: string
    doctorSpecialty: string
    doctorPhoto: string
    location: string
    date: string
    time: string
  }
  
  export type Specialty = "Cardiology" | "Dermatology" | "Neurology" | "Pediatrics" | "Orthopedics" | "All"
  