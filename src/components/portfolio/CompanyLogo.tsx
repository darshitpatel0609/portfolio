import { useState } from 'react';

interface CompanyLogoProps {
  companyId: string;
}

const COMPANY_LOGO_ASSETS: Record<
  string,
  { src: string; alt: string; wrapperClass: string; imgClass: string }
> = {
  omniism: {
    src: '/assets/aistudio/image_dd995df8.png',
    alt: 'OmniISM Technologies logo',
    wrapperClass:
      'h-7 w-7 overflow-hidden rounded-md border border-slate-200/90 bg-white p-0.5 dark:border-slate-700/80',
    imgClass: 'h-full w-full object-contain',
  },
  qdev: {
    src: '/assets/aistudio/image_b3f3e0ee.png',
    alt: 'Qdev Technolab logo',
    wrapperClass:
      'h-7 w-7 overflow-hidden rounded-md border border-slate-200/90 bg-[#05445E] dark:border-slate-700/80',
    imgClass: 'h-full w-full scale-110 object-cover object-bottom',
  },
};

export function CompanyLogo({ companyId }: CompanyLogoProps) {
  const [imgError, setImgError] = useState(false);

  const asset = COMPANY_LOGO_ASSETS[companyId];

  if (asset && !imgError) {
    return (
      <div className={`flex shrink-0 items-center justify-center ${asset.wrapperClass}`}>
        <img
          src={asset.src}
          alt={asset.alt}
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className={asset.imgClass}
        />
      </div>
    );
  }

  if (companyId === 'promethean') {
    // Hexagonal connected-node constellation mark matching PrometheanTech
    return (
      <svg
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
        className="h-6 w-6 shrink-0 text-cyan-700 dark:text-cyan-400"
      >
        <path
          d="M14 4L22 8.5V19.5L14 24L6 19.5V8.5L14 4Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeOpacity="0.45"
        />
        <path
          d="M14 4V24M6 8.5L22 19.5M22 8.5L6 19.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.35"
        />
        <circle cx="14" cy="4" r="1.8" fill="currentColor" />
        <circle cx="22" cy="8.5" r="1.6" fill="currentColor" />
        <circle cx="22" cy="19.5" r="1.6" fill="currentColor" />
        <circle cx="14" cy="24" r="1.8" fill="currentColor" />
        <circle cx="6" cy="19.5" r="1.6" fill="currentColor" />
        <circle cx="6" cy="8.5" r="1.6" fill="currentColor" />
        <circle cx="14" cy="14" r="2" fill="currentColor" />
        <circle cx="14" cy="9.2" r="1.2" fill="currentColor" fillOpacity="0.85" />
        <circle cx="14" cy="18.8" r="1.2" fill="currentColor" fillOpacity="0.85" />
        <circle cx="10" cy="11.6" r="1.1" fill="currentColor" fillOpacity="0.75" />
        <circle cx="18" cy="11.6" r="1.1" fill="currentColor" fillOpacity="0.75" />
        <circle cx="10" cy="16.4" r="1.1" fill="currentColor" fillOpacity="0.75" />
        <circle cx="18" cy="16.4" r="1.1" fill="currentColor" fillOpacity="0.75" />
      </svg>
    );
  }

  return (
    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-slate-100 font-display text-xs font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
      {companyId.slice(0, 2).toUpperCase()}
    </div>
  );
}
