import { userAuthenticated } from '../actions/actions';

interface ProfileState {
  sub: string | null;
}

const initialState: ProfileState = {
  sub: null, // Инициализируйте sub значением по умолчанию
};

type ProfileAction = ReturnType<typeof userAuthenticated>;

export const profileReducer = (
  state: ProfileState = initialState,
  action: ProfileAction
): ProfileState => {
  switch (action.type) {
    case 'USER_AUTHENTICATED': // Измените на тип вашего действия
      return {
        ...state,
        sub: action.payload,
      };
    default:
      return state;
  }
};
