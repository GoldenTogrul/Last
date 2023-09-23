// advertisementsReducer.ts

import { Advertisement } from '../types';
import { API, graphqlOperation } from 'aws-amplify';

type AdvertisementsState = {
  advertisements: Advertisement[];
};

const initialState: AdvertisementsState = {
  advertisements: [],
};

type Action = { type: string; payload: Advertisement[] };

const advertisementsReducer = (state = initialState, action: Action): AdvertisementsState => {
  switch (action.type) {
    case 'ADD_ADVERTISEMENT':
      return {
        ...state,
        advertisements: [...state.advertisements, ...action.payload],
      };
    case 'UPDATE_ADVERTISEMENT':
      return {
        ...state,
        advertisements: state.advertisements.map((ad) =>
          ad.id === action.payload.id ? action.payload : ad
        ),
      };
    default:
      return state;
  }
};

export default advertisementsReducer;
