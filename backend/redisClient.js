import { createClient } from "redis";

const redisClient = createClient({
  url: "redis://localhost:6379", // default local Redis port
});

redisClient.on("error", (err) => {
  console.error("❌ Redis client error:", err);
});

await redisClient.connect(); // Needed with redis >= 4.x (returns a Promise)

// Set eviction policy after connecting
try {
  await redisClient.configSet('maxmemory', '30mb');
  await redisClient.configSet('maxmemory-policy', 'allkeys-lru');
  console.log('✅ Redis memory limits configured');
} catch (err) {
  console.error('❌ Failed to set Redis config:', err);
}

export default redisClient;

// 🧪 Bonus: Test Redis from any route
// In any controller, try:

// await redisClient.set("testkey", "hello", { EX: 10 });
// const value = await redisClient.get("testkey");
// console.log(value); // should log: "hello"