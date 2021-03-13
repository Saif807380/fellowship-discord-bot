const Commando = require('discord.js-commando');

const Fellow = require('../../models/fellow.js');
const Pod = require('../../models/pod.js');
const Standup = require('../../models/standup.js');

module.exports = class ShowStandupsCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'standups',
      group: 'fellow',
      memberName: 'standups',
      description: 'Show standups',
      examples: [''],

      args: [
        {
          key: 'name',
          label: 'Name of fellow',
          prompt: '',
          type: 'string',
          default: ''
        },
        {
          key: 'date',
          label: 'Date',
          prompt: '',
          type: 'string',
          default: ''
        }
      ],
    });
  }

  async run(msg, args) {
    const { name, date  } = args;
    let standupDate = date ? new Date(date) : new Date();
    standupDate = standupDate.toISOString().slice(0, 10);
    try {

      let standups = null;

      if(name){
        const fellow = await Fellow.findOne({ name: name });
        if(!fellow){
          return msg.reply("Fellow doesn't exist :(");
        }
        standups = await Standup.find({ fellowID: fellow._id, date: standupDate }).populate('fellowID').exec();
      } else {
        standups = await Standup.find({ date: standupDate }).populate('fellowID').exec();
      }
      let response = '';
      for (const s of standups){
        response += `\n**${s.fellowID.name}**\n\n**Yesterday**\n${s.yesterday}\n\n**Today**\n${s.today}\n\n**Blockers**\n${s.blockers}\n\n**Shoutouts**\n${s.shoutouts}\n`
      }

      const author = await Fellow.findOne({ discordID: msg.author.id }).populate('podID').exec();
      const channel = this.client.channels.cache.find(channel => channel.name === `${author.podID.name}-standup`)
      if(response){
        channel.send(response);
        return msg.say(`Info sent to ${author.podID.name}-standup`);
      }
      return msg.reply("No standups found :(")

    } catch (err) {
      return msg.reply(err.message);
    }
  }
};
