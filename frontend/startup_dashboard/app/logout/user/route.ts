import { getUser } from "../../utils/api";
import { NextRequest,NextResponse } from "next/server";


export async function GET(request:NextRequest) {
  const res = await getUser();
  return new NextResponse(JSON.stringify(res), {
    headers: {
      "Content-Type": "application/json",
    },
  });

}