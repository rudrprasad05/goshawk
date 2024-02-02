"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { z } from "zod";
import { Card, CardHeader, CardContent } from "../ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "../ui/form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const PersonalDetailsSchema = z.object({
  town: z
    .string()
    .min(2, { message: "Should have more than 2 characters" })
    .max(50, { message: "Should have less than 50 characters" }),
  country: z
    .string()
    .min(2, { message: "Should have more than 2 characters" })
    .max(50, { message: "Should have less than 50 characters" }),
  address: z
    .string()
    .min(6, { message: "Password must contain more than 2 characters" })
    .max(32, { message: "Password must have less than 2 characters" }),
});

type PersonalDetailsType = z.infer<typeof PersonalDetailsSchema>;

const PersonalDetails = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const session = useSession();
  const user = session.data?.user;

  const form = useForm<PersonalDetailsType>({
    resolver: zodResolver(PersonalDetailsSchema),
    defaultValues: {
      town: "",
      country: "",
      address: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    axios.patch(`/api/user/${user?.id}`, data).then(() => {
      toast.success("Personal Details Updated");
    });
  };

  return (
    <>
      {(user?.address == null || user.country == null || user.town == null) && (
        <Card className="my-6">
          <CardHeader>
            <h2 className="text-lg font-medium">Personal Details</h2>
          </CardHeader>

          <CardContent className="mt-6 space-y-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
              >
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>address</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          placeholder="enter address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="town"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>town</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          placeholder="enter town"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>country</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          placeholder="enter country"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button className="w-full" type="submit">
                  {loading && <FaSpinner className={"animate-spin mr-3"} />}
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default PersonalDetails;
