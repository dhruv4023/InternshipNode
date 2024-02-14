export const getUser = async (setUser, UID, navigate) => {
  const res = await fetch(`${process.env.REACT_APP_REST_API}/user/get/${UID}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  data ? setUser(data.data.user) : navigate("/404", { state: "Profile Not Found" });
};

export const getFilteredData = async (values) => {
  const res = await fetch(
    `${process.env.REACT_APP_REST_API}/service/getfiltereddata`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }
  );
  return await res.json();
};
