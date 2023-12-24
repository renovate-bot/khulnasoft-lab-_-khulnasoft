import isLeapYear from 'leap-year';
import type { VercelRequest, VercelResponse } from '@khulnasoft/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const data = { isLeapYear: isLeapYear() };
  res.status(200).json(data);
}
