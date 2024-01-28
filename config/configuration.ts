export const baseConfig = () => ({
  port: parseInt(process.env.PORT, 10) || 8080,
});
