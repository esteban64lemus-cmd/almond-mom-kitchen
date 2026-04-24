import React, { useId } from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function InputField({
  label,
  className = "",
  ...props
}: InputFieldProps) {
  // Auto-generate an ID if one wasn't explicitly passed in
  const generatedId = useId();
  const inputId = props.id || generatedId;

  return (
    <div className="space-y-2">
      <label
        htmlFor={inputId}
        className="ml-1 cursor-pointer text-[9px] font-bold tracking-widest text-stone-400 uppercase"
      >
        {label}
      </label>
      <input
        id={inputId}
        {...props}
        className={`w-full rounded-full border border-stone-100 bg-stone-50/50 px-6 py-4 text-sm text-stone-800 transition-all placeholder:text-stone-300 focus:border-stone-300 focus:ring-1 focus:ring-stone-300 focus:outline-none ${className} `}
      />
    </div>
  );
}
