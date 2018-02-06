# Planning Poker

This was created from a need at my current job, and as a way to test my newly learned Firebase, React, Redux, and Webpack skills. Planning Poker is a story estimating tool for agile/scrum software development. After logging in, you have the ability to create or join a game. There is no security outside of being an authenticated user. I am still brainstorming of a good way to implement more security without putting too much into user roles. If you create a game, the game ID is in the url and that can be shared with people you wish to have join your game. Once in the game, you have a one time ability to upload stories. There is no restriction as to playing the game once a user is in the game--no roles, no rules.

---

# Game Flow

1. Upload an excel file with stories/work items.
2. Select a work item to be estimated.
3. Wait for everyone in the game to select a card.
4. Flip cards to see if a consensus was met.
5. Discuss if there was not a consensus.
6. Flip the cards and select again.

---

# Upload Format

Current the upload is setup to work the version control we use at work (Team Foundation Server). We are able to simply export stories needing estimation to an excel file and upload it. The format of the excel file has to have two columns: ID, Title. The column header also have to be on the second row, not the first.

---

# Making it your own

If you would like to pull your own copy down and manipulate it, feel free. Things you may want to update: the format of the excel upload file, firebase database information, or implement your own rules. In order to change the Firebase DB the solution points to, create a Firebase account and get the needed environment variables. Put a .env.development file in the base of your solution and dump the variables in there.

---

# Run

If you clone your own copy, use "yarn run dev-server" to run a quick and dirty version of the application.
