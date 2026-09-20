
const sendOtp = async (data, path) => {
  const res = await fetch(`${import.meta.env.VITE_AUTH}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  return result;
};

export default sendOtp;
