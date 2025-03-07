import multer, { FileFilterCallback } from 'multer'
import path from 'path'
import { v4 } from 'uuid';



type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const upload = path.join(__dirname,"..", "..",".." ,'upload')

export const fileStorage = multer.diskStorage({
    destination: (
        request: Express.Request,
        file: Express.Multer.File,
        callback: DestinationCallback
    ): void => {
        // ...Do your stuff here.
        callback(null, upload)
    },

    filename: (
        req: Express.Request, 
        file: Express.Multer.File, 
        callback: FileNameCallback
    ): void => {
        callback(null, `${v4()}${path.extname(file.originalname)}`)
        // ...Do your stuff here.
    }
})

export const fileFilter = (
    request: Express.Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
): void => {

    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        callback(null, true)
    } else {
        callback(null, false)
    }
    if (file.size > 5000000) { // about 5 MB.
        callback(null, false)
    }

    callback(null, true)

}