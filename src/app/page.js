import AdditionalSection from "@/components/AdditionalSection";
import Banner from "@/components/Bannar";
import TopCard from "@/components/TopCard";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner></Banner>

      <TopCard></TopCard>
      <AdditionalSection></AdditionalSection>
    </div>
  );
}
