import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setWishlist } from "../ToolKit/wishlistSlice";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";

const WishList = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist); // wishlist stored in redux
  const token = useSelector((state) => state.auth.token);

  // Fetch wishlist from backend on component mount
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(
          "https://flair-voyage-backend.onrender.com/api/wishlists",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // Assuming response.data returns an array of wishlist items
        dispatch(setWishlist(response.data));
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [dispatch, token]);

  // Function to add an item to wishlist using /add-item endpoint
  const handleAddItem = async (yachtId) => {
    try {
      const response = await axios.post(
        "https://flair-voyage-backend.onrender.com/api/wishlists/add-item",
        { yachtId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(setWishlist(response.data)); // Update wishlist state
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
    }
  };

  // Function to remove an item from wishlist using /remove-item endpoint
  const handleRemoveItem = async (yachtId) => {
    try {
      const response = await axios.post(
        "https://flair-voyage-backend.onrender.com/api/wishlists/remove-item",
        { yachtId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(setWishlist(response.data)); // Update wishlist state
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" align="center" sx={{ mb: 3 }}>
        My Wishlist
      </Typography>
      {wishlist && wishlist.length > 0 ? (
        <Grid container spacing={2}>
          {wishlist.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <Card sx={{ maxWidth: 345, m: "auto" }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.image || "/assets/default-yacht.jpg"}
                  alt={item.name || "Yacht"}
                />
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {item.name || "Yacht Name"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description || "Description of yacht"}
                  </Typography>
                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleRemoveItem(item._id)}
                      sx={{ flexGrow: 1, mr: 1 }}
                    >
                      Remove
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => handleAddItem(item._id)}
                      sx={{ flexGrow: 1 }}
                    >
                      Add
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" align="center" color="text.secondary">
          Your wishlist is empty.
        </Typography>
      )}
    </Box>
  );
};

export default WishList;
