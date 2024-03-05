"use client";

import { Button } from "@/src/components/ui/button";
import { useState } from "react";

export const UpdateButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    const payload = {
      year: 2024,
      division: 2, // 1: M, 2: F
      ordinal: 1,
      filter: [
        { name: "rank", isNum: true },
        { name: "scoreDisplay" },
        { name: "breakdown" },
        { name: "time", isNum: true },
        { name: "scaled", isNum: true },
      ],
    };

    setIsLoading(true);
    const data = await fetch("api/update", {
      method: "POST",
      body: JSON.stringify(payload),
    }).then((res) => res.json());
    setIsLoading(false);

    console.log(data);
  };

  return (
    <Button onClick={fetchData} disabled={isLoading}>
      {isLoading ? "Fetching..." : "Update"}
    </Button>
  );
};
