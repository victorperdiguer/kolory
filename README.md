Kolory is my first ever NextJS project. It is trying to replicate (albeit with a few differences) Fabrizio's popular [Coolors](coolors.co).

<img width="1426" alt="image" src="https://github.com/victorperdiguer/kolory/assets/115891056/71552aef-306a-48a6-a3a6-ff8a539b1520">

# Kolory
## Features

Generate custom made harmonious color palettes with a simple UI. 
The URL will change based on the colors being displayed, making sharing color palettes very easy.

### Generate random color palettes
- Pressing the SPACEBAR will randomize all colors displayed
- The random palette generator works based off a predetermined set of proven pleasant palettes and complete random color generation

### Add and delete colors
- You can click on the trashcan on any color to delete it and work with less colors in your palette
- You can click on the + sign between colors to add a new one
- The new color will be a blend between the 2 on its sides
- You can add as many colors as you want to work with as big a palette as you want -- just be wary, the FE might start looking funky
<img width="1187" alt="image" src="https://github.com/victorperdiguer/kolory/assets/115891056/a5e349aa-d077-4a65-9b42-684ec5132c43">
<img width="1186" alt="image" src="https://github.com/victorperdiguer/kolory/assets/115891056/34747f8c-6f17-438f-8fa7-227610228ce7">

### Locking colors
- Found colors you like? Lock them in so they are not randomized when pressing SPACEBAR again

### Reordering the palette
- Freely reorder the color palette to check contrasts and harmonies between colors

### Pick a color's particular shade
- Click on the layers icon to choose a different shade/tint of each color
<img width="287" alt="image" src="https://github.com/victorperdiguer/kolory/assets/115891056/c6265193-c8de-496c-b201-3a38beb19662">
<img width="286" alt="image" src="https://github.com/victorperdiguer/kolory/assets/115891056/1b2152a0-26d0-40bd-8f02-0338b88b677f">

### Color picker & Info
- Open up the color picker to select a specific color from the spectrum
- Check each color's specs by clicking on the info icon
<img width="237" alt="image" src="https://github.com/victorperdiguer/kolory/assets/115891056/7b2935a7-0bcb-4d5e-8b70-ca8d4ad1fad6">
<img width="306" alt="image" src="https://github.com/victorperdiguer/kolory/assets/115891056/ab418c19-8cf5-476e-9c10-d8ae2a2eb285">


### Google Sign Up
- Use your Google account to securely sign up and save your favorite colors and palettes

### Share your palettes
- Share your palettes through URL links or by downloading the palette in PNG or PDF formats

## Tech Stack

### Framework & language
- NextJS
- TypeScript
- MongoDB
- Next-Auth

### UI
- ShadCN UI Components
- Tailwind CSS
- Framer-Motion for smooth animations

### Color generation
- Colord NPM package + custom algorithms
  

