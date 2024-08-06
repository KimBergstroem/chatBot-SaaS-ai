import React from "react";
import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";

const chatMessages = [
  { role: "assistant", content: "Hello mister" },
  { role: "user", content: "Can you help me?" },
  { role: "assistant", content: "Sure, what can i help you with today?" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "The correct answer for this question is 4" },
  { role: "user", content: "Thank you so much, have a great day!" },
  { role: "assistant", content: "Hello mister" },
  { role: "user", content: "Can you help me?" },
  { role: "assistant", content: "Sure, what can i help you with today?" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "The correct answer for this question is 4" },
  { role: "user", content: "Thank you so much, have a great day!" },
];

const Chat = () => {
  const auth = useAuth();
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}>
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "#141414",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}>
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}>
            {auth?.user?.name[0]}
            {auth?.user?.name.split(" ")[1][0]}
          </Avatar>
          <Typography sx={{ mx: "auto" }}>
            You are talking to the <br />
            gamemaster ChatBOT
          </Typography>
          <Typography sx={{ mx: "auto", my: 4, p: 3 }}>
            You can ask some questions related to Gaming, as this application
            are mainly for gaming.
          </Typography>
          <Button
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: "#F88379",
              ":hover": {
                bgcolor: "#b15a53",
              },
            }}>
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}>
        <Typography
          sx={{
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto",
            fontWeight: "600",
          }}>
          Ongoing Chat
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}>
          {chatMessages.map((chat, index) => (
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <div
          style={{
            width: "90%",
            padding: "20px",
            borderRadius: 8,
            backgroundColor: "#141414",
            display: "flex",
            marginTop: 15,
          }}>
          {" "}
          <input
            type="text"
            style={{
              width: "90%",
              backgroundColor: "transparent",
              padding: "10px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
              fontWeight: "600",
              borderRadius: 3,
            }}
          />
          <IconButton sx={{ ml: "auto", color: "white" }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
