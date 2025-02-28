'use client';
import CardPopularNovel from '@/src/components/novel/card-popular.novel';
import CardNovel from '@/src/components/novel/card.novel';
import { Card, Image, Button, CardFooter } from '@heroui/react';
import { useEffect, useState } from 'react';

export default function Home() {
  // State để lưu số lượng item cần hiển thị
  const [itemCount, setItemCount] = useState(5);

  // Điều chỉnh số lượng item dựa trên kích thước màn hình
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        // lg breakpoint
        // 5 columns x 2 rows = 10 items (chia hết cho 5)
        setItemCount(5);
      } else if (width >= 768) {
        // md breakpoint
        // 4 columns x 2 rows = 8 items (chia hết cho 4)
        setItemCount(4);
      } else if (width >= 640) {
        // sm breakpoint
        // 3 columns x 2 rows = 6 items (chia hết cho 3)
        setItemCount(4);
      } else {
        // 2 columns x 3 rows = 6 items (chia hết cho 2)
        setItemCount(4);
      }
    };

    // Gọi hàm khi component mount và khi window resize
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Tạo mảng với số lượng phù hợp
  const recentlyUpdatedNovels = Array.from({ length: itemCount }, (_, i) => i);

  return (
    <>
      <div>
        <Card
          isFooterBlurred
          className='border-none mt-5 h-[350px] lg:h-[400px] w-full'
          radius='lg'
        >
          <div className='relative'>
            <Image
              alt='Elf-Devil-Princess'
              className='object-cover lg:blur-xl z-0 '
              src='https://firebasestorage.googleapis.com/v0/b/prm392-7fdba.appspot.com/o/novel%2F%40wibuhihi03%20(14).jpg?alt=media&token=3a1a7891-3868-4755-9f2c-d402c8ecff81'
              width={'100%'}
              height={500}
            />

            <div className='max-lg:hidden lg:w-[40%] max-lg:text-center lg:top-1/4 absolute z-10 lg:left-14 space-y-4 max-lg:inset-0 max-lg:mx-auto max-lg:translate-y-1/3'>
              <h1 className='text-3xl font-bold text-white'>Elf Devil Princess</h1>
              <p className='hidden text-lg text-white lg:line-clamp-3 '>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae quod voluptatem illum
                porro magni optio quibusdam sed eum, laboriosam incidunt explicabo, voluptatibus est
                excepturi cupiditate quas eius culpa nobis ut.
              </p>
              <Button color='secondary' size='lg'>
                Đọc ngay
              </Button>
            </div>

            <div className='absolute top-0 right-16 rotate-6 hidden lg:flex hover:rotate-12'>
              <Image
                alt='Elf-Devil-Princess'
                className='object-cover'
                src='https://firebasestorage.googleapis.com/v0/b/prm392-7fdba.appspot.com/o/novel%2F%40wibuhihi03%20(14).jpg?alt=media&token=3a1a7891-3868-4755-9f2c-d402c8ecff81'
                width={270}
                height={400}
              />
            </div>
          </div>

          <CardFooter className='flex justify-between flex-col before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-0 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 lg:hidden'>
            <h1 className='text-xl text-white/80 font-bold'>Elf Devil Princess.</h1>
            <p className='text-balance text-white/80 line-clamp-1 md:line-clamp-2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae alias libero, dolores,
              facilis veniam eligendi quis laborum facere ex voluptatum voluptatibus modi iste
              nesciunt accusantium voluptas quos inventore totam eaque!
            </p>
            <Button color='default' className='mt-1' size='sm'>
              Đọc ngay
            </Button>
          </CardFooter>
        </Card>
      </div>
      {/* Recently update novel */}
      <div className='mt-8'>
        <section>
          <h2 className='text-2xl font-bold mb-6'>Truyện Mới Cập Nhật</h2>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
            {recentlyUpdatedNovels.map((_, i) => (
              <CardNovel key={i} />
            ))}
          </div>
        </section>
      </div>

      {/* Popular novel */}
      <div className='mt-8'>
        <section>
          <h2 className='text-2xl font-bold mb-6'>Truyện Phổ Biến</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {Array.from({ length: 4 }, (_, i) => (
              <CardPopularNovel key={i} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
