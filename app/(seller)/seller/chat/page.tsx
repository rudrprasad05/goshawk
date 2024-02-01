import { GetAllParentCategories } from "@/actions/category";
import { ChatApi } from "@/actions/seller";
import { getCurrentUser } from "@/actions/user";
import DashboardContent from "@/components/Admin/DashboardContent";
import Header from "@/components/Admin/Header";
import RedirectToSellerAuth from "@/components/Admin/RedirectToSellerAuth";
import ChatSection from "@/components/chat/ChatSection";
import UserList from "@/components/chat/UserList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield } from "lucide-react";
import React from "react";

type PageProps = {
  params: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const page = async (props: PageProps) => {
  const seller = await ChatApi();
  const convoId = props.searchParams?.c;
  return (
    <div className="flex gap-6 grow h-full">
      <UserList items={seller} />
      <HandleChatSection id={convoId} />
    </div>
  );
};

const HandleChatSection = ({ id }: { id: string | string[] | undefined }) => {
  if (id == undefined) return <EmptyState />;
  return <ChatSection id={id} />;
};

const EmptyState = () => {
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>No chat seleted</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>Click on a user</CardDescription>
      </CardContent>
    </Card>
  );
};

export default page;
