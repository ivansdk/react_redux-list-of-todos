import { Status } from '../types/Status';

type SetQueryAction = { type: 'filter/setQuery'; payload: string };
type SetStatusAction = { type: 'filter/setStatus'; payload: Status };

type Action = SetQueryAction | SetStatusAction;

type State = {
  query: string;
  status: Status;
};

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/setQuery',
  payload: query,
});
const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/setStatus',
  payload: status,
});

const initialState: State = {
  query: '',
  status: 'all',
};

const filterReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'filter/setQuery':
      return { ...state, query: action.payload };

    case 'filter/setStatus':
      return { ...state, status: action.payload };

    default:
      return {
        query: '',
        status: 'all',
      };
  }
};

export default filterReducer;
export const actions = { setQuery, setStatus };
