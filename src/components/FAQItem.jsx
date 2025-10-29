import { useState } from "react";

export default function FAQItem({ title, content }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="group bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-blue-100 overflow-hidden hover:-translate-y-2 hover:scale-[1.02] self-start">
      <button
        className="w-full px-8 py-6 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
        onClick={toggleAccordion}
        type="button"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
              ?
            </div>
            <h3 className="text-xl font-bold text-gray-800 pr-4 group-hover:text-blue-600 transition-colors duration-300">
              {title}
            </h3>
          </div>
          <div className="flex-shrink-0">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
              isOpen 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'
            }`}>
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
          </div>
        </div>
      </button>
      
      <div
        className={`transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="px-8 pt-6">
          <p className="text-gray-700 leading-relaxed text-lg">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}
