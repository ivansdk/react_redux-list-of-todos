/* eslint-disable max-len */
import React from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';
import { actions as currentTodoActions } from '../../features/currentTodo';

function filterTodos(todos: Todo[], query: string, status: Status): Todo[] {
  let filteredTodos = todos;

  if (query) {
    filteredTodos = filteredTodos.filter((todo) => todo.title.toLowerCase().includes(query.toLocaleLowerCase()));
  }

  switch (status) {
    case 'active':
      return filteredTodos.filter((todo) => !todo.completed);

    case 'completed':
      return filteredTodos.filter((todo) => todo.completed);

    default:
      return filteredTodos;
  }
}

export const TodoList: React.FC = () => {
  const todos = useAppSelector((state) => state.todos);
  const currentTodo = useAppSelector((state) => state.currentTodo);
  const { query, status } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  const currentTodos = filterTodos(todos, query, status);

  return (
    <>
      {currentTodos.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {currentTodos.length > 0 && (
        <table className="table is-narrow is-fullwidth">
          <thead>
            <tr>
              <th>#</th>

              <th>
                <span className="icon">
                  <i className="fas fa-check" />
                </span>
              </th>

              <th>Title</th>
              <th> </th>
            </tr>
          </thead>

          <tbody>
            {currentTodos.map((todo) => (
              <tr data-cy="todo" key={todo.id}>
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>

                <td className="is-vcentered is-expanded">
                  <p
                    className={cn({
                      'has-text-danger': !todo.completed,
                      'has-text-success': todo.completed,
                    })}
                  >
                    {todo.title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => dispatch(currentTodoActions.setTodo(todo))}
                  >
                    <span className="icon">
                      {todo.id === currentTodo?.id ? (
                        <i className="far fa-eye-slash" />
                      ) : (
                        <i className="far fa-eye" />
                      )}
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
