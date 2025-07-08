// src/components/Step2BasicInfo.tsx
import React from "react";

interface Step2BasicInfoProps {
  data: { name: string; phone: string; email: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Step2BasicInfo({
  data,
  onChange,
  onNext,
  onPrev,
}: Step2BasicInfoProps) {
  return (
    <div>
      <input
        type="text"
        name="name"
        value={data.name}
        onChange={onChange}
        placeholder="Name"
      />
      <input
        type="text"
        name="phone"
        value={data.phone}
        onChange={onChange}
        placeholder="Phone"
      />
      <input
        type="email"
        name="email"
        value={data.email}
        onChange={onChange}
        placeholder="Email"
      />
      <button onClick={onPrev}>Previous</button>
      <button onClick={onNext}>Next</button>
    </div>
  );
}
