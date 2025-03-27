"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      setIsLoading(true);

      // Check if MetaMask is installed
      if (!window.ethereum) {
        toast.error("Please install MetaMask to sign in");
        return;
      }

      // Request account access
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      // Create message to sign
      const message = `Sign in to IPL Market with wallet ${address}`;
      const signature = await signer.signMessage(message);

      // Sign in with NextAuth
      const result = await signIn("credentials", {
        walletAddress: address,
        signature,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Failed to sign in");
        return;
      }

      toast.success("Signed in successfully");
      router.push("/");
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error("Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Sign in to IPL Market using your wallet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            className="w-full"
            onClick={handleSignIn}
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in with Wallet"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 