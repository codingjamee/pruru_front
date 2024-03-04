import { ComponentPropsWithoutRef, ReactElement } from 'react';

export type ButtonVariant = 'disabled' | 'primary' | 'outlined' | undefined;
export type CardVariant = 'primary' | 'outlined' | undefined;

export interface ButtonPropsType extends ComponentPropsWithoutRef<'button'> {
  children?: string | ReactElement | number | string[];
  disabled?: boolean;
  as?: React.ElementType;
  to?: string;
  href?: string;
  customClassName?: string;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void | undefined | any;
  variant?: ButtonVariant;
}

export interface CarouselProps {
  autoPlay?: boolean;
  stopAutoplayOnHover?: boolean;
  interval?: number;
  indicators?: boolean;
  infiniteLoop?: boolean;
  height?: number;
  index?: number;
  animation?: 'fade' | 'slide';
  duration?: number;
  showNavButton?: boolean;
  children?: ReactElement | ReactElement[];
}

export type CarouselActionTypeKey =
  | 'SET_INITIAL_STATE'
  | 'UPDATE_NEXT_STATE_LEN2'
  | 'UPDATE_NEXT_STATE'
  | 'UPDATE_NEXT_INFINITE_STATE'
  | 'UPDATE_PREV_STATE_LEN2'
  | 'UPDATE_PREV_STATE'
  | 'UPDATE_PREV_INFINITE_STATE';

export type CarouselPayloadType = {
  loop?: 'infinite';
  index: number;
  length: number;
};

export interface CarouselState {
  active: number;
  prevActive: number | undefined;
  nextActive: number | undefined;
}

export interface indexReducerActionType {
  type: CarouselActionTypeKey;
  payload?: CarouselPayloadType;
}

export type indexReducerType = (
  state: CarouselState,
  action: indexReducerActionType,
) => CarouselState;

export const actiontypes = {
  SET_INITIAL_STATE: 'SET_INITIAL_STATE',
  UPDATE_NEXT_STATE_LEN2: 'UPDATE_NEXT_STATE_LEN2',
  UPDATE_NEXT_STATE: 'UPDATE_NEXT_STATE',
  UPDATE_NEXT_INFINITE_STATE: 'UPDATE_NEXT_INFINITE_STATE',
  UPDATE_PREV_STATE_LEN2: 'UPDATE_PREV_STATE_LEN2',
  UPDATE_PREV_STATE: 'UPDATE_PREV_STATE',
  UPDATE_PREV_INFINITE_STATE: 'UPDATE_PREV_INFINITE_STATE',
};
