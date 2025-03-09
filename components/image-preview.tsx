"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog } from "radix-ui";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { X } from "lucide-react";

const MotionImage = motion.create(Image);

export default function ImagePreview() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex flex-col w-[260px] rounded-xl border border-black/10">
      <MotionConfig transition={{ type: "spring", stiffness: 300, damping: 30, mass: 1, duration: 0.6 }}>
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
          <Dialog.Trigger asChild>
            <motion.div
              layoutId="image-preview-dialog"
              className="z-10 relative cursor-pointer w-full aspect-video rounded-lg"
              role="button"
            >
              <MotionImage
                layoutId="image-preview"
                src="/gyoza-shop.jpg"
                alt="gyoza shop in Tokyo, Japan."
                fill
                className="rounded-lg object-cover"
              />
            </motion.div>
          </Dialog.Trigger>
          <Dialog.Portal>
            <AnimatePresence initial={false} mode="sync">
              {isOpen && (
                <>
                  <Dialog.Overlay asChild>
                    <motion.div
                      className="fixed inset-0 h-full w-full backdrop-blur-xs z-40"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  </Dialog.Overlay>
                  <Dialog.Content asChild>
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                      <VisuallyHidden>
                        <Dialog.Title>Image Preview</Dialog.Title>
                      </VisuallyHidden>
                      <motion.div
                        layoutId="image-preview-dialog"
                        className="relative w-[720px] aspect-video bg-gray-200 overflow-hidden rounded-2xl"
                        role="dialog"
                        aria-modal="true"
                      >
                        <MotionImage
                          layoutId="image-preview"
                          src="/gyoza-shop.jpg"
                          alt="gyoza shop in Tokyo, Japan."
                          fill
                          className="rounded-2xl object-cover"
                        />
                        <Dialog.Close asChild>
                          <button
                            type="button"
                            role="button"
                            aria-label="Close dialog"
                            className="absolute top-3 right-3 h-fit w-fit p-[6px] rounded-full backdrop-blur z-10 bg-white/20 border border-white/20 hover:bg-white/50 focus-visible:outline-none"
                          >
                            <X size={20} color="white" />
                          </button>
                        </Dialog.Close>
                      </motion.div>
                    </div>
                  </Dialog.Content>
                </>
              )}
            </AnimatePresence>
          </Dialog.Portal>
        </Dialog.Root>
      </MotionConfig>
    </div>
  );
}