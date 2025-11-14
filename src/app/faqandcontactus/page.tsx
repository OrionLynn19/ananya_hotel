" use client" ; 
import FaqHero from "../components/FaqHero";
import FaqAccordion from "../components/FaqAccordion";
import { FAQ_DATA } from "@/app/data/faq.data";
import FAQ2 from "../components/FAQsec2";
export default function FaqAndContactUs () {
    return <div> <main className="bg-white overflow-x-hidden">
      <FaqHero />

      <section className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <FaqAccordion items={FAQ_DATA} />
      </section>
      </main>
      <FAQ2 />
     </div>   

}