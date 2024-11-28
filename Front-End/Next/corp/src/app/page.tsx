import Hero from "@/components/hero";

import homeImg from 'public/home.jpg';

export default function Home() {
  return (
    <Hero 
        imgData={homeImg}
        imgAlt="car factory"
        title="Global Cloud Hosting"
      />
  );
}
