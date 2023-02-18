import { TIMEOUT_SEC } from "./config";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export async function getJSON(urlStr) {
  try {
    const resVar = await Promise.race([fetch(urlStr), timeout(TIMEOUT_SEC)]);
    const dataVar = await resVar.json();
    if (!resVar.ok) throw new Error(`${resVar.status}: ${dataVar.message}`);
    return dataVar;
  } catch (error) {
    throw error;
  }
}

export async function sendJSON(urlStr, uploadData) {
  try {
    const postPut = fetch(urlStr, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uploadData),
    });

    const resVar = await Promise.race([postPut, timeout(TIMEOUT_SEC)]);
    const dataVar = await resVar.json();
    if (!resVar.ok) throw new Error(`${resVar.status}: ${dataVar.message}`);
    return dataVar;
  } catch (error) {
    throw error;
  }
}
