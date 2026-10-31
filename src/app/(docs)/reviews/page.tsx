import type { Metadata } from "next";
import ReviewList from "@/components/ReviewList";
import DocPage from "@/components/docs/DocPage";
import { REVIEWS } from "@/content/reviews";

export const metadata: Metadata = {
  title: "Reviews",
  description: "What people who worked with ImOrion had to say.",
};

export default function ReviewsPage() {
  return (
    <DocPage
      href="/reviews"
      crumbs={[{ href: "/reviews", label: "Reviews" }]}
      title="Reviews"
      lede="What people I've worked with had to say, including the part where I'm a bit slow."
      toc={REVIEWS.map((review) => ({ id: review.id, label: review.name }))}
    >
      <ReviewList />
    </DocPage>
  );
}
