const Commando = require('discord.js-commando');

module.exports = class AddNumbersCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'init',
      group: 'fellow',
      memberName: 'init',
      description: 'Initialize a pod',
      examples: [''],

      args: [
        {
          key: 'pod-members',
          label: 'Pod Name',
          prompt: 'Who are your pod members?',
          type: 'user',
          infinite: true,
        },
      ]
    });
  }

  async run(msg, args) {
    return msg.reply(JSON.stringify({
      args: args
    }));
  }
}
