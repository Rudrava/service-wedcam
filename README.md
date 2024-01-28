# WedCam

---

This project entails the services for the wed cam project

## Objectives

- Beta
  - Host events - users can host events and add schedule for the event.
  - Invitees can join events via QR and x number of digit unique codes or unique links.
  - Event host can create albums and share it in any social media.

## SETUP

- if you are using the default compose file then
  - copy the .env.example file into .env file
- start the db
  - the following snippet would only start up the db service and not the app service
  - run `docker compose up db -d`
- run `yarn install`
- run `yarn start:dev`
