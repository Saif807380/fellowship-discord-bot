const Commando = require('discord.js-commando');

const Fellow = require('../../models/fellow.js');
const Pod = require('../../models/pod.js');
const Standup = require('../../models/standup.js');

module.exports = class AssignFellowCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'add-standup',
      group: 'fellow',
      memberName: 'add-standup',
      description: 'Create new standup',
      examples: [''],

      args: [
        {
          key: 'yesterday',
          label: 'Yesterday',
          prompt: 'What did you do yesterday?',
          type: 'string',
        },
        {
          key: 'today',
          label: 'Today',
          prompt: 'What did you or are planning to do today?',
          type: 'string',
        },
        {
          key: 'blockers',
          label: 'Blockers',
          prompt: 'Any blockers so far?',
          type: 'string',
        },
        {
          key: 'shoutouts',
          label: 'Shoutouts',
          prompt: 'Shoutouts',
          type: 'string',
        },
      ],
    });
  }

  async run(msg, args) {
    const { yesterday, today, blockers, shoutouts  } = args;

    try {
      const fellow = await Fellow.findOne({ discordID: msg.author.id }).populate('standups').exec();
      const pod = await Pod.findById(fellow.podID).populate('standups').exec();

      const standup = await Standup.create({
        yesterday,
        today,
        blockers,
        shoutouts,
        fellowID: fellow._id
      });

      fellow.standups.push(standup);
      await fellow.save();
      pod.standups.push(standup);
      await pod.save();

      return msg.reply('Successfully added your standup!');

    } catch (err) {
      return msg.reply(err.message);
    }
  }
};
