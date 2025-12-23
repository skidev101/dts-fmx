import { Rocket } from "lucide-react";

const page = () => {
  return (
    <section className="w-full flex justify-center items-center min-h-screen">
      <div className="flex justify-center items-center flex-col text-center">
        <Rocket className="size-18 mb-4" />
        <p>In rooms, you can enjoy quizzes and games</p>
        <p>Coming soon!!!</p>
      </div>
    </section>
  );
};

export default page;
