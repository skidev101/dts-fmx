import Navbar from "@/components/Navbar";

const ResourcesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main className="mt-28">{children}</main>
    </div>
  );
};

export default ResourcesLayout;
