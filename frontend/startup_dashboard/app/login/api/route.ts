import { fetchApi } from "../../utils/api";
import { NextRequest } from "next/server";


export async function POST(request:NextRequest) {
  const body = await request.json();
  console.log(body);
  const res = await fetchApi("users/login/", {
      method: "POST",
      cache: "no-cache",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      },
    body: JSON.stringify(body)
  });

  return res;
}