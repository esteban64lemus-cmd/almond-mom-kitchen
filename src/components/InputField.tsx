import React, { useId } from 'react'

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function InputField({ label, className = '', ...props }: InputFieldProps) {
  // Auto-generate an ID if one wasn't explicitly passed in
  const generatedId = useId();
  const inputId = props.id || generatedId;

  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="text-[9px] font-bold text-stone-400 uppercase tracking-widest ml-1 cursor-pointer">
        {label}
      </label>
      <input
        id={inputId}
        {...props}
        className={`
          w-full bg-stone-50/50 border border-stone-100 rounded-full px-6 py-4 text-sm text-stone-800 
          focus:outline-none focus:ring-1 focus:ring-stone-300 focus:border-stone-300 
          transition-all placeholder:text-stone-300 
          ${className}
        `}
      />
    </div>
  )
}