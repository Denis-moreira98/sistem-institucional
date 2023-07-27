import styles from "./styles.module.scss";
import Image from "next/image";
import logo from "../../../public/images/logo.svg";
import { ActiveLink } from "../activeLink";

export function Header() {
   return (
      <header className={styles.headerContainer}>
         <div className={styles.headerContent}>
            <ActiveLink href="/" activeClassName={styles.active}>
               <Image src={logo} alt="logo" />
            </ActiveLink>
            <nav>
               <ActiveLink
                  href="/"
                  legacyBehavior
                  activeClassName={styles.active}
               >
                  <a>Home</a>
               </ActiveLink>

               <ActiveLink
                  href="/posts"
                  legacyBehavior
                  activeClassName={styles.active}
               >
                  <a>Conteúdos</a>
               </ActiveLink>

               <ActiveLink
                  href="/sobre"
                  legacyBehavior
                  activeClassName={styles.active}
               >
                  <a>Quem somos?</a>
               </ActiveLink>
            </nav>
            <button className={styles.readyButton}>
               <a href="https://denis-moreira-portfolio.vercel.app/#home">
                  Começar
               </a>
            </button>
         </div>
      </header>
   );
}
