const keys = require("./keys");
const redis = require("redis");

let client = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});

const sub = client.duplicate();

function fib(index) {
  if (index < 2) {
    return 1;
  } else {
    return fib(index - 1) + fib(index - 2);
  }
}

sub.on("message", (channel, message) => {
  redisClient.hset("values", message, fib(parseInt(message)));
});

sub.subscribe("insert");
