import React from "react"
import { useState } from "react";
import { LockOpen, LockKeyhole} from "lucide-react";
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger} from "../tooltip"



const LockOption = ({textColor} : {textColor: string}) => {
  const [locked, setLocked] = useState(false)

  const lockHandler = () => {
    setLocked(!locked)
  }

return (
    <div>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    {" "}
                    {locked ? 
                    <LockOpen
                      onClick={() => lockHandler()} /> : 
                    <LockKeyhole
                      onClick={() => lockHandler()}/>}
                </TooltipTrigger>
                <TooltipContent>
                    {locked ? <p>Lock color</p> : <p>Unlock color</p> }
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </div>
)
};

export default LockOption
