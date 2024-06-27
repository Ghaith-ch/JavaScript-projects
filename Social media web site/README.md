Sociala medier-app

## Översikt
1. Det här projektet är en frontend-implementering av en sociala medier-app med HTML, CSS och JavaScript. Den kommunicerar med en extern backend-API för att hämta och visa användarprofiler, inlägg, kommentarer och detaljerad information om både inlägg och användare. Användare kan utföra handlingar såsom registrering, inloggning, skapa inlägg, kommentera inlägg och hantera sina egna inlägg.

## Projektmål
1. Det primära målet med detta projekt är att förbättra kunskapen och färdigheterna i att arbeta med backend-API:er. Genom att integrera med en extern API syftar applikationen till att:
   - Effektivt hämta och visa data om användare och inlägg.
   - Implementera robust felhantering och smidiga fallback-lösningar för en sömlös användarupplevelse.
   - Underlätta användarinteraktioner såsom skapande av inlägg, kommentarer och hantering av profiler genom intuitiva UI-komponenter.

## Funktioner

# Hemsida
1. Navigeringslänkar till hem, profil och inloggningsmodaler.
2. Platshållarstruktur för dynamiskt laddade inlägg.

# Profil Sida
1. Visar omfattande information om användarprofilen, inklusive namn, användarnamn, e-post, profilbild, antal inlägg och kommentarer.
2. Listar användarens inlägg med respektive bilder, datum, titlar, innehåll, antal kommentarer och taggar.
3. Kräver att användare loggar in för att se sin egen profil eller ser andra användares profiler genom att klicka på deras namn eller bilder.

# Inläggsdetalj Sida
1. Ger detaljerad information om ett specifikt inlägg.
2. Inkluderar inläggets titel, författardetaljer, inläggsbild, skapelsedatum, inläggskropp och kommentarssektion.
3. Inloggade användare kan dynamiskt lägga till kommentarer till inlägg.

# Modaler
- Inloggningsmodal: Tillåter användare att logga in genom att ange sitt användarnamn och lösenord.
- Registreringsmodal: Låter nya användare registrera sig med sitt namn, användarnamn, lösenord och ladda upp en profilbild.
- Lägg till inläggsmodal: Underlättar skapandet av nya inlägg med en titel, innehåll och bilduppladdning.
- Bekräftelsemodal för radering: Bekräftar och godkänner radering av ett inlägg.

## Beroenden
- Axios: Används för att göra HTTP-begäranden till backend-API:t (axios.min.js).

## Installationsinstruktioner
1. Klona repositoryt till din lokala maskin.
2. Öppna index.html-filen i en webbläsare med hjälp av en live-server .
3. Se till att ha en aktiv internetanslutning för att hämta data från backend-API:t.

## Noteringar
- Det här projektet kommunicerar med en extern backend-API för att hämta data om användare och inlägg.
- Backend-API:t är inte utvecklat som en del av detta projekt; se till att API:t returnerar förväntade JSON-svar för optimal funktionalitet.

