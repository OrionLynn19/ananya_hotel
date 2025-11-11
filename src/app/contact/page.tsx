"use client";

import FaqHero from "../components/FaqHero";
import FaqAccordion from "../components/FaqAccordion"; // ← add this

export default function Contact() {
  return (
    <main className="bg-white overflow-x-hidden">
      <FaqHero />

     
      <section className="pt-10 md:pt-14">
        <FaqAccordion />
      </section>

      
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-20">
       
      </section>
    </main>
  );
}
