import React from "react"
import { Share2, Link, Image, File} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import { Button } from "../button";


const SharePalette = ({params}: {params: {pattern: string}}) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button 
          variant="noborder"
          >
            <div className="pr-2"><Share2 /></div>
            <p>Share</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Share palette</DialogTitle>
            <div className="flex justify-between items-center pt-6">
              <Button variant="noborder">
                  <div className="pr-2"><Link /></div>
                  <h1>Link</h1>
              </Button>
              <Button variant="noborder">
                  <div className="pr-2"><Image /></div>
                  <p>PNG</p>
              </Button>
              <Button variant="noborder">
                  <div className="pr-2"><File /></div>
                  <p>PDF</p>
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );

};

export default SharePalette;
