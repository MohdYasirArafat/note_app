import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Modern Lucid/Feather Icons Imports
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiLogOut,
  FiInbox,
  FiX,
} from "react-icons/fi";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [selectedNote, setSelectedNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const config = { headers: { Authorization: `Bearer ${token}` } };

  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/notes", config);
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const viewNoteDetails = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/notes/${id}`,
        config,
      );
      setSelectedNote(res.data);
      setIsModalOpen(true);
    } catch (err) {
      console.error("Error fetching single note details:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/notes/${editingId}`,
          { title, content },
          config,
        );
        setEditingId(null);
      } else {
        await axios.post(
          "http://localhost:5000/api/notes",
          { title, content },
          config,
        );
      }
      setTitle("");
      setContent("");
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  const editNote = (note) => {
    setEditingId(note._id);
    setTitle(note.title);
    setContent(note.content);
  };

  const deleteNote = async (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await axios.delete(`http://localhost:5000/api/notes/${id}`, config);
        fetchNotes();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Top Navigation Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-black text-gray-800 tracking-tight flex items-center gap-2">
            <span className="text-blue-600">📝</span> NotesDesk
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
          >
            <FiLogOut size={16} />
            Logout
          </button>
        </div>
      </nav>

      {/* Main Workspace Frame */}
      <main className="max-w-5xl mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Side: Note Creation Panel */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 sticky top-24">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              {editingId ? (
                <FiEdit2 className="text-amber-500" />
              ) : (
                <FiPlus className="text-blue-600" />
              )}
              {editingId ? "Edit Selected Note" : "Create New Note"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Note Title"
                  value={title}
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <textarea
                  placeholder="Write note description here..."
                  value={content}
                  required
                  rows="5"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-gray-900 py-2.5 text-sm font-bold text-white hover:bg-gray-800 shadow-md transition-all cursor-pointer"
                >
                  {editingId ? "Save Modifications" : "Add to Collection"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setTitle("");
                      setContent("");
                    }}
                    className="w-full rounded-xl bg-gray-200 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-300 transition-all cursor-pointer"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Right Side: Saved Notes Repository Layout */}
        <div className="md:col-span-2">
          <h3 className="text-xl font-extrabold text-gray-800 mb-4 flex items-center gap-2">
            Your Collection{" "}
            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full font-bold">
              {notes.length}
            </span>
          </h3>

          {notes.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300 p-8 text-gray-400 flex flex-col items-center justify-center">
              <FiInbox size={40} className="text-gray-300 mb-2" />
              <p className="text-sm font-medium">
                Your desk looks clean. Try writing your first note card!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {notes.map((note) => (
                <div
                  key={note._id}
                  className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all group"
                >
                  <div>
                    <h4 className="font-bold text-gray-800 text-base mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {note.title}
                    </h4>
                    <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-wrap line-clamp-4">
                      {note.content}
                    </p>
                  </div>

                  {/* Buttons Container */}
                  <div className="mt-5 pt-3 border-t border-gray-100 flex items-center gap-1.5">
                    <button
                      onClick={() => viewNoteDetails(note._id)}
                      className="rounded-lg bg-blue-50 p-2 text-blue-600 hover:bg-blue-100 transition-colors cursor-pointer flex items-center justify-center gap-1 font-bold text-xs"
                      title="View Details"
                    >
                      <FiEye size={14} />
                      View
                    </button>
                    <button
                      onClick={() => editNote(note)}
                      className="flex-1 rounded-lg bg-amber-50 p-2 text-amber-700 hover:bg-amber-100 transition-colors cursor-pointer flex items-center justify-center gap-1 font-bold text-xs"
                    >
                      <FiEdit2 size={12} />
                      Edit Card
                    </button>
                    <button
                      onClick={() => deleteNote(note._id)}
                      className="rounded-lg bg-rose-50 p-2 text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer flex items-center justify-center"
                      title="Delete"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Dynamic Pop-up Modal UI */}
      {isModalOpen && selectedNote && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-gray-100 relative">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-extrabold text-gray-900 pr-4">
                {selectedNote.title}
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedNote(null);
                }}
                className="text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 h-7 w-7 rounded-full flex items-center justify-center cursor-pointer transition-colors"
              >
                <FiX size={16} />
              </button>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap mb-6 max-h-[60vh] overflow-y-auto">
              {selectedNote.content}
            </p>

            <div className="text-[11px] text-gray-400 border-t border-gray-100 pt-3 flex justify-between font-medium">
              <span>
                📅 Created: {new Date(selectedNote.createdAt).toLocaleString()}
              </span>
              <span>
                🔄 Updated: {new Date(selectedNote.updatedAt).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
