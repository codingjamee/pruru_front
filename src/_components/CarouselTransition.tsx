import {
  JSXElementConstructor,
  MutableRefObject,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
  useId,
} from 'react';
import { CSSTransition } from 'react-transition-group';

const CarouselTransition = ({
  transitionRef,
  show,
  handleMouseEnter,
  handleMouseLeave,
  child,
}: {
  transitionRef: MutableRefObject<HTMLDivElement | null>;
  show: boolean;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  child?:
    | string
    | number
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | PromiseLikeOfReactNode;
}) => {
  const keyId = useId();

  return (
    <CSSTransition
      nodeRef={transitionRef}
      timeout={2000}
      in={show}
      key={keyId}
      classNames="my-transition">
      <div
        className="absolute flex h-[100%] w-[100%] flex-shrink flex-col items-center justify-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        {child}
      </div>
    </CSSTransition>
  );
};

export default CarouselTransition;
