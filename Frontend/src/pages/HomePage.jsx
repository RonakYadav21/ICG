import Footer from "../components/UI/Footer";
import Navbar from "../components/UI/Navbar";
import Header from "../components/HomePage/Header";
import Section2 from "../components/HomePage/Section2";
import Section3 from "../components/HomePage/Section3";
import Section4 from "../components/HomePage/Section4";

const HomePage = () => {
  return (
    <div className="bg-[#FCFBF7] text-[#1E1E24]">
      <Navbar />
      <Header />
      <Section2 />
      <Section3 />
      <Section4 />
      <Footer />
    </div>
  );
};

export default HomePage;
