"use client";
import Slider1 from "@/assets/images/slider-1.jpg";
import Slider2 from "@/assets/images/slider-2.jpg";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Button from "@/components/Button";
import { useEffect, useRef, useState } from "react";
import { motion, Variants, AnimatePresence, useAnimation } from "framer-motion";

const variants: Variants = {
  initial: (direction) => ({
    opacity: 0,
    scale: 1.2,
    // left: direction < 0 ? "-100%" : "100%",
  }),
  animate: {
    opacity: 1,
    scale: 1,
    // left: "0",
  },
  exit: (direction) => ({
    opacity: 0,
    scale: 1.2,
    // left: direction < 0 ? "100%" : "-100%",
  }),
};

type Direction = -1 | 1; // left | right;

const textAnimation: Variants = {
  hidden: {
    opacity: 0,
    y: "200%",
  },

  revealIn: {
    opacity: 1,
    y: "0",
  },

  hideOut: {
    opacity: 0,
    y: "-200%",
  },
};

function ImageSlider() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState<Direction>(1);
  const images = [Slider1.src, Slider2.src];
  const [isAnimating, setIsAnimating] = useState(false);
  const opacityTransitionDuration = 2; // Seconds
  const automaticTransitionDelay = 5; // Seconds
  const scaleTransitionDuration = 2; // Seconds

  const animationDuration =
    Math.max(opacityTransitionDuration, scaleTransitionDuration) * 1000;

  useEffect(() => {
    console.log("Here");
    const interval = setTimeout(() => {
      changeSlide(1);
    }, automaticTransitionDelay * 1000);

    return () => clearTimeout(interval);
  }, [currentIdx, isAnimating]);

  function changeSlide(direction: Direction) {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(direction);

    if (direction == -1) {
      goPrevious();
    } else {
      goNext();
    }

    setTimeout(() => {
      setIsAnimating(false);
    }, animationDuration);
  }

  function goNext() {
    const nextIndex = (currentIdx + 1) % images.length;
    setCurrentIdx(nextIndex);
  }

  function goPrevious() {
    const nextIndex = currentIdx === 0 ? images.length - 1 : currentIdx - 1;
    setCurrentIdx(nextIndex);
  }

  return (
    <div className="h-[660px] relative group">
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          style={{ backgroundImage: `url(${images.at(currentIdx)})` }}
          className="bg-no-repeat bg-cover bg-top h-full w-full absolute"
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          key={images.at(currentIdx)}
          transition={{
            opacity: {
              duration: opacityTransitionDuration,
            },

            scale: {
              duration: scaleTransitionDuration,
            },
          }}
          custom={direction}
        ></motion.div>
      </AnimatePresence>
      <Button
        className="absolute left-10 top-1/2 -translate-y-1/2 hidden group-hover:block"
        variant="ghost"
        size="icon"
        onClick={() => changeSlide(-1)}
      >
        <ChevronLeftIcon className="w-8 h-8" />
      </Button>
      <Button
        className="absolute right-10 top-1/2 -translate-y-1/2 hidden group-hover:block"
        variant="ghost"
        size="icon"
        onClick={() => changeSlide(1)}
      >
        <ChevronRightIcon className="w-8 h-8" />
      </Button>
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-center w-[800px]"
        // transition={{ staggerChildren: 1 }}
      >
        <div className="overflow-hidden h-10 relative">
          <AnimatePresence>
            <motion.p
              className="text-background text-4xl uppercase absolute w-full"
              initial="hidden"
              animate="revealIn"
              exit="hideOut"
              variants={textAnimation}
              key={`${images.at(currentIdx)}-p`}
              transition={{ duration: 2, type: "spring" }}
            >
              It software solution &
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="overflow-hidden h-36 relative">
          <AnimatePresence>
            <motion.h2
              className="text-foreground text-9xl font-bold absolute w-full"
              initial="hidden"
              animate="revealIn"
              exit="hideOut"
              variants={textAnimation}
              key={`${images.at(currentIdx)}-h2`}
              transition={{ duration: 2, type: "spring" }}
            >
              technology
            </motion.h2>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

function HeroSection() {
  return (
    <div className="overflow-hidden">
      <ImageSlider />
      <div className="bg-primary text-primary-foreground text-center py-8">
        Stop wasting time and money on technology. Explore notech and get best
        solutions.
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <HeroSection />
    </main>
  );
}
