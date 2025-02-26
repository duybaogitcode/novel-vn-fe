import { Card, CardFooter, Image, Button } from '@heroui/react';
import { Heart } from 'lucide-react';

export default function CardNovel() {
  return (
    <Card isFooterBlurred className='border-none h-[300px] relative flex-shrink-0' radius='lg'>
      <Image
        alt='Woman listing to music'
        className='object-cover h-full'
        height={300}
        src='https://firebasestorage.googleapis.com/v0/b/prm392-7fdba.appspot.com/o/novel%2F%40wibuhihi03%20(14).jpg?alt=media&token=3a1a7891-3868-4755-9f2c-d402c8ecff81'
        width={250}
        isZoomed
      />
      <CardFooter className='justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-0 w-[calc(100%_-_8px)] shadow-small ml-1 z-10'>
        <p className='text-balance text-white/80 line-clamp-1'>Elf Devil Princess.</p>
        <Button
          className='text-tiny text-white bg-black/20'
          color='default'
          radius='lg'
          size='sm'
          variant='flat'
        >
          <div className='flex items-center space-x-1 '>
            <Heart />
            {/* <p className='text-balance'>T</p> */}
          </div>
        </Button>
      </CardFooter>
    </Card>
  );
}
