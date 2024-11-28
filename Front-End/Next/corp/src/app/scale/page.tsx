import Hero from "@/components/hero";
import Link from "next/link";
import scaleImg from 'public/scale.jpg'

export default function ScalePage(){
    return (
        <Hero
        imgData={scaleImg}
        imgAlt="scale"
        title="Scaling the apps"
      />
    )
}