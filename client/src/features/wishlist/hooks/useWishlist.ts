import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../api/wishlist.api";

import { toast } from "sonner";
import { getErrorMessage } from "../../../utils/getErrorMessage";

export const wishlistQueryKey = ["wishlist"];

const useWishlist = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: wishlistQueryKey,
    queryFn: getWishlist,
  });

  const addMutation = useMutation({
    mutationFn: addToWishlist,

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: wishlistQueryKey,
      });

      toast.success(data.message);
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeFromWishlist,

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: wishlistQueryKey,
      });

      toast.success(data.message);
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const wishlist = data?.wishlist ?? [];

  const wishlistIds = new Set(wishlist.map((item) => item.product._id));

  const isWishlisted = (productId: string) => {
    return wishlistIds.has(productId);
  };

  const toggleWishlist = (productId: string) => {
    if (isWishlisted(productId)) {
      removeMutation.mutate(productId);
    } else {
      addMutation.mutate(productId);
    }
  };

  return {
    wishlist,

    isLoading,
    isError,

    isWishlisted,
    toggleWishlist,

    addToWishlist: addMutation.mutate,
    removeFromWishlist: removeMutation.mutate,

    isAdding: addMutation.isPending,
    isRemoving: removeMutation.isPending,

    isMutating: addMutation.isPending || removeMutation.isPending,
  };
};

export default useWishlist;
