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
    autoPlay: props.autoPlay !== undefined ? props.autoPlay : false,
    stopAutoplayOnHover:
      props.stopAutoplayOnHover !== undefined
        ? props.stopAutoplayOnHover
        : true,

    arrowHoverStyle:
      props.arrowHoverStyle !== undefined
        ? props.arrowHoverStyle
        : 'bg-slate-500',
    interval: props.interval !== undefined ? props.interval : 4000,
    inArrow: props.inArrow !== undefined ? props.inArrow : true,
    indicators: props.indicators !== undefined ? props.indicators : true,
    infiniteLoop: props.infiniteLoop !== undefined ? props.infiniteLoop : true,
    height: props.height !== undefined ? props.height : '600px',
    animation: animation,
    duration: duration,
    showNavButton:
      props.showNavButton !== undefined ? props.showNavButton : true,
    children: props.children !== undefined ? props.children : [],
    customClass: props.customClass !== undefined ? props.customClass : '',
  };
};
