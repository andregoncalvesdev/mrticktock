import { STORE_ACTIVE_TASK } from 'mrticktock/app/actions/index';

export default function(state = [], action) {
  switch (action.type) {
    case STORE_ACTIVE_TASK:
      return [ action.payload, ...state ];
  }

  return state;
}
