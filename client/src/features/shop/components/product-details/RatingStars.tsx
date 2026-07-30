import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  reviews: number;
}

const RatingStars = ({ rating, reviews }: RatingStarsProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1">
        <Star size={18} className="fill-gold text-gold" />

        <span className="font-semibold">{rating.toFixed(1)}</span>
      </div>

      <span className="text-muted-foreground">({reviews} reviews)</span>
    </div>
  );
};

export default RatingStars;
