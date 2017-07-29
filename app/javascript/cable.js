import ActionCable from 'actioncable';

const consumer = ActionCable.createConsumer();

export const createSubscription = (channel, callbacks) => {
  consumer.subscriptions.create(channel, callbacks);
};

export const getSubscription = (channel) => {
  return consumer.subscriptions.subscriptions.find((subscription) => {
    const parse = JSON.parse(subscription.identifier)
    return parse.channel == channel.channel && parse.manual_id == channel.manual_id;
  })
};

export default consumer;
