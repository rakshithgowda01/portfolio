"use client";
import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { cn } from "@/lib/utils";

export const CardContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["17.5deg", "-17.5deg"],
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-17.5deg", "17.5deg"],
  );

  const transform = useMotionTemplate`perspective(1200px) rotateX(${rotateX}) rotateY(${rotateY}) scale3d(1,1,1)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("group/card", className)}
    >
      <motion.div
        style={{
          transform,
        }}
        className="relative h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      className={cn(
        "relative h-full w-full",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateZ = 0,
  ...rest
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  translateZ?: number | string;
} & React.HTMLAttributes<HTMLElement>) => {
  return (
    <Tag
      className={cn("group-hover/card:translate-z-[50px] transition-transform", className)}
      style={{
        transform: `translateZ(${translateZ}px)`,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};
