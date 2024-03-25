import AddFood from '../../_component/AddFood';

function page() {
  return (
    <div className="py-[20px] mobile:py-[10px]">
      <div className="px-20 py-10 text-size-font-card-title mobile:px-10 mobile:py-[10px]">
        추가하기
      </div>
      <AddFood />
    </div>
  );
}

export default page;
