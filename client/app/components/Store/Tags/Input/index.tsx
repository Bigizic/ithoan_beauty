import React, { useEffect, useRef } from "react";
import 'react-phone-number-input/style.css';
import PhoneInput, { Value } from 'react-phone-number-input';
import StarRating from "../../Icons/StarRating";
import { Search } from "lucide-react";
import { FiSearch } from "react-icons/fi";
import Autosuggest from 'react-autosuggest';
import { SuggestionsFetchRequestedParams } from "react-autosuggest";

interface InputProps {
  placeholder?: string;
  label?: string | null;
  border?: string;
  borderRadius?: string;
  type?: 'text' | 'password' | 'email' | 'tel' | 'number' | 'stars' | 'file' | 'search' | 'autoSuggest';
  error?: string | null;
  onInputChange?: (name: string, value: string | File) => void;
  className?: string;
  inlineElement?: React.ReactNode | null;
  value?: string | number;
  lock?: boolean;
  autoFocus?: boolean;
  onBlur?: any;
  name?: string;
  searchIcon?: number;
  searchIconClassName?: string;
  onClick?: () => void;
  showSearch?: boolean,
  history?: any

  suggestions?: any[];
  onSuggestionsFetchRequested?: (req: SuggestionsFetchRequestedParams) => void;
  onSuggestionsClearRequested?: () => void;
  getSuggestionValue?: (suggestion: any) => string;
  renderSuggestion?: (suggestion: any) => React.ReactNode;
  inputProps?: any;
  onSearch?: any;
}

const Input: React.FC<InputProps> = (props) => {
  const {
    placeholder = '',
    label = null,
    border = 'none',
    borderRadius = '5px',
    type = 'text',
    error = null,
    onInputChange = () => { },
    className = 'inputs',
    inlineElement = null,
    value,
    lock = false,
    name = 'input', // Default name
    autoFocus = false,
    onBlur,
    searchIcon = 22,
    searchIconClassName = '',
    onClick,
    showSearch,
    onSearch,
    history,
    onSuggestionsFetchRequested,
    onSuggestionsClearRequested,
    getSuggestionValue,
    renderSuggestion,
    suggestions,
    ...restProps
  } = props;
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (type !== 'search') return;

    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        if (onBlur) onBlur(e);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [type, onBlur]);

  const _onChange = (e: any) => {
    if (type === 'tel' && typeof e === 'string') {
      onInputChange('phone', e);
    } else {
      if (e.target.name === 'image' || type === 'file') {
        onInputChange(e.target.name, e.target.files?.[0] || '');
      } else {
        onInputChange(e.target.name, e.target.value);
      }
    }
  };

  const handlePhoneChange = (phoneValue: Value) => {
    onInputChange('phone', phoneValue?.toString() || '');
  };

  const handleStarClick = (ratingValue: number) => {
    onInputChange('rating', ratingValue.toString());
  };

  if (label) {
    return (
      <div className="input_container">
        <div className="input_icon flex flex-row align-center gap-[1em]">
          <label htmlFor={name}>{label}</label>
          <input
            id={name}
            name={name}
            type={type}
            className={className}
            placeholder={placeholder}
            style={{
              border,
              borderRadius,
            }}
            onChange={_onChange}
            value={value}
            {...restProps}
          />
          {inlineElement}
        </div>
        {error && <small className="error_message">{error}</small>}
      </div>
    );
  }

  if (type === 'stars') {
    return (
      <div className="input_container">
        <div style={{ justifyContent: 'center' }} className="input_icon">
          <StarRating
            lock={lock}
            value={typeof value === 'number' ? value : Number(value)}
            onInputClick={handleStarClick}
          />
        </div>
      </div>
    );
  }

  if (type === 'tel') {
    return (
      <PhoneInput
        placeholder={placeholder}
        className="input_tel"
        defaultCountry="NG"
        international
        countryCallingCodeEditable={true}
        onChange={handlePhoneChange}
        value={value as string}
      />
    );
  }
  if (type === 'autoSuggest') {
    return (
      <div ref={inputRef} className="input_container flex items-center gap-[0.5em]">
        {showSearch ? (
          <Autosuggest
            suggestions={Array.isArray(suggestions) ? suggestions : []}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested ?? (() => { })}
            onSuggestionsClearRequested={onSuggestionsClearRequested ?? (() => { })}
            getSuggestionValue={getSuggestionValue ?? ((s: any) => (s && s.name) ? s.name : '')}
            renderSuggestion={renderSuggestion ?? ((s: any) => <div>{s?.name ?? ''}</div>)}
            inputProps={{
              placeholder: placeholder ?? '',
              className: className ?? '',
              value: typeof value === 'string' ? value : '',
              autoFocus: autoFocus,
              onChange: (_: any, { newValue }) => {
                onSearch(newValue);
              },
            }}
            onSuggestionSelected={(_: any, { suggestion }: any) => {
              if (suggestion?.slug && history) {
                history(`/product/${suggestion.slug}`);
              }
            }}
          />
        ) : (
          <FiSearch
            size={searchIcon}
            className={`cursor-pointer ${searchIconClassName}`}
            onClick={onClick}
          />
        )}
        {error && <small className="error_message">{error}</small>}
      </div>
    )
  }



  return (
    <div className="input_container">
      <div className="input_icon flex flex-row align-center gap-[1em]">
        <input
          name={name}
          type={type}
          className={className}
          placeholder={placeholder}
          onChange={e => {
            _onChange(e);
          }}
          autoFocus={autoFocus}
          style={{
            border,
            borderRadius,
          }}
          value={value}
          {...restProps}
        />
        {inlineElement}
      </div>
      {error && <small className="error_message">{error}</small>}
    </div>
  );
};

export default Input;