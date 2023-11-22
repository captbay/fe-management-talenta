"use client";
import { forwardRef } from "react";

// eslint-disable-next-line react/display-name
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react"; // Assuming you have these icons

// eslint-disable-next-line react/display-name
const Input = forwardRef(({ type = "text", ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isPassword = type === "password";

  return (
    <div className="relative">
      <input
        ref={ref}
        type={showPassword ? "text" : type}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10"
        {...props}
      />
      {isPassword && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center justify-center bg-transparent border-none p-2"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOffIcon className="h-5 w-5 text-gray-500" />
          ) : (
            <EyeIcon className="h-5 w-5 text-gray-500" />
          )}
        </button>
      )}
    </div>
  );
});

export default Input;
