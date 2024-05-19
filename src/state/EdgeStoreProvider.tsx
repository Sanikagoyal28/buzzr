"use client";
import { type EdgeStoreRouter } from "@/app/api/uploadMedia/[...nextuploadMedia]/uploadMedia";
import { createEdgeStoreProvider } from "@edgestore/react";

export const {EdgeStoreProvider,useEdgeStore} = createEdgeStoreProvider<EdgeStoreRouter>();