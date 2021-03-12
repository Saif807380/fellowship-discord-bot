const Commando = require('discord.js-commando');

const Fellow = require('../../models/fellow.js');
const Pod = require('../../models/pod.js');

module.exports = class AssignFellowCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'assign-fellow',
      group: 'fellow',
      memberName: 'assign-fellow',
      description: 'Assign a fellow into a pod',
      examples: [''],

      args: [
        {
          key: 'discordUser',
          label: 'Discord User',
          prompt: 'Mention the discord user with @handle',
          type: 'user',
        },
        {
          key: 'name',
          label: 'Name',
          prompt: 'What is the name of the fellow?',
          type: 'string',
        },
        {
          key: 'githubUsername',
          label: 'Github Username',
          prompt: 'What is the Github username of the fellow?',
          type: 'string',
        },
        {
          key: 'podName',
          label: 'Pod Name',
          prompt: 'Where are you assigning this fellow to?',
          type: 'string',
        },
      ],
    });
  }

  async run(msg, args) {
    const { discordUser, name, githubUsername, podName  } = args;

    const pod = await Pod.findOne({ name: podName }).populate('fellows').exec();

    if (!pod)
      return msg.reply(`Error! Can't find a pod with the name of ${podName}`);

    try {
      const fellow = await Fellow.create({
        name,
        githubUsername,
        discordID: discordUser.id,
        podID: pod.id,
      });

      pod.fellows.push(fellow);
      await pod.save();

      const message = `Assigned ${name} into pod ${podName}.`;
      return msg.reply(message);
    } catch (err) {
      return msg.reply(err.message);
    }
  }
};
