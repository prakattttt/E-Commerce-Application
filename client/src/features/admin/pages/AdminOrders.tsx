import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { motion } from "framer-motion";

import { fadeUp } from "../../../animations";

import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import OrderCard from "../components/OrderCard";

import { getAllOrders } from "../../checkout/api/checkout.api";

import Loader from "../../../components/ui/Loader";
import { getErrorMessage } from "../../../utils/getErrorMessage";

const AdminOrders = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["orders-all"],
    queryFn: () => getAllOrders(),
  });

  const orders = data?.orders ?? [];

  useEffect(() => {
    if (isError) {
      toast.error(getErrorMessage(error));
    }
  }, [isError, error]);

  if (isLoading) {
    return <Loader fullScreen />;
  }

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <PageHeader
        title="Orders"
        description="Track and manage customer orders."
      />

      <SearchBar placeholder="Search orders..." className="max-w-md" />

      {orders.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card py-20 text-center">
          <p className="text-muted-foreground">No orders found.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {orders.map((order, index) => (
            <OrderCard key={order._id} order={order} index={index} />
          ))}
        </div>
      )}
    </motion.section>
  );
};

export default AdminOrders;
