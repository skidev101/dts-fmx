import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
        <SignIn routing="path" path="/auth/login" signUpUrl="/auth/sign-up" />
    
    </div>
  );
}
