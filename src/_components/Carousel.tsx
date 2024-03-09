'use client';
import { isValidElement, useEffect, useReducer, useRef } from 'react';
import { CarouselProps, CarouselState } from '@/_types/CommonTypes';
import { sanitizedProps } from '@/_utils/sanitizedProps';
import indexReducer from '@/_reducers/indexReducer';
import Indicator from './Indicator';
import Arrow from './Arrow';
import CarouselTransition from './CarouselTransition';
import flattenChildren from 'react-keyed-flatten-children';
import { TransitionGroup } from 'react-transition-group';

function Carousel(props: CarouselProps) {
  const {
    autoPlay,
    stopAutoplayOnHover,
    interval,
    indicators,
    infiniteLoop,
    height,
    // animation,
    // duration,
    showNavButton,
    children,
  } = sanitizedProps(props);

  const autoIntervalFn = useRef<NodeJS.Timeout | undefined>(undefined);
  const childrenArray = flattenChildren(children);
  const transitionRef = useRef<HTMLDivElement | null>(null);
  const initialState: CarouselState = infiniteLoop
    ? {
        active: 0,
        prevActive:
          childrenArray.length === 2
            ? 1
            : childrenArray.length === 1
              ? undefined
              : childrenArray.length - 1,
        nextActive:
          childrenArray.length === 2
            ? 1
            : childrenArray.length === 1
              ? undefined
              : 1,
        showState: false,
      }
    : {
        active: 0,
        prevActive: -1,
        nextActive: 1,
        showState: false,
      };
  const [state, dispatchIndexReducer] = useReducer(indexReducer, initialState);

  const nextFn = () => {
    dispatchIndexReducer({ type: 'UNMOUNTED' });
    if (infiniteLoop) {
      if (childrenArray.length === 1) {
        return;
      } else if (childrenArray.length === 2) {
        dispatchIndexReducer({ type: 'UPDATE_NEXT_STATE_LEN2' });
      } else {
        dispatchIndexReducer({
          type: 'UPDATE_NEXT_INFINITE_STATE',
          payload: {
            index: state.active,
            length: childrenArray.length,
          },
        });
      }
    } else {
      dispatchIndexReducer({ type: 'UPDATE_NEXT_STATE' });
    }
  };

  const prevFn = () => {
    if (infiniteLoop) {
      if (childrenArray.length === 1) {
        return;
      } else if (childrenArray.length === 2) {
        dispatchIndexReducer({ type: 'UPDATE_PREV_STATE_LEN2' });
      } else {
        dispatchIndexReducer({
          type: 'UPDATE_PREV_INFINITE_STATE',
          payload: {
            index: state.active,
            length: childrenArray.length,
          },
        });
      }
    } else {
      dispatchIndexReducer({ type: 'UPDATE_PREV_STATE' });
    }
  };

  // useEffect(() => {
  //   dispatchIndexReducer({ type: 'INITIAL_RENDER' });
  // }, []);

  useEffect(() => {
    console.log(state.showState);
  }, [state]);

  // AUTO PLAY
  useEffect(() => {
    if (!autoPlay) return;
    if (autoIntervalFn.current) {
      clearInterval(autoIntervalFn.current);
    }
    autoIntervalFn.current = setInterval(() => {
      nextFn();
    }, interval);
    return () => {
      if (autoIntervalFn.current) clearInterval(autoIntervalFn.current);
    };
  }, [autoPlay, interval]);

  // STOP AUTOPLAY ON HOVER
  const handleMouseEnter = () => {
    if (!stopAutoplayOnHover) return;
    if (autoIntervalFn.current) {
      clearInterval(autoIntervalFn.current);
    }
  };

  // RESTART AUTOPLAY ON MOUSE LEAVE
  const handleMouseLeave = () => {
    if (!autoPlay) return;
    if (!stopAutoplayOnHover) return;
    autoIntervalFn.current =
      autoPlay &&
      setInterval(() => {
        nextFn();
      }, interval);
  };

  useEffect(() => {
    const activeElement = childrenArray[state.active];
    if (isValidElement(activeElement)) {
      console.log(activeElement.key);
    }
  }, [state.active]);

  return (
    <article
      style={{ height }}
      className={`relative flex w-[100%] items-center justify-between gap-[50px] px-[50px]`}>
      {!!showNavButton && !!state.prevActive ? (
        <Arrow direction="left" executeFn={prevFn} />
      ) : (
        <Arrow direction="left" executeFn={prevFn} />
      )}
      <figure style={{ height }} className="h-[100%] w-[100%]">
        <div style={{ height }} className="relative flex overflow-hidden">
          <TransitionGroup>
            {Array(childrenArray.length)
              .fill(undefined)
              .map((_, index) => (
                <CarouselTransition
                  key={`item-${index}`}
                  transitionKey={index}
                  transitionRef={transitionRef}
                  handleMouseEnter={handleMouseEnter}
                  handleMouseLeave={handleMouseLeave}
                  index={index}
                  active={state.active}
                  child={childrenArray[index]}
                />
              ))}
          </TransitionGroup>
        </div>

        <div className="mt-7 flex justify-center gap-3">
          {indicators && (
            <Indicator
              number={childrenArray.length}
              activeIndex={state.active}
            />
          )}
        </div>
      </figure>
      {!!showNavButton && !!state.nextActive ? (
        <Arrow direction="right" executeFn={nextFn} />
      ) : (
        infiniteLoop && <Arrow direction="right" executeFn={nextFn} />
      )}
    </article>
  );
}

export default Carousel;
