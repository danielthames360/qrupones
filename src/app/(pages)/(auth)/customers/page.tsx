import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Customers } from './(components)/Customers';

const page = async () => {
  const session = await getServerSession();
  if (session) {
    return redirect('coupons');
  }
  return (
    <>
      <Customers />
    </>
  );
};

export default page;
