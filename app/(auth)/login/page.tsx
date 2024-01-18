import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import BuyerLoginForm from "./BuyerLoginForm";
import SellerLoginForm from "./SellerLoginForm";
// import LoginForm from "./LoginForm";

export type LoginPageProps = {
  // params: { [key: string]: string | string[] | undefined };
  searchParams: { [key: string]: string | string[] | undefined };
};

const Home = (props: LoginPageProps) => {
  const searchParamsType = String(props?.searchParams?.type);
  const isSeller = searchParamsType == "seller";
  const isBuyer = searchParamsType == "buyer";

  if (isSeller)
    return (
      <MaxWidthWrapper className="grid place-items-center">
        <SellerLoginForm {...props} />
      </MaxWidthWrapper>
    );
  else
    return (
      <MaxWidthWrapper className="grid place-items-center">
        <BuyerLoginForm {...props} />
      </MaxWidthWrapper>
    );
};

export default Home;
