import React from "react";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";

interface Template {
  email: string;
  resetPasswordToken: string;
}

const ResetPasswordTemplate: React.FC<Template> = ({
  email,
  resetPasswordToken,
}) => {
  return (
    <div>
      <p>Reset password for account of {email}</p>
      <div>
        <div>To reset your password,</div>
        <Link
          href={`${process.env.LOCAL_URL}/auth/resetpassword?token=${resetPasswordToken}`}
          className={buttonVariants({ variant: "link" })}
        >
          Click Here
        </Link>
      </div>
    </div>
  );
};

export default ResetPasswordTemplate;
