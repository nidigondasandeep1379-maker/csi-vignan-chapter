import { u as useQuery } from "./label-ouO4IPI4.js";
const SEED_TEAM = [
  {
    id: "1",
    name: "Dr. B. Srinivas Rao",
    role: "faculty_advisor",
    roleLabel: "Faculty Advisor",
    department: "Computer Science & Engineering",
    email: "bsrao@vignan.ac.in",
    bio: "Professor with 20+ years of experience in distributed systems and cloud computing."
  },
  {
    id: "2",
    name: "Arjun Reddy",
    role: "chairperson",
    roleLabel: "Chairperson",
    department: "Computer Science & Engineering",
    year: "4th Year",
    email: "arjun.reddy@student.vignan.ac.in",
    linkedIn: "#",
    bio: "Leading CSI Vignan with a vision to bridge academics and industry."
  },
  {
    id: "3",
    name: "Divya Lakshmi",
    role: "vice_chairperson",
    roleLabel: "Vice Chairperson",
    department: "Information Technology",
    year: "4th Year",
    email: "divya.l@student.vignan.ac.in",
    linkedIn: "#"
  },
  {
    id: "4",
    name: "Kiran Varma",
    role: "secretary",
    roleLabel: "Secretary",
    department: "Computer Science & Engineering",
    year: "3rd Year",
    email: "kiran.v@student.vignan.ac.in",
    linkedIn: "#"
  },
  {
    id: "5",
    name: "Sneha Patel",
    role: "treasurer",
    roleLabel: "Treasurer",
    department: "Information Technology",
    year: "3rd Year",
    email: "sneha.p@student.vignan.ac.in"
  },
  {
    id: "6",
    name: "Rohit Chandra",
    role: "webmaster",
    roleLabel: "Webmaster",
    department: "Computer Science & Engineering",
    year: "3rd Year",
    linkedIn: "#",
    bio: "Full-stack developer passionate about open-source and web technologies."
  },
  {
    id: "7",
    name: "Priya Nair",
    role: "committee",
    roleLabel: "Technical Lead",
    department: "CSE - AI & ML",
    year: "3rd Year",
    linkedIn: "#"
  },
  {
    id: "8",
    name: "Aditya Kumar",
    role: "committee",
    roleLabel: "Events Coordinator",
    department: "Computer Science & Engineering",
    year: "2nd Year"
  },
  {
    id: "9",
    name: "Kavitha Reddy",
    role: "committee",
    roleLabel: "Design Lead",
    department: "Information Technology",
    year: "3rd Year",
    linkedIn: "#"
  },
  {
    id: "10",
    name: "Suresh Babu",
    role: "committee",
    roleLabel: "PR & Outreach",
    department: "Computer Science & Engineering",
    year: "2nd Year"
  },
  {
    id: "11",
    name: "Meghana Sharma",
    role: "member",
    roleLabel: "Member",
    department: "Information Technology",
    year: "2nd Year",
    linkedIn: "#"
  },
  {
    id: "12",
    name: "Varun Tej",
    role: "member",
    roleLabel: "Member",
    department: "CSE - Data Science",
    year: "2nd Year"
  },
  {
    id: "13",
    name: "Anjali Singh",
    role: "member",
    roleLabel: "Member",
    department: "Computer Science & Engineering",
    year: "1st Year"
  },
  {
    id: "14",
    name: "Naveen Krishna",
    role: "member",
    roleLabel: "Member",
    department: "Information Technology",
    year: "1st Year",
    linkedIn: "#"
  },
  {
    id: "15",
    name: "Pooja Desai",
    role: "member",
    roleLabel: "Member",
    department: "CSE - AI & ML",
    year: "2nd Year"
  },
  {
    id: "16",
    name: "Rahul Verma",
    role: "member",
    roleLabel: "Member",
    department: "Computer Science & Engineering",
    year: "1st Year"
  },
  {
    id: "17",
    name: "Swetha Goud",
    role: "member",
    roleLabel: "Member",
    department: "Information Technology",
    year: "2nd Year",
    linkedIn: "#"
  }
];
function useTeamMembers() {
  return useQuery({
    queryKey: ["team"],
    queryFn: async () => SEED_TEAM,
    staleTime: 10 * 60 * 1e3
  });
}
function useLeadershipTeam() {
  return useQuery({
    queryKey: ["team", "leadership"],
    queryFn: async () => SEED_TEAM.filter(
      (m) => [
        "faculty_advisor",
        "chairperson",
        "vice_chairperson",
        "secretary",
        "treasurer",
        "webmaster"
      ].includes(m.role)
    ),
    staleTime: 10 * 60 * 1e3
  });
}
function useCommitteeMembers() {
  return useQuery({
    queryKey: ["team", "committee"],
    queryFn: async () => SEED_TEAM.filter((m) => m.role === "committee" || m.role === "member"),
    staleTime: 10 * 60 * 1e3
  });
}
export {
  useCommitteeMembers as a,
  useTeamMembers as b,
  useLeadershipTeam as u
};
