'use client';

import {
  AnimatePresence,
  HTMLMotionProps,
  LayoutGroup,
  motion,
  MotionConfig,
  Point,
  useReducedMotion,
  useSpring,
} from 'motion/react';
import { useMagneticTarget } from '../../hooks/cursor/magnetic/use-magnetic-target';
import { useHasPointerMoved } from '../../hooks/cursor/use-has-pointer-moved';
import { usePointerPosition } from '../../hooks/cursor/use-pointer-position';
import { useCursorIsInView } from '../../hooks/cursor/use-cursor-in-view';
import { useCursorStyles } from '../../hooks/cursor/use-cursor-styles';
import { useCursorState } from '../../hooks/cursor/use-cursor-state';
import { useBodyPortal } from '../../hooks/cursor/use-body-portal';
import { getCursorSize } from '../../hooks/cursor/get-cursor-size';
import { useOffset } from '../../hooks/cursor/use-offset';
import { CursorProps } from '../../hooks/cursor/types';
import { ReactNode } from 'react';

const topLeftPoint = { x: 0, y: 0 };
const centerPoint = { x: 0.5, y: 0.5 };
const skipTransition = { duration: 0 };

const defaults = {
  followSpring: { stiffness: 1000, damping: 100 },
  magneticOptions: { morph: true, padding: 5, snap: 0.8 },
};

export function Cursor({
  follow = false,
  center = follow ? topLeftPoint : centerPoint,
  offset: offsetPoint = topLeftPoint,
  spring = follow ? defaults.followSpring : false,
  magnetic = false,
  matchTextSize = true,
  children,
  style,
  ...props
}: CursorProps & HTMLMotionProps<'div'>) {
  const shouldReduceMotion = useReducedMotion();

  useCursorStyles(!shouldReduceMotion && !follow);

  const position = usePointerPosition();
  const offset = useOffset(position, offsetPoint);

  const springX = useSpring(offset.x, spring || undefined);
  const springY = useSpring(offset.y, spring || undefined);

  const magneticOptions =
    typeof magnetic === 'object'
      ? { ...defaults.magneticOptions, ...magnetic }
      : defaults.magneticOptions;

  const resetSpring = () => {
    const removeX = offset.x.on('change', (v) => {
      springX.jump(v);
      removeX();
    });

    const removeY = offset.y.on('change', (v) => {
      springY.jump(v);
      removeY();
    });
  };

  const state = useCursorState();
  const isInView = useCursorIsInView(resetSpring);

  const { x, y } = useMagneticTarget(
    spring ? { x: springX, y: springY } : position,
    Boolean(magnetic),
    state,
    magneticOptions.snap,
  );

  const { width, height } = getCursorSize({
    type: state.type,
    state,
    hasChildren: Boolean(children),
    style,
    isMagnetic: Boolean(magnetic),
    magneticOptions,
    matchTextSize,
  });

  // TODO: Set center to 0.5 if state.targetBoundingBox && magnetic

  const pointerHasMoved = useHasPointerMoved(position, resetSpring);

  return useBodyPortal(
    pointerHasMoved ? (
      <LayoutGroup>
        <MotionConfig
          transition={shouldReduceMotion ? skipTransition : props.transition || defaultTransition}
        >
          <motion.div
            layout
            data-motion-cursor={follow ? 'follow' : 'pointer'}
            data-framer-portal-id="motion-cursor"
            initial="exit"
            exit="exit"
            {...props}
            variants={{
              pressed: follow ? {} : { scale: 0.9 },
              ...props.variants,
              default: {
                opacity: 1,
                scale: 1,
                ...props.variants?.default,
              },
              exit: {
                opacity: 0,
                scale: 0,
                ...props.variants?.exit,
              },
            }}
            animate={[
              'default',
              state.type,
              magnetic && state.targetBoundingBox ? 'magnetic' : '',
              !isInView ? 'exit' : state.isPressed ? 'pressed' : '',
            ]}
            transformTemplate={positionTransform(center)}
            style={{
              borderRadius: follow ? 0 : 20,
              zIndex: follow ? 99998 : 99999,
              willChange: 'transform',
              contain: 'layout',
              originX: center.x,
              originY: center.y,
              ...style,
              width,
              height,
              x,
              y,
              top: 0,
              left: 0,
              position: 'fixed',
              pointerEvents: 'none',
            }}
          >
            <AnimatePresence>{children as ReactNode}</AnimatePresence>
          </motion.div>
        </MotionConfig>
      </LayoutGroup>
    ) : null,
  );
}

function positionTransform(origin: Point) {
  return (_: unknown, generated: string) =>
    `translate(-${origin.x * 100}%, -${origin.y * 100}%) ${generated}`;
}

const defaultTransition = { duration: 0.15, ease: [0.38, 0.12, 0.29, 1] };
