"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Searchbar = ({ onChange }: { onChange: (value: string) => void }) => {
  return (
    <div className=" relative flex max-w-68 flex-1 min-w-0">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

      <Input
        placeholder="Search ..."
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 rounded-lg bg-neutral-800!important border-neutral-700!important focus:border-neutral-600! focus:ring-0!important flex-1 min-w-0"
      />
    </div>
  );
};

export default Searchbar;
