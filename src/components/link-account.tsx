"use client";
import { getAurinkoAuthUrl } from "@/lib/aurinko"
import { Button } from "./ui/button"

export default function Linkaccount() {
  return (
    <Button onClick={async () => { const authUrl = await getAurinkoAuthUrl('Google')
      window.location.href = authUrl
    }}>

    </Button>
  )
}
