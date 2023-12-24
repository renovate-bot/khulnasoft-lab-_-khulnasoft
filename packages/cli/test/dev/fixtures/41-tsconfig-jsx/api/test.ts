import type { VercelApiHandler } from '@khulnasoft/node';

const handler: VercelApiHandler = (req, res) => {
  res.send('working');
};

export default handler;
