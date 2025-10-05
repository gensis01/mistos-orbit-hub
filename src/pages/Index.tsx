import Hero from "@/components/Hero";
import Features from "@/components/Features";
import DeviceList from "@/components/DeviceList";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Features />
      <DeviceList />
      <Footer />
    </div>
  );
};

export default Index;
