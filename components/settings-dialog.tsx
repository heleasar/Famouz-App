"use client";

import * as React from "react";
import { Globe, MessageCircle, Link } from "lucide-react"; // Import only necessary icons

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

// Static data for the menu
const staticNavItems = [
  { name: "Messages", icon: MessageCircle, url: "#" },
  { name: "$$$$$", icon: Link, url: "https://buy.stripe.com/6oE7t83TqdXO9OgeUU" },
  { name: "Location", icon: Globe, url: "#" },
];

type Username = {
  username: string;
};

export function SettingsDialog() {
  const [open, setOpen] = React.useState(true);
  const [usernames, setUsernames] = React.useState<Username[]>([]); // State with proper type

  // Fetch random usernames from the JSON server
  React.useEffect(() => {
    async function fetchUsernames() {
      try {
        const response = await fetch("http://localhost:3001/randomUsernames");
        if (!response.ok) {
          throw new Error(`Error fetching usernames: ${response.statusText}`);
        }
        const data: Username[] = await response.json(); // Ensure correct typing
        setUsernames(data); // Store the fetched usernames in state
      } catch (error) {
        console.error("Fetch error:", (error as Error).message); // Proper error logging
      }
    }

    fetchUsernames();
  }, []);

  // Combine static navigation items with fetched usernames
  const combinedNavItems = [
    ...staticNavItems,
    ...usernames.map((user) => ({
      name: user.username, // Username as the name
      icon: MessageCircle, // Default icon
      url: "#", // Default link
    })),
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Customize your settings here.
        </DialogDescription>
        <SidebarProvider className="items-start">
          <Sidebar collapsible="none" className="hidden md:flex">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {combinedNavItems.map((item, index) => (
                      <SidebarMenuItem key={index}>
                        <SidebarMenuButton asChild>
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
            </SidebarContent>
          </Sidebar>
          <main className="flex h-[480px] dark flex-1 flex-col overflow-hidden">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center dark gap-2 px-4">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">Profile</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Messages</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-video max-w-3xl rounded-xl bg-dark"
                />
              ))}
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
}

