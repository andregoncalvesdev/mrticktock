import { STORE_LOGIN } from 'mrticktock/app/actions/index';

export default function(state = [], action) {
  switch (action.type) {
    case STORE_LOGIN:
      return [ action.payload, ...state ];
  }

  return state;
}
