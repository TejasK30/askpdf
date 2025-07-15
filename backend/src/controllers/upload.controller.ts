import { Queue } from "bullmq"
import { Request, Response } from "express"

const queue = new Queue("file-upload-queue")

// controller to handle file upload
export const fileUploadController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    // add job to queue
    await queue.add("file-ready", {
      filename: req.file?.originalname,
      destination: req.file?.destination,
      path: req.file?.path,
    })

    return res.json({ message: "uploaded" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" })
  }
}
