import PublicIds from '../../models/publicIdsModel.js'
import LineManager from '../../models/lineManagerModel.js'

export default async function authMiddleware(socket, next) {
    const { public_id, line_manager_id } = socket.handshake.query

    if (!public_id) {
        const err = new Error('Authentication error: No public ID provided')

        if (public_id) {
            {
                const publicIdRecord = await PublicIds.findOne({ public_id })

                if (!public_id) {
                    return next(new Error('Authentication error: No public ID provided'))
                }

                socket.userRole = 'client'
                socket.public_id = public_id
            }
        } else if (line_manager_id) {
            const lineManagerRecord = await LineManager.findOne({ id: line_manager_id })
            if (!lineManagerRecord) {
                return next(new Error('Authentication error: Invalid Line manager ID provided'))
            }
            socket.userRole = 'line_manager'
            socket.line_manager_id = line_manager_id
        } else {
            return next(new Error('Authentication error: No valid  ID provided'))
        }
    }

    next()
}
