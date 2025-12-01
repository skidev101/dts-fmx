import LatestNotes from "./LatestNotes";
import RecentDownloads from "./RecentDownloads";
import RecommendedNotes from "./RecommendedNotes";

const StudentDashboard = () => {
  return (
    <section className="sm:p-4 overflow-auto mt-10 sm:mt-2">
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col w-full gap-12">
          <RecentDownloads />
          <LatestNotes />
        </div>

        <div className="flex flex-col w-full md:min-w-[320px] gap-4 flex-1">
          <RecommendedNotes />
        </div>
      </div>
    </section>
  );
};

export default StudentDashboard;
