import { PrismaClient } from "@prisma/client";
import { CLIENT_RENEG_LIMIT } from "tls";

const client = global.prismadb || new PrismaClient();
if(process.env.NODE_ENV === "production") global.prismadb = CLIENT_RENEG_LIMIT

export default client;