export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { deviceName, turnOnTime, turnOffTime } = req.body;
    res.status(200).json({ message: 'Schedule saved', deviceName, turnOnTime, turnOffTime });
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
