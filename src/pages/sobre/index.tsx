import { GetStaticProps } from "next";
import styles from "./styles.module.scss";
import Head from "next/head";

import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

type Content = {
   title: string;
   description: string;
   banner: string;
   facebook: string;
   instagram: string;
   youtube: string;
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
            <title>Quem somos? | {content.title}</title>
         </Head>
         <main className={styles.container}>
            <div className={styles.containerHeader}>
               <section className={styles.ctaText}>
                  <h1>{content.title}</h1>
                  <p>{content.description}</p>

                  <a href={content.facebook} target="__blank">
                     <FaFacebook size={40} />
                  </a>
                  <a href={content.instagram} target="__blank">
                     <FaInstagram size={40} />
                  </a>
                  <a href={content.linkedin} target="__blank">
                     <FaLinkedin size={40} />
                  </a>
                  <a href={content.youtube} target="__blank">
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

   const {
      title,
      description,
      banner,
      facebook,
      instagram,
      youtube,
      linkedin,
   } = response.results[0].data;

   const content = {
      title: RichText.asText(title),
      description: RichText.asText(description),
      banner: banner.url,
      facebook: facebook.url,
      instagram: instagram.url,
      youtube: youtube.url,
      linkedin: linkedin.url,
   };

   return {
      props: {
         content,
      },
      revalidate: 60 * 15, // a cada 15 minutos vai ser revalidada
   };
};
