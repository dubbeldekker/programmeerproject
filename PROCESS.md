# Process book
### 30 mei
* Proposal gemaakt.
### 31 mei
* De data verzameld en deel van de csv's gemaakt. 
* Design document gemaakt, is nog niet af. 
* Daarnaast heb ik ervoor gekozen om het alleen over Europa te houden i.p.v. de hele wereld. Anders werd het teveel en de oorzaken kunnen per werelddeel te sterk verschillen.
### 01 juni
* Alle data is verzameld en omgezet naar JSON.
* Design document af.
* Begonnen met de choropleth map en drop-downmenu.
### 02 juni
* Choropleth map is af, tooltips van de landen waarvan geen data is werkt nog niet helemaal zoals het hoort.
* Begonnen aan de barchart over influences.
### 06 juni
* Barchart af met overgang.
* Begonnen aan de piechart.
### 07 juni
* Piechart is af.
### 08 juni
* Piechart omgezet naar een functie. Deze word aangeroepen wanneer er op een land in de choropleth map wordt geklikt.
* De menu's bij zowel de choropleth map als de barchart omgezet. De values zijn de verschillende jsons. Dit voorkomt vele if statements in de functies.
### 09 juni
* Legenda van de map en de piechart gemaakt.
* Aantal variabele namen aangepast om verwarring te voorkomen
### 10 juni
* Laat no data tekst zien bij de piechart als er geen data is van het geklikte land.
### 13 juni
* Achtergrond kleur van de map een lichtere blauw gemaakt, maakt de pagina rustiger.
* Bordercolor toegevoegd aan de map
* Projectie van de map realistischer en mooier gemaakt.
* Projecttitel aangepast naar een algemener onderwerp (drug use in Europe).
* Grouped barchart gemaakt, waar de influences tegenover drug use staat.
### 14 juni
* Grouped barchart af.
* Uit de grouped barchart was niet overzichtelijk af te lezen of er een correlatie was tussen de drug use en de influence. Daarom is er gekozen voor een sccatterplot. Deze laat het beste zien of er een correlatie is tussen twee factoren.
* De scatterplot zelf is af.
### 15 juni
* De keuzemenus voor de scatterplot toegevoegd.
* Bij het laden van de pagina wordt meteen de scatterplot laten zien, zodat deze meteen gebruikt kan worden (= gebruiksvriendelijker). 
* Omdat bij het laden de scatterplot en de donutchart meteen worden laten zien, heb ik ervoor gekozen om ook meteen de choropleth map ingevuld te laten zien.
* Overgang werkt bij de scatterplot.
* De gehardcode legenda van de map in vervangen door de legenda van datamaps, want deze is niet hardcoded.
* Bij de map werkt de tooltip wanneer er geen data is van dat land voor die drugs.
* Titels boven de keuzemenus gezet.
### 16 juni
* Van de piechart een donutchart gemaakt. Nu kan de landnaam in de donut. 
* Daarnaast heeft deze donut labels met lijntjes die naar de donut wijzen. Dit voorkomt een legenda.
* De donut heeft nu ook een transitie.
* Bij het laden van de pagina wordt automatisch de donut voor Nederland aangemaakt. Dit voorkomt het maken van een domain met range, terwijl de kleuren van de drugs voor de donut continu hetzelfde blijft.
* Tooltip aan de donut toegevoegd.
* Tooltip aan de scatterplot toegevoegd.
### 20 juni
* Wanneer er op iets geklikt kan worden veranderd de muis in een pointer.
* Wanneer er op een cirkel in de scatterplot wordt geklikt wordt de donutchart geupdate naar het land waar op geklikt is. 
* Vandaar dat de donutchart op position: fixed is gezet, want de donut is nodig voor zowel de map als de scatterplot. Op deze manier staat hij naast allebei, afhankelijk van naar welke gekeken wordt.
* Wanneer er over een cirkel in de scatterplot wordt gehovered, veranderd de cirkel van kleur en grootte zodat je weet boven welke cirkel je muis precies staat.
* Footer met informatie over het project en de data toegevoegd.
### 21 juni
* Variabele namen aangepast voor overzichtelijkheid etc.
* informatie over de data die wordt gebruikt in de map toegevoegd en linkjes naar de informatie staan erin. Ook staan er linkjes naar waar de drugdata vandaan komt.
### 22 juni
* Een functie toegevoegd die de ratio van tussen de verschillende drug use uitrekend bij de donuthart. Deze wordt laten zien in de tooltip.
* Meer informatie toegevoegd. 
* Bij opvallende dingen kan er op de tekst worden geklikt, waarna dit wordt laten zien in de visualisatie.
* Hele code opgeschoond, overzichtelijk gemaakt, variabele namen aangepast en comments toegevoegd.
### 23 juni
* Code netter gemaakt.
* Pagina zelf is "af" (css en html voornamelijk).
* Verschillende files opgedeeld in mappen.
* De README geupdate.
* PROCESS bijgehouden.
* Verslag afgemaakt.
* Project af en ingeleverd.