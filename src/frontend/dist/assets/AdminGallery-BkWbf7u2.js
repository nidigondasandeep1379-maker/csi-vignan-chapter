import { r as reactExports, j as jsxRuntimeExports, S as Skeleton } from "./index-DMe-1VHT.js";
import { c as createLucideIcon, B as Button } from "./button-DBRJMU4i.js";
import { P as Plus, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, u as ue } from "./index-CaXxiCeY.js";
import { L as Label, I as Input } from "./label-ouO4IPI4.js";
import { u as useGalleryImages, a as useUploadGalleryImage, b as useDeleteGalleryImage } from "./useGalleryImages-BqerALEb.js";
import { I as Image } from "./image-D5fFz_U-.js";
import { T as Trash2 } from "./trash-2-CZyA6rXf.js";
import { L as LoaderCircle } from "./loader-circle-Cd0gNYgB.js";
import "./index-D8jkdHVW.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
const defaultForm = {
  caption: "",
  event: "",
  tags: "",
  previewUrl: ""
};
function AdminGallery() {
  const { data: images, isLoading } = useGalleryImages();
  const uploadImage = useUploadGalleryImage();
  const deleteImage = useDeleteGalleryImage();
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState(defaultForm);
  const fileRef = reactExports.useRef(null);
  const handleFileChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setForm((f) => ({ ...f, previewUrl: url }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.previewUrl || !form.caption) {
      ue.error("Please select an image and add a caption");
      return;
    }
    try {
      await uploadImage.mutateAsync({
        url: form.previewUrl,
        caption: form.caption,
        event: form.event || void 0,
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : void 0
      });
      ue.success("Image uploaded");
      setDialogOpen(false);
      setForm(defaultForm);
      if (fileRef.current) fileRef.current.value = "";
    } catch {
      ue.error("Failed to upload image");
    }
  };
  const handleDelete = async (id, caption) => {
    if (!confirm(`Delete "${caption}"?`)) return;
    try {
      await deleteImage.mutateAsync(id);
      ue.success("Image deleted");
    } catch {
      ue.error("Failed to delete image");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "admin-gallery", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Gallery" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
          (images == null ? void 0 : images.length) ?? 0,
          " images in the gallery."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          className: "bg-accent text-accent-foreground hover:bg-accent/90 font-semibold",
          onClick: () => setDialogOpen(true),
          "data-ocid": "admin-upload-image",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4 mr-2" }),
            "Upload Image"
          ]
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: ["g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square rounded-lg" }, sk)) }) : images && images.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: images.map((img) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "group relative aspect-square bg-muted/40 rounded-lg border border-border/60 overflow-hidden",
        "data-ocid": `admin-gallery-${img.id}`,
        children: [
          img.url ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: img.url,
              alt: img.caption,
              className: "w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-8 w-8 text-muted-foreground/40" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-smooth flex flex-col items-center justify-between p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground text-center font-medium line-clamp-3", children: img.caption }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                className: "text-destructive hover:bg-destructive/10 mt-2",
                onClick: () => handleDelete(img.id, img.caption),
                "aria-label": "Delete image",
                "data-ocid": `admin-delete-image-${img.id}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
              }
            )
          ] })
        ]
      },
      img.id
    )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-20 bg-card border border-dashed border-border/60 rounded-xl",
        "data-ocid": "gallery-empty-state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-12 w-12 text-muted-foreground/30 mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium text-foreground mb-1", children: "No images yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Upload your first gallery image to get started." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "bg-accent text-accent-foreground hover:bg-accent/90",
              onClick: () => setDialogOpen(true),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
                "Upload First Image"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "bg-card border-border max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-foreground", children: "Upload Gallery Image" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "g-file", children: "Image File *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-accent/50 transition-colors w-full",
              onClick: () => {
                var _a;
                return (_a = fileRef.current) == null ? void 0 : _a.click();
              },
              children: form.previewUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: form.previewUrl,
                  alt: "Preview",
                  className: "mx-auto max-h-32 rounded object-contain"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-8 h-8 mx-auto mb-2 opacity-50" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Click to select an image" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: "JPG, PNG, WEBP up to 10 MB" })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "g-file",
              ref: fileRef,
              type: "file",
              accept: "image/*",
              className: "hidden",
              onChange: handleFileChange,
              "data-ocid": "gallery-file-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "g-caption", children: "Caption *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "g-caption",
              value: form.caption,
              onChange: (e) => setForm({ ...form, caption: e.target.value }),
              placeholder: "e.g. Hackathon Award Ceremony",
              required: true,
              "data-ocid": "gallery-caption-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "g-event", children: "Event Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "g-event",
              value: form.event,
              onChange: (e) => setForm({ ...form, event: e.target.value }),
              placeholder: "e.g. Web3 Hackathon 2026",
              "data-ocid": "gallery-event-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "g-tags", children: "Tags (comma-separated)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "g-tags",
              value: form.tags,
              onChange: (e) => setForm({ ...form, tags: e.target.value }),
              placeholder: "e.g. hackathon, awards, 2026",
              "data-ocid": "gallery-tags-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => setDialogOpen(false),
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              className: "bg-accent text-accent-foreground hover:bg-accent/90 gap-2",
              disabled: uploadImage.isPending,
              "data-ocid": "submit-upload-btn",
              children: uploadImage.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                "Uploading…"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
                "Upload"
              ] })
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  AdminGallery as default
};
