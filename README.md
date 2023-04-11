# Accesa-Internship
Repository created for internship technical test from Accesa
# Introduction/Run the app

I recommend to run the app with Live Server extension from VS code, 
but it also works with localhost, but for this is needed to set up your work station.

## Steps how to run on node js:

- install Node.js and NPM(node package manager);
- run

```bash
npm install --global http-server
```

- after the install you can run the server with

```bash
http-server
```

or run for http://localhost

```bash
http-server --proxy http://localhost:8080
```
* on my workstation the CORS are disabled


# Implemented functionality 

## Mandatory

There were implemented all mandatory points:
*app works on localhost
*it's loaded on github
*it's connected to a weather API
*it's web responsive

## Optional features

The app shows the forecast for 5 days, this can be easily changed, this requierement wasn't totally clear (more days/hours, or both of them) anyway all variants could be implemented 

Using the top input you can search the city you need by pressing on icon( works with relative big cities, not villages).

App allows to make a list of favorite cities, by pressing on city the forecast for this city will be displaied. By pressing on X you will delete the item from list.

Also app has 2 themes, day/nigth, by pressing on moon you will see the efects.

Thanks and best regards!!
