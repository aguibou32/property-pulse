import Hero from "@/components/Hero";
import HomeProperties from "@/components/HomeProperties";
import InfoBoxes from "@/components/InfoBoxes";

import connectDB from "./config/database";
import FeaturedProperties from "@/components/FeaturedProperties";

const HomePage = () => {

  connectDB()

  return (
    <>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
      <HomeProperties />
    </>
  );
};
export default HomePage;
 