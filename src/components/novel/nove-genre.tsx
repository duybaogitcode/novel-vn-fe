// src/components/novel/novel-Genre.tsx
import Link from 'next/link';

interface NovelGenreProps {
  genres: string[];
}

export default function NovelGenre({ genres }: NovelGenreProps) {
  return (
    <div className='flex flex-wrap gap-2 mb-6'>
      {genres.map((genre) => (
        <Link
          key={genre}
          href={`/novel/Genre/${genre.toLowerCase()}`}
          className='px-3 py-1 bg-gray-800 hover:bg-gray-700 transition-colors rounded-full text-sm'
        >
          {genre}
        </Link>
      ))}
    </div>
  );
}
