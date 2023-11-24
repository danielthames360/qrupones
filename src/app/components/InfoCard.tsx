import Image, { StaticImageData } from 'next/image';

interface InfoCardProps {
  img: StaticImageData;
  title: string;
  text: string;
}

export const InfoCard = ({ img, title, text }: InfoCardProps) => {
  return (
    <div className='info__grid-text'>
      <Image src={img} alt='icon-business' />
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
};
