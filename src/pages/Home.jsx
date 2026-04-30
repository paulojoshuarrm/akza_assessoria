import Hero from "../components/Hero";
import Services from "../components/Services";
import Marquee from "../components/Marquee";
import Proof from "../components/Proof";
import Process from "../components/Process";

export default function Home({ ready }) {
  return (
    <>
      <Hero ready={ready} />
      <Services />
      <Marquee />
      <Proof />
      <Process />
    </>
  );
}
