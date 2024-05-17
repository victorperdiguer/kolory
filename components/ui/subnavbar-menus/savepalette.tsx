import React from "react"
import { Heart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "../dialog";
import { Input } from "../input";
import { Label } from "../label";
import { Button } from "../button";
import { Textarea } from "../textarea";

const SavePalette = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button 
          variant="noborder"
          >
            <div className="pr-2"><Heart /></div>
            <p>Save</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Save palette</DialogTitle>
            <DialogDescription>
              Write a name and a description for this palette.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" defaultValue="" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea id="description" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SavePalette;
