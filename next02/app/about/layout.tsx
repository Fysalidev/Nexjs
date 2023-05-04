import React from "react";
import styles from "./page.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About page",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav>About NavBar</nav>
      <main className={styles.main}>{children}</main>
    </>
  );
}
