import { SignUp } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
        <SignUp routing="path" path="/sign-up" signInUrl="/login" />
    </div>
  );
}
