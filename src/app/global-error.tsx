"use client"

import NextError from "next/error"
import { captureError } from "@/lib/analytics"
import { useEffect } from "react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    captureError(error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <NextError statusCode={0} />
        <button type="button" onClick={reset}>
          Try again
        </button>
      </body>
    </html>
  )
}
