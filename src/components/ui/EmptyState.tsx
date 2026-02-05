'use client';

import Image from 'next/image';
import Link from 'next/link';
import { emptyTag } from '@/app/(landingResources)/assets/images';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  icon?: 'coupons' | 'history';
}

export const EmptyState = ({
  title,
  description,
  actionLabel,
  actionHref,
  icon = 'coupons',
}: EmptyStateProps) => {
  return (
    <div
      className="flex flex-col items-center justify-center py-[60px] px-[24px] text-center"
      style={{ fontSize: '16px' }}
    >
      {/* Decorative background */}
      <div className="relative mb-[24px]">
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#a780b7]/20 to-[#64cad8]/20 rounded-full blur-[40px]"
          style={{ transform: 'scale(1.5)' }}
        />
        <div className="relative bg-gradient-to-br from-[#f8f4fa] to-[#f0f9fa] rounded-full p-[32px]">
          {icon === 'coupons' ? (
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#a780b7"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
              <path d="M13 5v2" />
              <path d="M13 17v2" />
              <path d="M13 11v2" />
            </svg>
          ) : (
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#64cad8"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 8v4l3 3" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          )}
        </div>
      </div>

      {/* Text content */}
      <h3
        className="font-semibold text-[#002239] mb-[8px]"
        style={{ fontSize: '20px', textAlign: 'center' }}
      >
        {title}
      </h3>
      <p
        className="text-gray-500 max-w-[280px] mb-[24px]"
        style={{ fontSize: '15px', textAlign: 'center', lineHeight: '1.5' }}
      >
        {description}
      </p>

      {/* Optional action button */}
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-[8px] bg-gradient-to-r from-[#a780b7] to-[#64cad8] text-white font-medium rounded-full px-[24px] py-[12px] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          style={{ fontSize: '15px' }}
        >
          {actionLabel}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  );
};
