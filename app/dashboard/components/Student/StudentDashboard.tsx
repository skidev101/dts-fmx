"use client"

import { useState } from "react";
import LatestNotes from "./LatestNotes";
import RecentDownloads from "./RecentDownloads";
import RecommendedNotes from "./RecommendedNotes";
import TopCourses from "./TopCourses";
import Searchbar from "../Shared/Searchbar";

const StudentDashboard = () => {
  const [search, setSearch] = useState("");

  return (
    <section className="sm:p-4 overflow-auto mt-10 sm:mt-2">
      <div className="flex w-full sm:hidden justify-center items-center py-4">
        <Searchbar onChange={setSearch} />
      </div>
      <div className="flex flex-col lg:flex-row gap-6 mt-4">
        <div className="flex flex-col w-full gap-12">
          <RecentDownloads />
          <LatestNotes />
        </div>

        <div className="flex flex-col w-full md:min-w-[320px] gap-4 flex-1">
          <RecommendedNotes />
          {/* <TopCourses /> */}
        </div>
      </div>
    </section>
  );
};

export default StudentDashboard;
