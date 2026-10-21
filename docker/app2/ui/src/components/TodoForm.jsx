import {useEffect, useState} from "react";

function TodoForm({editingTodo, onCreate, onUpdate, onCancel, submitting}) {

      const [title, setTitle] = useState("");
      const [description, setDescription] = useState("");

      // Populate fields when editing; clear them when returning to create mode.
      useEffect(() => {
            setTitle(editingTodo?.title ?? "");
            setDescription(editingTodo?.description ?? "");
      }, [editingTodo]);

      const handleSubmit = async (event) => {
            event.preventDefault();

            const trimmedTitle = title.trim();

            if (!trimmedTitle) {
                  return;
            }

            const todoPayload = {
                  title: trimmedTitle,
                  description: description.trim(),
                  completed: editingTodo?.completed ?? false,
            };

            try {
                  let success;

                  if (editingTodo) {
                        success = await onUpdate({
                              ...todoPayload,
                              id: editingTodo.id,
                        });
                  } else {
                        success = await onCreate(todoPayload);
                  }

                  // Clear fields only when the parent confirms success.
                  if (success) {
                        setTitle("");
                        setDescription("");
                  }
            } catch (error) {
                  // Unexpected errors; API error toasts can remain in TodoPage.
                  console.error("Form submission failed:", error);
            }
      };

      const handleCancel = () => {
            setTitle("");
            setDescription("");
            onCancel();
      };

      return (
              <form className="todo-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                          <label htmlFor="todo-title">Title *</label>

                          <input
                                  id="todo-title"
                                  type="text"
                                  value={title}
                                  onChange={(event) => setTitle(event.target.value)}
                                  placeholder="Enter todo title"
                                  maxLength={200}
                                  required
                                  disabled={submitting}
                          />
                    </div>

                    <div className="form-group">
                          <label htmlFor="todo-description">Description</label>

                          <textarea
                                  id="todo-description"
                                  value={description}
                                  onChange={(event) => setDescription(event.target.value)}
                                  placeholder="Enter todo description"
                                  rows={3}
                                  disabled={submitting}
                          />
                    </div>

                    <div className="form-actions">
                          <button
                                  type="submit"
                                  className="btn btn-primary"
                                  disabled={submitting || !title.trim()}
                          >
                                {submitting
                                        ? "Saving..."
                                        : editingTodo
                                                ? "Update Todo"
                                                : "Add Todo"}
                          </button>

                          {editingTodo && (
                                  <button
                                          type="button"
                                          className="btn btn-secondary"
                                          onClick={handleCancel}
                                          disabled={submitting}
                                  >
                                        Cancel
                                  </button>
                          )}
                    </div>
              </form>
      );
}

export default TodoForm;
