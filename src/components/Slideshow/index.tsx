"use client";
import {useEffect, useState} from "react";
import Image from "next/image";
import styles from "./styles.module.css";

const slideshow1 = "/images/art2.jpg";
const slideshow2 = "/images/art3.jpg";
const slideshow3 = "/images/art4.jpg";

export default function Slideshow() {
  const imageArray = [slideshow1, slideshow2, slideshow3];

  const [pause, setPause] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (pause) {
        return;
      }
      if (index === imageArray.length - 1) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [index, pause]);

  return (
    <div className={styles.slideshow_container}>
      <div className={styles.slideshow}>
        {imageArray.map((image, i) => (
          <Image
            width={333}
            height={333}
            alt="slideshow"
            className={`${styles.slideshow_image} ${
              index === i ? styles.active : styles.inactive
            }`}
            src={image}
            key={`slide-show-${i}`}
            fetchPriority={i == 0 ? 'high' : 'low'}
            loading={i == 0 ? 'eager' : 'lazy'}
          ></Image>
        ))}
      </div>
    </div>
  );
}
