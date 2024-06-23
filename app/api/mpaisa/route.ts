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
      // `https://pay.mpaisa.vodafone.com.fj/live/API/?url=https://www.mctechfiji.com/checkout&&tID=101&&amt=5.00&&cID=26200&&iDet=detail`
      //`https://pay.mpaisa.vodafone.com.fj/live/API/?url=https://www.mctechfiji.com/checkout&&tID=103&&amt=2.00&&cID=26200&&iDet=detail`
      //https://pay.mpaisa.vodafone.com.fj/live/?url=http://localhost:3000/cart&&tID=113&&amt=1.00&&cID=26484&&iDet=detail&&rID=400944
      // `https://pay.mpaisa.vodafone.com.fj/live/API/?url=http://localhost:3000/cart&&tID=31701480633817810513527387846&&amt=1.00&&cID=26484&&iDet=detail`
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
