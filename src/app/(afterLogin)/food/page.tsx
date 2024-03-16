import React from 'react';
import QueryComponent from '../_component/QueryComponent';
import ExpireyFood from '../_component/ExpireyFood';

const page = () => {
  return (
    <div className="flex w-full flex-col gap-[20px] pt-[20px]">
      <div className="flex w-full flex-row justify-between gap-[40px] pt-[20px]">
        <div className="flex gap-[20px]">
          <div>식재료 관리</div>
          <QueryComponent value="storage" />
        </div>
        <div className="flex">
          <QueryComponent value="sort" />
        </div>
      </div>
      <div className="flex flex-row flex-wrap items-center gap-[10px]">
        <ExpireyFood />
      </div>
    </div>
  );
};

export default page;
