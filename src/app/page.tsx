import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CinematicCard } from "@/components/CinematicCard";
import { Strip } from "@/components/Strip";
import { Services } from "@/components/Services";
import { HowItWorks } from "@/components/HowItWorks";
import { Vendors } from "@/components/Vendors";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <CinematicCard />
      <Strip />
      <Services />
      <HowItWorks />
      <Vendors />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
