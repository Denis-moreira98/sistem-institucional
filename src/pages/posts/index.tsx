import styles from "./styles.module.scss";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

import { getPrismicClient } from "../../services/prismic";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-dom";

import {
   FiChevronLeft,
   FiChevronsLeft,
   FiChevronRight,
   FiChevronsRight,
} from "react-icons/fi";
import { GetStaticProps } from "next";

type Post = {
   slug: string;
   title: string;
   cover: string;
   description: string;
   updatedAt: string;
};

interface PostsProps {
   posts: Post[];
}

export default function Posts({ posts: postsBlog }: PostsProps) {
   const [posts, setPosts] = useState(postsBlog || []);
   return (
      <>
         <Head>
            <title>Blog | Moreira dev</title>
         </Head>
         <main className={styles.container}>
            <div className={styles.posts}>
               {posts.map((post) => (
                  <Link
                     key={post.slug}
                     legacyBehavior
                     href={`/post/${post.slug}`}
                  >
                     <a key={post.slug}>
                        <Image
                           height={410}
                           width={720}
                           src={post.cover}
                           alt={post.title}
                           quality={100}
                           blurDataURL="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0s7adBwACqwFOuZTNBQAAAABJRU5ErkJggg==" //https://png-pixel.com/
                           placeholder="blur"
                        />
                        <strong>{post.title}</strong>
                        <time>{post.updatedAt}</time>
                        <p>{post.description}</p>
                     </a>
                  </Link>
               ))}

               <div className={styles.buttonNavigate}>
                  <div>
                     <button>
                        <FiChevronsLeft size={25} color="#FFF" />
                     </button>
                     <button>
                        <FiChevronLeft size={25} color="#FFF" />
                     </button>
                  </div>

                  <div>
                     <button>
                        <FiChevronRight size={25} color="#FFF" />
                     </button>
                     <button>
                        <FiChevronsRight size={25} color="#FFF" />
                     </button>
                  </div>
               </div>
            </div>
         </main>
      </>
   );
}

export const getStaticProps: GetStaticProps = async () => {
   const prismic = getPrismicClient();

   const response = await prismic.query(
      [Prismic.Predicates.at("document.type", "post")],
      {
         orderings: "[document.last_publication_date desc]", //Ordernar pela mais recente
         fetch: ["post.title", "post.description", "post.cover"],
         pageSize: 3,
      }
   );

   const posts = response.results.map((post) => {
      return {
         slug: post.uid,
         title: RichText.asText(post.data.title),
         description:
            post.data.description.find(
               (content) => content.type === "paragraph"
            )?.text ?? "",
         cover: post.data.cover.url,
         updatedAt: new Date(post.last_publication_date).toLocaleDateString(
            "pt-BR",
            {
               day: "2-digit",
               month: "long",
               year: "numeric",
            }
         ),
      };
   });

   return {
      props: {
         posts,
      },
      revalidate: 6 * 30, // atualiza a cada 30 minutos.
   };
};
