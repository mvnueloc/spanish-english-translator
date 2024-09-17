import React from "react";

export const SearchIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}>
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const Finder = ({ setPalabra }) => {
  return (
    <main className="flex justify-center">
      <input
        className="text-gray-100 flex w-[250px] md:w-[450px] py-2 px-3 border-2 border-gray-100/[0.3] rounded-l-lg bg-transparent "
        type="text"
        label="text"
        placeholder="Ingresa una palabra"
        onChange={(e) => setPalabra(e.target.value)}
        required
      />
    </main>
  );
};

export default Finder;
