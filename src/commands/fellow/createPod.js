const Commando = require('discord.js-commando');
const Pod = require('../../models/pod.js')

module.exports = class CreatePodCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'create-pod',
      group: 'fellow',
      memberName: 'create-pod',
      description: 'Creates a new pod and its channel',
      examples: [''],

      args: [
        {
          key: 'podName',
          label: 'Pod Name',
          prompt: 'What is the name of your pod?',
          type: 'string',
        }
      ]
    });
  }

  async run(msg, args) {
    if (msg.member.roles.cache.find(role => role.name === 'Admin')){
      let podName = args["podName"]
      const stdChannel = await msg.guild.channels.create(podName + "-standup")
      const pod = await Pod.create({
        name: podName,
        channelID: [
          msg.channel.id,
          stdChannel.id
        ]
      })
      return msg.reply(`Pod '${podName}-standup' created successfully!`)
    } else {
      return msg.reply('You do not have permissions to do that :(')
    }
  }
}
