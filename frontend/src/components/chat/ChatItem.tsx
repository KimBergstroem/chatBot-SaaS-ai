import React from "react";
import { Box, Avatar, Typography } from "@mui/material";

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  return role === "assistant" ? (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#2e2e2e", my: 2, gap: 2 }}>
      <Avatar sx={{ ml: "0" }}>
        <img src="bot-icon.png" alt="openai" width="30px" />
      </Avatar>
      <Box>
        <Typography fontSize={"20px"}>{content}</Typography>
      </Box>
    </Box>
  ) : (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#F88379", gap: 2 }}>
      <Avatar
        sx={{ ml: "0", bgcolor: "black", color: "white", fontSize: "13px" }}>
        YOU
      </Avatar>
      <Box>
        <Typography fontSize={"20px"}>{content}</Typography>
      </Box>
    </Box>
  );
};

export default ChatItem;
