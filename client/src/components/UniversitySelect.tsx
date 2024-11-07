import React from "react";

interface UniversitySelectProps {
  universities: { id: number; name: string }[];
  onChange: (id: number | null) => void;
}

const UniversitySelect: React.FC<UniversitySelectProps> = ({ universities, onChange }) => {
  return (
    <select onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}>
      <option value="">Select a University</option>
      {universities.map((university) => (
        <option key={university.id} value={university.id}>
          {university.name}
        </option>
      ))}
    </select>
  );
};

export default UniversitySelect;
