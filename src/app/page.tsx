"use client";

import { decrypt, encrypt } from "@/utils/encryption";

export default function Home() {
  async function makeRequest(payload: object) {
    const encryptedData = encrypt(JSON.stringify(payload));

    console.log("encryptedData", encryptedData);

    const response = await fetch("/api/proxy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ encryptedData }),
    });

    const result = await response.json();

    console.log(result);

    // Decrypt the response
    const decryptedResult = decrypt(result.encryptedResult);
    console.log("decryptedResult", JSON.parse(decryptedResult));
  }

  return (
    <div>
      <h1>Test</h1>
      <button
        onClick={() => {
          makeRequest({
            encryptedData: {
              method: "post",
              url: "https://jsonplaceholder.typicode.com/posts",
              headers: {
                authorization: "Bearer icgaiucgiucgiuco",
              },
              data: {
                name: "test",
              },
            },
          });
        }}
      >
        Make request
      </button>
    </div>
  );
}
