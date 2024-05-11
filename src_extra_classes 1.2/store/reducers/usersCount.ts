import { plusUserCount } from 'store/actions';

const initState = {
  count: 0,
};

type InitStateType = typeof initState;
type ActionsType = ReturnType<typeof plusUserCount>;

export const usersCountReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {

  switch (action.type) {
    case 'PLUS-USER-COUNT':
      return {
        ...state,
        count: state.count + 1,
      };
    default:
      return state;
  }
};
