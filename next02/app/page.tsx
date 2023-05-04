import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <h1>Hello word</h1>
      <Link href="/about">Link to About</Link>
    </main>
  );
}
