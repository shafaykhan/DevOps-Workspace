import TodoItem from "./TodoItem.jsx";

function TodoList({todos, onEdit, onDelete, onStatusUpdate}) {
      if (todos.length === 0) {
            return (
                    <div className="empty-state">
                          <h3>No todos found</h3>
                          <p>Create your first todo using the form above.</p>
                    </div>
            );
      }

      return (
              <div className="todo-list">
                    {
                          todos.map((todo) => (
                                  <TodoItem
                                          key={todo.id}
                                          todo={todo}
                                          onEdit={onEdit}
                                          onDelete={onDelete}
                                          onStatusUpdate={onStatusUpdate}
                                  />
                          ))
                    }
              </div>
      );
}

export default TodoList;
