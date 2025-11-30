import RecentDownloads from "./RecentDownloads"

const StudentDashboard = () => {
  return (
    <div className="flex items-center">
      <div className="flex flex-col gap-2">
        <RecentDownloads />
      </div>
    </div>
  )
}

export default StudentDashboard