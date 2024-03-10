import {
  CarouselState,
  actiontypes,
  indexReducerActionType,
} from '@/_types/CommonTypes';

const indexReducer = (
  state: CarouselState,
  action: indexReducerActionType,
): CarouselState => {
  const { type, payload } = action;
  switch (type) {
    case actiontypes.INITIAL_RENDER:
      return {
        ...state,
        showState: true,
      };
    case actiontypes.UNMOUNTED:
      return {
        ...state,
        showState: false,
      };
    case actiontypes.UPDATE_NEXT_STATE_LEN2:
      return {
        ...state,
        active: state.nextActive!,
        prevActive: state.active,
        nextActive: state.active,
        showState: !state.showState,
      };
    case actiontypes.UPDATE_NEXT_STATE:
      return {
        ...state,
        active: state.nextActive!,
        prevActive: state.active,
        nextActive: state.nextActive! + 1,
        showState: !state.showState,
      };
    case actiontypes.UPDATE_NEXT_INFINITE_STATE:
      return {
        ...state,
        active: state.nextActive!,
        prevActive: state.active,
        nextActive:
          state.nextActive === payload!.length - 1 ? 0 : state.nextActive! + 1,
        showState: !state.showState,
      };
    case actiontypes.UPDATE_PREV_STATE_LEN2:
      return {
        ...state,
        active: state.prevActive!,
        prevActive: state.active,
        nextActive: state.active,
        showState: !state.showState,
      };
    case actiontypes.UPDATE_PREV_STATE:
      return {
        ...state,
        active: state.nextActive!,
        prevActive: state.active,
        nextActive: state.nextActive! + 1,
        showState: !state.showState,
      };
    case actiontypes.UPDATE_PREV_INFINITE_STATE:
      return {
        ...state,
        active: state.nextActive!,
        prevActive: payload?.index === 0 ? payload.length - 1 : state.active,
        nextActive: state.nextActive! + 1,
        showState: !state.showState,
      };
    default:
      return { active: 0, prevActive: -1, nextActive: 1, showState: true };
  }
};

export default indexReducer;
