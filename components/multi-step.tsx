"use client";

import useMeasure from "@/hooks/use-measure";
import { motion, MotionConfig, AnimatePresence } from "motion/react";
import { useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const PrimaryButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>>
  = ({ children, className, ...props }) => {
    return (
      <button
        type="button"
        className={cn(`flex w-fit h-[40px] px-3 items-center font-medium text-white rounded-lg cursor-pointer
                  border border-[#4F39F6] bg-gradient-to-b from-indigo-500 to-indigo-600 
                  hover:bg-gradient-to-b hover:from-indigo-500/80 hover:to-indigo-600/80
                  shadow-[0px_1px_0px_0px_rgba(255,255,255,0.10)_inset, 0px_4px_8px_-2px_rgba(0,0,0,0.05), 0px_2px_4px_-1px_rgba(0,0,0,0.05)]`, `${className}`)}
        {...props}
      >
        {children}
      </button>
    );
  };

const SecondaryButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>>
  = ({ children, className, ...props }) => {
    return (
      <button
        type="button"
        className={cn("flex w-fit h-[40px] px-3 items-center font-medium text-[#939393] rounded-lg cursor-pointer", `${className}`)}
        {...props}
      >
        {children}
      </button>
    );
  };

const StepOne = () => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-base">This is step one</h2>
        <p className="text-[#535353]">This is a multi-step component. It&apos;s a great way to guide users through a process.</p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-5 w-2/3 bg-[#f5f5f5] rounded-md" />
        <div className="h-5 w-1/2 bg-[#f5f5f5] rounded-md" />
        <div className="h-5 w-3/4 bg-[#f5f5f5] rounded-md" />
        <div className="h-5 w-1/4 bg-[#f5f5f5] rounded-md" />
      </div>
    </>
  );
};

const StepTwo = () => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-base">This is step two</h2>
        <p className="text-[#535353]">This is a multi-step component. It&apos;s a great way to guide users through a process.</p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-5 w-2/3 bg-[#f5f5f5] rounded-md" />
        <div className="h-5 w-1/2 bg-[#f5f5f5] rounded-md" />
        <div className="h-5 w-3/5 bg-[#f5f5f5] rounded-md" />
      </div>
    </>
  );
};

const StepThree = () => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-base">This is step three</h2>
        <p className="text-[#535353]">This is a multi-step component. It&apos;s a great way to guide users through a process.</p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-5 w-2/3 bg-[#f5f5f5] rounded-md" />
        <div className="h-5 w-1/2 bg-[#f5f5f5] rounded-md" />
        <div className="h-5 w-3/4 bg-[#f5f5f5] rounded-md" />
        <div className="h-5 w-1/4 bg-[#f5f5f5] rounded-md" />
        <div className="h-5 w-2/5 bg-[#f5f5f5] rounded-md" />
      </div>
    </>
  );
};

export default function MultiStep() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [clickDirection, setClickDirection] = useState<number>(1);
  const ref = useRef(null);
  const { height } = useMeasure({ ref });

  const steps = useMemo(() => {
    switch (currentStep) {
      case 0:
        return <StepOne />;
      case 1:
        return <StepTwo />;
      case 2:
        return <StepThree />;
    }
  }, [currentStep]);

  const variants = {
    initial: (custom: number) => ({
      x: `${100 * custom}%`,
      filter: "blur(3px)",
      opacity: 0,
    }),
    animate: () => ({
      x: 0,
      filter: "blur(0)",
      opacity: 1,
    }),
    exit: (custom: number) => ({
      x: `${-100 * custom}%`,
      filter: "blur(3px)",
      opacity: 0,
    }),
  };

  return (
    <div className="h-[400px] flex items-center">
      <MotionConfig transition={{ type: 'spring', bounce: 0, duration: 0.6 }}>
        <motion.div
          animate={{ height }}
          className="relative flex flex-col max-w-[460px] w-full bg-[#fafafa] rounded-2xl overflow-hidden
              shadow-[0px_0px_0px_1px_rgba(0,0,0,0.10),0px_12px_24px_-6px_rgba(51,51,51,0.03),0px_8px_16px_-4px_rgba(51,51,51,0.03),0px_4px_8px_-2px_rgba(51,51,51,0.03),0px_2px_4px_-0.5px_rgba(51,51,51,0.03)]"
        >
          <div
            ref={ref}
            className="h-fit w-full"
          >
            <div className="p-1">
              <motion.div
                layout
                className="bg-white p-6 mb-4 border-[0.5px] border-black/10 rounded-xl overflow-hidden"
              >
                <AnimatePresence
                  mode="popLayout"
                  initial={false}
                  custom={clickDirection}
                >
                  <motion.div
                    key={currentStep}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    custom={clickDirection}
                    className="flex flex-col gap-6"
                  >
                    {steps}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
              <motion.div layout className="flex mb-3 px-2 justify-between">
                <SecondaryButton
                  aria-label="Go to previous step"
                  className="disabled:cursor-not-allowed disabled:invisible"
                  disabled={currentStep === 0}
                  onClick={() => {
                    if (currentStep === 0) {
                      return;
                    }
                    setCurrentStep((prev) => prev - 1);
                    setClickDirection(-1);
                  }}
                >
                  <span>Back</span>
                </SecondaryButton>
                <PrimaryButton
                  aria-label="Go to next step"
                  onClick={() => {
                    if (currentStep === 2) {
                      setCurrentStep(0);
                      return;
                    }
                    setCurrentStep((prev) => prev + 1);
                    setClickDirection(1);
                  }}
                >
                  <span>{currentStep === 2 ? "Complete" : "Continue"}</span>
                </PrimaryButton>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </MotionConfig>
    </div>
  );
}