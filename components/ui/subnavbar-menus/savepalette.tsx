import React from "react"
import { Heart } from "lucide-react";
import { useToast } from "../use-toast";
import { Button } from "../button";
import axios from "axios";
import { useSession } from "next-auth/react";
import { AlertSignIn } from "../authentication-ui/alertsignin";
import { useEffect, useState } from "react";

const SavePalette = ({params}: {params: {pattern: string}}) => {
  const { toast } = useToast()
  const { data: session, status } = useSession();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isPaletteSaved, setIsPaletteSaved] = useState<boolean>(false);

  const onToggleSave = async () => {
    if (!session) {
      console.error("User not authenticated");
      setShowAlert(true);
      return
    }

    try {
      const palette = params.pattern.split('-');
      const response = await axios.post('/api/palette', { email: session?.user?.email, palette: palette });
      toast({
        title: "✅ "+response.data.message,
      })
      if (response.data.action === 'delete') {
        setIsPaletteSaved(false);
      } else {      
        setIsPaletteSaved(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSavedPalettes = async () => {
    if (status === "authenticated" && session) {
      try {
        const response = await axios.get(`/api/palette?email=${session?.user?.email}`);
        let aux = false;
        for (let i = 0; i < response.data.savedPalettes.length; i++) {
          if (response.data.savedPalettes[i].join('-') === params.pattern) {
            aux = true;
          }
        }
        setIsPaletteSaved(aux);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchSavedPalettes();
  }, []);

  return (
    <div>
      <Button variant="noborder"
        onClick={() => {onToggleSave(), fetchSavedPalettes()}
        }>
        <div className="pr-2">
          {isPaletteSaved ? <Heart fill="black"/> : <Heart />}
        </div>
        <p>Save</p>
      </Button>
      {showAlert && <AlertSignIn showAlert={showAlert} setShowAlert={setShowAlert}/>}
    </div>
  );
};

export default SavePalette;
