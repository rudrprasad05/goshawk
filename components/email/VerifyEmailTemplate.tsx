import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { buttonVariants } from "../ui/button";

interface VerifyEmailEmailTemplateProps {
  email: string;
  emailVerificationToken: string;
}

export const VerifyEmailTemplate: React.FC<
  Readonly<VerifyEmailEmailTemplateProps>
> = ({ email, emailVerificationToken }) => {
  const dateFunc = () => {
    let date = new Date();
    return date.getFullYear();
  };
  return (
    <Html>
      <Head />
      <Preview>Goshawk Email Verification</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={coverSection}>
            <Section style={imageSection}>
              <Img
                src={`https://mctechfiji.s3.amazonaws.com/alibaba/logo-temp.png`}
                width="75"
                height="45"
                alt="Goshawk's Logo"
              />
            </Section>
            <Section style={upperSection}>
              <Heading style={h1}>Verify your email address</Heading>
              <Text style={mainText}>
                Thanks for creating a new Goshawk account. We want to make sure
                it's really you. Please click the following verification code
                link. If you don&apos;t want to create an account, or if this
                isnt you, you can ignore this message.
              </Text>
              <Section style={verificationSection}>
                <Text style={verifyText}>Verification Link</Text>
                <Link
                  href={`http://localhost:3000/verify?token=${emailVerificationToken}`}
                  className={buttonVariants({ variant: "link" })}
                >
                  Verify Email
                </Link>
                <Text style={validityText}>
                  (This code is valid for 10 minutes)
                </Text>
                <Text style={validityText}>
                  If you cant press the link, paste this url into the search bar
                  of your browser
                </Text>
                <Link
                  href={`http://localhost:3000/verify?token=${emailVerificationToken}`}
                  className={buttonVariants({ variant: "link" })}
                >
                  {`http://localhost:3000/verify?token=${emailVerificationToken}`}
                </Link>
              </Section>
            </Section>
            <Hr />
            <Section style={lowerSection}>
              <Text style={cautionText}>
                Goshawk will never email you and ask you to disclose or verify
                your password, credit card, or banking account number.
              </Text>
            </Section>
          </Section>
          <Text style={footerText}>
            This message was produced and distributed by Goshawk, Ltd., 14 Moala
            Street, Samabula, Suva. ©{dateFunc()}, Goshawk. All rights reserved.
            Goshawk is a registered trademark of
            <Link href="https://goshawkfiji.com" target="_blank" style={link}>
              goshawk.com
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#fff",
  color: "#212121",
};

const container = {
  padding: "20px",
  margin: "0 auto",
  backgroundColor: "#eee",
};

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "15px",
};

const link = {
  color: "#2754C5",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  textDecoration: "underline",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
};

const imageSection = {
  backgroundColor: "#252f3d",
  display: "flex",
  padding: "20px 0",
  alignItems: "center",
  justifyContent: "center",
};

const coverSection = { backgroundColor: "#fff" };

const upperSection = { padding: "25px 35px" };

const lowerSection = { padding: "25px 35px" };

const footerText = {
  ...text,
  fontSize: "12px",
  padding: "0 20px",
};

const verifyText = {
  ...text,
  margin: 0,
  fontWeight: "bold",
  textAlign: "center" as const,
};

const codeText = {
  ...text,
  fontWeight: "bold",
  fontSize: "36px",
  margin: "10px 0",
  textAlign: "center" as const,
};

const validityText = {
  ...text,
  margin: "0px",
  textAlign: "center" as const,
};

const verificationSection = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const mainText = { ...text, marginBottom: "14px" };

const cautionText = { ...text, margin: "0px" };
