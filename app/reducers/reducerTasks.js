import { ASSIGN_TASKS } from 'mrticktock/app/actions/index'

export default function(state = [], action) {
  switch (action.type) {
    case ASSIGN_TASKS:
      return [ action.payload, ...state ]
  }

  return state
}
