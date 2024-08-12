import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import TypingAnim from "../components/typer/TypingAnimation";
import Footer from "../components/footer/Footer";
import { GrChatOption } from "react-icons/gr";

const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box width={"100%"} height={"100%"}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          mt: 5,
        }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { md: "row", sm: "column", xs: "column" },
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
            gap: 2,
            my: 4,
          }}>
          <Box
            style={{
              fontSize: "45px",
              color: "#fff",
              display: "inline-block",
              textShadow: "1px 1px 20px #000",
              textAlign: "center",
            }}>
            GameIn Nexus
          </Box>
          <Box>
            <TypingAnim />
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { md: "row", sm: "column", xs: "column" },
            gap: 5,
            my: 10,
          }}>
          <GrChatOption
            style={{
              width: "200px",
              height: "200px",
              fontSize: "200px",
              margin: "auto",
            }}
          />
          <img
            className="image-inverted rotate"
            src="openai.png"
            alt="openai logo"
            style={{ width: "200px", margin: "auto" }}
          />
        </Box>
        <Box sx={{ display: "flex", width: "100%", mx: "auto" }}>
          <img
            src="chat.png"
            alt="chat imgage"
            style={{
              display: "flex",
              margin: "auto",
              width: isBelowMd ? "80%" : "60%",
              borderRadius: 20,
              boxShadow: "-5px -5px 55px #f5948c",
              marginTop: 20,
              marginBottom: 20,
            }}
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;
