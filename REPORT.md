# Report.
###### By Marije Dekker, 10785949
###### Programmeerproject
#### Description.
##### With this project you can see the distribution of drug use, with six different drug groups, over Europe, with a choroplethmap. Furthermore you can see the ratios of the different drug groups in one country with a donutchart. Beside that you can see, with a scatterplot, if there is a correlation between an assumed cause of drug use and the use of one of the druggroups.
![screenshot](doc/screenshot1.jpg)
![screenshot](doc/screenshot2.jpg)
#### Design.
##### First there is one HTML-file (drugs.html). In this file are a css file (drugs.css) and a few javascript files loaded. 
##### For the choroplethmap are two javascript files. One for the map itself, this is datamaps (worldmap.js), and one with the function to fill the colors per drug in the map, the variables and different tooltips for this map (drugmap.js). When a drug from the menu above the map is chosen, the function to fill the colors, updateMap from drugmap.js, is called. This function iterates over the json for the chosen drug and assigns the right fillcolor per country. 
##### Under the map are a few lines of text, from the html-file. Here is explained what the different drug groups are, with links to a site with information about the drugs. Furthermore there is explained where the data about the drugs comes from, also with links to the source. And there is a list with some interesting noticable things about the map, which can be clicked on, so they can be seen immidiately. This is done with the jQuery onclick function where the updateMap with the right jsonfile is called.
##### Next to the map is the donutchart. 
#### Challenges.
#####
#### Decisions.
#####