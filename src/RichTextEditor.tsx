import React, { useRef, useEffect, useState } from "react";
// Import Lucide icons
import {
  Bold as LucideBold,
  Italic as LucideItalic,
  Underline as LucideUnderline,
  Strikethrough as LucideStrikethrough,
  List,
  ListOrdered,
  Link2,
} from "lucide-react";
import "./rich-text-editor.css";

interface RichTextEditorProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
  placeholder?: string;
  error?: string;
  className?: string;
  style?: React.CSSProperties;
}

const toolbarButtons = [
  { cmd: "bold", icon: <LucideBold size={18} />, label: "Bold" },
  { cmd: "italic", icon: <LucideItalic size={18} />, label: "Italic" },
  { cmd: "underline", icon: <LucideUnderline size={18} />, label: "Underline" },
  {
    cmd: "strikeThrough",
    icon: <LucideStrikethrough size={18} />,
    label: "Strikethrough",
  },
  {
    cmd: "insertUnorderedList",
    icon: <List size={18} />, // Bullet List
    label: "Bullet List",
  },
  {
    cmd: "insertOrderedList",
    icon: <ListOrdered size={18} />, // Numbered List
    label: "Numbered List",
  },
  { cmd: "createLink", icon: <Link2 size={18} />, label: "Link" },
  // Image upload intentionally omitted
];

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  className,
  style,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [activeStates, setActiveStates] = useState<{ [cmd: string]: boolean }>(
    {}
  );
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  // Add a ref to store the selection range
  const savedRangeRef = useRef<Range | null>(null);

  // Set initial value only when value prop changes (not on every keystroke)
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  // Update active toolbar states on selection change
  useEffect(() => {
    const updateToolbarState = () => {
      const newStates: { [cmd: string]: boolean } = {};
      toolbarButtons.forEach((btn) => {
        try {
          newStates[btn.cmd] = document.queryCommandState(btn.cmd);
        } catch {
          newStates[btn.cmd] = false;
        }
      });
      setActiveStates(newStates);
    };
    document.addEventListener("selectionchange", updateToolbarState);
    return () =>
      document.removeEventListener("selectionchange", updateToolbarState);
  }, []);

  const handleCommand = (cmd: string) => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
    if (cmd === "createLink") {
      // Get selected text if any
      let selectedText = "";
      const selection = window.getSelection();
      if (selection && !selection.isCollapsed) {
        selectedText = selection.toString();
      }
      // Save the current selection range
      if (selection && selection.rangeCount > 0) {
        savedRangeRef.current = selection.getRangeAt(0).cloneRange();
      } else {
        savedRangeRef.current = null;
      }
      setLinkText(selectedText);
      setShowLinkInput(true);
      setLinkUrl("");
      return;
    } else if (cmd === "insertUnorderedList" || cmd === "insertOrderedList") {
      document.execCommand(cmd, false, "");
    } else {
      document.execCommand(cmd, false);
    }
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
    // Update toolbar state after command
    setTimeout(() => {
      const newStates: { [cmd: string]: boolean } = {};
      toolbarButtons.forEach((btn) => {
        try {
          newStates[btn.cmd] = document.queryCommandState(btn.cmd);
        } catch {
          newStates[btn.cmd] = false;
        }
      });
      setActiveStates(newStates);
    }, 0);
  };

  const handleInsertLink = () => {
    if (editorRef.current) {
      editorRef.current.focus();
      // Restore the saved selection range
      const selection = window.getSelection();
      if (savedRangeRef.current && selection) {
        selection.removeAllRanges();
        selection.addRange(savedRangeRef.current);
      }
      if (selection && !selection.isCollapsed) {
        // Text is selected, just create the link
        document.execCommand("createLink", false, linkUrl);
      } else if (selection) {
        // No text selected, insert the linkText as a link at the cursor
        const a = document.createElement("a");
        a.href = linkUrl;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = linkText || linkUrl;
        const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
        if (range) {
          range.insertNode(a);
          // Move cursor after the inserted link
          range.setStartAfter(a);
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
      onChange(editorRef.current.innerHTML);
    }
    setShowLinkInput(false);
    setLinkUrl("");
    setLinkText("");
    savedRangeRef.current = null;
  };

  const handleCancelLink = () => {
    setShowLinkInput(false);
    setLinkUrl("");
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    onChange(e.currentTarget.innerHTML);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (onBlur) onBlur(e);
    onChange(e.currentTarget.innerHTML);
  };

  const handleEditorClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "A") {
      const anchor = target as HTMLAnchorElement;
      if (anchor.href) {
        e.preventDefault();
        window.open(anchor.href, "_blank", "noopener,noreferrer");
      }
    }
  };

  return (
    <div
      className={`rte-root${className ? ` ${className}` : ""}`}
      style={style}
    >
      <div className="rte-editor-container">
        {/* Toolbar */}
        <div className="rte-toolbar">
          {toolbarButtons.map((btn) => (
            <button
              key={btn.cmd}
              type="button"
              aria-label={btn.label}
              className={`rte-toolbar-btn${
                activeStates[btn.cmd] ? " rte-active" : ""
              }`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleCommand(btn.cmd)}
            >
              {btn.icon}
            </button>
          ))}
        </div>
        {/* Editor input and placeholder wrapper */}
        <div style={{ position: "relative" }} className="w-full max-w-full">
          {/* Insert Link Popup above the editor input */}
          {showLinkInput && (
            <div className="rte-link-popup">
              <input
                type="text"
                className=""
                placeholder="Text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleInsertLink();
                  if (e.key === "Escape") handleCancelLink();
                }}
              />
              <input
                type="url"
                className=""
                placeholder="Enter URL"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleInsertLink();
                  if (e.key === "Escape") handleCancelLink();
                }}
              />
              <button
                type="button"
                className="rte-insert-btn"
                onClick={handleInsertLink}
                disabled={!linkUrl || !linkText}
              >
                Insert
              </button>
              <button
                type="button"
                className="rte-cancel-btn"
                onClick={handleCancelLink}
              >
                Cancel
              </button>
            </div>
          )}
          <div
            ref={editorRef}
            className={`rte-editor-box ${error ? " border-red-500" : ""}`}
            contentEditable
            dir="ltr"
            spellCheck={true}
            data-placeholder={placeholder}
            onInput={handleInput}
            onBlur={handleBlur}
            aria-label={name}
            aria-invalid={!!error}
            style={{ whiteSpace: "pre-wrap", textAlign: "left" }}
            onClick={handleEditorClick}
          />
          {(!value || value === "<br>") && (
            <div className="rte-placeholder">{placeholder}</div>
          )}
        </div>
      </div>
      {error && <div className="rte-error">{error}</div>}
    </div>
  );
};

export default RichTextEditor;
