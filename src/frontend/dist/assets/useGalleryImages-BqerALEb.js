import { u as useQuery, a as useMutation } from "./label-ouO4IPI4.js";
import { b as useQueryClient } from "./index-DMe-1VHT.js";
const SEED_GALLERY = [
  {
    id: "1",
    url: "/assets/images/gallery-hackathon-2025.jpg",
    caption: "Web3 Hackathon 2025 — Award Ceremony",
    event: "Web3 Hackathon 2025",
    uploadedAt: "2025-11-20",
    tags: ["hackathon", "awards"]
  },
  {
    id: "2",
    url: "/assets/images/gallery-workshop-ml.jpg",
    caption: "ML Workshop — Hands-on Training Session",
    event: "AI & ML Workshop",
    uploadedAt: "2025-10-05",
    tags: ["workshop", "ai", "ml"]
  },
  {
    id: "3",
    url: "/assets/images/gallery-seminar.jpg",
    caption: "Cloud Computing Seminar — Industry Panel",
    event: "Cloud Computing Seminar",
    uploadedAt: "2025-09-18",
    tags: ["seminar", "cloud"]
  },
  {
    id: "4",
    url: "/assets/images/gallery-code-sprint.jpg",
    caption: "Code Sprint Competition — Top Teams",
    event: "Code Sprint 2025",
    uploadedAt: "2025-08-30",
    tags: ["competition", "coding"]
  },
  {
    id: "5",
    url: "/assets/images/gallery-team-photo.jpg",
    caption: "CSI Vignan Executive Team 2025-26",
    uploadedAt: "2025-08-01",
    tags: ["team", "official"]
  },
  {
    id: "6",
    url: "/assets/images/gallery-annual-fest.jpg",
    caption: "Annual Tech Fest 2025 — Inauguration",
    event: "Annual Tech Fest 2025",
    uploadedAt: "2025-07-15",
    tags: ["fest", "inauguration"]
  },
  {
    id: "7",
    url: "/assets/images/gallery-cybersecurity.jpg",
    caption: "Cybersecurity Awareness Session",
    event: "Cybersecurity Seminar",
    uploadedAt: "2025-06-22",
    tags: ["cybersecurity", "seminar"]
  },
  {
    id: "8",
    url: "/assets/images/gallery-members.jpg",
    caption: "CSI Member Orientation Day 2025",
    uploadedAt: "2025-05-10",
    tags: ["members", "orientation"]
  }
];
function useGalleryImages() {
  return useQuery({
    queryKey: ["gallery"],
    queryFn: async () => SEED_GALLERY,
    staleTime: 5 * 60 * 1e3
  });
}
function useUploadGalleryImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const newImage = {
        id: Date.now().toString(),
        url: data.url,
        caption: data.caption,
        event: data.event,
        tags: data.tags,
        uploadedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      return newImage;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    }
  });
}
function useDeleteGalleryImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => id,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    }
  });
}
export {
  useUploadGalleryImage as a,
  useDeleteGalleryImage as b,
  useGalleryImages as u
};
