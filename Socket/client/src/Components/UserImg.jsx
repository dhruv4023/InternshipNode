import { Box } from "@mui/system";

const UserImg = ({ image, size = "60px" }) => {
  console.log(image)
  return (
    <Box width={size} height={size}>
      <img
        style={{ padding: "0.2rem", objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="userImage"
        src={image ? `${process.env.REACT_APP_CLOUDINARY_IMG}/${image}`: '/assets/defaultUserPic.png'}
      />
    </Box>
  );
};

export default UserImg;
