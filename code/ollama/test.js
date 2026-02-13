const main = async () => {
  const res = await fetch("http://127.0.0.1:11434", {
    method: "GET",
  });
  console.log(res.body);
  console.log("Kya baat hai");
  
};
main()