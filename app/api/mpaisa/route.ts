import { ChangeMpaisaId } from "@/actions/orders";
import axios from "axios";
import { NextResponse } from "next/server";

type Data = {
  destinationurl: string;
  requestID: number;
  response: number;
  token: string;
  tokenv2: string;
};

export async function GET(req: Request) {
  let search = req.url.split("?")[1];
  try {
    const response = await axios.get(
      `https://pay.mpaisa.vodafone.com.fj/live/API/?${search}`
    );
    let mainUrl = response.data.destinationurl;
    let requestID = response.data.requestID;
    let sha256 = response.data.token;
    let params = response.config.url?.split("?")[1];
    let fullParams = `${params}&&rID=${requestID}`;
    let finalUrl = `${mainUrl}?${fullParams}`;
    let orderId = params?.split("&&")[0].split("/")[
      params?.split("&&")[0].split("/").length - 1
    ];

    const change = ChangeMpaisaId(orderId || "", sha256);

    console.log(response);
    return new NextResponse(finalUrl);
  } catch (error: any) {
    console.log(error, "NEW BRANCH ERROR");
    return new NextResponse("internal error", { status: 500 });
  }
}
