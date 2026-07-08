import HeroSection from "../features/home/HeroSection";
import Categories from "../features/home/Categories";
import Trending from "../features/home/Trending";
import FlashSale from "../features/home/FlashSale";
import NewArrivals from "../features/home/NewArrivals";
import Newsletter from "../features/home/NewsLetter";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <Categories />
      <Trending />
      <FlashSale />
      <NewArrivals />
      <Newsletter />
    </>
  );
};

export default HomePage;
