import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const RecommendedNotes = () => {
  return (
    <Card className="w-full h-[430px] rounded-3xl bg-card">
      <CardContent>
        <h1 className="text-2xl font-semibold">Recommended</h1>
        <p className="mt-2 text-foreground/80 text-xs">Notes recommended based on your activity</p>

        {/* <div className="w-full h-full bg-neutral-800 border border-neutral-700 p-4 rounded-3xl  flex flex-col justify-center items-center mt-2">
              <div className="w-full flex justify-between items-center mt-10 px-8">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <p>Used</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <p>Free</p>
                </div>
              </div>
            </div> */}

        <div className="flex w-full mt-4 py-4 gap-4">
          <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
          <div className="flex flex-col gap-2 w-full h-full py-1">
            <Skeleton className="w-[calc(100%-30px)] h-3 rounded-full" />
            <Skeleton className="w-[calc(100%-80px)] h-3 rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendedNotes;
