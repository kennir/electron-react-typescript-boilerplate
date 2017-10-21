import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

const actionCreator = actionCreatorFactory('MyApp');

export const setPersistFinished = actionCreator('PERSIST_FINISHED');

export interface State {
  persisting: boolean;
}

const INITIAL_STATE: State = {
  persisting: true
};

const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(setPersistFinished, (state) => ({ ...state, persisting: false }));

export default reducer;
