"use client";

import { Button } from "@/src/components/ui/button";
import { DATA_TYPE } from "@/src/lib/const";

export const UpdateButton = () => {
  const fetchData = async () => {
    const payload = {
      year: 2024,
      division: 1, // 1: M, 2: F
      ordinal: 1,
      filter: [
        { name: "rank", type: DATA_TYPE.NUM },
        { name: "score", type: DATA_TYPE.NUM },
        { name: "scoreDisplay", type: DATA_TYPE.STR },
        { name: "breakdown", type: DATA_TYPE.STR },
        { name: "time", type: DATA_TYPE.NUM },
      ],
    };

    const data = await fetch("api/update", {
      method: "POST",
      body: JSON.stringify(payload),
    }).then((res) => res.json());
    console.log(data);
  };

  return <Button onClick={fetchData}>Update</Button>;
};
