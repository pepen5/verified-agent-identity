import OrderSuccessClient from '@/components/OrderSuccessClient';

export default function OrderSuccessPage({
  searchParams,
}: {
  searchParams: { id?: string; session_id?: string };
}) {
  return <OrderSuccessClient orderId={searchParams.id || searchParams.session_id} />;
}
