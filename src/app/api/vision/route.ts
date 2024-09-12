// import nextConnect from "next-connect";
// import multer from "multer";
// import type { NextApiRequest, NextApiResponse } from "next";

// // Configure multer for file uploads
// const upload = multer({
//   storage: multer.diskStorage({
//     destination: "./public/uploads",
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + "-" + file.originalname);
//     },
//   }),
// });

// // Extend the Next.js request interface to include the file uploaded via multer
// interface NextApiRequestWithFile extends NextApiRequest {
//   file: Express.Multer.File;
// }

// // Initialize nextConnect
// const apiRoute = nextConnect<NextApiRequestWithFile, NextApiResponse>({
//   onError(
//     error: { message: any },
//     req: any,
//     res: {
//       status: (arg0: number) => {
//         (): any;
//         new (): any;
//         json: { (arg0: { error: string }): void; new (): any };
//       };
//     }
//   ) {
//     res.status(500).json({ error: `Something went wrong: ${error.message}` });
//   },
//   onNoMatch(
//     req: { method: any },
//     res: {
//       status: (arg0: number) => {
//         (): any;
//         new (): any;
//         json: { (arg0: { error: string }): void; new (): any };
//       };
//     }
//   ) {
//     res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
//   },
// });

// // Apply multer middleware to handle file uploads
// apiRoute.use(upload.single("file"));

// apiRoute.post(
//   (
//     req: { file: any },
//     res: {
//       status: (arg0: number) => {
//         (): any;
//         new (): any;
//         json: { (arg0: { message: string; file: any }): void; new (): any };
//       };
//     }
//   ) => {
//     res.status(200).json({
//       message: "File uploaded successfully",
//       file: req.file, // This will include the file information
//     });
//   }
// );

// // Export API route with Next.js body parsing disabled
// export const config = {
//   api: {
//     bodyParser: false, // Disable Next.js body parsing, multer will handle it
//   },
// };

// export default apiRoute;
