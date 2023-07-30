import styles from "./styles.module.scss";
import Head from "next/head";
import Link from "next/link";

import Image from "next/image";
import thumbImg from "../../../public/images/thumb.png";

import {
   FiChevronLeft,
   FiChevronsLeft,
   FiChevronRight,
   FiChevronsRight,
} from "react-icons/fi";

export default function Posts() {
   return (
      <>
         <Head>
            <title>Blog | Moreira dev</title>
         </Head>
         <main className={styles.container}>
            <div className={styles.posts}>
               <Link legacyBehavior href="#">
                  <a>
                     <Image
                        height={410}
                        width={720}
                        src={thumbImg}
                        alt="Post titulo 1"
                        quality={100}
                     />
                     <strong>Criando meu primeiro aplicativo</strong>
                     <time>14 JULHO 2023</time>
                     <p>
                        Hoje vamos criar o controle de mostrar a senha no input,
                        uma opção para os nossos formulários de cadastro e
                        login. Mas Chega de conversa e bora pro código junto
                        comigo que o video está show de bola
                     </p>
                  </a>
               </Link>

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