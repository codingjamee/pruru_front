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
    children,
  } = sanitizedProps(props);

  const [state, setState] = useState({
    active: 0,
    prevActive: 0,
    nextActive: 0,
  });

  const childrenArray: ReactElement[] = [];
  if (Array.isArray(children)) {
    children.map((child) => {
      if (React.isValidElement(child)) return childrenArray.push(child);
    });
  }

  const nextFn = () => {
    if (infiniteLoop && state.active === childrenArray.length - 1) {
      return setState((prev) => ({
        ...prev,
        active: 0,
        prevActive: prev.active,
        nextActive: 1,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        active: 0,
        prevActive: prev.active,
        nextActive: 1,
      }));
    }
  };

  const prevFn = () => {
    if (infiniteLoop && state.active === 0) {
      return setState((prev) => ({
        ...prev,
        active: 0,
        prevActive: prev.active,
        nextActive: 1,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        active: 0,
        prevActive: prev.active,
        nextActive: 1,
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
      {!autoPlay && <div onClick={prevFn}>&lt;</div>}
      <div>{childrenArray[state.prevActive]}</div>
      <div>{childrenArray[state.active]}</div>
      <div>{childrenArray[state.nextActive]}</div>
      {!autoPlay && <div onClick={nextFn}>&gt;</div>}
    </>
  );
}

export default Carousel;
