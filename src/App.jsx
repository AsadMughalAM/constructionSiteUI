import SmoothScroll from '@/components/ui/smooth-scroll'
import Navbar from '@/components/site/Navbar'
import Hero from '@/components/site/Hero'
import Capabilities from '@/components/site/Capabilities'
import Projects from '@/components/site/Projects'
import Stats from '@/components/site/Stats'
import Process from '@/components/site/Process'
import GroundToSkyline from '@/components/site/GroundToSkyline'
import Manifesto from '@/components/site/Manifesto'
import Profile from '@/components/site/Profile'
import Testimonial from '@/components/site/Testimonial'
import Closing from '@/components/site/Closing'

export default function App() {
  return (
    <SmoothScroll>
      <div className="min-h-[100dvh] bg-background text-foreground">
        <Navbar />
        <main>
          <Hero />
          <Capabilities />
          <Projects />
          <Stats />
          <Process />
          <GroundToSkyline />
          <Manifesto />
          <Profile />
          <Testimonial />
        </main>
        <Closing />
      </div>
    </SmoothScroll>
  )
}
