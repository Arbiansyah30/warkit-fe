import React from "react";

interface ICardProps {
  label: string;
  value: string;
}
export const Card: React.FC<ICardProps> = ({ label, value }) => {
  return (
    <>
      <div className="rounded-md bg-gray-900 px-7 py-6">
        <div className="text-center">
          <h4 className="text-title-md font-bold text-white">{label}</h4>
          <span className="text-sm font-medium text-white">{value}</span>
        </div>
      </div>
    </>
  );
};
