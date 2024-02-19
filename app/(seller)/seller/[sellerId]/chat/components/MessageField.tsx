"use client";

import MessageInput from "@/components/chat/MessageInput";
import axios from "axios";
import { SendHorizontal } from "lucide-react";
import { FC } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

interface MessageFieldProps {
  conversationId: { [key: string]: string | string[] | undefined };
}

const MessageField: FC<MessageFieldProps> = ({ conversationId }) => {
  let input = "";

  const sendMessage = async (message: string) => {
    await axios.post("/api/messages", { message, conversationId });
  };

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
    <div className="bg-card sticky bottom-0 py-4 px-2 border flex gap-3 mt-auto items-center">
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

export default MessageField;
