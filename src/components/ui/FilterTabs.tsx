'use client';

interface FilterOption<T extends string> {
  label: string;
  value: T;
  count?: number;
}

interface FilterTabsProps<T extends string> {
  options: FilterOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

export function FilterTabs<T extends string>({
  options,
  value,
  onChange,
}: FilterTabsProps<T>) {
  return (
    <div
      className="inline-flex items-center bg-gray-100 rounded-full p-[4px]"
      style={{ fontSize: '16px' }}
    >
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`relative px-[16px] py-[8px] rounded-full transition-all duration-200 ${
            value === option.value
              ? 'bg-white text-[#002239] shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          style={{ fontSize: '14px', fontWeight: 500 }}
        >
          {option.label}
          {option.count !== undefined && (
            <span
              className={`ml-[6px] px-[6px] py-[1px] rounded-full text-[11px] ${
                value === option.value
                  ? 'bg-gradient-to-r from-[#a780b7] to-[#64cad8] text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {option.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
