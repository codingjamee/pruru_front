'use client';
import { Children, useEffect, useReducer, useRef } from 'react';
import { CarouselProps, CarouselState } from '@/_types/CommonTypes';
import { sanitizedProps } from '@/_utils/sanitizedProps';
import indexReducer from '@/_reducers/indexReducer';
import Indicator from './Indicator';

export const actiontypes = {
  SET_INITIAL_STATE: 'SET_INITIAL_STATE',
  UPDATE_NEXT_STATE_LEN2: 'UPDATE_NEXT_STATE_LEN2',
  UPDATE_NEXT_STATE: 'UPDATE_NEXT_STATE',
  UPDATE_PREV_STATE_LEN2: 'UPDATE_PREV_STATE_LEN2',
  UPDATE_PREV_STATE: 'UPDATE_PREV_STATE',
};

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

  let autoFnInterval = useRef<NodeJS.Timeout | undefined>(undefined);
  const childrenArray = Children.toArray(children);
  const initialState: CarouselState = infiniteLoop
    ? {
        active: 0,
        prevActive:
          childrenArray.length === 2
            ? 1
            : childrenArray.length === 1
              ? null
              : childrenArray.length - 1,
        nextActive:
          childrenArray.length === 2
            ? 1
            : childrenArray.length === 1
              ? null
              : 1,
      }
    : {
        active: 0,
        prevActive: null,
        nextActive: childrenArray.length === 1 ? null : 1,
      };
  const [state, dispatchIndexReducer] = useReducer(indexReducer, initialState);

  const nextFn = () => {
    //돔이 재렌더링 되는지 확인필요
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
    if (autoFnInterval.current) {
      clearInterval(autoFnInterval.current);
    }
    autoFnInterval.current = setInterval(() => {
      nextFn();
    }, interval);
    return () => {
      if (autoFnInterval.current) clearInterval(autoFnInterval.current);
    };
  }, [autoPlay, interval]);

  // useEffect(() => {
  //   //시간이 지나면 왼쪽으로 transition
  //   setInterval(() => {}, interval);
  // }, []);

  const handleMouseEnter = () => {
    if (!stopAutoplayOnHover) return;
    if (autoFnInterval.current) {
      clearInterval(autoFnInterval.current);
    }
  };

  const handleMouseLeave = () => {
    if (!stopAutoplayOnHover) return;
    autoFnInterval.current = setInterval(() => {
      nextFn();
    }, interval);
  };

  useEffect(() => {
    console.log(childrenArray);
  }, []);
  return (
    <article className="flex">
      {showNavButton && state.prevActive && <div onClick={prevFn}>&lt;</div>}
      <div>
        <div className="flex">
          {state.prevActive !== state.active && state.prevActive && (
            <div>{childrenArray[state.prevActive]}</div>
          )}
          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {childrenArray[state.active]}
          </div>
          {state.nextActive !== state.active && state.nextActive && (
            <div>{childrenArray[state.nextActive]}</div>
          )}
        </div>
        <div className="flex">
          {indicators && <Indicator number={childrenArray.length} />}
        </div>
      </div>
      {showNavButton && state.nextActive && <div onClick={nextFn}>&gt;</div>}
    </article>
  );
}

export default Carousel;