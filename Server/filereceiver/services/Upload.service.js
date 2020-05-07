import { Router } from "express";
import multer from "multer";
import fs from "fs";
import unzipper from "unzipper";
import rimraf from "rimraf"

const imageUploader = multer({ dest: "images/" });
const router = Router();

router.post("/design", imageUploader.single("design"), (req, res) => {
  const processedFile = req.file || {}; // MULTER xử lý và gắn đối tượng FILE vào req
  let orgName = processedFile.originalname || ""; // Tên gốc trong máy tính của người upload 
  orgName = orgName.trim().replace(/ /g, "-");
  const fullPathInServ = processedFile.path; // Đường dẫn đầy đủ của file vừa đc upload lên server
  // Đổi tên của file vừa upload lên, vì multer đang đặt default ko có đuôi file
  const newFullPath = `${fullPathInServ}-${orgName}`;
  fs.renameSync(fullPathInServ, newFullPath);
  if (orgName.includes("zip") && !!req.body.extractpath) {
    rimraf.sync(req.body.extractpath);
    fs.createReadStream(newFullPath).pipe(
      unzipper.Extract({ path: req.body.extractpath })
    ); 
  } 
  res.send({
    status: true,
    message: "file uploaded",
    fileNameInServer: newFullPath,
  });
});

export default router;
