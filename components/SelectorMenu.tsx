"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SelectorMenuProps {
  position: string;
  setPosition: (value: string) => void;
}

export function SelectorMenu({ position, setPosition }: SelectorMenuProps) {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Choose Banner Resolution</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Banner Type</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="square">Square</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="portrait">
              Portrait
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="landscape">
              Landscape
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <p className="font-bold text-black text-xl text-center">Click on edit icon to edit and download banners</p>
    </div>
  );
}
