import {useEffect, useState} from "react";
import {getTodos, createTodo, deleteTodoById, updateTodo} from "../api/todoApi.js";
import TodoForm from "../components/TodoForm.jsx";
import TodoList from "../components/TodoList.jsx";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TodoPage() {

      const [todos, setTodos] = useState([]);
      const [editingTodo, setEditingTodo] = useState(null);

      const [loading, setLoading] = useState(true);
      const [submitting, setSubmitting] = useState(false);
      const [deletingId, setDeletingId] = useState(null);

      const loadTodos = async () => {
            try {
                  const data = await getTodos();
                  setTodos(data);

            } catch (error) {
                  console.error("Failed to load todos:", error);
                  toast.error("Unable to load todos. Please try again!");

            } finally {
                  setLoading(false);

            }
      };

      useEffect(() => {
            loadTodos()
      }, []);

      const handleCreate = async (todo) => {
            try {
                  setSubmitting(true);

                  await createTodo(todo);
                  await loadTodos();

                  toast.success("Todo created successfully!");

                  return true;

            } catch (error) {
                  console.error("Failed to create todo:", error);
                  toast.error(error.response?.data?.message || "Unable to create todo. Please try again!");

                  return false;

            } finally {
                  setSubmitting(false);
            }


      };

      const handleUpdate = async (todo) => {
            try {
                  setSubmitting(true);

                  await updateTodo(todo);
                  setEditingTodo(null);
                  await loadTodos();

                  toast.success("Todo updated successfully!");

                  return true;

            } catch (error) {
                  console.error("Failed to update todo:", error);
                  toast.error("Unable to update todo. Please try again!");

                  return false;

            } finally {
                  setSubmitting(false);

            }
      };

      const handleStatusUpdate = async (todo) => {
            try {
                  const updatedTodo = {
                        ...todo,
                        completed: !todo.completed,
                  };

                  await updateTodo(updatedTodo);
                  await loadTodos();

                  toast.success(updatedTodo.completed ? "Todo marked as completed!" : "Todo marked as pending!");

            } catch (error) {
                  console.error("Failed to update todo status:", error);
                  toast.error("Unable to update todo status. Please try again!");
            }
      };

      const handleDelete = async (id) => {
            const confirmed = window.confirm("Are you sure you want to delete this todo?");
            if (!confirmed) return;

            try {
                  setDeletingId(id);

                  await deleteTodoById(id);
                  setTodos((currentTodos) =>
                          currentTodos.filter((todo) => todo.id !== id)
                  );

                  toast.success("Todo deleted successfully!");

            } catch (error) {
                  console.error("Failed to delete todo:", error);
                  toast.error("Unable to delete todo. Please try again!");

            } finally {
                  setDeletingId(null);

            }
      };

      return (
              <>
                    <ToastContainer
                            position="top-right"
                            autoClose={2000}
                            theme="dark"
                            newestOnTop
                    />

                    <main className="todo-page">
                          <header className="page-header">
                                <div>
                                      <p className="eyebrow">TASK MANAGEMENT</p>
                                      <h1>Todo Dashboard</h1>
                                      <p className="page-subtitle">Organize your tasks and track your progress.</p>
                                </div>

                                <div className="total-badge">
                                      <span>Total tasks</span>
                                      <strong>{todos.length}</strong>
                                </div>
                          </header>

                          <section className="panel"><h2>{editingTodo ? "Edit Todo" : "Create a Todo"}</h2>

                                <TodoForm
                                        editingTodo={editingTodo}
                                        onCreate={handleCreate}
                                        onUpdate={handleUpdate}
                                        onCancel={() => setEditingTodo(null)}
                                        submitting={submitting}/>
                          </section>

                          <section className="list-section">
                                <div className="section-heading">
                                      <h2>Your Tasks</h2>
                                      <span>{todos.length} total</span>
                                </div>

                                {loading ? (
                                        <p className="loading-message">Loading todos...</p>
                                ) : (
                                        <TodoList
                                                todos={todos}
                                                onEdit={(todo) => {
                                                      setEditingTodo(todo);
                                                }}
                                                onDelete={handleDelete}
                                                onStatusUpdate={handleStatusUpdate}
                                        />
                                )}

                                {deletingId !== null && (
                                        <p className="loading-message">Deleting Todo #{deletingId}...</p>
                                )}
                          </section>
                    </main>
              </>
      );
}

export default TodoPage;
