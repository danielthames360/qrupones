import { TableHistory } from './TableHistory';

export const CouponsHistory = () => {
  return (
    <>
      <div className='h-[calc(100dvh)] max-h-[-webkit-fill-available] overflow-y-hidden w-11/12 md:w-9/12 xl:w-3/5 2xl:w-[51%] mx-auto relative py-[3.8rem] md:py-[5rem]'>
        <div className='flex flex-col gap-5 justify-center items-center'>
          <h2>Historial</h2>
        </div>

        <TableHistory />
      </div>
    </>
  );
};
