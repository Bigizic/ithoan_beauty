import * as React from "react";
import { cn } from "../../lib/utils";
import 'react-phone-number-input/style.css';
import PhoneInput, { Value } from 'react-phone-number-input';

interface InputProps extends React.ComponentProps<"input"> {
  onInputChange?: (name: string, value: string) => void;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, value, onInputChange, inputProps, ...props }, ref) => {
    const handlePhoneChange = (phoneValue: Value) => {
      onInputChange?.('phone', phoneValue?.toString() || '');
    };

    if (type === 'tel') {
      return (
        <PhoneInput
          {...props}
          {...inputProps}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          defaultCountry="NG"
          international
          countryCallingCodeEditable={true}
          onChange={handlePhoneChange}
          value={value as string}
        />
      );
    }

    return (
      <input
        type={type}
        ref={ref}
        {...props}
        {...inputProps}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
      />
    );
  },
);

Input.displayName = "Input";
export { Input };
