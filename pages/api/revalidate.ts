import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.query.secret == null || req.query.secret !== process.env.REVALIDATE_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' })
    }

    try {
        await res.revalidate('/')
        await res.revalidate('/enlightments')
        await res.revalidate('/posts')
        await res.revalidate('/services')
        await res.revalidate('/shop')
        await res.revalidate('/teacher-blog')
        await res.revalidate('/teacher')
        return res.json({ revalidated: true })
    } catch (err) {
        return res.status(500).send('Error revalidating')
    }
}