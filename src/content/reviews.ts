import { slugify } from "@/lib/slug";
import data from "./reviews.json";

// reviews.json is written by the /admin panel. Keep these fields in sync with public/admin/config.yml.
type ReviewEntry = {
  name: string;
  role?: string;
  text: string;
  textTr?: string;
  rating: number;
  avatar?: string;
};

export type Review = ReviewEntry & { id: string };

export const REVIEWS: Review[] = (data as ReviewEntry[]).map((entry, index) => ({
  ...entry,
  id: slugify(entry.name) || `review-${index + 1}`,
}));
