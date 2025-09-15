"use client";

import { Search, Bell, User, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function Header() {
  return (
    <div className="h-16 bg-black border-b border-border flex items-center justify-between px-6">
      {/* Filters */}
      <div className="flex items-center gap-4 flex-1 ">
        {/* <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search"
            className="pl-10 bg-input border-input"
          />
        </div> */}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="p-2">
          <Bell className="w-5 h-5" />
        </Button>
        <Avatar className="w-8 h-8">
          <AvatarImage src="/placeholder-avatar.jpg" />
          <AvatarFallback>
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
