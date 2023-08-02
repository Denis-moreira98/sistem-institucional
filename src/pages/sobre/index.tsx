import { GetStaticProps } from "next";
import styles from "./styles.module.scss";
import Head from "next/head";

import { FaLinkedin, FaGithub } from "react-icons/fa";

type Content = {
   title: string;
   description: string;
   banner: string;
   github: string;
   linkedin: string;
};

interface ContentProps {
   content: Content;
}

import { getPrismicClient } from "../../services/prismic";
import { RichText } from "prismic-dom";
import Prismic from "@prismicio/client";

export default function Sobre({ content }: ContentProps) {
   return (
      <>
         <Head>
            <title>Quem somos? | Dev Moreira</title>
         </Head>
         <main className={styles.container}>
            <div className={styles.containerHeader}>
               <section className={styles.ctaText}>
                  <h1>{content.title}</h1>
                  <p>{content.description}</p>

                  <a href={content.linkedin} target="__blank">
                     <FaLinkedin size={40} />
                  </a>
                  <a href={content.github} target="__blank">
                     <FaGithub size={40} />
                  </a>
               </section>
               <img src={content.banner} alt="sobre a empresa" />
            </div>
         </main>
      </>
   );
}

export const getStaticProps: GetStaticProps = async () => {
   const prismic = getPrismicClient();

   const response = await prismic.query([
      Prismic.Predicates.at("document.type", "sobre"),
   ]);

   const { title, description, banner, github, linkedin } =
      response.results[0].data;

   const content = {
      title: RichText.asText(title),
      description: RichText.asText(description),
      banner: banner.url,
      youtube: github.url,
      linkedin: linkedin.url,
   };

   return {
      props: {
         content,
      },
      revalidate: 60 * 15, // a cada 15 minutos vai ser revalidada
   };
};
