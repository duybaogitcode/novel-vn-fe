// src/components/novel/novel-cover.tsx
import { Image } from '@heroui/react';

interface NovelCoverProps {
  src: string;
  alt: string;
}

export default function NovelCover({ src, alt }: NovelCoverProps) {
  return (
    <div className='relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg'>
      <Image src={src} alt={alt} className='object-cover' radius='lg' removeWrapper />
    </div>
  );
}
