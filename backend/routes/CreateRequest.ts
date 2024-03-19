import express from "express";
const router = express.Router();
import prisma from "../prisma/client";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/verify-token";
require("dotenv").config();

import { Request, Response, NextFunction } from "express";
import {priority } from "@prisma/client";
// Route to handle the submission of a new listing
router.post(
  "/",
  verifyToken,
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      jwt.verify(
        req.token as string,
        process.env.SECRET as jwt.Secret,
        async (err, decoded) => {
          if (err) {
            return res.status(401).json("Unauthorized");
          } else {
            console.log("decoded ---- ", decoded);
            const { id, role, email } = (<any>decoded).data;

            if (role === "publicUser") {
              const body = req.body; //constant

             
              
            const company = await prisma.property.findFirst({
              where:{
                id:body.propertyID
              },
              select: {
                company_id: true,
              }                  
            });
            
             
              async function createRequest(
                employee_id:number , 
                company_id: number, 
                requestType:string,
                date: Date,
                requestReason:string,
                priority:priority,
                ) {
                const property = await prisma.requests.create({
                  data: {
                    title: requestType, //title = reason of request change to what the front end sends us in body
                    issued_at: new Date(),

                    condo_owner_id: company_id,
                    employee_id: employee_id,
                    description: requestReason, //change to what the front end sends us in body
                    request_priority: priority //change to what the front end sends us in body
                    
                  },
                });
              }

              createRequest( body.employee_id, company!.company_id!, body.requestType, body.date, body.requestReason, body.request_priority);

              console.log("a");
              return res.status(200).json({});
            }
            return res.status(500).json({
              message: "unexpected error",
            });
          }
        },
      );
    } catch (err) {
      return res.status(500).json({
        message: "unexpected error",
      });
    }
  },
);

export default router;