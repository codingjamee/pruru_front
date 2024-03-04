'use client';
import { Children, useEffect, useReducer, useRef } from 'react';
import { CarouselProps, CarouselState } from '@/_types/CommonTypes';
import { sanitizedProps } from '@/_utils/sanitizedProps';
import indexReducer from '@/_reducers/indexReducer';
import Indicator from './Indicator';

function Carousel(props: CarouselProps) {
  const {
    autoPlay,
    stopAutoplayOnHover,
    interval,
    indicators,
    infiniteLoop,
    // height,
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

  const className = {};

  const nextFn = () => {
    //돔이 재렌더링 되는지 확인필요
    if (infiniteLoop) {
      if (childrenArray.length === 1) {
        return;
      } else if (childrenArray.length === 2) {
        return dispatchIndexReducer({ type: 'UPDATE_NEXT_STATE_LEN2' });
      } else {
        //nextActive가 null일경우 해당 함수 호출 불가
        return dispatchIndexReducer({
          type: 'UPDATE_NEXT_INFINITE_STATE',
          payload: {
            index: state.active,
            length: childrenArray.length,
          },
        });
      }
    } else {
      //nextActive가 null일경우 해당 함수 호출 불가
      return dispatchIndexReducer({ type: 'UPDATE_NEXT_STATE' });
    }
  };

  const prevFn = () => {
    if (infiniteLoop) {
      if (childrenArray.length === 1) {
        return;
      } else if (childrenArray.length === 2) {
        return dispatchIndexReducer({ type: 'UPDATE_NEXT_STATE_LEN2' });
      } else {
        //nextActive가 null일경우 해당 함수 호출 불가
        return dispatchIndexReducer({ type: 'UPDATE_NEXT_STATE' });
      }
    } else {
      return dispatchIndexReducer({ type: 'UPDATE_NEXT_STATE' });
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

  // useEffect(() => {
  //   //시간이 지나면 왼쪽으로 transition
  //   setInterval(() => {}, interval);
  // }, []);

  const handleMouseEnter = () => {
    if (!stopAutoplayOnHover) return;
    if (autoIntervalFn.current) {
      clearInterval(autoIntervalFn.current);
    }
  };

  const handleMouseLeave = () => {
    if (!stopAutoplayOnHover) return;
    autoIntervalFn.current = setInterval(() => {
      nextFn();
    }, interval);
  };

  return (
    <article className={`center-alignment flex w-full justify-between`}>
      {showNavButton && state.prevActive && <div onClick={prevFn}>&lt;</div>}
      <figure className="center-alignment m-3 flex h-[400px] w-full flex-col justify-between">
        <div className="flex h-full gap-3">
          {state.prevActive !== state.active &&
            state.prevActive !== undefined && (
              <div className="w-[400px]">{childrenArray[state.prevActive]}</div>
            )}
          <div
            className="w-[400px]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            {childrenArray[state.active]}
          </div>
          {state.nextActive !== state.active &&
            state.nextActive !== undefined && (
              <div className="w-[400px]">{childrenArray[state.nextActive]}</div>
            )}
        </div>
        <div className="flex">
          {indicators && <Indicator number={childrenArray.length} />}
        </div>
      </figure>
      {showNavButton && state.nextActive ? (
        <div onClick={nextFn}>&gt;</div>
      ) : (
        infiniteLoop && <div onClick={nextFn}>&gt;</div>
      )}
    </article>
  );
}

export default Carousel;
