"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
  FieldContent,
} from "@/components/ui/field";

import { loginSchema } from "../schemas";
import { useLogin } from "../api/use-login";
import Image from "next/image";

export const SignInCard = () => {
  const { mutate, isPending } = useLogin();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    mutate({ json: values });
  };

  return (
    <Card className="w-full h-full md:w-121.75 border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center">
         <Image src="/logo.png" alt="logo" width={200} height={128} />
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <FieldContent>
                <Input
                  type="email"
                  placeholder="Enter email address"
                  {...form.register("email")}
                />
                <FieldError errors={[form.formState.errors.email]} />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>Password</FieldLabel>
              <FieldContent>
                <Input
                  type="password"
                  placeholder="Enter password"
                  {...form.register("password")}
                />
                <FieldError errors={[form.formState.errors.password]} />
              </FieldContent>
            </Field>
          </FieldGroup>

          <Button disabled={isPending} size="lg" className="w-full">
            Login
          </Button>
        </form>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex flex-col gap-y-4">
        
      </CardContent>
    </Card>
  );
};
