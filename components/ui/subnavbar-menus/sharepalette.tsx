import React from "react"
import { Share2, Link, Image, File} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import { Button } from "../button";
import { useToast } from "../use-toast";
import useCopy from "@/app/hooks/use-copy";
import { usePathname } from "next/navigation";
import { useState, useCallback } from "react";
import {toPng} from "html-to-image";



const SharePalette = ({targetRef, handleExportPdf}: { targetRef: React.MutableRefObject<any>, handleExportPdf: Function}) => {
  const [open, setOpen] = useState<boolean>(false);
  const { copy } = useCopy();
  const { toast } = useToast();
  const pathname = usePathname();

  const handleCopyUrl = () => {
    // TODO - add live url
    copy(pathname);
    toast({
      title: "✅ URL copied to clipboard",
    });

    setOpen(false);
  };

  const exportPdfHandler = () => {
    handleExportPdf();

    toast({
      title: "✅ PDF exported successful",
    });

    setOpen(false);
  };

  const handleExportImage = useCallback(() => {
    if (targetRef.current === null) {
      return;
    }

    toPng(targetRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "palette.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });

    setOpen(false);
  }, [targetRef, setOpen]);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
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
              <Button variant="noborder" onClick={handleCopyUrl}
                >
                  <div className="pr-2"><Link /></div>
                  <h1>Link</h1>
              </Button>
              <Button variant="noborder" onClick={handleExportImage}>
                  <div className="pr-2"><Image /></div>
                  <p>PNG</p>
              </Button>
              <Button variant="noborder" onClick={exportPdfHandler}>
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
