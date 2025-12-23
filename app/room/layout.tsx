import Navbar from "@/components/Navbar";

const RoomLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main className="">{children}</main>
    </div>
  );
};

export default RoomLayout;
