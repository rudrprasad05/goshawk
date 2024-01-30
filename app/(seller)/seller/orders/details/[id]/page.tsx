import { GetOneMerchantList } from "@/actions/orders";
import OrderDetailsPage from "@/components/orders/OrderDetailsPage";

const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const order = await GetOneMerchantList(id);

  return <OrderDetailsPage order={order} />;
};

export default page;
