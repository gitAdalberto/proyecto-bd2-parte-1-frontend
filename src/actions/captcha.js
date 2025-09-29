"use server";
export const verify = async (token) => {
  const res = await fetch("http://localhost:4000/api/verify-recaptcha", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });
  const data = await res.json();
  return data;
};
