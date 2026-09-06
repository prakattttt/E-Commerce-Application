import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useForm, useWatch } from "react-hook-form";
import { Send, Star } from "lucide-react";
import { toast } from "sonner";

import { fadeUp } from "../../../../animations/index";
import useAuth from "../../../auth/hooks/useAuth";
import { createProductReview, getProductReviews } from "../../api/reviews.api";
import type { IProduct } from "../../types/products.types";
import type {
  ProductReviewsResponse,
  IReview,
} from "../../types/reviews.types";
import { reviewSchema, type ReviewFormValues } from "../../types/schemas/reviews.schemas";
import { getErrorMessage } from "../../../../utils/getErrorMessage";

interface ProductReviewsProps {
  product: IProduct;
  onReviewSubmitted: (rating: number, reviews: number) => void;
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={index < rating ? "fill-gold text-gold" : "text-muted-foreground/30"}
      />
    ))}
  </div>
);

const ProductReviews = ({ product, onReviewSubmitted }: ProductReviewsProps) => {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const reviewsQueryKey = ["product-reviews", product._id];

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: reviewsQueryKey,
    queryFn: () => getProductReviews(product._id),
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 5,
      title: "",
      comment: "",
    },
  });

  const selectedRating = useWatch({
    control,
    name: "rating",
  });

  const reviewMutation = useMutation({
    mutationFn: (values: ReviewFormValues) =>
      createProductReview(product._id, values),
    onSuccess: (response) => {
      queryClient.setQueryData<ProductReviewsResponse>(
        reviewsQueryKey,
        (current) => ({
          reviews: [response.review, ...(current?.reviews ?? [])],
        }),
      );
      onReviewSubmitted(response.rating, response.reviews);
      reset();
      toast.success("Your review was submitted.");
    },
    onError: (mutationError) => {
      toast.error(getErrorMessage(mutationError));
    },
  });

  const reviews = data?.reviews ?? [];

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mt-12 overflow-hidden rounded-3xl border border-primary/10 bg-linear-to-br from-primary/5 via-card to-accent/10 p-5 shadow-sm sm:p-8"
    >
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-primary">
            Community feedback
          </p>
          <h2 className="font-display text-3xl font-bold">Customer Reviews</h2>
          <p className="mt-2 text-muted-foreground">
            {product.reviews} verified customer reviews
          </p>
        </div>

        <div className="flex w-fit items-center gap-3 rounded-2xl border border-gold/20 bg-card px-5 py-3 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15">
            <Star size={22} className="fill-gold text-gold" />
          </div>
          <div>
            <span className="text-2xl font-bold">{product.rating.toFixed(1)}</span>
            <span className="ml-1 text-muted-foreground">/5</span>
          </div>
        </div>
      </div>

      {isAuthenticated && (
        <form
          onSubmit={handleSubmit((values) => reviewMutation.mutate(values))}
          className="mb-8 rounded-2xl border border-primary/10 bg-card/90 p-5 shadow-sm sm:p-6"
        >
          <div className="mb-5">
            <h3 className="text-xl font-semibold">Share your experience</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Reviews are available after a delivered purchase.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-1" aria-label="Choose a rating">
              {Array.from({ length: 5 }, (_, index) => {
                const value = index + 1;

                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setValue("rating", value, { shouldValidate: true })}
                    aria-label={`${value} star${value === 1 ? "" : "s"}`}
                    className="rounded-lg p-2 transition hover:bg-gold/10"
                  >
                    <Star
                      size={24}
                      className={value <= selectedRating ? "fill-gold text-gold" : "text-muted-foreground/30"}
                    />
                  </button>
                );
              })}
              <span className="ml-2 text-sm font-medium text-muted-foreground">
                {selectedRating}/5
              </span>
            </div>
            {errors.rating && <p className="mt-1 text-xs text-error">{errors.rating.message}</p>}
          </div>

          <div className="mt-4 space-y-4">
            <div>
              <input
                {...register("title")}
                maxLength={100}
                placeholder="Review title (optional)"
                className={`w-full rounded-xl border bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 ${errors.title ? "border-error" : "border-border"}`}
              />
              {errors.title && <p className="mt-1 text-xs text-error">{errors.title.message}</p>}
            </div>

            <div>
              <textarea
                {...register("comment")}
                maxLength={1000}
                placeholder="Tell other shoppers what you think"
                rows={4}
                className={`w-full resize-y rounded-xl border bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 ${errors.comment ? "border-error" : "border-border"}`}
              />
              {errors.comment && <p className="mt-1 text-xs text-error">{errors.comment.message}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={reviewMutation.isPending}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground shadow-md transition hover:-translate-y-0.5 hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-60"
          >
            <Send size={16} />
            {reviewMutation.isPending ? "Submitting..." : "Submit review"}
          </button>
        </form>
      )}

      {isLoading ? (
        <div className="rounded-2xl bg-card/70 py-12 text-center text-muted-foreground">
          Loading reviews...
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-error/20 bg-error/5 py-10 text-center">
          <p className="font-semibold text-error">Could not load reviews.</p>
          <p className="mt-1 text-sm text-muted-foreground">{getErrorMessage(error)}</p>
        </div>
      ) : reviews.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-primary/20 bg-card/60 py-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/15">
            <Star className="fill-gold text-gold" size={22} />
          </div>
          <h3 className="mt-4 text-xl font-semibold">No reviews yet</h3>
          <p className="mt-2 text-muted-foreground">Be the first to review this product.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      )}
    </motion.section>
  );
};

const ReviewCard = ({ review }: { review: IReview }) => (
  <article className="rounded-2xl border border-primary/10 bg-card/80 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <p className="font-semibold">{review.user.name}</p>
        <div className="mt-1">
          <StarRating rating={review.rating} />
        </div>
      </div>
      <time className="text-sm text-muted-foreground">
        {new Date(review.createdAt).toLocaleDateString()}
      </time>
    </div>
    {review.title && <h4 className="mt-4 font-semibold">{review.title}</h4>}
    <p className="mt-2 leading-7 text-muted-foreground">{review.comment}</p>
  </article>
);

export default ProductReviews;
