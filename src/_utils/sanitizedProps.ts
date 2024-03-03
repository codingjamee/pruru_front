import { CarouselProps } from '@/_types/CommonTypes';

interface SanitizedProps extends Omit<CarouselProps, 'height'> {
  height: string | number;
}

export const sanitizedProps = (props: CarouselProps): SanitizedProps => {
  const animation = props.animation !== undefined ? props.animation : 'fade';
  const duration =
    props.duration !== undefined
      ? props.duration
      : animation === 'fade'
        ? 500
        : 200;
  return {
    autoPlay: props.autoPlay !== undefined ? props.autoPlay : true,
    stopAutoplayOnHover:
      props.stopAutoplayOnHover !== undefined
        ? props.stopAutoplayOnHover
        : true,
    interval: props.interval !== undefined ? props.interval : 4000,
    indicators: props.indicators !== undefined ? props.indicators : true,
    infiniteLoop: props.infiniteLoop !== undefined ? props.infiniteLoop : true,
    height: props.height !== undefined ? props.height : '100%',
    animation: animation,
    duration: duration,
    children: props.children !== undefined ? props.children : [],
  };
};
