# StandUppie
![](banner.png)

# Table of Contents

- [Installation](#installation)
- [Inspiration](#inspiration)
- [What it does](#what-it-does)
- [How we built it](#how-we-built-it)
- [Challenges we ran into](#challenges-we-ran-into)
- [Accomplishments that we're proud of](#accomplishments-that-were-proud-of)
- [What's next for EnvProtecc](#whats-next-for-envprotecc)

## Installation

### Installing the repository for contribution purposes
Please refer to [our CONTRIBUTING.md file](CONTRIBUTING.md).

## Inspiration

Standups have been an integral part of the MLH fellow experience. Unfortunately, the experience has been extremely fragmented and it is stored in GitHub discussions that we don't check often, unlike the more interactive Discord channels that we already have for the follows.

For that reasons, we decided to create a Discord bot to improve the fellow's standup experience.

## What it does

1. Allow you to easily create standup groups.
2. Remind you to do a standup during the pod's meeting time.
3. Enable you to enter your standup details from the convenience of Discord's interface.
4. Help you fetch standup information at a given date.

## How we built it

We use Node.js with the discord.js library to create the bot. For the persistence layer, we use MongoDB.

## Challenges we ran into

- Figuring out how the Commando framework worked
- A small issue with js import-export modules

## Accomplishments that we're proud of

- Being able to finish the project and clear the bugs even with the deadline approaching
- Fully using the good Github practices (PRs, reviews, documentation)
- Getting to work with fellows from across different pods

## What we learned

- How to make a discord bot and Commando Framework for bot making
- How to properly scope projects
- Delegate tasks across timezones

## What's next for EnvProtecc

- Add functionality that triggers a bot message on the channel whenever someone from the pod makes a PR to any of the pod projects.
- Add more command customization.
