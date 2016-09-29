import { STORE_TASK_SHOW } from 'mrticktock/app/actions/index';

export default function(state = [], action) {
  switch (action.type) {
    case STORE_TASK_SHOW:
      return [ action.payload, ...state ]
  }

  return state
}
