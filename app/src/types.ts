import type { Request } from "express";

export interface Context {
  req: Request;
}

export interface ClientInfo {
  name: string;
  version: string;
}
