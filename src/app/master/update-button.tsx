"use client";

import { Button } from "@/src/components/ui/button";

export const UpdateButton = () => {
  const fetchData = async () => {
    const data = await fetch("api/update").then((res) => res.json());
    console.log(data);
  };

  return <Button onClick={fetchData}>Update</Button>;
};
