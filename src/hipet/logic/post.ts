import { StateOptions } from '../schemata/entities'

export const validate_post_state = (state: StateOptions): boolean => {
  return Object.values(StateOptions).includes(state)
}
