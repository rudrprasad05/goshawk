"use server";

import prisma from "@/lib/prismadb";
import getSession from "./getSession";
import { revalidatePath } from "next/cache";
import { RegisterFormType } from "@/schemas/auth";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { Role } from "@prisma/client";
import { NewWebsiteType } from "@/app/(seller)/seller/[sellerId]/shop/_components/NewWebsiteButton";
import { NewWebsitePageType } from "@/app/(seller)/seller/[sellerId]/shop/[websiteId]/_components/NewWebPageButton";
import { Prisma, User } from "@prisma/client";

export const getFunnels = async (subacountId: string) => {
  const funnels = await prisma.website.findMany({
    where: { sellerId: subacountId },
    include: { webpages: true },
  });

  return funnels;
};

export const GetSellerWithWebsite = async (id: string) => {
  return await prisma.seller.findUnique({
    where: {
      id,
    },
    include: {
      Funnels: true,
    },
  });
};

export const CreateNewWebsite = async (data: NewWebsiteType) => {
  const { name, subDomainName, favicon, sellerId } = data;
  const res = await prisma.website.create({
    data: {
      name,
      subDomainName,
      favicon,
      sellerId: sellerId as string,
    },
  });
  return res;
};

export const CreateNewWebPage = async (data: NewWebsitePageType) => {
  const { name, websiteId, order } = data;
  console.log(data);
  const res = await prisma.webPages.create({
    data: {
      name,
      order: order || 1,
      websiteId: websiteId as string,
    },
  });
  return res;
};

export const GetWebPages = async (id: string) => {
  return await prisma.website.findUnique({
    where: {
      id: id,
    },
    include: {
      webpages: true,
    },
  });
};

export const getFunnelPageDetails = async (funnelPageId: string) => {
  const response = await prisma.webPages.findUnique({
    where: {
      id: funnelPageId,
    },
  });

  return response;
};

export const upsertFunnelPage = async (
  subaccountId: string,
  funnelPage: any,
  websiteId: string
) => {
  console.log(subaccountId, funnelPage, websiteId);

  if (!subaccountId || !websiteId) return;
  console.log("fire");

  console.log(funnelPage);

  const {
    id,
    name,
    pathName,
    updatedAt,
    visits,
    content,
    order,
    previewImage,
  } = funnelPage;

  const response = await prisma.webPages.upsert({
    where: { id: funnelPage.id || "" },
    update: {
      name,
      pathName,
      updatedAt,
      visits,
      order,
      previewImage,
      content: funnelPage.content,
      websiteId,
    },
    create: {
      name,
      pathName,
      updatedAt,
      visits,
      order,
      previewImage,
      content: funnelPage.content,
      websiteId,
    },
  });

  // ? funnelPage.content
  // : JSON.stringify([
  //     {
  //       content: [],
  //       id: "__body",
  //       name: "Body",
  //       styles: { backgroundColor: "white" },
  //       type: "__body",
  //     },
  //   ]),

  revalidatePath(`/subaccount/${subaccountId}/funnels/${websiteId}`, "page");
  return response;
};

export const getDomainContent = async (subDomainName: string) => {
  const response = await prisma.website.findUnique({
    where: {
      subDomainName,
    },
    include: { webpages: true },
  });
  return response;
};
