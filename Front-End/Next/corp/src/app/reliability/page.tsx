import Hero from '@/components/hero'
import reliabilityImg from 'public/reliability.jpg'

export default function ReliabilityPage(){
    return (
        <Hero
        imgData={reliabilityImg}
        imgAlt="reliability"
        title="super high reliability"
      />
    )
}