import Container from "./Container";

type Params = {
  // params: { [key: string]: string | string[] | undefined };
  searchParams: { [key: string]: string | string[] | undefined };
};

const page = (props: Params) => {
  return (
    <>
      <Container props={props} />
    </>
  );
};
export default page;
