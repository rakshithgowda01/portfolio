"use client";
import React, { PropsWithChildren, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ContainerScrollProps {
  titleComponent: React.ReactNode;
}

export function ContainerScroll({ titleComponent, children }: PropsWithChildren<ContainerScrollProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.7]);

  return (
    <section ref={ref} className="relative w-full min-h-[120vh] flex flex-col">
      <div className="sticky top-0 z-10 py-10 bg-gradient-to-b from-white/90 to-transparent backdrop-blur-sm">
        {titleComponent}
      </div>
      <motion.div style={{ scale, y, opacity }} className="mt-6 rounded-2xl overflow-hidden shadow-mac-window border border-gray-200">
        {children}
      </motion.div>
      <div className="h-[60vh]" />
    </section>
  );
}

export default ContainerScroll;

