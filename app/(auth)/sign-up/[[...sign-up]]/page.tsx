import Image from "next/image"
import { Loader2 } from "lucide-react"
import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="font-bold text-3xl text-[#2E2A47]">
            Welcome Back!
          </h1>
          <p className="text-base text-[#7E8CA0]">
            Log in or Create account to get back to your dashboard
          </p>
        </div>
        <div className="flex items-center justify-center mt-8">
          <ClerkLoaded>
            <SignUp path="/sign-up" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground" />
          </ClerkLoading>
        </div>
      </div>
      <div className="h-full bg-blue-600 hidden lg:flex items-center justify-center">
      <div className="flex flex-col justify-center items-center">
        <Image src="/logo.svg" height={100} width={100} alt="Logo" />
          <span
          className="text-white text-xl">FinTrackPro</span>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;