"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export const SignInCard = () => {
  return (
    <Card className="w-full h-full md:w-121.75 border-none shadow-sm">
      <CardHeader className="flex items-center justify-center text-center p-5">
        <CardTitle className="text-2xl">Sign In</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-7">
        <form className="space-y-4">
          <Input
            required
            type="email"
            value={""}
            onChange={() => {}}
            placeholder="Email"
            disabled={false}
            maxLength={128}
          />
          <Input
            required
            type="password"
            value={""}
            onChange={() => {}}
            placeholder="Password"
            disabled={false}
            minLength={6}
            maxLength={128}
          />
          <Button type="submit" className="w-full" size="lg">
            Sign In
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
