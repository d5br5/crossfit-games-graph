"use client";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { useState } from "react";

export const Update = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");

  const fetchData = async () => {
    const payload = {
      year: 2024,
      division: 1, // 1: M, 2: F
      ordinal: 1,
      password,
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
    <div className="flex gap-4">
      <Input
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Button onClick={fetchData} disabled={isLoading}>
        {isLoading ? "Fetching..." : "Update"}
      </Button>
    </div>
  );
};
