import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import token from "./env.json";
import fs from "fs";

const commands: any = [];
const commandFiles: string[] = fs.readdirSync("./src/commands").filter((file) => file.endsWith("js"));

for (const file of commandFiles) {
    const command = require(`./src/commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(token.token);

rest.put(Routes.applicationGuildCommands("926293354294181959", "926296573959344188"), {
    body: commands,
})
    .then(() => console.log("Comandos de aplicación registrados correctamente."))
    .catch(console.error);