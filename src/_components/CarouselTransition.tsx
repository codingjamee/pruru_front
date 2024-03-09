'use client';
import {
  JSXElementConstructor,
  MutableRefObject,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from 'react';
import { CSSTransition } from 'react-transition-group';

const CarouselTransition = ({
  transitionRef,
  handleMouseEnter,
  handleMouseLeave,
  child,
  index,
  active,
}: {
  transitionRef: MutableRefObject<HTMLDivElement | null>;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;

  child?:
    | string
    | number
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | PromiseLikeOfReactNode;
  index: number;
  active: number;
}) => {
  const [isIn, setIsIn] = useState(false);
  useEffect(() => {
    setIsIn(active === index);
  }, [active]);
  return (
    <CSSTransition
      in={isIn}
      unmountOnExit
      appear
      nodeRef={transitionRef}
      timeout={200}
      key={active ? `enter-${index}` : `exit-${index}`}
      classNames="my-transition">
      <div
        // style={{ opacity: active === index ? 1 : 0 }}
        className="absolute flex h-[100%] w-[100%] flex-shrink flex-col items-center justify-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={transitionRef}>
        {child}
      </div>
    </CSSTransition>
  );
};

export default CarouselTransition;
