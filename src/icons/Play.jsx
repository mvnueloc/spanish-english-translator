import React from "react";

const Play = ({ className = "" }) => {
  return (
    <div>
      <svg
        className={className}
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true">
        <path
          clipRule="evenodd"
          fillRule="evenodd"
          d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"></path>
      </svg>
    </div>
  );
};

export default Play;
