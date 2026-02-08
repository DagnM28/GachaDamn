"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import {
  Sparkles,
  Rocket,
  Sword,
  Shield,
  Star,
  Zap,
  Globe,
} from "lucide-react";
import styles from "./demo.module.css";

export default function DemoPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState<"small" | "medium" | "large">(
    "medium",
  );
  const [isNoTitleModalOpen, setIsNoTitleModalOpen] = useState(false);

  // Slider states
  const [sliderValue1, setSliderValue1] = useState(75);
  const [sliderValue2, setSliderValue2] = useState(50);
  const [sliderValue3, setSliderValue3] = useState(30);

  const openModal = (size: "small" | "medium" | "large") => {
    setModalSize(size);
    setIsModalOpen(true);
  };

  return (
    <div className={styles.container}>
      <h1>{t("demo.title")}</h1>

      <Card title={t("demo.languageDemo")} variant="primary">
        <div className={styles.languageDemo}>
          <div className={styles.languageInfo}>
            <Globe size={24} className={styles.globeIcon} />
            <div>
              <p className={styles.languageLabel}>
                <strong>{t("demo.currentLanguage")}:</strong> {locale} -{" "}
                {t("common.welcome")}
              </p>
              <p className={styles.greeting}>{t("demo.greeting")}</p>
              <p className={styles.description}>{t("demo.description")}</p>
            </div>
          </div>
        </div>
      </Card>

      <Card title="Primary Variant" variant="default">
        <div className={styles.buttonGroup}>
          <Button variant="primary">Default</Button>
          <Button variant="primary" icon={<Sparkles size={18} />}>
            With Icon
          </Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
        </div>
      </Card>

      <Card title="Secondary Variant" variant="default">
        <div className={styles.buttonGroup}>
          <Button variant="secondary">Default</Button>
          <Button variant="secondary" icon={<Rocket size={18} />}>
            With Icon
          </Button>
          <Button variant="secondary" disabled>
            Disabled
          </Button>
        </div>
      </Card>

      <Card title="Different Icons" variant="primary">
        <div className={styles.buttonGroup}>
          <Button icon={<Sword size={18} />}>Attack</Button>
          <Button icon={<Shield size={18} />} variant="secondary">
            Defend
          </Button>
          <Button icon={<Star size={18} />}>Collect</Button>
          <Button icon={<Zap size={18} />} variant="secondary">
            Power Up
          </Button>
        </div>
      </Card>

      <Card title="Interactive Test" variant="secondary">
        <div className={styles.buttonGroup}>
          <Button onClick={() => alert("Primary clicked!")}>Click Me</Button>
          <Button
            variant="secondary"
            icon={<Sparkles size={18} />}
            onClick={() => alert("Secondary clicked!")}
          >
            Click Me Too
          </Button>
        </div>
      </Card>

      <Card title="Loading State" variant="default">
        <div className={styles.buttonGroup}>
          <Button loading>Loading</Button>
          <Button variant="secondary" loading>
            Processing
          </Button>
          <Button icon={<Star size={18} />} loading>
            Please Wait
          </Button>
        </div>
      </Card>

      <Card title="Progress Bars & Sliders" variant="default">
        <div className={styles.progressGroup}>
          <div>
            <p className={styles.progressLabel}>Health (75%)</p>
            <ProgressBar value={75} variant="default" size="medium" showLabel />
          </div>
          <div>
            <p className={styles.progressLabel}>Mana (50%)</p>
            <ProgressBar value={50} variant="primary" size="medium" showLabel />
          </div>
          <div>
            <p className={styles.progressLabel}>Experience (90%)</p>
            <ProgressBar
              value={90}
              variant="secondary"
              size="medium"
              showLabel
            />
          </div>

          <div className={styles.divider} />

          <div>
            <p className={styles.progressLabel}>Volume ({sliderValue1})</p>
            <Slider
              value={sliderValue1}
              onChange={setSliderValue1}
              variant="default"
              size="medium"
              showLabel
            />
          </div>
          <div>
            <p className={styles.progressLabel}>Brightness ({sliderValue2})</p>
            <Slider
              value={sliderValue2}
              onChange={setSliderValue2}
              variant="primary"
              size="medium"
              showLabel
            />
          </div>
          <div>
            <p className={styles.progressLabel}>Difficulty ({sliderValue3})</p>
            <Slider
              value={sliderValue3}
              onChange={setSliderValue3}
              variant="secondary"
              size="medium"
              showLabel
            />
          </div>
        </div>
      </Card>

      <Card title="States Guide" variant="default">
        <ul className={styles.guide}>
          <li>
            <strong>Idle:</strong> Stars float gently
          </li>
          <li>
            <strong>Hover:</strong> Stars move outward, border glows and
            animates
          </li>
          <li>
            <strong>Click:</strong> Stars burst outward with rotation
          </li>
          <li>
            <strong>Loading:</strong> Spinner animation, border slides
            continuously
          </li>
          <li>
            <strong>Disabled:</strong> Grayscale, no animations
          </li>
        </ul>
      </Card>

      <Card title="Modal Component" variant="default">
        <div className={styles.buttonGroup}>
          <Button onClick={() => openModal("small")}>Small Modal</Button>
          <Button variant="secondary" onClick={() => openModal("medium")}>
            Medium Modal
          </Button>
          <Button icon={<Star size={18} />} onClick={() => openModal("large")}>
            Large Modal
          </Button>
          <Button onClick={() => setIsNoTitleModalOpen(true)}>
            No Title Modal
          </Button>
        </div>
      </Card>

      <Card title="Hoverable Cards" variant="default">
        <div className={styles.cardGrid}>
          <Card variant="default" hoverable>
            <p>Hover me! I have interactive animations.</p>
          </Card>
          <Card variant="primary" hoverable>
            <p>Primary card with hover effect.</p>
          </Card>
          <Card variant="secondary" hoverable>
            <p>Secondary card with hover effect.</p>
          </Card>
        </div>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Fantasy Modal"
        size={modalSize}
      >
        <div className={styles.modalContent}>
          <h3>Welcome to the Modal</h3>
          <p>
            This modal features the same fantasy-scifi design language as the
            buttons, with animated borders, floating stars, and smooth
            animations.
          </p>
          <p>
            The modal opens from the center with a 3D rotation effect and closes
            with the reverse animation. Stars burst in when opening and float
            gently.
          </p>
          <div className={styles.buttonGroup} style={{ marginTop: "1.5rem" }}>
            <Button icon={<Sparkles size={18} />}>Action Button</Button>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Close Modal
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isNoTitleModalOpen}
        onClose={() => setIsNoTitleModalOpen(false)}
        size="medium"
      >
        <div className={styles.modalContent}>
          <h3>Modal Without Title Bar</h3>
          <p>
            This modal doesn't have a title or close button in the header. You
            can close it by clicking outside the modal or using a button inside.
          </p>
          <div className={styles.buttonGroup} style={{ marginTop: "1.5rem" }}>
            <Button
              variant="secondary"
              onClick={() => setIsNoTitleModalOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
