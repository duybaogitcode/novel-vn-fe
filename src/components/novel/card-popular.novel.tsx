import { Card, CardFooter, Image, Button } from '@heroui/react';
import { Heart } from 'lucide-react';

export default function CardPopularNovel() {
  return (
    <article
      className='w-full flex gap-4 p-2 rounded-lg transition-colors duration-200'
      // onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#171717')} // gray-900
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1f2937')}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
    >
      {' '}
      {/* Dùng article để bao bọc card */}
      <Card isFooterBlurred className='border-none h-[200px] relative flexs hrink-0 ' radius='lg'>
        <Image
          alt='Elf Devil Princess - Bìa truyện tiên hiệp fantasy'
          className='object-cover '
          height={200}
          src='https://firebasestorage.googleapis.com/v0/b/prm392-7fdba.appspot.com/o/novel%2F%40wibuhihi03%20(14).jpg?alt=media&token=3a1a7891-3868-4755-9f2c-d402c8ecff81'
          width={150}
          isZoomed
        />
      </Card>
      <div className='flex-1 flex flex-col justify-between py-2'>
        <h3 className='text-xl font-semibold'>Elf Devil Princess</h3> {/* H3 cho card item */}
        <p className='text-sm text-gray-400'>Tác giả: Nguyễn Văn A</p>
        <p className='text-sm text-gray-400'>Thể loại: Tiên Hiệp, Fantasy</p>
        <p className='text-sm text-gray-400'>Lượt xem: 1000</p>
        <p className='text-sm text-gray-400'>Số chương: 100</p>
        <p className='text-tiny line-clamp-1'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis quo eligendi esse
          reprehenderit, inventore repellat ut maiores qui veniam assumenda itaque maxime unde atque
          aspernatur libero illum rerum excepturi nulla!
        </p>
      </div>
    </article>
  );
}
