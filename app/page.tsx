"use client";
import Slider1 from "@/assets/images/slider-1.jpg";
import Slider2 from "@/assets/images/slider-2.jpg";
import Slider3 from "@/assets/images/slider-3.jpg";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Button from "@/components/Button";
import {
  Children,
  PropsWithChildren,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { motion, Variants, AnimatePresence, useAnimation } from "framer-motion";

const variants: Variants = {
  initial: (direction) => ({
    rotateY: 90 * direction,
    // y: direction < 0 ? "-50%" : "50%",
    // scale: 1.2,
    // opacity: 0,
    // left: direction < 0 ? "-100%" : "100%",
    // filter: "blur(100px)",
  }),
  animate: {
    // filter: "blur(0px)",
    rotateY: 0,
    // opacity: 1,
    // scale: 1,
    // left: "0",
    // y: "0"
  },
  exit: (direction) => ({
    // filter: "blur(100px)",
    // opacity: 0,
    // scale: 1.2,
    rotateY: -90 * direction,
    // y: direction < 0 ? "50%" : "-50%",
    // scale: 1.5
    // left: direction < 0 ? "100%" : "-100%",
  }),
};

type Direction = -1 | 1; // left | right;

const SlideIn = (props: PropsWithChildren) => {
  const id = useId();
  const childrenArray = Children.toArray(props.children);
  return (
    <>
      {childrenArray.map((node, idx) => (
        <motion.div className="overflow-hidden" key={`${id}-${idx}`}>
          <motion.div
            style={{ transformStyle: "preserve-3d" }}
            transition={{ duration: 0.5, delay: idx * 0.4 }}
            initial={{ opacity: 0, y: "50%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: "50%",
              transition: {
                delay: idx * 0.4,
                duration: 0.3,
              },
            }}
          >
            {node}
          </motion.div>
        </motion.div>
      ))}
    </>
  );
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
    const interval = setTimeout(() => {
      changeSlide(1);
    }, automaticTransitionDelay * 1000);

    return () => clearTimeout(interval);
  }, [currentIdx, isAnimating]);

  function changeSlide(direction: Direction) {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(direction);

    setTimeout(() => setIsAnimating(false), animationDuration);

    if (direction == -1) {
      goPrevious();
    } else {
      goNext();
    }
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
    <div className="h-[660px] relative group overflow-hidden" style={{ perspective: 500 }}>
      <AnimatePresence custom={direction} initial={false} mode="wait">
        <motion.div
          onTransitionEnd={(e) => console.log(e.eventPhase)}
          style={{ backgroundImage: `url(${images.at(currentIdx)})` }}
          className="bg-no-repeat bg-cover bg-top h-full w-full absolute brightness-[0.3]"
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          key={images.at(currentIdx)}
          transition={
            {
              // duration: 0.6
              opacity: {
                duration: opacityTransitionDuration,
              },
              rotateY: {
                duration: 0.4,
              },
              scale: {
                duration: scaleTransitionDuration,
              },
            }
          }
          custom={direction}
        ></motion.div>
      </AnimatePresence>
      <Button
        className="absolute left-10 top-1/2 -translate-y-1/2 hidden group-hover:block z-50"
        variant="ghost"
        size="icon"
        onClick={() => changeSlide(-1)}
      >
        <ChevronLeftIcon className="w-8 h-8" />
      </Button>
      <Button
        className="absolute right-10 top-1/2 -translate-y-1/2 hidden group-hover:block z-50"
        variant="ghost"
        size="icon"
        onClick={() => changeSlide(1)}
      >
        <ChevronRightIcon className="w-8 h-8" />
      </Button>
      <AnimatePresence mode="wait">
        {currentIdx == 0 ? (
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-center w-full"
            key={`${images.at(currentIdx)}-content-container`}
          >
            <SlideIn>
              <p className="text-4xl uppercase font-medium text-primary">
                Lorem ipsum dolor sit amet.
              </p>
              <b className="text-foreground text-9xl tracking-wider font-bold leading-[1.175]">
                technology
              </b>
              <Button size="large" className="mt-5">
                Get Started
              </Button>
            </SlideIn>
          </motion.div>
        ) : (
          <motion.div
            key={`${images.at(currentIdx)}-content-container`}
            className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full  text-start pl-28"
          >
            <SlideIn>
              <p className="text-ascent-foreground text-7xl font-bold">
                Experience in
                <br /> Financial & Business
                <br /> Services
              </p>
              <p className="text-ascent-foreground text-2xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
                culpa!
              </p>
              <Button size="large" className="mt-5">
                Explore Now
              </Button>
            </SlideIn>
          </motion.div>
        )}
      </AnimatePresence>
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
