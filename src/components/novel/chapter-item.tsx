// src/components/novel/chapter-item.tsx
import { forwardRef } from 'react';
import Link from 'next/link';
import { Badge } from '@heroui/react';

interface ChapterItemProps {
  novelId: string;
  chapter: any;
}

const ChapterItem = forwardRef<HTMLDivElement, ChapterItemProps>(({ novelId, chapter }, ref) => {
  return (
    <Link href={`/novel/${novelId}/chapter/${chapter.number}`}>
      <div
        ref={ref}
        className='p-4 bg-gray-800 hover:bg-gray-750 transition-colors rounded-lg cursor-pointer'
      >
        <div className='flex justify-between items-center'>
          <div className='text-sm text-gray-400'>Chapter {chapter.number}</div>
          {chapter.isPremium && (
            <Badge color='warning' variant='flat'>
              Premium
            </Badge>
          )}
        </div>
        <div className='font-semibold'>{chapter.title}</div>
        <div className='text-sm text-gray-400'>
          {new Date(chapter.releaseDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </div>
      </div>
    </Link>
  );
});

ChapterItem.displayName = 'ChapterItem';
export default ChapterItem;
