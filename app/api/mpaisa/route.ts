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
  console.log(req.url);
  let search = req.url.split("?")[1];
  console.log(search);
  try {
    const response = await axios.get(
      `https://pay.mpaisa.vodafone.com.fj/live/API/?${search}`
    );
    console.log(response);
    let mainUrl = response.data.destinationurl;
    let requestID = response.data.requestID;
    let params = response.config.url?.split("?")[1];
    let fullParams = `${params}&&rID=${requestID}`;
    let finalUrl = `${mainUrl}?${fullParams}`;
    return new NextResponse(finalUrl);
  } catch (error: any) {
    console.log(error, "NEW BRANCH ERROR");
    return new NextResponse("internal error", { status: 500 });
  }
}
