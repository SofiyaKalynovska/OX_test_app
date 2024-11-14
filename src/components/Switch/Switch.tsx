import React from "react";

interface SwitchProps {
  label: string;
  checked: boolean | undefined;
  onChange: (checked: boolean) => void;
}

 const Switch: React.FC<SwitchProps> = ({ label, checked, onChange }) => {
  return (
    <div className="flex items-center">
      <span className="mr-2">{label}</span>
      <label className="inline-block relative w-12 h-6">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)} 
          className="opacity-0 w-0 h-0"
        />
        <span
          className={`absolute inset-0 flex items-center justify-between cursor-pointer rounded-full bg-gray-300 transition duration-300 ease-in-out ${
            checked ? "bg-main-orange" : "bg-gray-300"
          }`}
        >
          <span
            className={`block w-6 h-6 bg-white rounded-full transition duration-300 ease-in-out transform ${
              checked ? "translate-x-6" : ""
            }`}
          ></span>
        </span>
      </label>
    </div>
  );
};

export default Switch;