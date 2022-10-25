import styles from "./Nav.module.css";
import Link from "next/link";

const Nav = () => {
  return (
    <div className={styles.container}>
      <div className={styles.links}>
        <Link href="/">Home</Link>
        <Link href="/photography">Photography</Link>
        <Link href="/admin">Admin</Link>
      </div>
    </div>
  );
};

export default Nav;
