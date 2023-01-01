import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  names: { dolu: string }
}

export default function handler(
  _: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    names: {
      dolu: "59b96df8d8b5e66b3b95a3e1ba159750a6edd69bcbba1857aeb652a5b208bd59"
    }
  })
}
