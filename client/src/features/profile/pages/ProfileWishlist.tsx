import { Heart } from "lucide-react";

import ProductCard from "../../../components/common/ProductCard";
import useWishlist from "../../wishlist/hooks/useWishlist";

const ProfileWishlist = () => {
const { wishlist, isLoading } = useWishlist();

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-border bg-card py-20 text-center">
        <p className="text-muted-foreground">Loading your wishlist...</p>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="rounded-3xl border border-border bg-card py-20 text-center">
        <Heart size={48} className="mx-auto mb-4 text-muted-foreground" />

        <h3 className="font-display text-2xl font-bold">
          Your Wishlist is Empty
        </h3>

        <p className="mt-2 text-muted-foreground">
          Save your favourite products and they'll appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
      {wishlist.map((item) => (
        <ProductCard key={item._id} product={item.product} />
      ))}
    </div>
  );
};

export default ProfileWishlist;
