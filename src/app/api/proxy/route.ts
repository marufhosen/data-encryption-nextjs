import { decrypt, encrypt } from "@/utils/encryption";

export async function POST(request: Request) {
  const res = await request.json();

  const { encryptedData } = res;

  const decryptedData = decrypt(encryptedData);
  console.log(decryptedData);
  const parsedData = JSON.parse(decryptedData);

  const { method, url, data } = parsedData.encryptedData || {};

  console.log(parsedData, "----------------");

  console.log("method, url, data", method, url, data);

  //   Here, make the actual API request to the external API
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  //   Encrypt the response before sending it back
  const encryptedResult = encrypt(JSON.stringify(parsedData));

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  //   return Response.json({ id });
  return Response.json({ encryptedResult });
}
