import { actiontypes } from '@/_components/Carousel';
import { CarouselActionTypeKey, CarouselState } from '@/_types/CommonTypes';

interface indexReducerActionType {
  type: CarouselActionTypeKey;
  payload?: {};
}

export type indexReducerType = (
  state: CarouselState,
  action: indexReducerActionType,
) => CarouselState;

const indexReducer = (
  state: CarouselState,
  action: indexReducerActionType,
): CarouselState => {
  const { type, payload } = action;
  switch (type) {
    case actiontypes.UPDATE_NEXT_STATE_LEN2:
      return {
        ...state,
        active: state.nextActive!,
        prevActive: state.active,
        nextActive: state.active,
      };
    case actiontypes.UPDATE_NEXT_STATE:
      return {
        ...state,
        active: state.nextActive!,
        prevActive: state.active,
        nextActive: state.nextActive! + 1,
      };
    case actiontypes.UPDATE_PREV_STATE_LEN2:
      return {
        ...state,
        active: state.prevActive!,
        prevActive: state.active,
        nextActive: state.active,
      };
    case actiontypes.UPDATE_PREV_STATE:
      return {
        ...state,
        active: state.nextActive!,
        prevActive: state.active,
        nextActive: state.nextActive! + 1,
      };
    default:
      return { active: 0, prevActive: -1, nextActive: 1 };
  }
};

export default indexReducer;
