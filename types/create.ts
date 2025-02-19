import { z } from "zod";
// Step 2 Schema
export const StepTwoSchema = z.object({
  name: z.string().min(3, "Campaign name must be at least 3 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  bannerImage: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, "File size must be <5MB")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Invalid format"
    ),
  additionalImages: z
    .array(
      z.instanceof(File).refine(
        (file) => {
          return (
            file.size <= 5 * 1024 * 1024 &&
            ["image/jpeg", "image/png", "image/webp"].includes(file.type)
          );
        },
        { message: "Each file must be <5MB and in JPG, PNG, or WebP format" }
      )
    )
    .max(5, "Maximum 5 images allowed")
    .optional(),
  category: z.string().optional()
});

// Step 3 Schema
export const StepThreeSchema = z.object({
  target: z
    .string()
    .min(1, "Target amount is required")
    .transform((val) => Number(val))
    .refine((val) => val > 0, "Target must be greater than 0"),
  location: z.string().min(2, "Location is required"),
  organiser: z.string().min(2, "Organizer name is required"),
  beneficiary: z.string().min(2, "Beneficiary name is required"),
  socials: z
    .object({
      twitter: z
        .string()
        .refine((val) => !val || /^https?:\/\//.test(val), "Invalid URL")
        .optional(),
      linkedin: z
        .string()
        .refine((val) => !val || /^https?:\/\//.test(val), "Invalid URL")
        .optional(),
      instagram: z
        .string()
        .refine((val) => !val || /^https?:\/\//.test(val), "Invalid URL")
        .optional(),
      youtube: z
        .string()
        .refine((val) => !val || /^https?:\/\//.test(val), "Invalid URL")
        .optional(),
      discord: z
        .string()
        .refine((val) => !val || /^https?:\/\//.test(val), "Invalid URL")
        .optional(),
      facebook: z
        .string()
        .refine((val) => !val || /^https?:\/\//.test(val), "Invalid URL")
        .optional(),
      github: z
        .string()
        .refine((val) => !val || /^https?:\/\//.test(val), "Invalid URL")
        .optional(),
      telegram: z
        .string()
        .refine((val) => !val || /^https?:\/\//.test(val), "Invalid URL")
        .optional(),
      medium: z
        .string()
        .refine((val) => !val || /^https?:\/\//.test(val), "Invalid URL")
        .optional()
    })
    .optional(),
  customLinks: z.array(
    z.object({
      url: z
        .string()
        .refine((val) => !val || /^https?:\/\//.test(val), "Invalid URL")
        .optional()
    })
  ).optional()
});
