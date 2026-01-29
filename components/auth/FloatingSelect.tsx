'use client';
import React, { useState, useId, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface FloatingSelectOption {
  value: string;
  label: string;
}

interface FloatingSelectProps {
  id?: string;
  label: string;
  value: string;
  options: FloatingSelectOption[];
  onChange: (value: string) => void;
  error?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

export default function FloatingSelect({
  id,
  label,
  value,
  options,
  onChange,
  error,
  className,
  required = false,
  disabled = false,
}: FloatingSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    openUpward: false,
  });
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const generatedId = useId();
  const selectId = id || generatedId;

  // Check if component is mounted (for portal)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate dropdown position when open
  useEffect(() => {
    if (isOpen && containerRef.current) {
      // Use requestAnimationFrame to ensure DOM is painted before calculating
      const updatePosition = () => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const dropdownHeight = Math.min(300, options.length * 48 + 16);

        const openUpward =
          spaceBelow < dropdownHeight && rect.top > dropdownHeight;

        setDropdownPosition({
          top: openUpward ? rect.top - dropdownHeight : rect.bottom + 4,
          left: rect.left,
          width: rect.width,
          openUpward,
        });
      };

      // Calculate immediately and also after a frame for first render
      updatePosition();
      requestAnimationFrame(updatePosition);
    }
  }, [isOpen, options.length]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close on scroll (but not when scrolling inside the dropdown)
  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = (e: Event) => {
      // Don't close if scrolling inside the dropdown
      if (dropdownRef.current?.contains(e.target as Node)) {
        return;
      }
      setIsOpen(false);
      setIsFocused(false);
    };

    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, [isOpen]);

  // Label floats when focused OR has value
  const isActive = isFocused || isOpen || value.length > 0;

  // Get selected option label
  const selectedLabel = options.find((opt) => opt.value === value)?.label || '';

  const handleTriggerClick = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    setIsFocused(true);
  };

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleBlur = (e: React.FocusEvent) => {
    // Check if focus moved to dropdown (which is in portal)
    setTimeout(() => {
      if (
        !containerRef.current?.contains(document.activeElement) &&
        !dropdownRef.current?.contains(document.activeElement)
      ) {
        setIsOpen(false);
        setIsFocused(false);
      }
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        setIsOpen(!isOpen);
        break;
      case 'Escape':
        setIsOpen(false);
        triggerRef.current?.focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          const firstOption = dropdownRef.current?.querySelector(
            '[role="option"]',
          ) as HTMLElement;
          firstOption?.focus();
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          const lastOption = dropdownRef.current?.querySelector(
            '[role="option"]:last-child',
          ) as HTMLElement;
          lastOption?.focus();
        }
        break;
    }
  };

  const handleOptionKeyDown = (e: React.KeyboardEvent, optionValue: string) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleOptionClick(optionValue);
        break;
      case 'Escape':
        setIsOpen(false);
        triggerRef.current?.focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        (e.currentTarget.nextElementSibling as HTMLElement)?.focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        (e.currentTarget.previousElementSibling as HTMLElement)?.focus();
        break;
    }
  };

  // Render dropdown in portal
  const renderDropdown = () => {
    if (!isOpen || !mounted) return null;

    return createPortal(
      <div
        ref={dropdownRef}
        id={`${selectId}-listbox`}
        role='listbox'
        aria-labelledby={selectId}
        style={{
          position: 'fixed',
          top: dropdownPosition.top,
          left: dropdownPosition.left,
          width: dropdownPosition.width,
        }}
        className={cn(
          'z-[9999] py-2 bg-white dark:bg-[#2d2d2d] rounded-md shadow-lg',
          'border border-gray-200 dark:border-gray-600',
          'max-h-[300px] overflow-y-auto',
          'animate-in fade-in-0 zoom-in-95 duration-100',
        )}
      >
        {options.map((option) => (
          <div
            key={option.value}
            role='option'
            aria-selected={value === option.value}
            tabIndex={0}
            onClick={() => handleOptionClick(option.value)}
            onKeyDown={(e) => handleOptionKeyDown(e, option.value)}
            className={cn(
              'px-4 py-3 cursor-pointer outline-none text-base',
              'text-gray-900 dark:text-[#E3E3E3]',
              'hover:bg-gray-100 dark:hover:bg-[#3d3d3d]',
              'focus:bg-gray-100 dark:focus:bg-[#3d3d3d]',
              value === option.value &&
                'bg-blue-50 dark:bg-[#1a3b5c] text-blue-600 dark:text-[#A8C7FA]',
            )}
          >
            {option.label}
          </div>
        ))}
      </div>,
      document.body,
    );
  };

  return (
    <div
      ref={containerRef}
      className={cn('relative', className)}
      onBlur={handleBlur}
    >
      {/* Trigger container with border */}
      <div
        className={cn(
          'floating-select-container relative h-[56px] rounded-md border transition-all duration-200',
          isActive
            ? 'border-blue-500 dark:border-[#A8C7FA]'
            : 'border-gray-300 dark:border-gray-500',
          error && 'border-red-500 dark:border-red-400',
          disabled && 'opacity-50 cursor-not-allowed',
        )}
      >
        {/* Floating Label */}
        <label
          htmlFor={selectId}
          className={cn(
            'absolute transition-all duration-200 pointer-events-none bg-white dark:bg-[#0e0e0e] px-1 z-10 left-3',
            isActive
              ? 'top-0 -translate-y-1/2 text-xs text-blue-500 dark:text-[#A8C7FA]'
              : 'top-1/2 -translate-y-1/2 text-base text-gray-500 dark:text-[#E3E3E3]',
            error && 'text-red-500 dark:text-red-400',
          )}
        >
          {label}
          {required && <span className='text-red-500 ml-0.5'>*</span>}
        </label>

        {/* Select Trigger Button */}
        <button
          ref={triggerRef}
          id={selectId}
          type='button'
          role='combobox'
          aria-expanded={isOpen}
          aria-haspopup='listbox'
          aria-controls={`${selectId}-listbox`}
          disabled={disabled}
          onClick={handleTriggerClick}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          className={cn(
            'w-full h-full px-3 text-base bg-transparent rounded-md outline-none text-left',
            'text-gray-900 dark:text-[#E3E3E3]',
            'disabled:cursor-not-allowed',
            'flex items-center justify-between',
          )}
        >
          <span className={cn(!selectedLabel && 'opacity-0')}>
            {selectedLabel || label}
          </span>
          <ChevronDown
            className={cn(
              'h-5 w-5 text-gray-500 dark:text-[#E3E3E3] transition-transform duration-200',
              isOpen && 'rotate-180',
            )}
          />
        </button>
      </div>

      {/* Dropdown rendered via portal */}
      {renderDropdown()}

      {/* Error message */}
      {error && (
        <p className='mt-1 text-xs text-red-500 dark:text-red-400'>{error}</p>
      )}
    </div>
  );
}
