import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useDeleteGalleryImage,
  useGalleryImages,
  useUploadGalleryImage,
} from "@/hooks/useGalleryImages";
import { Image, Loader2, Plus, Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

type UploadForm = {
  caption: string;
  event: string;
  tags: string;
  previewUrl: string;
};

const defaultForm: UploadForm = {
  caption: "",
  event: "",
  tags: "",
  previewUrl: "",
};

export default function AdminGallery() {
  const { data: images, isLoading } = useGalleryImages();
  const uploadImage = useUploadGalleryImage();
  const deleteImage = useDeleteGalleryImage();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<UploadForm>(defaultForm);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setForm((f) => ({ ...f, previewUrl: url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.previewUrl || !form.caption) {
      toast.error("Please select an image and add a caption");
      return;
    }
    try {
      await uploadImage.mutateAsync({
        url: form.previewUrl,
        caption: form.caption,
        event: form.event || undefined,
        tags: form.tags
          ? form.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : undefined,
      });
      toast.success("Image uploaded");
      setDialogOpen(false);
      setForm(defaultForm);
      if (fileRef.current) fileRef.current.value = "";
    } catch {
      toast.error("Failed to upload image");
    }
  };

  const handleDelete = async (id: string, caption: string) => {
    if (!confirm(`Delete "${caption}"?`)) return;
    try {
      await deleteImage.mutateAsync(id);
      toast.success("Image deleted");
    } catch {
      toast.error("Failed to delete image");
    }
  };

  return (
    <div className="space-y-6" data-ocid="admin-gallery">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            Gallery
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {images?.length ?? 0} images in the gallery.
          </p>
        </div>
        <Button
          className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
          onClick={() => setDialogOpen(true)}
          data-ocid="admin-upload-image"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Image
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {["g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8"].map((sk) => (
            <Skeleton key={sk} className="aspect-square rounded-lg" />
          ))}
        </div>
      ) : images && images.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="group relative aspect-square bg-muted/40 rounded-lg border border-border/60 overflow-hidden"
              data-ocid={`admin-gallery-${img.id}`}
            >
              {img.url ? (
                <img
                  src={img.url}
                  alt={img.caption}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-secondary">
                  <Image className="h-8 w-8 text-muted-foreground/40" />
                </div>
              )}
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-smooth flex flex-col items-center justify-between p-3">
                <p className="text-xs text-foreground text-center font-medium line-clamp-3">
                  {img.caption}
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:bg-destructive/10 mt-2"
                  onClick={() => handleDelete(img.id, img.caption)}
                  aria-label="Delete image"
                  data-ocid={`admin-delete-image-${img.id}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center py-20 bg-card border border-dashed border-border/60 rounded-xl"
          data-ocid="gallery-empty-state"
        >
          <Image className="h-12 w-12 text-muted-foreground/30 mb-3" />
          <h3 className="font-medium text-foreground mb-1">No images yet</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Upload your first gallery image to get started.
          </p>
          <Button
            size="sm"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={() => setDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Upload First Image
          </Button>
        </div>
      )}

      {/* Upload Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-foreground">
              Upload Gallery Image
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            {/* File picker */}
            <div className="space-y-2">
              <Label htmlFor="g-file">Image File *</Label>
              <button
                type="button"
                className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-accent/50 transition-colors w-full"
                onClick={() => fileRef.current?.click()}
              >
                {form.previewUrl ? (
                  <img
                    src={form.previewUrl}
                    alt="Preview"
                    className="mx-auto max-h-32 rounded object-contain"
                  />
                ) : (
                  <div className="text-muted-foreground">
                    <Upload className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Click to select an image</p>
                    <p className="text-xs mt-1">JPG, PNG, WEBP up to 10 MB</p>
                  </div>
                )}
              </button>
              <input
                id="g-file"
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                data-ocid="gallery-file-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="g-caption">Caption *</Label>
              <Input
                id="g-caption"
                value={form.caption}
                onChange={(e) => setForm({ ...form, caption: e.target.value })}
                placeholder="e.g. Hackathon Award Ceremony"
                required
                data-ocid="gallery-caption-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="g-event">Event Name</Label>
              <Input
                id="g-event"
                value={form.event}
                onChange={(e) => setForm({ ...form, event: e.target.value })}
                placeholder="e.g. Web3 Hackathon 2026"
                data-ocid="gallery-event-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="g-tags">Tags (comma-separated)</Label>
              <Input
                id="g-tags"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                placeholder="e.g. hackathon, awards, 2026"
                data-ocid="gallery-tags-input"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
                disabled={uploadImage.isPending}
                data-ocid="submit-upload-btn"
              >
                {uploadImage.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Uploading…
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Upload
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
