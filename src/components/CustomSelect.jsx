import { useState, useRef, useEffect } from "react";

function CustomSelect({ value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selected = options.find(o => String(o.value) === String(value))

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-gray-800 border border-gray-700 hover:border-gray-500 rounded-lg px-3 py-1.5 text-sm text-white transition-colors min-w-32"
      >
        <span className="flex-1 text-left text-white">
          {selected ? selected.label : "..."}
        </span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full mt-1 left-0 z-50 bg-gray-800 border border-gray-700 rounded-xl shadow-xl overflow-hidden min-w-32">
          {options.map((opt, index) => (
            <button
              key={`${opt.value}-${index}`}
              onClick={() => {
                onChange(Number(opt.value));
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                Number(opt.value) === Number(value)
                  ? "bg-purple-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomSelect;
