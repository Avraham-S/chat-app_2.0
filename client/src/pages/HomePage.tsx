import React from "react";
import { useSocket } from "../contexts/SocketContext";
import { ChatWindow } from "../components/ChatWindow";
import { SideBar } from "../components/SideBar";
import { VStack, Spinner, Box } from "@chakra-ui/react";
import { useUser } from "../contexts/UserContext";
import { g_chat } from "../types/types";
import { getChats } from "../lib/api";

const MockChats: g_chat[] = [];

export const HomePage = () => {
  const socket: any = useSocket();
  const [isConnected, setIsConnected] = React.useState<boolean>(
    socket.connected
  );
  const [chats, setChats] = React.useState<g_chat[]>(MockChats);

  const [activeChat, setActiveChat] = React.useState<g_chat | null>(chats[0]);

  const [user] = useUser();

  React.useEffect(() => {
    // console.log(socket.connected);
    socket.on("connect", () => {
      setIsConnected(socket.connected);
    });
    socket.on("disconnect", () => {
      socket.connect();
      setIsConnected(socket.connected);
    });
    if (!socket.connected) {
      socket.connect();
    }
  }, [socket.connected]);

  React.useEffect(() => {
    console.log("user has changes");
    if (user) {
      console.log("user:", user);
      getChats(setChats);
    }
  }, [user]);

  return (
    <VStack
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <h1>Home Page</h1>
      <h2>{activeChat?.chatName}</h2>
      <Box style={{ height: "100%", display: "flex", width: "100%" }}>
        <Box width={"30%"}>
          <SideBar
            setActiveChat={setActiveChat}
            chats={chats}
            activeChat={activeChat}
          />
        </Box>
        <Box flexGrow={1} ps={10} pe={10} pb={3}>
          {!isConnected ? (
            <Spinner hidden={socket.connected} title="connecting" />
          ) : (
            <ChatWindow socket={socket} activeChat={activeChat} chats={chats} />
          )}
        </Box>
      </Box>
    </VStack>
  );
};
