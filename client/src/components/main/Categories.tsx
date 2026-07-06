const categories = [
  {
    name: "Sneakers",
    image: "https://images.unsplash.com/photo-1528701800489-20be3c3ea3e8?w=800",
    count: "2,540",
    icon: "👟",
  },
  {
    name: "Fashion",
    image: "https://unsplash.com/photos/person-wearing-grey-knit-sweater-mU88MlEFcoU",
    count: "1,820",
    icon: "👕",
  },
  {
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    count: "950",
    icon: "🎧",
  },
  {
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800",
    count: "720",
    icon: "⌚",
  },
  {
    name: "Beauty",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800",
    count: "680",
    icon: "💄",
  },
  {
    name: "Gaming",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800",
    count: "540",
    icon: "🎮",
  },
];

const Categories = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
          Browse By
        </p>

        <h2 className="mt-2 font-display text-4xl font-bold">
          Shop Categories
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <button
            key={category.name}
            className="group overflow-hidden rounded-2xl bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative aspect-3/4 overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

              <div className="absolute bottom-0 left-0 w-full p-4 text-left text-primary-foreground">
                <p className="text-2xl">{category.icon}</p>

                <h3 className="mt-1 font-semibold">{category.name}</h3>

                <p className="text-sm text-primary-foreground/70">
                  {category.count} Products
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Categories;
