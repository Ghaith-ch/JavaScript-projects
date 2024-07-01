# Bildredigeringsapp med Canvas

## Beskrivning
Denna applikation låter användare ladda upp en bild, applicera olika filter i realtid med HTML5 Canvas och ladda ner den redigerade bilden. Filterna inkluderar mättnad, kontrast, ljusstyrka, sepia, gråskala, oskärpa och färgtonsrullning.

## Funktioner
- **Ladda upp bild:** Användare kan ladda upp en bild från sin lokala enhet.
- **Filter i realtid:** Justera bildfilter dynamiskt med reglage för mättnad, kontrast, ljusstyrka, sepia, gråskala, oskärpa och färgtonsrullning.
- **Ladda ner redigerad bild:** Efter att ha applicerat filter kan användare ladda ner den redigerade bilden i JPEG-format.

## Varför Canvas?
HTML5 Canvas-elementet används för att manipulera bilder direkt i webbläsaren. Det möjliggör manipulering på pixelnivå, vilket är lämpligt för bildredigeringsapplikationer som denna. Utan Canvas skulle det vara möjligt att applicera dynamiska filter men inte ladda ner den redigerade bilden (den skulle ladda ner den ursprungliga bilden innan redigering).

## Användning

1. **Öppna applikationen:**
   - Öppna filen `index.html` i din webbläsare. För optimal prestanda, använd en live-server.

2. **Ladda upp en bild:**
   - Klicka på "Upload"-knappen och välj en bildfil från din enhet. Bilden kommer att visas för redigering.

3. **Justera filter:**
   - Använd reglagen för att justera följande bildfilter:
     - **Mättnad:** Justera färgmättnaden från 0% till 200%.
     - **Kontrast:** Justera bildkontrasten från 0% till 200%.
     - **Ljusstyrka:** Justera bildens ljusstyrka från 0% till 200%.
     - **Sepia:** Applicera en sepia-tonseffekt från 0% till 200%.
     - **Gråskala:** Konvertera bilden till gråskala med en rang från 0 till 1.
     - **Oskärpa:** Applicera en oskärpeffekt med en rang från 0 till 10 pixlar.
     - **Färgtonsrullning:** Rotera bildens färgton från 0 till 350 grader.

4. **Ladda ner redigerad bild:**
   - När du är nöjd med de applicerade filtren, klicka på länken "Download" för att spara den redigerade bilden som en JPEG-fil på din lokala enhet.

5. **Återställ filter:**
   - Klicka på "Reset"-knappen för att återställa alla filter till sina standardvärden och återgå till den ursprungliga bilden.

