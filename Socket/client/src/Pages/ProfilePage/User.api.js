export const getUser = async (UID) => {
  const res = await fetch(`${process.env.REACT_APP_REST_API}/user/get/userid/${UID}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json()
  if (data.success)
    return data.data.user;
  else
    return false;
};


export const fetchChatrooms = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: { "Authorization": `Bearer ${token}` }
  };

  try {
    const response = await fetch(`${process.env.REACT_APP_REST_API}/chat/room/all`, requestOptions);
    if (!response.ok) {
      alert("Failed to fetch chatrooms"); return;
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching chatrooms:", error);
    throw error;
  }
}

