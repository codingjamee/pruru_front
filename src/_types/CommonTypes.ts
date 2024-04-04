import {
  ComponentPropsWithRef,
  ReactElement,
  ReactNode,
  ReactPortal,
} from 'react';

export type ButtonVariant = 'disabled' | 'primary' | 'outlined' | undefined;
export type CardVariant = 'primary' | 'outlined' | undefined;

export interface ButtonPropsType extends ComponentPropsWithRef<'button'> {
  disabled?: boolean;
  as?: React.ElementType;
  to?: string;
  href?: string;
  customClassName?: string;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void | undefined | any;
  variant?: ButtonVariant;
  cyAttribute?: string;
  children?: ReactNode | ReactPortal;
}

export interface CarouselProps {
  autoPlay?: boolean;
  stopAutoplayOnHover?: boolean;
  arrowHoverStyle?: string;
  interval?: number;
  inArrow?: boolean;
  indicators?: boolean;
  infiniteLoop?: boolean;
  index?: number;
  animation?: 'fade' | 'slide';
  duration?: number;
  showNavButton?: boolean;
  children?: ReactElement | ReactElement[];
  customClass?: string;
}

export type CarouselActionTypeKey =
  | 'INITIAL_RENDER'
  | 'UNMOUNTED'
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
  showState: boolean;
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
  INITIAL_RENDER: 'INITIAL_RENDER',
  UNMOUNTED: 'UNMOUNTED',
  SET_INITIAL_STATE: 'SET_INITIAL_STATE',
  UPDATE_NEXT_STATE_LEN2: 'UPDATE_NEXT_STATE_LEN2',
  UPDATE_NEXT_STATE: 'UPDATE_NEXT_STATE',
  UPDATE_NEXT_INFINITE_STATE: 'UPDATE_NEXT_INFINITE_STATE',
  UPDATE_PREV_STATE_LEN2: 'UPDATE_PREV_STATE_LEN2',
  UPDATE_PREV_STATE: 'UPDATE_PREV_STATE',
  UPDATE_PREV_INFINITE_STATE: 'UPDATE_PREV_INFINITE_STATE',
};

export interface FormType {
  name: string;
  pwd: string;
  email: string;
}

export interface QueryTypes {
  storage: 'refrigerated' | 'frozen' | 'roomTemp' | 'total';
  sort: 'price' | 'expiryDate' | 'purchaseDate';
  direction: 'up' | 'down';
  pageParam?: unknown;
}

export interface QueryTextMap {
  [key: string]: string;
}

export type QueryKeyType = 'storage' | 'sort' | 'direction';
