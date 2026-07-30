import { useState } from "react";
import { Truck, MessageSquare, FileText } from "lucide-react";

import type { IProduct } from "../../types/products.types";

interface ProductTabsProps {
  product: IProduct;
}

const tabs = [
  {
    id: "description",
    label: "Description",
    icon: FileText,
  },
  {
    id: "reviews",
    label: "Reviews",
    icon: MessageSquare,
  },
  {
    id: "shipping",
    label: "Shipping",
    icon: Truck,
  },
] as const;

type TabType = (typeof tabs)[number]["id"];

const ProductTabs = ({ product }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("description");

  return (
    <section className="mx-auto mt-20 max-w-7xl">
      {/* Tabs */}
      <div className="flex flex-wrap gap-3 border-b border-border pb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;

          const active = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-xl px-5 py-3 font-medium transition ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "bg-card hover:bg-secondary"
              }`}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="mt-8 rounded-2xl border border-border bg-card p-8">
        {activeTab === "description" && (
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-bold">
              Product Description
            </h3>

            <p className="leading-8 text-muted-foreground">
              {product.description}
            </p>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-5">
            <h3 className="font-display text-2xl font-bold">
              Customer Reviews
            </h3>

            <div className="rounded-xl bg-secondary p-6">
              <p className="text-5xl font-bold text-primary">
                {product.rating.toFixed(1)}
              </p>

              <p className="mt-2 text-muted-foreground">
                Based on {product.reviews} verified reviews.
              </p>
            </div>

            <div className="rounded-xl border border-dashed border-border p-6 text-center text-muted-foreground">
              Individual reviews will be displayed here once the review system
              is implemented.
            </div>
          </div>
        )}

        {activeTab === "shipping" && (
          <div className="space-y-6">
            <h3 className="font-display text-2xl font-bold">
              Shipping & Returns
            </h3>

            <div className="space-y-5">
              <div className="rounded-xl bg-secondary p-5">
                <h4 className="font-semibold">Standard Delivery</h4>

                <p className="mt-2 text-muted-foreground">
                  Orders are delivered within 2–5 business days depending on
                  your location.
                </p>
              </div>

              <div className="rounded-xl bg-secondary p-5">
                <h4 className="font-semibold">Free Shipping</h4>

                <p className="mt-2 text-muted-foreground">
                  Available on orders above Rs. 2,000.
                </p>
              </div>

              <div className="rounded-xl bg-secondary p-5">
                <h4 className="font-semibold">Easy Returns</h4>

                <p className="mt-2 text-muted-foreground">
                  Return or exchange products within 7 days of delivery if they
                  are unused and in original condition.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductTabs;
