import { fetchApi, fetchApiAuth } from "../../utils/api";
import { NextRequest } from "next/server";


export async function POST(request:NextRequest) {
  const res = await fetchApiAuth("users/logout/", {
      method: "POST",
      cache: "no-cache",
  });

  return res;
}