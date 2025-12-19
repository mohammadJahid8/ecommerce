'use client';
import React, { useState, useId, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { X, Eye, EyeOff } from 'lucide-react';

interface FloatingInputProps {
  id?: string;
  label: string;
  type?: 'text' | 'email' | 'password';
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  showPasswordToggle?: boolean;
  error?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  prefix?: string;
}

export default function FloatingInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onClear,
  showPasswordToggle = false,
  error,
  className,
  required = false,
  disabled = false,
  prefix,
}: FloatingInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [hasAutoFilled, setHasAutoFilled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const generatedId = useId();
  const inputId = id || generatedId;

  // Detect browser autofill
  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    // Check for autofill on mount and periodically
    const checkAutofill = () => {
      try {
        // Chrome/Safari autofill detection
        const isAutofilled = input.matches(':-webkit-autofill');
        if (isAutofilled) {
          setHasAutoFilled(true);
        }
      } catch {
        // Firefox and other browsers - check by background color or value
        const computedStyle = window.getComputedStyle(input);
        const backgroundColor = computedStyle.backgroundColor;
        // Autofill typically changes background to light yellow
        if (
          backgroundColor.includes('rgb(250, 255, 189)') ||
          backgroundColor.includes('rgb(232, 240, 254)')
        ) {
          setHasAutoFilled(true);
        }
      }
    };

    // Check immediately and after a short delay (for async autofill)
    checkAutofill();
    const timeoutId = setTimeout(checkAutofill, 100);
    const intervalId = setInterval(checkAutofill, 500);

    // Also listen for animation events (Chrome uses animation for autofill)
    const handleAnimationStart = (e: AnimationEvent) => {
      if (e.animationName === 'onAutoFillStart') {
        setHasAutoFilled(true);
      } else if (e.animationName === 'onAutoFillCancel') {
        setHasAutoFilled(false);
      }
    };

    input.addEventListener('animationstart', handleAnimationStart);

    // Cleanup after 3 seconds (autofill should be detected by then)
    const cleanupId = setTimeout(() => clearInterval(intervalId), 3000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
      clearTimeout(cleanupId);
      input.removeEventListener('animationstart', handleAnimationStart);
    };
  }, []);

  // Additional focus sync for mobile - check if input is active element
  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const syncFocus = () => {
      const isInputFocused = document.activeElement === input;
      if (isInputFocused !== isFocused) {
        setIsFocused(isInputFocused);
      }
    };

    // Check focus state periodically for mobile edge cases
    const intervalId = setInterval(syncFocus, 100);

    // Listen to focusin/focusout on document for mobile
    const handleFocusIn = (e: FocusEvent) => {
      if (e.target === input) {
        setIsFocused(true);
      }
    };

    const handleFocusOut = (e: FocusEvent) => {
      if (e.target === input) {
        setIsFocused(false);
      }
    };

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

    // Cleanup after component stabilizes
    const cleanupId = setTimeout(() => clearInterval(intervalId), 2000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(cleanupId);
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, [isFocused]);

  // Reset autofill state when value is cleared
  useEffect(() => {
    if (!value) {
      setHasAutoFilled(false);
    }
  }, [value]);

  // Label floats when focused OR has value OR has autofill
  const isActive = isFocused || value.length > 0 || hasAutoFilled;
  const inputType = type === 'password' && showPassword ? 'text' : type;

  const handleClear = () => {
    onChange('');
    setHasAutoFilled(false);
    onClear?.();
    // Refocus the input after clearing
    inputRef.current?.focus();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle container click to focus input (for mobile tap on container)
  const handleContainerClick = () => {
    inputRef.current?.focus();
    setIsFocused(true);
  };

  return (
    <div className={cn('relative', className)}>
      {/* Autofill detection styles + focus-within fallback for label */}
      <style jsx>{`
        @keyframes onAutoFillStart {
          from {
            /**/
          }
          to {
            /**/
          }
        }
        @keyframes onAutoFillCancel {
          from {
            /**/
          }
          to {
            /**/
          }
        }
        input:-webkit-autofill {
          animation-name: onAutoFillStart;
        }
        input:not(:-webkit-autofill) {
          animation-name: onAutoFillCancel;
        }
      `}</style>

      {/* Input container with border */}
      <div
        ref={containerRef}
        onClick={handleContainerClick}
        className={cn(
          'floating-input-container relative h-[56px] rounded-md border transition-all duration-200 cursor-text',
          isActive
            ? 'border-blue-500 dark:border-[#A8C7FA]'
            : 'border-gray-300 dark:border-gray-500',
          error && 'border-red-500 dark:border-red-400',
          disabled && 'opacity-50 cursor-not-allowed',
          // CSS fallback for focus state
          'focus-within:border-blue-500 dark:focus-within:border-[#A8C7FA]'
        )}
      >
        {/* Floating Label - uses both JS state and CSS :focus-within */}
        <label
          htmlFor={inputId}
          className={cn(
            'absolute transition-all duration-200 pointer-events-none bg-white dark:bg-[#0e0e0e] px-1 z-10',
            prefix ? 'left-10' : 'left-3',
            // JS-based active state
            isActive
              ? 'top-0 -translate-y-1/2 text-xs text-blue-500 dark:text-[#A8C7FA] !left-3'
              : 'top-1/2 -translate-y-1/2 text-base text-gray-500 dark:text-[#E3E3E3]',
            error && 'text-red-500 dark:text-red-400',
            // CSS fallback: when container has focus-within, apply float styles
            // This uses peer class for CSS-only fallback
            '[.floating-input-container:focus-within_&]:top-0',
            '[.floating-input-container:focus-within_&]:-translate-y-1/2',
            '[.floating-input-container:focus-within_&]:text-xs',
            '[.floating-input-container:focus-within_&]:text-blue-500',
            '[.floating-input-container:focus-within_&]:dark:text-[#A8C7FA]',
            '[.floating-input-container:focus-within_&]:!left-3'
          )}
        >
          {label}
          {required && <span className='text-red-500 ml-0.5'>*</span>}
        </label>

        {/* Prefix (e.g., N- for OTP codes) */}
        {prefix && (
          <span className='absolute left-3 top-1/2 -translate-y-1/2 text-base text-gray-500 dark:text-[#E3E3E3] select-none'>
            {prefix}
          </span>
        )}

        {/* Input Field */}
        <input
          ref={inputRef}
          id={inputId}
          type={inputType}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            // If user types, consider it as active even if autofill triggered
            if (e.target.value) {
              setHasAutoFilled(false);
            }
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          className={cn(
            'w-full h-full py-2 text-base bg-transparent rounded-md outline-none',
            'text-gray-900 dark:text-[#E3E3E3]',
            'disabled:cursor-not-allowed',
            // Left padding for prefix
            prefix ? 'pl-10' : 'pl-3',
            // Right padding for buttons
            value && showPasswordToggle && type === 'password'
              ? 'pr-20'
              : value || (showPasswordToggle && type === 'password')
              ? 'pr-10'
              : 'pr-3'
          )}
        />

        {/* Action buttons container */}
        <div className='absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1'>
          {/* Clear button */}
          {value && (
            <button
              type='button'
              onClick={handleClear}
              className='p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors'
              aria-label='Clear input'
              tabIndex={-1}
            >
              <X className='w-4 h-4' />
            </button>
          )}

          {/* Password toggle button */}
          {showPasswordToggle && type === 'password' && (
            <button
              type='button'
              onClick={togglePasswordVisibility}
              className='p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors'
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className='w-4 h-4' />
              ) : (
                <Eye className='w-4 h-4' />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Error message */}
      {error && (
        <p className='mt-1 text-xs text-red-500 dark:text-red-400'>{error}</p>
      )}
    </div>
  );
}
