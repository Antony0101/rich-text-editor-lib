import { useState } from "react";
import { RichTextEditor } from "rich-text-editor-lib";
import "rich-text-editor-lib/dist/index.css";
import "./App.css";
function App() {
  const [editorValue, setEditorValue] = useState("");

  const handleReset = () => setEditorValue("");

  return (
    <div className="min-h-screen bg-[#181818] flex flex-col items-center justify-start py-10 px-2">
      <div className="w-full max-w-2xl bg-[#222] rounded-xl shadow-lg p-6 flex flex-col gap-6">
        <header className="mb-2">
          <h1 className="text-2xl font-bold text-center text-green-400 mb-1">
            Rich Text Editor Playground{" "}
            <span className="text-xs text-gray-400 align-top ml-2">v0.0.1</span>
          </h1>
          <p className="text-center text-gray-300 text-sm mb-2 mt-4">
            Try out the rich text editor below! Format text, add lists, links,
            and see the live HTML output.
          </p>
        </header>
        <section>
          <label
            htmlFor="demo-editor"
            className="block font-semibold text-white mb-2"
          >
            Live Editor
          </label>
          <RichTextEditor
            name="demo-editor"
            value={editorValue}
            onChange={setEditorValue}
            placeholder="Type some rich text..."
          />
          <button
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-semibold"
            onClick={handleReset}
            type="button"
          >
            Reset Editor
          </button>
        </section>
        <section>
          <strong className="block text-green-400 mb-2">HTML Output:</strong>
          <pre className="bg-[#181818] text-green-200 p-3 rounded-lg mt-2 text-xs sm:text-sm whitespace-pre-wrap break-words border border-[#333]">
            {editorValue}
          </pre>
        </section>
      </div>
      {/* Developer Details Section */}
      <footer className="mt-8 w-full max-w-2xl bg-[#232323] rounded-xl shadow p-5 flex flex-col items-center gap-2 border border-[#333]">
        <div className="text-center">
          <span className="block text-lg font-bold text-green-400">
            Developer
          </span>
          <span className="block text-white font-semibold text-base mt-1">
            Adarsh Viswam
          </span>
          <span className="block text-xs text-gray-400 mt-1">
            Rich Text Editor v0.0.1
          </span>
        </div>
        <div className="flex flex-wrap gap-3 justify-center mt-2">
          <a
            href="https://github.com/adarshnub"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00f0ff] hover:underline font-medium"
          >
            GitHub
          </a>
          <a
            href="mailto:adarshmanjady@gmail.com"
            className="text-[#00f0ff] hover:underline font-medium"
          >
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/adarsh-viswam-95161016b/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00f0ff] hover:underline font-medium"
          >
            LinkedIn
          </a>
        </div>
        <button
          className="mt-3 px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition font-semibold shadow"
          onClick={() => {
            window.open("mailto:adarshmanjady@gmail.com", "_blank");
          }}
        >
          Connect
        </button>
      </footer>
      {/* Contributors Section */}
      <div className="mt-4 w-full max-w-2xl bg-[#232323] rounded-xl shadow p-4 flex flex-col items-center border border-[#333]">
        <span className="block text-base font-bold text-green-400 mb-1">
          Contributors
        </span>
        <ul className="list-none p-0 m-0">
          <li className="text-white font-medium">
            <a
              href="https://github.com/adarshnub"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Adarsh Viswam
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
