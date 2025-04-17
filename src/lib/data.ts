import type { Doctor, TimeSlot } from "./types"

export const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    photo: "/src/assets/doctor.png",
    specialty: "Cardiology",
    rating: 4.8,
    availability: ["Monday", "Wednesday", "Friday"],
    location: "Medical Center, Building A",
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    photo: "/src/assets/doctor.png",
    specialty: "Dermatology",
    rating: 4.7,
    availability: ["Tuesday", "Thursday", "Saturday"],
    location: "Wellness Clinic, Downtown",
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    photo: "/src/assets/doctor.png",
    specialty: "Neurology",
    rating: 4.9,
    availability: ["Monday", "Tuesday", "Thursday"],
    location: "Neuroscience Center, North Wing",
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    photo: "/src/assets/doctor.png",
    specialty: "Pediatrics",
    rating: 4.6,
    availability: ["Wednesday", "Friday", "Saturday"],
    location: "Children's Hospital, Main Campus",
  },
  {
    id: "5",
    name: "Dr. Olivia Thompson",
    photo: "/src/assets/doctor.png",
    specialty: "Orthopedics",
    rating: 4.5,
    availability: ["Monday", "Wednesday", "Friday"],
    location: "Sports Medicine Center, East Wing",
  },
  {
    id: "6",
    name: "Dr. David Kim",
    photo: "/src/assets/doctor.png",
    specialty: "Cardiology",
    rating: 4.7,
    availability: ["Tuesday", "Thursday", "Saturday"],
    location: "Heart Institute, 3rd Floor",
  },
  {
    id: "7",
    name: "Dr. Lisa Patel",
    photo: "/src/assets/doctor.png",
    specialty: "Dermatology",
    rating: 4.8,
    availability: ["Monday", "Wednesday", "Friday"],
    location: "Skin Care Clinic, West Building",
  },
  {
    id: "8",
    name: "Dr. Robert Garcia",
    photo: "/src/assets/doctor.png",
    specialty: "Neurology",
    rating: 4.6,
    availability: ["Tuesday", "Thursday", "Saturday"],
    location: "Brain & Spine Center, Suite 200",
  },
]

export const generateTimeSlots = (doctorId: string): TimeSlot[] => {
  const today = new Date()
  const slots: TimeSlot[] = []

  // Generate time slots for the next 7 days
  for (let i = 1; i <= 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)

    const dateString = date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })

    // Generate 6 time slots per day
    const times = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"]

    times.forEach((time, index) => {
      slots.push({
        id: `${doctorId}-${i}-${index}`,
        date: dateString,
        time,
        available: Math.random() > 0.3, // 70% chance of being available
      })
    })
  }

  return slots
}

export const specialties = ["All", "Cardiology", "Dermatology", "Neurology", "Pediatrics", "Orthopedics"]
