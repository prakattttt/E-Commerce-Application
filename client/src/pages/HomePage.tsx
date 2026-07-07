import HeroSection from "../components/main/HeroSection";
import Categories from "../components/main/Categories";
import Trending from "../components/main/Trending";
import FlashSale from "../components/main/FlashSale";
import NewArrivals from "../components/main/NewArrivals";
import Newsletter from "../components/main/NewsLetter";

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
