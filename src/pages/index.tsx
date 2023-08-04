import { GetStaticProps } from "next";

import Head from "next/head";
import styles from "../styles/home.module.scss";
import Image from "next/image";
import TechsImg from "../../public/images/techs.svg";
import { Poppins } from "next/font/google";

import { getPrismicClient } from "../services/prismic";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-dom";

const poppins = Poppins({
   weight: ["400", "500", "700", "900"],
   preload: false,
});

type Content = {
   title: string;
   linkAction: string;
   titleContent: string;
   mobileTitle: string;
   mobileContent: string;
   mobileBanner: string;
   titleWeb: string;
   webContent: string;
   webBanner: string;
};

interface ContentProps {
   content: Content;
}

export default function Home({ content }: ContentProps) {
   return (
      <>
         <Head>
            <title>Apaixonado por tecnologia - Dev Moreira</title>
            <meta name="description" content="Generated by create next app" />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <main className={`${poppins.className} ${styles.container}`}>
            <div className={styles.containerHeader}>
               <section className={styles.ctaText}>
                  <h1>{content.title}</h1>

                  <span>{content.titleContent}</span>
                  <a href={content.linkAction}>
                     <button>Começar Agora!</button>
                  </a>
               </section>
               <img src="/images/imgTec.svg" alt="conteudos" />
            </div>
            <hr className={styles.divisor} />

            <div className={styles.sectionContent}>
               <section>
                  <h2>{content.mobileTitle}</h2>
                  <span>{content.mobileContent}</span>
               </section>

               <img
                  src={content.mobileBanner}
                  alt="Conteúdos desenvolvimento de apps"
               />
            </div>

            <hr className={styles.divisor} />

            <div className={styles.sectionContent}>
               <img
                  src={content.webBanner}
                  alt="Conteúdos desenvolvimento de aplicacoes web"
               />

               <section>
                  <h2>{content.titleWeb}</h2>
                  <span>{content.webContent}</span>
               </section>
            </div>
            <div className={styles.nextLevelContent}>
               <Image src={TechsImg} alt="tecnologias" />
               <h2>
                  Saiba as principais tecnologias utilizadas no mercado atual!
               </h2>
               <span>Notícias sobre as tendências.</span>
               <a href="/posts">
                  <button>ACESSAR</button>
               </a>
            </div>
         </main>
      </>
   );
}

export const getStaticProps: GetStaticProps = async () => {
   const prismic = getPrismicClient();

   const response = await prismic.query([
      Prismic.Predicates.at("document.type", "home"),
   ]);

   //console.log(response.results[0].data);
   const {
      title,
      sub_title,
      link_action,
      mobile,
      mobile_content,
      mobile_banner,
      title_web,
      web_content,
      web_banner,
   } = response.results[0].data;

   const content = {
      title: RichText.asText(title),
      linkAction: link_action.url,
      titleContent: RichText.asText(sub_title),
      mobileTitle: RichText.asText(mobile),
      mobileContent: RichText.asText(mobile_content),
      mobileBanner: mobile_banner.url,
      titleWeb: RichText.asText(title_web),
      webContent: RichText.asText(web_content),
      webBanner: web_banner.url,
   };

   return {
      props: {
         content,
      },
      revalidate: 60 * 2, // a cada dois minutos
   };
};
