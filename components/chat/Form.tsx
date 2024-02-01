"use client";

// import useConversation from '@/app/hooks/useConversation'
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { HiPhoto, HiPaperAirplane } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { SendHorizontal } from "lucide-react";

// import { CldUploadButton } from 'next-cloudinary'

const MessageInputContainer = ({ id }: { id: string }) => {
  const conversationId = id;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  };
  return (
    <div className="py-4 px-2 border flex gap-3 mt-auto items-center">
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className={"flex items-center w-full gap-3"}
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder={"Write a message"}
        />
        <button
          type="submit"
          className="rounded-full cursor-pointer h-full aspect-square flex items-center p-2"
        >
          <SendHorizontal className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};

export default MessageInputContainer;
