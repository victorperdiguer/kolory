import React from "react"
import { Heart } from "lucide-react";
import { useToast } from "../use-toast";
import { Button } from "../button";
import axios from "axios";
import { useSession } from "next-auth/react";

const SavePalette = ({params}: {params: {pattern: string}}) => {
  const { toast } = useToast()
  const { data: session, status } = useSession();

  const onToggleSave = async () => {
    if (!session) {
      console.error("User not authenticated");
      return;
    }

    try {
      const palette = params.pattern.split('-');
      await axios.post('/api/palette', { email: session?.user?.email, palette: palette });
      toast({
        title: "Palette saved successfully!",
      })
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button variant="noborder"
        onClick={() => {onToggleSave()}
        }>
        <div className="pr-2">
          <Heart />
        </div>
        <p>Save</p>
      </Button>
    </div>
  );
};

export default SavePalette;
