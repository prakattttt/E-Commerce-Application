import HeroSection from "../features/home/components/HeroSection";
import Categories from "../features/home/components/Categories";
import Trending from "../features/home/components/Trending";
import FlashSale from "../features/home/components/FlashSale";
import NewArrivals from "../features/home/components/NewArrivals";
import Newsletter from "../features/home/components/NewsLetter";
import Featured from "../features/home/components/Featured";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <Categories />
      <Featured />
      <Trending />
      <FlashSale />
      <NewArrivals />
      <Newsletter />
    </>
  );
};

export default HomePage;
