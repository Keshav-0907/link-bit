export default function POST(req, res) {
  const data = req.body;
  res.status(200).json({ name: "John Doe", data });
}

