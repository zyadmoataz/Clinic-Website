import { useId } from 'react';
import { useTranslation } from 'react-i18next';

interface BrandLogoProps {
  size?: 'sm' | 'md';
  showText?: boolean;
  className?: string;
}

export function BrandLogo({ size = 'md', showText = true, className = '' }: BrandLogoProps) {
  const { t } = useTranslation();
  const gradId = useId();
  const iconDim = size === 'sm' ? 'h-7 w-7' : 'h-9 w-9';
  const textSize = size === 'sm' ? 'text-base' : 'text-lg';
  const appName = t('common.appName', 'Medora Clinics');

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 64 64" aria-hidden="true" className={`${iconDim} shrink-0 drop-shadow-xs`}>
        <defs>
          <linearGradient id={gradId} x1="6" y1="4" x2="58" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1d4ed8" />
            <stop offset="55%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0f766e" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="60" height="60" rx="16" fill={`url(#${gradId})`} />
        <rect
          x="3"
          y="3"
          width="58"
          height="58"
          rx="15"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.22"
          strokeWidth="1.5"
        />
        <rect x="25.5" y="13" width="13" height="38" rx="4.5" fill="#ffffff" />
        <rect x="13" y="25.5" width="38" height="13" rx="4.5" fill="#ffffff" />
        <path
          d="M17.5 32 H25 L28.5 23.5 L33.5 40.5 L37.5 28 L40 32 H46.5"
          fill="none"
          stroke="#0f766e"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {showText && (
        <span
          className={`text-text font-display ${textSize} leading-tight font-extrabold tracking-tight`}
        >
          {appName}
        </span>
      )}
    </span>
  );
}
