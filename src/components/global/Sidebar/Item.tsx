import React from 'react';
import { Link } from 'react-router-dom';
import { BsChevronDown } from 'react-icons/bs';

interface DropdownItem {
  name: string;
  link: string;
}

interface ItemSidebarProps {
  name: string;
  link: string;
  children: React.ReactNode;
  dropdown?: DropdownItem[];
  isActive: string;
  handleDropdown: (name: string) => void;
}

const ItemSidebar: React.FC<ItemSidebarProps> = ({ name, link, children, dropdown, isActive, handleDropdown }) => {
  const isDropdownActive = isActive === name;

  return (
    <li>
      {dropdown ? (
        <button
          onClick={() => handleDropdown(name)}
          className={`group relative w-full flex items-center gap-2 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-gray-700 ${isDropdownActive ? 'bg-gray-700' : ''}`}
        >
          {children}
          <BsChevronDown className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-transform ${isDropdownActive ? 'rotate-180' : ''}`} />
        </button>
      ) : (
        <Link
          className={`group relative flex items-center gap-2 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-gray-700 ${isActive === name ? 'bg-gray-700' : ''}`}
          to={link}
        >
          {children}
        </Link>
      )}
      {dropdown && isDropdownActive && (
        <div className="translate transform overflow-hidden">
          <ul className="mb-5 mt-4 flex flex-col gap-2 pl-6">
            {dropdown.map((subItem) => (
              <li key={subItem.name}>
                <Link
                  className="group relative flex items-center gap-2 rounded-md px-4 font-medium text-gray-400 duration-300 ease-in-out hover:text-white"
                  to={subItem.link}
                >
                  {subItem.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

export default ItemSidebar;
