"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { PRODUCT_CATEGORIES } from "@/config";
import { CartContext } from "@/context/CartContext";
import { cn, formatPrice } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Check, Loader2, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { FaSpinner } from "react-icons/fa";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MerchantOrderType, UserDataOnlyType, UserType } from "@/types";
import { GetOnlyCurrentUser } from "@/actions/user";

const PersonalDetailsSchema = z.object({
  town: z
    .string()
    .min(2, { message: "Should have more than 2 characters" })
    .max(50, { message: "Should have less than 50 characters" }),
  country: z
    .string()
    .min(2, { message: "Should have more than 2 characters" })
    .max(50, { message: "Should have less than 50 characters" }),
  phone: z
    .string()
    .min(2, { message: "Should have more than 2 characters" })
    .max(50, { message: "Should have less than 50 characters" }),
  address: z
    .string()
    .min(6, { message: "Password must contain more than 2 characters" })
    .max(32, { message: "Password must have less than 2 characters" }),
});

type PersonalDetailsType = z.infer<typeof PersonalDetailsSchema>;

const Page = () => {
  const { cartProducts, getTotal, removeCart, clearCart } =
    useContext(CartContext);
  const session = useSession();
  const user = session.data?.user;
  const [loading, setLoading] = useState(false);
  const [checkoutOptionRoutePage, setCheckoutOptionRoutePage] =
    useState("mpaisa");
  const router = useRouter();
  const [order, setOrder] = useState("");
  const [userDbData, setUserDbData] = useState<UserDataOnlyType | null>();
  const [showUserDetails, setShowUserDetails] = useState(
    user?.address == null || user.country == null || user.town == null
  );
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const cartTotal = getTotal();
  const fee = 1;

  useEffect(() => {
    const getUserData = async () => {
      const res = await GetOnlyCurrentUser();
      setUserDbData(res);
    };
    getUserData();
    setIsMounted(true);
  }, [isMounted, userDbData]);

  const handleClick = async () => {
    let groupingViaCommonProperty = Object.values(
      cartProducts.reduce((acc, current) => {
        //@ts-ignore */
        acc[current.seller.id] = acc[current.seller.id] ?? [];
        //@ts-ignore */
        acc[current.seller.id].push(current);
        return acc;
      }, {})
    );
    setLoading(true);
    console.log(groupingViaCommonProperty, session.data?.user.id);
    await axios
      .post("/api/order", {
        data: groupingViaCommonProperty,
        customer: session.data?.user.id,
      })
      .then((res) => {
        router.push(`/payment/${checkoutOptionRoutePage}?id=${res.data.id}`);
        setLoading(false);
        toast.success("Order Sent Successfully");
      })
      .catch((error: any) => {
        console.log("error");
        toast("Something went wrong", { description: "Contact site admin" });
      });
    return;
  };

  const form = useForm<PersonalDetailsType>({
    resolver: zodResolver(PersonalDetailsSchema),
    defaultValues: {
      town: "",
      country: "",
      address: "",
      phone: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    axios.patch(`/api/user/${user?.id}`, data).then(() => {
      toast.success("Personal Details Updated");
      setShowUserDetails(false);
    });
  };

  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tightsm:text-4xl">
          Shopping Cart
        </h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <div
            className={cn("lg:col-span-7", {
              "rounded-lg border-2 border-dashed p-12":
                isMounted && cartProducts.length === 0,
            })}
          >
            <h2 className="sr-only">Items in your shopping cart</h2>

            <ProductSection />
          </div>

          <div className="mt-16 rounded-lg sticky top-24 flex flex-col gap-8 lg:col-span-5 lg:mt-0">
            {showUserDetails && (
              <Card className="">
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

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input
                                autoComplete="off"
                                placeholder="enter phone"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button className="w-full" type="submit">
                        {loading && (
                          <FaSpinner className={"animate-spin mr-3"} />
                        )}
                        Submit
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}

            <Card className="">
              <CardHeader>
                <h2 className="text-lg font-medium">Order summary</h2>
              </CardHeader>

              <CardContent className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Subtotal</p>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isMounted ? (
                      formatPrice(cartTotal)
                    ) : (
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    )}
                  </p>
                </div>

                <Separator />

                <div className="flex items-center justify-between border-tpt-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>Flat Transaction Fee</span>
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">
                    {isMounted ? (
                      formatPrice(fee)
                    ) : (
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    )}
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between border-tpt-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>Select Payment Method</span>
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">
                    <Select
                      onValueChange={setCheckoutOptionRoutePage}
                      defaultValue="mpaisa"
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Select payment option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mpaisa">mpaisa</SelectItem>
                        <SelectItem value="bsp">BSP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t pt-4">
                  <div className="text-base font-medium">Order Total</div>
                  <div className="text-base font-medium">
                    {isMounted ? (
                      formatPrice(cartTotal + fee)
                    ) : (
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    )}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="mt-6">
                <div className="flex flex-col gap-2 w-full">
                  {showUserDetails && (
                    <p className="text-rose-500 text-sm">
                      Enter user details before checkout
                    </p>
                  )}
                  {!userDbData?.emailVerified && (
                    <p className="text-rose-500 text-sm">Verify Email first</p>
                  )}
                  <Button
                    // disabled={cartProducts.length === 0 || loading}
                    className="w-full"
                    size="lg"
                    disabled={showUserDetails}
                    onClick={() => handleClick()}
                  >
                    {loading && (
                      <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
                    )}
                    Checkout
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductSection = () => {
  const { cartProducts, getTotal, removeCart, clearCart } =
    useContext(CartContext);

  if (cartProducts.length === 0)
    return (
      <div className="flex h-full flex-col items-center justify-center space-y-1">
        <div
          aria-hidden="true"
          className="relative mb-4 h-40 w-40 text-muted-foreground"
        >
          <Image
            src="/hippo-empty-cart.png"
            fill
            loading="eager"
            alt="empty shopping cart hippo"
          />
        </div>
        <h3 className="font-semibold text-2xl">Your cart is empty</h3>
        <p className="text-muted-foreground text-center">
          Whoops! Nothing to show here yet.
        </p>
      </div>
    );
  return (
    <ul
      className={cn({
        "divide-y border-b border-t": cartProducts.length > 0,
      })}
    >
      {cartProducts.map((product, index) => {
        const image = product.imageUrl;
        return (
          <li key={product.id + index} className="flex py-6 sm:py-10">
            <div className="flex-shrink-0">
              <div className="relative h-24 w-24">
                <Image
                  fill
                  src={image[0]}
                  alt="product image"
                  className="h-full w-full rounded-md object-cover object-center sm:h-48 sm:w-48"
                />
              </div>
            </div>

            <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
              <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                <div>
                  <div className="flex justify-between">
                    <h3 className="text-sm">
                      <Link
                        href={`/product/${product.id}`}
                        className="font-medium text-secondary-foreground"
                      >
                        {product.name}
                      </Link>
                    </h3>
                  </div>

                  <div className="mt-1 flex text-sm">
                    <p className="text-muted-foreground">{product.sellerId}</p>
                  </div>

                  <p className="mt-1 text-sm font-medium text-muted-foreground">
                    {formatPrice(product.price)}
                  </p>
                </div>

                <div className="mt-4 sm:mt-0 sm:pr-9 w-20">
                  <div className="absolute right-0 top-0">
                    <Button
                      aria-label="remove product"
                      onClick={() => removeCart(product, false)}
                      variant="ghost"
                    >
                      <X className="h-5 w-5" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              </div>

              <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                <Check className="h-5 w-5 flex-shrink-0 text-green-500" />

                <span>Eligible for instant delivery</span>
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Page;
