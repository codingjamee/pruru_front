'use client';
import React, { ReactElement, useEffect, useState } from 'react';
import { CarouselProps } from '@/_types/CommonTypes';
import { sanitizedProps } from '@/_utils/sanitizedProps';

function Carousel(props: CarouselProps) {
  const {
    autoPlay,
    // stopAutoplayOnHover,
    // interval,
    // indicators,
    infiniteLoop,
    // height,
    // animation,
    duration,
    showNavButton,
    children,
  } = sanitizedProps(props);

  const childrenArray: ReactElement[] = [];
  if (Array.isArray(children)) {
    children.map((child) => {
      if (React.isValidElement(child)) return childrenArray.push(child);
    });
  }
  const [state, setState] = useState(
    infiniteLoop
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
        },
  );

  const nextFn = () => {
    //돔이 재렌더링 되는지 확인필요
    if (infiniteLoop) {
      if (childrenArray.length === 1) {
        return;
      } else if (childrenArray.length === 2) {
        return setState((prev) => ({
          ...prev,
          active: prev.nextActive!,
          prevActive: prev.active,
          nextActive: prev.active,
        }));
      } else {
        //nextActive가 null일경우 해당 함수 호출 불가
        setState((prev) => ({
          ...prev,
          active: prev.nextActive!,
          prevActive: prev.active,
          nextActive: prev.nextActive! + 1,
        }));
      }
    } else {
      //nextActive가 null일경우 해당 함수 호출 불가
      setState((prev) => ({
        ...prev,
        active: prev.nextActive!,
        prevActive: prev.active,
        nextActive: prev.nextActive! + 1,
      }));
    }
  };

  const prevFn = () => {
    if (infiniteLoop) {
      if (childrenArray.length === 1) {
        return;
      } else if (childrenArray.length === 2) {
        return setState((prev) => ({
          ...prev,
          active: prev.prevActive!,
          prevActive: prev.active,
          nextActive: prev.active,
        }));
      } else {
        //nextActive가 null일경우 해당 함수 호출 불가
        setState((prev) => ({
          ...prev,
          active: prev.nextActive!,
          prevActive: prev.active,
          nextActive: prev.nextActive! + 1,
        }));
      }
    } else {
      setState((prev) => ({
        ...prev,
        active: prev.prevActive!,
        prevActive: prev.active,
        nextActive: prev.prevActive! - 1,
      }));
    }
  };

  // useEffect(() => {
  //   //시간이 지나면 왼쪽으로 transition
  //   setInterval(() => {}, interval);
  // }, []);

  useEffect(() => {
    console.log(childrenArray);
  }, []);
  return (
    <>
      {showNavButton && state.prevActive && <div onClick={prevFn}>&lt;</div>}
      {state.prevActive !== state.active && state.prevActive && (
        <div>{childrenArray[state.prevActive]}</div>
      )}
      <div>{childrenArray[state.active]}</div>
      {state.nextActive !== state.active && state.nextActive && (
        <div>{childrenArray[state.nextActive]}</div>
      )}
      {showNavButton && state.nextActive && <div onClick={nextFn}>&gt;</div>}
    </>
  );
}

export default Carousel;
