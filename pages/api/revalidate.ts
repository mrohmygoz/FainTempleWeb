import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.query.secret == null || req.query.secret !== process.env.REVALIDATE_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' })
    }

    try {
        await res.revalidate('/')
        await res.revalidate('/about')
        await res.revalidate('/announcements')
        await res.revalidate('/chairman')
        await res.revalidate('/events')
        await res.revalidate('/join')
        return res.json({ revalidated: true })
    } catch (err) {
        return res.status(500).send('Error revalidating')
    }
}