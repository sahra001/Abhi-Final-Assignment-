import React from "react";

interface DepartmentSelectProps {
  universityId: number;
  universities: { id: number; departments: { id: number; name: string }[] }[];
  onChange: (id: number | null) => void;
}

const DepartmentSelect: React.FC<DepartmentSelectProps> = ({ universityId, universities, onChange }) => {
  const university = universities.find((uni) => uni.id === universityId);

  return (
    <select onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)} disabled={!university}>
      <option value="">Select a Department</option>
      {university?.departments.map((department) => (
        <option key={department.id} value={department.id}>
          {department.name}
        </option>
      ))}
    </select>
  );
};

export default DepartmentSelect;
