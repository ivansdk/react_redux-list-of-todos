import { Todo } from '../types/Todo';

type SetTodosAction = { type: 'filter/getTodos'; payload: Todo[] };

type Action = SetTodosAction;

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'filter/getTodos',
  payload: todos,
});

const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'filter/getTodos':
      return [...todos, ...action.payload];

    default:
      return todos;
  }
};

export const actions = { setTodos };
export default todosReducer;
