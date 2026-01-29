import * as React from 'react';
import { CheckIcon, ChevronDown, ChevronsUpDown } from 'lucide-react';
import * as RPNInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useState } from 'react';

type PhoneInputProps = Omit<
  React.ComponentProps<'input'>,
  'onChange' | 'value' | 'ref'
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange'> & {
    onChange?: (value: RPNInput.Value) => void;
    label?: string;
    error?: string;
  };

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
  React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
    ({ className, onChange, label, error, ...props }, ref) => {
      const [country, setCountry] = useState('US');

      React.useEffect(() => {
        fetch('https://api.country.is/')
          .then((res) => res.json())
          .then((data) => setCountry(data.country));
      }, []);
      return (
        <div className='relative'>
          <RPNInput.default
            ref={ref}
            className={cn('flex', className)}
            flagComponent={FlagComponent}
            countrySelectComponent={CountrySelect}
            inputComponent={(inputProps) => (
              <FloatingInputComponent
                {...inputProps}
                label={label}
                error={error}
                hasValue={!!props.value}
              />
            )}
            smartCaret={false}
            defaultCountry={country as RPNInput.Country}
            onChange={(value) => onChange?.(value || ('' as RPNInput.Value))}
            {...props}
          />
          {/* Error message */}
          {error && (
            <p className='mt-1 text-xs text-red-500 dark:text-red-400'>
              {error}
            </p>
          )}
        </div>
      );
    },
  );
PhoneInput.displayName = 'PhoneInput';

interface FloatingInputProps extends React.ComponentProps<'input'> {
  label?: string;
  error?: string;
  hasValue?: boolean;
}

const FloatingInputComponent = React.forwardRef<
  HTMLInputElement,
  FloatingInputProps
>(({ className, label, error, hasValue, onFocus, onBlur, ...props }, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || hasValue;

  return (
    <div className='relative flex-1'>
      {/* Floating Label */}
      {label && (
        <label
          className={cn(
            'absolute transition-all duration-200 pointer-events-none bg-white dark:bg-[#0e0e0e] px-1 z-10 left-3',
            isActive
              ? 'top-0 -translate-y-1/2 text-xs text-blue-500 dark:text-[#A8C7FA]'
              : 'top-1/2 -translate-y-1/2 text-base text-gray-500 dark:text-[#E3E3E3]',
            error && 'text-red-500 dark:text-red-400',
          )}
        >
          {label}
        </label>
      )}
      <Input
        className={cn(
          'rounded-lg h-[54px] md:text-base dark:bg-transparent dark:text-[#E3E3E3] border-gray-300 dark:border-gray-500 focus:border-blue-500 dark:focus:border-[#A8C7FA] focus:ring-0',
          // Hide placeholder when label is present
          label && 'placeholder:text-transparent',
          error && 'border-red-500 dark:border-red-400',
          className,
        )}
        {...props}
        ref={ref}
        onFocus={(e) => {
          setIsFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur?.(e);
        }}
      />
    </div>
  );
});
FloatingInputComponent.displayName = 'FloatingInputComponent';

// Keep original InputComponent for backward compatibility
const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>(({ className, ...props }, ref) => (
  <Input
    className={cn(
      'rounded-lg h-[54px] md:text-base dark:bg-transparent dark:text-[#E3E3E3] dark:placeholder:text-[#E3E3E3] border-gray-300 dark:border-gray-500 focus:border-blue-500 dark:focus:border-[#A8C7FA] focus:ring-0',
      className,
    )}
    {...props}
    ref={ref}
  />
));
InputComponent.displayName = 'InputComponent';

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  options: CountryEntry[];
  onChange: (country: RPNInput.Country) => void;
};

const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
}: CountrySelectProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type='button'
          variant='outline'
          className='flex gap-1 rounded-e-none rounded-lg border-none px-3 mr-2 focus:z-10 h-[54px] dark:bg-transparent dark:text-[#E3E3E3] dark:placeholder:text-[#E3E3E3] focus:ring-0'
          disabled={disabled}
        >
          <FlagComponent
            country={selectedCountry}
            countryName={selectedCountry}
          />
          <ChevronDown
            className={cn(
              'ml-2 size-4 opacity-50',
              disabled ? 'hidden' : 'opacity-100',
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[300px] p-0'>
        <Command>
          <CommandInput placeholder='Search country...' />
          <CommandList>
            <ScrollArea className='h-72'>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countryList.map(({ value, label }) =>
                  value ? (
                    <CountrySelectOption
                      key={value}
                      country={value}
                      countryName={label}
                      selectedCountry={selectedCountry}
                      onChange={onChange}
                    />
                  ) : null,
                )}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

interface CountrySelectOptionProps extends RPNInput.FlagProps {
  selectedCountry: RPNInput.Country;
  onChange: (country: RPNInput.Country) => void;
}

const CountrySelectOption = ({
  country,
  countryName,
  selectedCountry,
  onChange,
}: CountrySelectOptionProps) => {
  return (
    <CommandItem className='gap-2' onSelect={() => onChange(country)}>
      <FlagComponent country={country} countryName={countryName} />
      <span className='flex-1 text-sm'>{countryName}</span>
      <span className='text-sm text-foreground/50'>{`+${RPNInput.getCountryCallingCode(
        country,
      )}`}</span>
      <CheckIcon
        className={`ml-auto size-4 ${
          country === selectedCountry ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </CommandItem>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className='flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20 [&_svg]:size-full'>
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

export { PhoneInput };
