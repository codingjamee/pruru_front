'use client';
import {
  JSXElementConstructor,
  MutableRefObject,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
} from 'react';
import { CSSTransition } from 'react-transition-group';

const CarouselTransition = ({
  transitionRef,
  handleMouseEnter,
  handleMouseLeave,
  child,
  transitionKey,
  index,
  active,
}: {
  transitionRef: MutableRefObject<HTMLDivElement | null>;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  transitionKey:
    | string
    | number
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | PromiseLikeOfReactNode;
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
  // useEffect(() => {
  //   dispatch({ type: 'INITIAL_RENDER' });
  //   return () => {
  //     dispatch({ type: 'UNMOUNTED' });
  //   };
  // }, []);
  useEffect(() => {
    console.log(transitionKey);
  }, [transitionKey]);
  return (
    <CSSTransition
      in={active === index}
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
