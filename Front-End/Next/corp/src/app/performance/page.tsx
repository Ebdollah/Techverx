import Hero from "@/components/hero";
import Link from "next/link";
import performanceImg from 'public/performance.jpg'
export default function PerformancePage(){
    return (
        <Hero 
        imgData={performanceImg}
        imgAlt="welding"
        title="We serve high performance app"
      />
    )
}