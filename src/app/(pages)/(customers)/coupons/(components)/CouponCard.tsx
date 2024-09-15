import Image, { StaticImageData } from 'next/image';

interface CouponCardProps {
  img: string | StaticImageData;
  name: string;
  description: string;
  date: string;
  button: string;
}

export const CouponCard = ({ img, name, description, date, button }: CouponCardProps) => {
  return (
    <div className='flex items-center coupon justify-between gap-5 sm:px-[3rem] sm:py[2rem] xl:px-[4rem]'>
      <Image
        src={img}
        alt='icon-business'
        width={112}
        height={112}
        className='max-w-[7rem] self-center h-auto sm:max-w-[10rem] md:max-w-[8rem] xl:max-w-[10rem]'
      />

      <div className='flex flex-col items-start border-dashed border-t-0 border-r-0 border-b-0 border-[#66666678] py-3 gap-4 md:gap-5'>
        <h3 className='text-[1.6rem] sm:text-[1.8rem] xl:text-[2rem]'>{name}</h3>
        <p className='text-start text-[1.1rem] leading-8 font-extralight sm:text-[1.3rem] xl:text-[1.4rem]'>{description}</p>
        <p className='text-[1rem] font-semibold sm:text-[1.1rem] leading-6 xl:text-[1.2rem]'>{date}</p>
        <button className='button button-page py-2 px-4 text-[1.1rem] sm:text-[1.2rem] xl:text-[1.3rem]'>{button}</button>
      </div>
    </div>
  );
};
