import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SellerRegisterForm from "./SellerRegisterForm";
import BuyerRegisterForm from "./BuyerRegisterForm";

export type RegisterPageProps = {
  // params: { [key: string]: string | string[] | undefined };
  searchParams: { [key: string]: string | string[] | undefined };
};

const Home = (props: RegisterPageProps) => {
  const searchParamsType = String(props?.searchParams?.type);
  const isSeller = searchParamsType == "seller";
  const isBuyer = searchParamsType == "buyer";

  if (isSeller)
    return (
      <MaxWidthWrapper className="grid place-items-center">
        <SellerRegisterForm {...props} />
      </MaxWidthWrapper>
    );
  else
    return (
      <MaxWidthWrapper className="grid place-items-center">
        <BuyerRegisterForm {...props} />
      </MaxWidthWrapper>
    );
};

export default Home;
