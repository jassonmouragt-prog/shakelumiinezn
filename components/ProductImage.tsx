'use client';

import Image from 'next/image';

type ProductImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export default function ProductImage({
  src,
  alt,
  className = 'object-contain',
  priority
}: ProductImageProps) {
  if (!src) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#C9A227] via-[#D4AF37] to-[#B8943D]">
        <Image
          src="/images/logo.png"
          alt=""
          fill
          priority={priority}
          className="object-contain p-2"
        />
      </div>
    );
  }

  return <Image src={src} alt={alt} fill priority={priority} className={className} />;
}