function TodoItem({todo, onEdit, onDelete, onStatusUpdate}) {


      return (
              <article className="todo-card">
                    <div className="todo-card-header">
                          <h3>{todo.title}</h3>

                          <span className={todo.completed ? "status status-completed" : "status status-pending"}
                                role="button" tabIndex={0} title="Click to update status"
                                onClick={() => onStatusUpdate(todo)}
                                onKeyDown={(event) => {
                                      if (event.key === "Enter" || event.key === " ") {
                                            event.preventDefault();
                                            onStatusUpdate(todo);
                                      }
                                }}>{todo.completed ? "Completed" : "Pending"}</span>
                    </div>


                    <p className="todo-description">{todo.description || "No description"}</p>

                    <div className="todo-meta">
                          <span>Todo #{todo.id}</span>
                          {todo.createdAt && (
                                  <span> Created:{" "}{new Date(todo.createdAt).toLocaleString()}</span>
                          )}

                          {todo.updatedAt && (
                                  <span> Updated:{" "}{new Date(todo.updatedAt).toLocaleString()}</span>
                          )}
                    </div>

                    <div className="todo-actions">
                          <button type="button" className="btn btn-secondary" onClick={() => onEdit(todo)}>Edit</button>
                          <button type="button" className="btn btn-danger" onClick={() => onDelete(todo.id)}>Delete
                          </button>
                    </div>
              </article>
      );

}

export default TodoItem;
