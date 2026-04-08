import { u as useQuery, a as useMutation } from "./label-ouO4IPI4.js";
import { b as useQueryClient } from "./index-DMe-1VHT.js";
const SEED_EVENTS = [
  {
    id: "1",
    title: "Web3 Hackathon 2026",
    description: "A 24-hour hackathon exploring decentralized application development on the Internet Computer. Build innovative dApps and compete for exciting prizes.",
    date: "2026-04-20",
    venue: "Vignan University Main Auditorium",
    category: "hackathon",
    status: "upcoming",
    imageUrl: "/assets/images/event-hackathon.jpg",
    registrationLink: "#",
    speakers: ["Dr. Ramesh Kumar", "Prof. Anitha Reddy"],
    maxAttendees: 200
  },
  {
    id: "2",
    title: "AI & Machine Learning Workshop",
    description: "Hands-on workshop covering fundamentals of machine learning, neural networks, and practical AI applications using Python and TensorFlow.",
    date: "2026-03-15",
    venue: "CS Department Lab Block",
    category: "workshop",
    status: "completed",
    imageUrl: "/assets/images/event-workshop.jpg",
    speakers: ["Mr. Karthik Naidu"],
    maxAttendees: 60
  },
  {
    id: "3",
    title: "Cloud Computing Seminar",
    description: "Industry experts share insights on cloud architecture, serverless computing, and career paths in the cloud ecosystem.",
    date: "2026-05-05",
    venue: "Seminar Hall B, Block 4",
    category: "seminar",
    status: "upcoming",
    imageUrl: "/assets/images/event-seminar.jpg",
    registrationLink: "#",
    speakers: ["Ms. Priya Sharma (AWS)", "Mr. Vijay Reddy (Azure)"],
    maxAttendees: 150
  },
  {
    id: "4",
    title: "Code Sprint — Competitive Programming",
    description: "Test your algorithmic thinking in this high-energy competitive programming contest. Open to all CSI members.",
    date: "2026-04-10",
    venue: "Computer Lab 3, Block 2",
    category: "competition",
    status: "upcoming",
    registrationLink: "#",
    maxAttendees: 80
  },
  {
    id: "5",
    title: "Cybersecurity Awareness Session",
    description: "Learn about the latest cyber threats, ethical hacking basics, and how to protect your digital presence.",
    date: "2026-02-28",
    venue: "Auditorium A",
    category: "seminar",
    status: "completed",
    speakers: ["Dr. Sridhar Rao"],
    maxAttendees: 120
  },
  {
    id: "6",
    title: "CSI Annual Tech Fest 2026",
    description: "Our flagship annual technology festival featuring competitions, exhibitions, guest lectures, and cultural events.",
    date: "2026-06-10",
    venue: "Vignan University Campus",
    category: "other",
    status: "upcoming",
    registrationLink: "#",
    maxAttendees: 500
  }
];
function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => SEED_EVENTS,
    staleTime: 5 * 60 * 1e3
  });
}
function useCreateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (event) => {
      const newEvent = { ...event, id: Date.now().toString() };
      return newEvent;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    }
  });
}
function useDeleteEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => id,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    }
  });
}
export {
  useCreateEvent as a,
  useDeleteEvent as b,
  useEvents as u
};
