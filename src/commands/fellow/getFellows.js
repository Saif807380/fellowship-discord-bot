const Commando = require('discord.js-commando');

const Pod = require('../../models/pod.js');
const Fellow = require('../../models/fellow.js');

module.exports = class GetFellowsCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'fellows',
      group: 'fellow',
      memberName: 'fellows',
      description: 'Get fellows from a pod',
      examples: ['fellows 2.0.0'],

      args: [
        {
          key: 'podName',
          label: 'Pod Name',
          prompt: 'Enter the pod name',
          type: 'string',
        }
      ]
    })
  }

  async run(msg, args) {
    const { podName } = args;
    try {
      const { name, fellows } = await Pod.findOne({ name: podName }).populate('fellows').exec();

      if (fellows.length === 0) {
        return msg.reply(`There are no fellows in pod ${name}`);
      }

      let message = `\nThe fellows in pod **${name}** are:\n`

      for (let fellow of fellows) {
        message += `<@${fellow.discordID}>\n`
      }

      return msg.reply(message);
    } catch (err) {
      return msg.reply(err.message);
    }

  }
}
