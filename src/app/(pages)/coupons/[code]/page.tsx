import { ApiResponseInterface } from '@/interfaces';
import { SessionInterface } from '@/interfaces/SessionInterface';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { Coupons } from '../(components)/Coupons';

const backendUrl = process.env.NEXT_PUBLIC_QRUPONES_NOTIFICATION_API;
const backendKey = process.env.NEXT_PUBLIC_QRUPONES_NOTIFICATION_API_KEY;
const CouponPage = async ({ params }: { params: { code: string } }) => {
  //Llamar a tu API para validar el código
  try {
    const { data } = await axios.get<ApiResponseInterface<SessionInterface>>(
      `${backendUrl}/coupons/validateCode/${params.code}`,
      {
        headers: {
          Authorization: `Bearer ${backendKey}`,
        },
      }
    );

    if (data.success) {
      return <Coupons />;
    } else {
      redirect('/customers');
    }
  } catch (error: any) {
    redirect('/customers');
  }
};

export default CouponPage;
