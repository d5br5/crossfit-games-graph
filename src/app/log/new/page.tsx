"use client";

import { Button } from "@/src/components/ui/button";

const NewLogPage = () => {
  const onSubmit = () => {
    console.log("submit");
  };

  return (
    <div className="max-w-[1200px] w-full">
      <h1>새 운동일지</h1>
      <div className="flex flex-col gap-3">
        <div className="border rounded-md flex py-3 px-6">
          <div>날짜</div>
          <div>장소</div>
        </div>
        <div className="border rounded-md py-3 px-6">내용</div>
      </div>
      <div className="w-full text-right mt-4">
        <Button className="right-0" onClick={onSubmit}>
          운동일지 만들기
        </Button>
      </div>
    </div>
  );
};

export default NewLogPage;
