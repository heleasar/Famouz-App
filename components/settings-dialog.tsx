"use client";
import React, { useState, useEffect } from "react";
import { Globe, MessageCircle, Link, Menu } from "lucide-react";
import VideoPlayer from "@/components/VideoPlayer";
import LeafletMap from "@/components/LeafletMap";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

// Define the user interface
interface User {
  id: number;
  username: string;
}

// Messages Component
const Messages: React.FC<{ userEmail: string }> = ({ userEmail }) => {
  const [messages, setMessages] = useState<{ user: string; text: string }[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages((prev) => [...prev, { user: userEmail, text: newMessage.trim() }]);
      setNewMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents newline
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Messages List */}
      <div className="flex-1 space-y-2 overflow-y-auto border border-b-transparent p-2 rounded bg-transparent">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className="p-2 bg-transparent border rounded shadow-sm text-gray-500"
            >
              <span className="font-bold text-gray-500">{msg.user}: </span>
              {msg.text}
            </div>
          ))
        ) : (
          <p className=""></p>
        )}
      </div>

      {/* Input for New Message */}
      <div className="sticky bottom-0 flex space-x-2 border p-2 bg-transparent rounded">
        <input
          ref={inputRef}
          type="text"
          placeholder="Type a message"
          className="flex-1 p-2 text-gray-300 bg-transparent border rounded outline-none "
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button

          className="px-4 py-2 bg-transparent border rounded hover:border-green-900"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

// Static navigation items (fixed items like Messages, $$$$, Location)
const staticNavItems = [
  { name: "Messages", icon: MessageCircle, url: "#" },
  { name: "$$$$$", icon: Link, url: "https://buy.stripe.com/6oE7t83TqdXO9OgeUU" },
  { name: "Videos", icon: Globe, url: "#" },
  { name: "Location", icon: Globe, url: "#" },
];

export function SettingsDialog() {
  const [open, setOpen] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<string>("Messages");

  // Fetch all users from the JSON Server
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("http://localhost:3001/users");
        if (!response.ok) {
          throw new Error(`Error fetching users: ${response.statusText}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }

    fetchUsers();
  }, []);

  // Combine static items with the fetched users' usernames (for the "friends" list)
  const friendsNavItems = users.map((user) => ({
    name: user.username,
    icon: MessageCircle,
    url: "#",
  }));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="absolute top-10 right-10 bg-transparent hover:bg-opacity-90 text-slate-900 text-4xl flex items-center gap-2"
          aria-label="Menu"
        >
          <Menu className="h-12 w-12" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[80vw] lg:max-h-[80vh]"
        onKeyDown={(e) => {
          // Prevent Dialog from intercepting Enter
          if (e.key === "Enter") {
            e.stopPropagation();
          }
        }}
      >
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Customize your settings here.
        </DialogDescription>
        <SidebarProvider className="items-start">
          <Sidebar collapsible="none" className="hidden md:flex">
            <SidebarContent>
              <SidebarGroup>
                {/* Static navigation items like Messages, $$$$, Location */}
                <SidebarGroupContent>
                  <SidebarMenu>
                    {staticNavItems.map((item, index) => (
                      <SidebarMenuItem key={index}>
                        <SidebarMenuButton
                          asChild
                          isActive={selectedMenu === item.name}
                          onClick={() => setSelectedMenu(item.name)}
                        >
                          <a href={item.url}>
                            <item.icon />
                            <span>{item.name}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              {/* Friends list (dynamic items populated from the server) */}
              {friendsNavItems.length > 0 && (
                <SidebarGroup>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {friendsNavItems.map((friend, index) => (
                        <SidebarMenuItem key={index}>
                          <SidebarMenuButton asChild>
                            <a href={friend.url}>
                              <friend.icon />
                              <span>{friend.name}</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              )}
            </SidebarContent>
          </Sidebar>
          <main className="flex h-[480px] dark flex-1 flex-col overflow-hidden">
            <header className="flex h-16 shrink-0 items-center gap-2">
              <div className="flex items-center dark gap-2 px-4">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">Profile</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{selectedMenu}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
              {selectedMenu === "Messages" ? (
                <Messages userEmail="dogfood0466" />
              ) : selectedMenu === "Videos" ? (
                <VideoPlayer />
              ) : selectedMenu === "Location" ? (
                <LeafletMap />
              ) : (
                Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="aspect-video max-w-3xl rounded-xl bg-dark" />
                ))
              )}
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
}
