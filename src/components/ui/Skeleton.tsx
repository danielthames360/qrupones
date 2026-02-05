'use client';

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className = '' }: SkeletonProps) => {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded-[8px] ${className}`}
      style={{
        animation: 'shimmer 1.5s infinite',
      }}
    />
  );
};

// Skeleton for coupon cards
export const CouponCardSkeleton = () => {
  return (
    <div
      className="bg-white rounded-[16px] p-[20px] shadow-lg"
      style={{ fontSize: '16px' }}
    >
      <div className="flex items-center gap-[16px]">
        {/* Logo skeleton */}
        <Skeleton className="w-[80px] h-[80px] rounded-[12px] flex-shrink-0" />

        {/* Content skeleton */}
        <div className="flex-1 space-y-[12px]">
          <Skeleton className="h-[20px] w-[70%]" />
          <Skeleton className="h-[16px] w-[90%]" />
          <Skeleton className="h-[14px] w-[50%]" />
          <Skeleton className="h-[36px] w-[120px] rounded-[20px]" />
        </div>
      </div>
    </div>
  );
};

// Skeleton for history items
export const HistoryItemSkeleton = () => {
  return (
    <div
      className="bg-white rounded-[12px] p-[16px] shadow-sm border border-gray-100"
      style={{ fontSize: '16px' }}
    >
      <div className="flex items-center gap-[16px]">
        <Skeleton className="w-[60px] h-[60px] rounded-[8px] flex-shrink-0" />
        <div className="flex-1 space-y-[8px]">
          <Skeleton className="h-[18px] w-[60%]" />
          <Skeleton className="h-[14px] w-[80%]" />
          <Skeleton className="h-[12px] w-[40%]" />
        </div>
        <div className="text-right space-y-[8px]">
          <Skeleton className="h-[14px] w-[80px]" />
          <Skeleton className="h-[24px] w-[60px] rounded-[12px]" />
        </div>
      </div>
    </div>
  );
};

// Loading grid for coupons
export const CouponsLoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[20px]">
      {[...Array(6)].map((_, i) => (
        <CouponCardSkeleton key={i} />
      ))}
    </div>
  );
};

// Loading list for history
export const HistoryLoadingSkeleton = () => {
  return (
    <div className="space-y-[12px]">
      {[...Array(5)].map((_, i) => (
        <HistoryItemSkeleton key={i} />
      ))}
    </div>
  );
};
