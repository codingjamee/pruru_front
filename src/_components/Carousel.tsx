'use client';
import { Children, useEffect, useReducer, useRef } from 'react';
import { CarouselProps, CarouselState } from '@/_types/CommonTypes';
import { sanitizedProps } from '@/_utils/sanitizedProps';
import indexReducer from '@/_reducers/indexReducer';
import Indicator from './Indicator';

//오류 : 이미지 크기 넘침 문제
//
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
  const childrenArray = Children.toArray(children);
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
      }
    : {
        active: 0,
        prevActive: -1,
        nextActive: 1,
      };
  const [state, dispatchIndexReducer] = useReducer(indexReducer, initialState);

  const nextFn = () => {
    if (infiniteLoop) {
      if (childrenArray.length === 1) {
        return;
      } else if (childrenArray.length === 2) {
        return dispatchIndexReducer({ type: 'UPDATE_NEXT_STATE_LEN2' });
      } else {
        return dispatchIndexReducer({
          type: 'UPDATE_NEXT_INFINITE_STATE',
          payload: {
            index: state.active,
            length: childrenArray.length,
          },
        });
      }
    } else {
      return dispatchIndexReducer({ type: 'UPDATE_NEXT_STATE' });
    }
  };

  const prevFn = () => {
    if (infiniteLoop) {
      if (childrenArray.length === 1) {
        return;
      } else if (childrenArray.length === 2) {
        return dispatchIndexReducer({ type: 'UPDATE_PREV_STATE_LEN2' });
      } else {
        return dispatchIndexReducer({ type: 'UPDATE_PREV_INFINITE_STATE' });
      }
    } else {
      return dispatchIndexReducer({ type: 'UPDATE_PREV_STATE' });
    }
  };

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

  const handleMouseEnter = () => {
    if (!stopAutoplayOnHover) return;
    if (autoIntervalFn.current) {
      clearInterval(autoIntervalFn.current);
    }
  };

  const handleMouseLeave = () => {
    if (!autoPlay) return;
    if (!stopAutoplayOnHover) return;
    autoIntervalFn.current =
      autoPlay &&
      setInterval(() => {
        nextFn();
      }, interval);
  };

  return (
    <article
      style={{ height }}
      className={`flex w-[100%] items-center justify-between gap-[50px] px-[50px]`}>
      {!!showNavButton && !!state.prevActive ? (
        <div
          onClick={prevFn}
          className="center-vertical w-[30px] cursor-pointer text-[30px] hover:bg-slate-500">
          &lt;
        </div>
      ) : (
        <div
          onClick={prevFn}
          className="center-vertical w-[30px] cursor-pointer text-[30px] hover:bg-slate-500">
          &lt;
        </div>
      )}
      <figure style={{ height }} className="h-[100%] w-[100%] object-cover">
        <div
          style={{ height }}
          className={`relative overflow-hidden bg-lime-300 transition-all`}>
          {state.prevActive !== state.active &&
            state.prevActive !== undefined && (
              <div className="absolute flex h-[100%] w-[100%] flex-shrink translate-x-[-100%] flex-col items-center justify-center bg-violet-400">
                {childrenArray[state.prevActive]}
              </div>
            )}
          <div
            className="absolute flex h-[100%] w-[100%] flex-shrink flex-col items-center justify-center bg-violet-400"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            {childrenArray[state.active]}
          </div>
          {state.nextActive !== state.active &&
            state.nextActive !== undefined && (
              <div className="absolute flex h-[100%] w-[100%] flex-shrink translate-x-[100%]  flex-col items-center justify-center bg-violet-400">
                {childrenArray[state.nextActive]}
              </div>
            )}
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
        <div
          onClick={nextFn}
          className="center-vertical w-[30px] cursor-pointer text-[30px] hover:bg-slate-500 ">
          &gt;
        </div>
      ) : (
        infiniteLoop && (
          <div
            onClick={nextFn}
            className="center-vertical w-[30px] cursor-pointer text-[30px] hover:bg-slate-500">
            &gt;
          </div>
        )
      )}
    </article>
  );
}

export default Carousel;
