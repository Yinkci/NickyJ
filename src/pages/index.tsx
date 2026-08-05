import Head from "next/head";
import { useRouter } from "next/router";
import { siteConfig } from "@/data/config";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Projects } from "@/sections/Projects";
import { Skills } from "@/sections/Skills";
import { Other } from "@/sections/Other";

export default function HomePage() {
  // Icon hrefs must carry the basePath, which is "/NickyJ" on GitHub Pages and
  // empty locally. Hard-coding "/favicon.svg" would 404 once deployed.
  const { basePath } = useRouter();

  return (
    <>
      <Head>
        <title>Nicky Jacobo — Senior Full Stack Developer</title>
        <meta name="description" content={siteConfig.description} />

        <link rel="icon" href={`${basePath}/favicon.svg`} type="image/svg+xml" />
        <link rel="alternate icon" href={`${basePath}/favicon.ico`} sizes="32x32" />
        <link rel="apple-touch-icon" href={`${basePath}/apple-touch-icon.png`} sizes="180x180" />
        <meta name="theme-color" content="#08070a" />
      </Head>

      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Other />
      </main>
      <Footer />
    </>
  );
}
