import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { GalleryImage } from "../types";

const SEED_GALLERY: GalleryImage[] = [
  {
    id: "1",
    url: "/assets/images/gallery-hackathon-2025.jpg",
    caption: "Web3 Hackathon 2025 — Award Ceremony",
    event: "Web3 Hackathon 2025",
    uploadedAt: "2025-11-20",
    tags: ["hackathon", "awards"],
  },
  {
    id: "2",
    url: "/assets/images/gallery-workshop-ml.jpg",
    caption: "ML Workshop — Hands-on Training Session",
    event: "AI & ML Workshop",
    uploadedAt: "2025-10-05",
    tags: ["workshop", "ai", "ml"],
  },
  {
    id: "3",
    url: "/assets/images/gallery-seminar.jpg",
    caption: "Cloud Computing Seminar — Industry Panel",
    event: "Cloud Computing Seminar",
    uploadedAt: "2025-09-18",
    tags: ["seminar", "cloud"],
  },
  {
    id: "4",
    url: "/assets/images/gallery-code-sprint.jpg",
    caption: "Code Sprint Competition — Top Teams",
    event: "Code Sprint 2025",
    uploadedAt: "2025-08-30",
    tags: ["competition", "coding"],
  },
  {
    id: "5",
    url: "/assets/images/gallery-team-photo.jpg",
    caption: "CSI Vignan Executive Team 2025-26",
    uploadedAt: "2025-08-01",
    tags: ["team", "official"],
  },
  {
    id: "6",
    url: "/assets/images/gallery-annual-fest.jpg",
    caption: "Annual Tech Fest 2025 — Inauguration",
    event: "Annual Tech Fest 2025",
    uploadedAt: "2025-07-15",
    tags: ["fest", "inauguration"],
  },
  {
    id: "7",
    url: "/assets/images/gallery-cybersecurity.jpg",
    caption: "Cybersecurity Awareness Session",
    event: "Cybersecurity Seminar",
    uploadedAt: "2025-06-22",
    tags: ["cybersecurity", "seminar"],
  },
  {
    id: "8",
    url: "/assets/images/gallery-members.jpg",
    caption: "CSI Member Orientation Day 2025",
    uploadedAt: "2025-05-10",
    tags: ["members", "orientation"],
  },
];

export function useGalleryImages() {
  return useQuery<GalleryImage[]>({
    queryKey: ["gallery"],
    queryFn: async () => SEED_GALLERY,
    staleTime: 5 * 60 * 1000,
  });
}

export function useGalleryImagesByEvent(event: string) {
  return useQuery<GalleryImage[]>({
    queryKey: ["gallery", "event", event],
    queryFn: async () => SEED_GALLERY.filter((img) => img.event === event),
    staleTime: 5 * 60 * 1000,
  });
}

export function useUploadGalleryImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      url: string;
      caption: string;
      event?: string;
      tags?: string[];
    }) => {
      const newImage: GalleryImage = {
        id: Date.now().toString(),
        url: data.url,
        caption: data.caption,
        event: data.event,
        tags: data.tags,
        uploadedAt: new Date().toISOString(),
      };
      return newImage;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    },
  });
}

export function useDeleteGalleryImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => id,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    },
  });
}
