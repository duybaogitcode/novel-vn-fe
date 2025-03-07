// app/(public)/novel/[slug]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Image, Skeleton, Spinner } from '@heroui/react';
import { Star, Clock, Eye, Heart, BookOpen, Calendar, User } from 'lucide-react';
import { NovelService } from '@/src/api/generated/services/NovelService';
import { Novel } from '@/src/api/generated/models/Novel';
import Link from 'next/link';

export default function NovelDetail() {
  const { slug } = useParams();
  const [novel, setNovel] = useState<Novel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNovel() {
      try {
        if (typeof slug !== 'string') return;

        setIsLoading(true);
        // Lưu ý: API cần id, nhưng route sử dụng slug
        // Bạn có thể cần API endpoint khác hoặc xử lý lookup
        const novelData = await NovelService.novelControllerFindOne(slug);
        setNovel(novelData);
        setError(null);
      } catch (err) {
        console.error('Error fetching novel:', err);
        setError('Failed to load novel details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchNovel();
  }, [slug]);

  // Loading state
  if (isLoading) {
    return (
      <main className='min-h-screen text-white'>
        <div className='max-w-7xl mx-auto px-4 py-8'>
          <div className='flex flex-col md:flex-row gap-8'>
            {/* Left Side - Cover Skeleton */}
            <div className='w-full md:w-1/4'>
              <Skeleton className='rounded-lg w-full h-[400px]' />

              <div className='flex justify-center gap-4 mt-4'>
                <Skeleton className='rounded-full w-20 h-6' />
                <Skeleton className='rounded-full w-20 h-6' />
                <Skeleton className='rounded-full w-20 h-6' />
              </div>

              <Skeleton className='rounded-lg w-full h-14 mt-4' />

              <div className='flex justify-center mt-4'>
                <Skeleton className='rounded-lg w-32 h-8' />
              </div>
            </div>

            {/* Right Side - Novel Info Skeleton */}
            <div className='flex-1'>
              <Skeleton className='rounded-lg w-3/4 h-10 mb-4' /> {/* Title */}
              <div className='flex flex-wrap gap-3 mb-6'>
                <Skeleton className='rounded-full w-24 h-6' />
                <Skeleton className='rounded-full w-24 h-6' />
                <Skeleton className='rounded-full w-24 h-6' />
                <Skeleton className='rounded-full w-24 h-6' />
              </div>
              <div className='flex flex-wrap gap-2 mb-6'>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className='rounded-full w-20 h-8' /> // Genres
                ))}
              </div>
              <Skeleton className='rounded-lg w-full h-24 mb-8' /> {/* Description */}
              {/* Chapters Section Skeleton */}
              <div className='mt-8'>
                <div className='flex justify-between items-center mb-4'>
                  <Skeleton className='rounded-lg w-40 h-8' />
                  <Skeleton className='rounded-lg w-24 h-6' />
                </div>

                {/* Premium Section Skeleton */}
                <Skeleton className='rounded-lg w-full h-24 mb-4' />

                {/* Free Chapters Skeleton */}
                <Skeleton className='rounded-lg w-full h-56' />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Error state
  if (error || !novel) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center p-4 text-white'>
        <h1 className='text-2xl font-bold mb-4'>Oops! Something went wrong</h1>
        <p className='mb-6'>{error || 'Novel not found'}</p>
        <Link href='/novel' className='text-cyan-400 hover:underline'>
          Back to Novels
        </Link>
      </div>
    );
  }

  // Format date for display
  const formattedDate = new Date(novel.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Format view count
  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  return (
    <main className='relative min-h-screen z-10 text-white'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        {/* Novel Header */}
        <div className='flex flex-col md:flex-row gap-8'>
          {/* Left Side - Cover Image */}
          <div className='w-full md:w-1/4'>
            <div className='relative rounded-lg w-full overflow-hidden'>
              <Image
                src={novel.coverImage}
                alt={novel.title}
                className='object-cover'
                height={400}
                width={'100%'}
              />
            </div>
            <div className='flex justify-center gap-4 mt-4'>
              <div className='flex items-center gap-1'>
                <Clock className='w-4 h-4' />
                <span>{Math.floor(novel.words / 250)}</span>
              </div>
              <div className='flex items-center gap-1'>
                <BookOpen className='w-4 h-4' />
                <span>{novel.chapters}</span>
              </div>
              <div className='flex items-center gap-1'>
                <Heart className='w-4 h-4' />
                <span>1729</span>
              </div>
            </div>
            <Link href={`/novel/${novel.slug}/chapter/1`}>
              <button className='w-full bg-cyan-400 text-gray-900 font-semibold py-3 rounded-lg mt-4'>
                {/* Cần logic để xác định chapter đang đọc */}
                Start Reading
                <div className='text-sm font-normal'>Chapter 1</div>
              </button>
            </Link>
            <div className='flex justify-center mt-4'>
              <div className='flex gap-1'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className='w-6 h-6 text-yellow-400'
                    fill={star <= Math.floor(novel.rating) ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
            </div>
            <div className='text-center mt-2 text-sm'>Rate This Novel</div>
          </div>

          {/* Right Side - Novel Info */}
          <div className='flex-1'>
            <h1 className='text-4xl font-bold mb-4'>{novel.title}</h1>
            <div className='flex items-center gap-4 text-sm mb-6 flex-wrap'>
              <span className='flex items-center gap-1'>
                <User className='w-4 h-4' /> {novel.author}
              </span>
              <span className='flex items-center gap-1'>
                <Eye className='w-4 h-4' /> {formatViews(novel.views)}
              </span>
              <span className='flex items-center gap-1'>
                <Star className='w-4 h-4' fill='currentColor' /> {novel.rating}
              </span>
              <span>{formattedDate}</span>
            </div>

            <div className='flex flex-wrap gap-2 mb-6'>
              {novel.genres && Array.isArray(novel.genres)
                ? novel.genres.map((genre) => (
                    <Link href={`/novel/genre/${genre.slug}`} key={genre.id}>
                      <span className='px-3 py-1 bg-gray-800 rounded-full text-sm hover:bg-gray-700 transition-colors'>
                        {genre.name}
                      </span>
                    </Link>
                  ))
                : null}
            </div>

            <p className='text-gray-300 mb-8'>{novel.description}</p>

            {/* Chapters Section */}
            <div className='mt-8'>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-2xl font-semibold'>{novel.chapters} Chapters</h2>
                <span className='text-cyan-400'>{novel.origin.name}</span>
              </div>

              {/* Premium Section - Giả định 20% chapters là premium */}
              <div className='border border-gray-700 rounded-lg p-4 mb-4'>
                <div className='flex items-center gap-4'>
                  <div className='w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center'>
                    <BookOpen className='w-8 h-8' />
                  </div>
                  <div>
                    <h3 className='text-xl font-semibold'>Premium</h3>
                    <p className='text-gray-400'>{Math.floor(novel.chapters * 0.2)} Chapters</p>
                  </div>
                </div>
              </div>

              {/* Free Chapters */}
              <div className='border border-gray-700 rounded-lg p-4'>
                <div className='flex items-center gap-4 mb-4'>
                  <div className='w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center'>
                    <BookOpen className='w-8 h-8' />
                  </div>
                  <div>
                    <h3 className='text-xl font-semibold'>Free</h3>
                    <p className='text-gray-400'>{Math.floor(novel.chapters * 0.8)} Chapters</p>
                  </div>
                </div>

                {/* Chapter List - Demo chapters */}
                <div className='space-y-4'>
                  <div className='p-4 bg-gray-800 rounded-lg hover:bg-gray-700 cursor-pointer'>
                    <div className='text-sm text-gray-400'>Chapter 0</div>
                    <div className='font-semibold'>Introduction</div>
                    <div className='text-sm text-gray-400'>{formattedDate}</div>
                  </div>
                  <div className='p-4 bg-gray-800 rounded-lg hover:bg-gray-700 cursor-pointer'>
                    <div className='text-sm text-gray-400'>Chapter 1</div>
                    <div className='font-semibold'>Beginning</div>
                    <div className='text-sm text-gray-400'>{formattedDate}</div>
                  </div>

                  {/* Link xem tất cả chapter */}
                  <div className='mt-6 text-center'>
                    <Link
                      href={`/novel/${novel.slug}/chapters`}
                      className='text-cyan-400 hover:underline'
                    >
                      View All Chapters
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
