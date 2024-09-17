import {BaseApi} from "@/services/base.service";

const getData = async () => {
  return  await BaseApi.get("/orders");
};

const ReviewOrders = () => {
  const test = getData();

  console.log(test);

  return (
    <div>
      test
    </div>
  );
};

export default ReviewOrders;
