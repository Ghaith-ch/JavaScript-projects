# DragDrop Task Manager

## Beskrivning
Denna applikation låter användare hantera uppgifter med hjälp av drag-and-drop-funktionalitet mellan olika stadier eller banor (t.ex. "To do", "Doing", "Done"). Uppgifter kan läggas till, raderas individuellt eller rensas helt och hållet. Applikationen använder HTML, CSS och JavaScript för att skapa ett interaktivt gränssnitt för uppgiftshantering.

## Funktioner
- **Uppgiftshantering:** Organisera uppgifter i olika banor som "To Do", "Doing" och "Done".
- **Drag-and-Drop:** Dra uppgifter mellan banor för att dynamiskt uppdatera deras status.
- **Lägg till uppgift:** Lägg till nya uppgifter och placera dem i "To Do"-banan.
- **Radera uppgift:** Ta bort enskilda uppgifter genom att klicka på en delete-knapp.
- **Rensa alla uppgifter:** Rensa alla uppgifter från alla banor med ett enda klick.
- **Lokal lagring:** Uppgifter sparas lokalt med hjälp av `localStorage` för att bevara data mellan sessioner.

## Användning

1. **Öppna applikationen:**
   - Öppna `index.html` i din webbläsare. För optimal prestanda, överväg att använda en live-server.

2. **Lägg till en ny uppgift:**
   - Skriv in en uppgift i inmatningsfältet under "New Task..." och klicka på "Add" för att lägga till den i "Att göra"-banan.

3. **Hantera uppgifter:**
   - Dra uppgifter mellan "To Do", "Doing" och "Done"-banorna för att spegla deras aktuella status.

4. **Radera en uppgift:**
   - Klicka på "Delete"-knappen på en uppgift för att ta bort den från tavlan.

5. **Rensa alla uppgifter:**
   - Klicka på "Delte All" som finns bredvid inmatningsfältet för att ta bort alla uppgifter från alla banor.

6. **Beständighet:**
   - Uppgifter sparas automatiskt lokalt med `localStorage`, vilket säkerställer att din uppgiftstavla förblir intakt även om du uppdaterar sidan eller stänger webbläsaren.

