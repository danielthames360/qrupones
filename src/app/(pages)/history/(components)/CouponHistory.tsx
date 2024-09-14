import { FadeIn } from '@/components';
import { TableHistory } from './TableHistory';

export const CouponsHistory = () => {
  return (
    <>
      <div className='w-11/12 md:w-9/12 xl:w-3/5 2xl:w-[51%] mx-auto relative py-[5rem]'>
        <div className='flex flex-col gap-5 md:h-[20%] justify-center items-center'>
          <FadeIn as={'h2'} delay={300} origin={'bottom'}>
            Historial de QRupones
          </FadeIn>
        </div>

        <FadeIn as='div' delay={500} origin={'left'}>
          <TableHistory />
        </FadeIn>
      </div>
    </>
  );
};
