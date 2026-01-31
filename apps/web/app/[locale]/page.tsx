"use client";

import { useTranslations } from "next-intl";
import { Sparkles, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import styles from "./page.module.css";

export default function Home() {
  const t = useTranslations("common");

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.title}>GachaDamn Wiki</h1>
        <p className={styles.subtitle}>
          Your comprehensive guide to Genshin Impact & Honkai: Star Rail
        </p>
      </section>

      <section className={styles.games}>
        <div className={styles.gameCard}>
          <div className={styles.gameIcon}>🌟</div>
          <h2>Genshin Impact</h2>
          <p>Explore Teyvat, master elemental combat, and discover the secrets of seven nations.</p>
          <Button icon={<Sparkles size={18} />} variant="primary">
            Coming Soon
          </Button>
        </div>

        <div className={styles.gameCard}>
          <div className={styles.gameIcon}>🚂</div>
          <h2>Honkai: Star Rail</h2>
          <p>Journey through the cosmos aboard the Astral Express in this turn-based RPG adventure.</p>
          <Button icon={<Rocket size={18} />} variant="secondary">
            Coming Soon
          </Button>
        </div>
      </section>

      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Features</h2>
        <div className={styles.featureGrid}>
          <div className={styles.feature}>
            <h3>📚 Character Database</h3>
            <p>Detailed information about all playable characters</p>
          </div>
          <div className={styles.feature}>
            <h3>⚔️ Combat Guides</h3>
            <p>Master team compositions and battle strategies</p>
          </div>
          <div className={styles.feature}>
            <h3>🗺️ Interactive Maps</h3>
            <p>Find collectibles, chests, and hidden secrets</p>
          </div>
          <div className={styles.feature}>
            <h3>📖 Lore & Story</h3>
            <p>Dive deep into the rich narratives of both games</p>
          </div>
        </div>
      </section>
    </div>
  );
}
