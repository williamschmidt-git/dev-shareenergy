import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HeaderComponent() {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    switch (e.currentTarget.textContent) {
      case 'RANDOM USER':
        return navigate('/main');

      case 'HTTP CAT':
        return navigate('/httpcats');

      case 'RANDOM DOG':
        return navigate('/random-dog');

      case 'CUSTOMERS':
        return navigate('/customers');

      default:
        return navigate(window.location.pathname);
    }
  };

  return (
    <ul className="flex bg-indigo-600">
      <li>
        <button
          className="text-white font-roboto text-xl p-4 hover:scale-[1.02] transition ease-in-out"
          onClick={handleClick}
          type="button"
        >
          RANDOM USER

        </button>
      </li>

      <li>
        <button
          className="text-white font-roboto text-xl p-4 hover:scale-[1.02] transition ease-in-out"
          onClick={handleClick}
          type="button"
        >
          HTTP CAT

        </button>
      </li>

      <li>
        <button
          className="text-white font-roboto text-xl p-4 hover:scale-[1.02] transition ease-in-out"
          onClick={handleClick}
          type="button"
        >
          RANDOM DOG

        </button>
      </li>

      <li>
        <button
          className="text-white font-roboto text-xl p-4 hover:scale-[1.02] transition ease-in-out"
          onClick={handleClick}
          type="button"
        >
          CUSTOMERS

        </button>
      </li>
    </ul>
  );
}
