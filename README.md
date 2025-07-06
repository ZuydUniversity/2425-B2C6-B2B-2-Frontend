# B2C6_Frontend

Studenten repository voor frontend in Reactjs voor het vak B2C6 DevOps. In deze repository sla je alle frontend code op. Elke klas heeft 1 repository voor Frontend.

# Installatiegids benodigheden

## Windows

Gebruik [Scoop](https://www.scoop.sh/) op Windows.

## MacOS

Gebruik [Homebrew](https://www.brew.sh/) op MacOS.

## Linux

Gebruik je eigen package manager op Linux, bijvoorbeeld **Apt** of **Pacman**.

---

De rest van deze gids gaat ervan uit dat je Windows gebruikt met **Scoop**. Het proces voor **Brew** en **Linux**
zal vergelijkbaar zijn.

## Installeer benodigheden

Systeembenodigheden:

`scoop install nodejs yarn sass deno bun`

Projectbenodigheden (run dit binnen de map van het project):

`yarn global add typescript`

`yarn install`

IDE-benodigheden:

Voor **VSCode** wordt het aangeraden om de uitbereidingen **Prettier** en **Editorconfig** te installeren.
**Prettier** moet ook ingesteld worden op **VSCode**, ga naar instellingen stel 'formatter' in als **Prettier**, en zorg
dat 'Format on save' aan staat.

# Runnen van het project

Run dit binnen de map van het project:

`yarn start`

Nu zal het project op [localhost:3000](http://localhost:3000) runnen.

# Builden van het project

Het wordt aangeraden om docker te gebruiken voor het builden:

`docker build . -t b2b-frontend`

Het kan ook lokaal als dit nodig zou zijn:

`yarn build`

`yarn start:prod`
