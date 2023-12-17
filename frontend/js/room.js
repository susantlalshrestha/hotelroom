const getAuthToken = () => {
  const cookies = document.cookie.split("; ");

  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === "access_token") {
      return cookieValue;
    }
  }

  // Return null if the token is not found
  return null;
};

const onSubmitAddNewRoom = async (event) => {
  event.preventDefault();

  const hotelName = document.getElementById("hotelName").value;
  const roomNumber = document.getElementById("roomNumber").value;
  const pricePerNight = document.getElementById("pricePerNight").value;
  const bedType = document.getElementById("bedType").value;
  const maxOccupancy = document.getElementById("maxOccupancy").value;
  const availability = document.getElementById("availability").value;

  const authToken = getAuthToken();
  console.log(authToken);

//   if (!authToken) {
//     window.location.pathname = "/login";
//     return;
//   }

//   const headers = {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${authToken}`,
//   };
//   const requestBody = JSON.stringify({
//     hotelName,
//     roomNumber,
//     pricePerNight,
//     bedType,
//     maxOccupancy,
//     availability,
//   });

//   try {
//     const response = await fetch("/api/room/insert", {
//       method: "POST",
//       headers,
//       body: requestBody,
//     });

//     if (response.ok) {
//       window.location.pathname = "/";
//     } else {
//       document.getElementById("login-error").innerHTML = data.message;
//     }
  } catch (error) {
    console.error("Error:", error);
  }
};

function editRoom(room) {
  // Add logic to handle the edit action
  console.log(`Editing room with ID: ${roomId}`);
}

function deleteRoom(roomId) {
  // Add logic to handle the delete action
  console.log(`Deleting room with ID: ${roomId}`);
}
