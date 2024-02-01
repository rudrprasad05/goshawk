"use client";

import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { Input } from "../ui/input";

interface Props {
  placeholder?: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const MessageInput: React.FC<Props> = ({
  placeholder,
  id,
  type,
  required,
  register,
  errors,
}) => {
  return (
    <div className="relative grow">
      <Input
        type={type}
        id={id}
        autoComplete={"off"}
        {...register(id, { required })}
        placeholder={placeholder}
        className={"bg-border"}
      />
    </div>
  );
};

export default MessageInput;
