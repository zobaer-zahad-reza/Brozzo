import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const DescriptionEditor = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ color: [] }, { background: [] }],
      ["link", "clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "script",
    "indent",
    "color",
    "background",
    "link",
  ];

  return (
    // margin-bottom টা একটু কমিয়ে দিলাম, আর w-full ঠিক আছে
    <div className="mb-4 brozzo-quill-container w-full rounded-md flex flex-col">
      {/* FIXED: Props গুলো ReactQuill এর ঠিক জায়গায় বসানো হয়েছে */}
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        className="text-gray-200 flex flex-col flex-1"
      />

      {/* Custom CSS */}
      <style>{`
        /* Toolbar Background & Border */
        .brozzo-quill-container .ql-toolbar.ql-snow {
          background-color: #121215;
          border: 1px solid #27272a; /* zinc-800 */
          border-top-left-radius: 0.375rem;
          border-top-right-radius: 0.375rem;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        /* Editor Container Background & Border */
        .brozzo-quill-container .ql-container.ql-snow {
          background-color: #18181b;
          border: 1px solid #27272a; /* zinc-800 */
          border-top: none;
          border-bottom-left-radius: 0.375rem;
          border-bottom-right-radius: 0.375rem;
          /* FIXED: Min height দেওয়া হলো, ফিক্সড হাইট রিমুভ করা হলো */
          min-height: 250px; 
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        /* Editor Text Color & Placeholder */
        .brozzo-quill-container .ql-editor {
          color: #e5e7eb; /* text-gray-200 */
          font-size: 14px;
          flex: 1;
        }
        .brozzo-quill-container .ql-editor.ql-blank::before {
          color: #52525b; /* text-zinc-500 placeholder */
        }

        /* Toolbar Icons Default Color (Gray) */
        .brozzo-quill-container .ql-snow .ql-stroke {
          stroke: #9ca3af;
        }
        .brozzo-quill-container .ql-snow .ql-fill, 
        .brozzo-quill-container .ql-snow .ql-stroke.ql-fill {
          fill: #9ca3af;
        }
        .brozzo-quill-container .ql-snow .ql-picker {
          color: #9ca3af;
        }

        /* Toolbar Icons Hover & Active Color (Brozzo Accent: #FF4955) */
        .brozzo-quill-container .ql-snow.ql-toolbar button:hover .ql-stroke,
        .brozzo-quill-container .ql-snow .ql-toolbar button:hover .ql-stroke,
        .brozzo-quill-container .ql-snow.ql-toolbar button.ql-active .ql-stroke,
        .brozzo-quill-container .ql-snow .ql-toolbar button.ql-active .ql-stroke,
        .brozzo-quill-container .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,
        .brozzo-quill-container .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke,
        .brozzo-quill-container .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
        .brozzo-quill-container .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke {
          stroke: #FF4955;
        }

        .brozzo-quill-container .ql-snow.ql-toolbar button:hover .ql-fill,
        .brozzo-quill-container .ql-snow .ql-toolbar button:hover .ql-fill,
        .brozzo-quill-container .ql-snow.ql-toolbar button.ql-active .ql-fill,
        .brozzo-quill-container .ql-snow .ql-toolbar button.ql-active .ql-fill,
        .brozzo-quill-container .ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill,
        .brozzo-quill-container .ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill,
        .brozzo-quill-container .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,
        .brozzo-quill-container .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill {
          fill: #FF4955;
        }

        /* Dropdown options text color */
        .brozzo-quill-container .ql-snow.ql-toolbar .ql-picker-item:hover,
        .brozzo-quill-container .ql-snow .ql-toolbar .ql-picker-item:hover,
        .brozzo-quill-container .ql-snow.ql-toolbar .ql-picker-item.ql-selected,
        .brozzo-quill-container .ql-snow .ql-toolbar .ql-picker-item.ql-selected {
          color: #FF4955;
        }

        /* Dropdown menu background */
        .brozzo-quill-container .ql-snow .ql-picker-options {
          background-color: #121215;
          border: 1px solid #27272a;
        }
      `}</style>
    </div>
  );
};

export default DescriptionEditor;
