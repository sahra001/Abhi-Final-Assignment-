import React from "react";

interface SpecializationSelectProps {
  departmentId: number;
  universities: { departments: { id: number; specializations: { id: number; name: string }[] }[] }[];
  onChange: (id: number | null) => void;
}

const SpecializationSelect: React.FC<SpecializationSelectProps> = ({ departmentId, universities, onChange }) => {
  const department = universities
    .flatMap((uni) => uni.departments)
    .find((dept) => dept.id === departmentId);

  return (
    <select onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)} disabled={!department}>
      <option value="">Select a Specialization</option>
      {department?.specializations.map((specialization) => (
        <option key={specialization.id} value={specialization.id}>
          {specialization.name}
        </option>
      ))}
    </select>
  );
};

export default SpecializationSelect;
