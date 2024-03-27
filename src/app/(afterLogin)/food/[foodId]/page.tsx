import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import FoodDetailCard from '../../_component/FoodDetailCard';
import { getFoodById } from '@/_utils/getQuery';

const page = async ({ params }: { params: { foodId: string } }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['getFoodById', params.foodId],
    queryFn: () => getFoodById(params.foodId),
    staleTime: 10 * 60 * 1000,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="py-[20px] mobile:py-[10px]">
        <div className="px-20 py-10 text-size-font-card-title mobile:px-10 mobile:py-[10px]">
          식재료 상세
        </div>
        <FoodDetailCard foodId={params.foodId} />
      </div>
    </HydrationBoundary>
  );
};

export default page;
