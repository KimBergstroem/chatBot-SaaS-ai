import { Box } from "@mui/material";
import React from "react";
import TypingAnim from "../components/typer/TypingAnimation";

const Home = () => {
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
            flexDirection: { md: "row", xs: "column" },
            gap: 2,
            my: 4,
          }}>
          <Box
            style={{
              fontSize: "45px",
              color: "#fff",
              display: "inline-block",
              textShadow: "1px 1px 20px #000",
            }}>
            GameBot Nexus,
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
          <img
            src="vite.svg"
            alt="vite"
            style={{ width: "200px", margin: "auto" }}
          />
          <img
            className="image-inverted rotate"
            src="vite.svg"
            alt="vite"
            style={{ width: "200px", margin: "auto" }}
          />
        </Box>
        <Box sx={{ display: "flex", width: "100%", mx: "auto" }}>
          <img
            src="vite.svg"
            alt="vite"
            style={{
              display: "flex",
              margin: "auto",
              width: "60%",
              borderRadius: 20,
              boxShadow: "-5px -5px 105px #F88379",
              marginTop: 20,
              marginBottom: 20,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
