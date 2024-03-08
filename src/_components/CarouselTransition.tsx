'use client';
import { indexReducerActionType } from '@/_types/CommonTypes';
import {
  Dispatch,
  JSXElementConstructor,
  MutableRefObject,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const CarouselTransition = ({
  transitionRef,
  show,
  handleMouseEnter,
  handleMouseLeave,
  dispatch,
  child,
  transitionKey,
}: {
  transitionRef: MutableRefObject<HTMLDivElement | null>;
  show: boolean;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  dispatch: Dispatch<indexReducerActionType>;
  transitionKey: number | string;
  child?:
    | string
    | number
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | PromiseLikeOfReactNode;
}) => {
  useEffect(() => {
    dispatch({ type: 'INITIAL_RENDER' });
    return () => {
      dispatch({ type: 'UNMOUNTED' });
    };
  }, []);
  return (
    <TransitionGroup>
      <CSSTransition
        unmountOnExit
        nodeRef={transitionRef}
        timeout={2000}
        in={show}
        key={transitionKey}
        classNames="my-transition">
        <div
          className="absolute flex h-[100%] w-[100%] flex-shrink flex-col items-center justify-center"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={transitionRef}>
          {child}
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default CarouselTransition;
