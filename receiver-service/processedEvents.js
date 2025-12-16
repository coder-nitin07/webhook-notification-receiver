const processedEvents = new Set();

module.exports = {
  has: (eventId) => processedEvents.has(eventId),
  add: (eventId) => processedEvents.add(eventId)
};