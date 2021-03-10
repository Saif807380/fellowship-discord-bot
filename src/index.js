require('dotenv').config()

const Commando = require('discord.js-commando');
const mongoose = require('mongoose')
const path = require('path');
const oneLine = require('common-tags').oneLine;
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

mongoose.set('debug', true);
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, {
	keepAlive: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
});
mongoose.connection.on("open", () => console.log(`MongoDB Connected`));
mongoose.connection.on("error", console.error.bind(console, "Mongo Error"));

const client = new Commando.Client({
    owner: process.env.OWNER_ID.toString(),
    commandPrefix: '!',
});

client
	.on('error', console.error)
	.on('warn', console.warn)
	.on('ready', () => {
		console.log(`Client ready; logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
	})
	.on('disconnect', () => { console.warn('Disconnected!'); })
	.on('reconnecting', () => { console.warn('Reconnecting...'); })
	.on('commandError', (cmd, err) => {
		if(err instanceof commando.FriendlyError) return;
		console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
	})
	.on('commandBlocked', (msg, reason) => {
		console.log(oneLine`
			Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
			blocked; ${reason}
		`);
	})
	.on('commandPrefixChange', (guild, prefix) => {
		console.log(oneLine`
			Prefix ${prefix === '' ? 'removed' : `changed to ${prefix || 'the default'}`}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('commandStatusChange', (guild, command, enabled) => {
		console.log(oneLine`
			Command ${command.groupID}:${command.memberName}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('groupStatusChange', (guild, group, enabled) => {
		console.log(oneLine`
			Group ${group.id}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	});

client.setProvider(
    sqlite.open({ filename: 'database.db', driver: sqlite3.Database }).then(db => new Commando.SQLiteProvider(db))
).catch(console.error);

client.registry
	.registerGroups([
    ['test', 'Test'],
    ['fellow', 'Fellow']
  ])
	.registerDefaults()
	.registerCommandsIn(path.join(__dirname, 'commands'));


client.login(process.env.DISCORD_TOKEN.toString());
