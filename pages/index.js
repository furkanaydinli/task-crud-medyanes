import { useState, useEffect } from "react";
import useTodoStore from "../store/todoStore";

const statusColors = {
  pending: "bg-white text-[#054EB3] border-[#054EB3]",
  "in-progress": "bg-[#F59E0B]/10 text-[#054EB3] border-[#F59E0B]",
  completed: "bg-[#054EB3] text-white border-[#F59E0B]",
};
const statusLabels = {
  pending: "Beklemede",
  "in-progress": "Devam Ediyor",
  completed: "Tamamlandı",
};

export default function Home() {
  const { todos, fetchTodos, addTodo, updateTodo, deleteTodo } = useTodoStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("pending");

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title) return;
    await addTodo({ title, description, status });
    setTitle("");
    setDescription("");
    setStatus("pending");
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
    setEditStatus(todo.status);
  };

  const handleUpdate = async (id) => {
    await updateTodo(id, {
      title: editTitle,
      description: editDescription,
      status: editStatus,
    });
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
    setEditStatus("pending");
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div
      className="
    min-h-screen font-['Arial']
    bg-gradient-to-r from-[#054EB3] via-[#F59E0B] to-[#054EB3]
    [background-size:200%_200%] animate-gradient-x
    dark:from-[#054EB3] dark:via-[#054EB3] dark:to-[#F59E0B]
  "
    >
      <header
        className="sticky top-0 z-20 w-full 
  bg-gradient-to-r from-[#054EB3]/60 to-[#F59E0B]/60 
  shadow-lg py-4 px-2 sm:px-0 
  transition-colors duration-300 backdrop-blur-md"
      >
        <div className="flex items-center justify-center gap-3">
          <img
            src="/medyanes-logo.png"
            alt="Logo"
            className="w-20 h-20 object-contain transition-transform duration-500 hover:[transform:rotateY(180deg)]"
          />
          <h1
            className="text-3xl sm:text-2xl font-semibold 
  text-gray-300 tracking-tight select-none font-[Arial]"
          >
            Medyanes CRUD Application v1
          </h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-2 sm:px-4 py-6">
        <form
          onSubmit={handleAdd}
          className="relative overflow-hidden
bg-gray-100/80 dark:bg-gray-700/80
supports-[backdrop-filter]:bg-gray-100/60 supports-[backdrop-filter]:dark:bg-gray-700/60
backdrop-blur-xl backdrop-saturate-150
rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,.2)]
p-4 sm:p-6 mb-8 flex flex-col gap-3
ring-1 ring-white/20 dark:ring-black/30"
        >
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Başlık"
              aria-label="Başlık"
              className="flex-1
bg-white/20 dark:bg-white/10
rounded-2xl
shadow-[0_4px_30px_rgba(0,0,0,0.15)]
backdrop-blur-md
p-3
focus:ring-2 focus:ring-[#054EB3] dark:focus:ring-[#F59E0B]
outline-none transition
text-[#054EB3] dark:text-[#F59E0B]
placeholder-[#054EB3]/60 dark:placeholder-[#F59E0B]/60"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-[#054EB3] to-[#F59E0B] hover:from-[#F59E0B] hover:to-[#054EB3] text-white px-5 py-2 rounded-lg font-semibold shadow transition flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
              aria-label="Ekle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Ekle
            </button>
          </div>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Açıklama"
            aria-label="Açıklama"
            className="w-full
bg-white/20 dark:bg-white/10
rounded-2xl
shadow-[0_4px_30px_rgba(0,0,0,0.15)]
backdrop-blur-md
p-3
focus:ring-2 focus:ring-[#054EB3] dark:focus:ring-[#F59E0B]
outline-none transition
text-[#054EB3] dark:text-[#F59E0B]
placeholder-[#054EB3]/60 dark:placeholder-[#F59E0B]/60"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            aria-label="Durum"
            className="w-full
bg-white/20 dark:bg-white/10
rounded-2xl
shadow-[0_4px_30px_rgba(0,0,0,0.15)]
backdrop-blur-md
p-3
focus:ring-2 focus:ring-[#054EB3] dark:focus:ring-[#F59E0B]
outline-none transition
text-[#054EB3] dark:text-[#F59E0B]"
          >
            <option value="pending">Beklemede</option>
            <option value="in-progress">Devam Ediyor</option>
            <option value="completed">Tamamlandı</option>
          </select>
        </form>
        {/* Todo Listesi Grid */}
        {todos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-[#054EB3] dark:text-[#F59E0B] animate-fade-in">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17v-2a4 4 0 018 0v2m-4 4a4 4 0 01-4-4V7a4 4 0 018 0v10a4 4 0 01-4 4z"
              />
            </svg>
            <span className="text-lg font-semibold">
              Henüz hiç todo eklenmedi.
            </span>
          </div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="bg-white/20 dark:bg-white/10
rounded-2xl
shadow-[0_4px_30px_rgba(0,0,0,0.15)]
backdrop-blur-md
flex flex-col
p-5
transition hover:shadow-2xl
group relative
focus-within:ring-2 focus-within:ring-[#F59E0B]"
                tabIndex={0}
                aria-label={`Todo: ${todo.title}`}
              >
                {editingId === todo.id ? (
                  <div className="flex-1 w-full space-y-2">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full border border-[#054EB3] dark:border-[#F59E0B] 
  p-2 rounded-lg 
  focus:ring-2 focus:ring-[#054EB3] dark:focus:ring-[#F59E0B] 
  outline-none 
  text-[#054EB3] dark:text-[#F59E0B] 
  bg-white/20 dark:bg-white/10 
  backdrop-blur-md"
                      aria-label="Başlık Düzenle"
                      required
                    />
                    <input
                      type="text"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="w-full border border-[#054EB3] dark:border-[#F59E0B] 
  p-2 rounded-lg 
  focus:ring-2 focus:ring-[#054EB3] dark:focus:ring-[#F59E0B] 
  outline-none 
  text-[#054EB3] dark:text-[#F59E0B] 
  bg-white/20 dark:bg-white/10 
  backdrop-blur-md"
                      aria-label="Açıklama Düzenle"
                    />
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
                      aria-label="Durum Düzenle"
                    >
                      <option value="pending">Beklemede</option>
                      <option value="in-progress">Devam Ediyor</option>
                      <option value="completed">Tamamlandı</option>
                    </select>
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={() => handleUpdate(todo.id)}
                        className="bg-[#054EB3] hover:bg-[#F59E0B] text-white px-4 py-1 rounded-lg font-semibold flex items-center gap-1 transition focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
                        aria-label="Kaydet"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Kaydet
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-300 hover:bg-gray-400 text-[#054EB3] px-4 py-1 rounded-lg font-semibold flex items-center gap-1 transition focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
                        aria-label="İptal"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        İptal
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold border ${
                          statusColors[todo.status]
                        }`}
                      >
                        {statusLabels[todo.status]}
                      </span>
                      <span className="text-lg font-semibold text-[#054EB3] dark:text-[#F59E0B] break-words">
                        {todo.title}
                      </span>
                    </div>
                    {todo.description && (
                      <p className="text-[#054EB3]/80 dark:text-[#F59E0B]/80 text-sm mb-1 break-words">
                        {todo.description}
                      </p>
                    )}
                    <div className="flex flex-row gap-2 mt-2">
                      <button
                        onClick={() => startEdit(todo)}
                        className="bg-white dark:bg-[#181A20] hover:bg-[#F59E0B] hover:text-white dark:hover:bg-[#F59E0B] text-[#054EB3] dark:text-[#F59E0B] border border-[#054EB3] dark:border-[#F59E0B] px-3 py-1 rounded-lg font-semibold flex items-center gap-1 transition focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
                        aria-label="Düzenle"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536M9 13h3l8-8a2.828 2.828 0 00-4-4l-8 8v3z"
                          />
                        </svg>
                        Düzenle
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="bg-red-600 hover:bg-red-800
text-white px-3 py-1
rounded-lg font-semibold
flex items-center gap-1
transition
focus-visible:ring-2 focus-visible:ring-red-500"
                        aria-label="Sil"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        Sil
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
