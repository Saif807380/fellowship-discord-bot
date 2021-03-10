const Commando = require('discord.js-commando');

module.exports = class AddNumbersCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'hello-world',
      aliases: ['hw'],
      group: 'test',
      memberName: 'hello',
      description: 'Print HelloWorld',
      details: 'hello-world!!!',
      examples: ['hello-world'],
    });
  }

  async run(msg) {
    return msg.reply(`Hello World!`);
  }
};
