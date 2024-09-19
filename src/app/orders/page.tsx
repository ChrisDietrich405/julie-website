import {BaseApi} from "@/services/base.service";

const getData = async () => {
  return  await BaseApi.get("/orders");
};

export const dynamic = 'force-dynamic';

const ReviewOrders = () => {
  const test = getData();

  return (
    <div>
      test
    </div>
  );
};

export default ReviewOrders;
