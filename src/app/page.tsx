"use client";

import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useReCaptcha } from "next-recaptcha-v3";
import Link from "next/link";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { executeRecaptcha } = useReCaptcha();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      const token = await executeRecaptcha("shortlinkapp");
      try {
        const res = await fetch("/api/shorten", {
          method: "POST",
          body: JSON.stringify({ url, token }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (data.error) toast.error(data.error);
        setShortUrl(data.shortUrl);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to shorten URL",
        );
        console.error("Error shortening URL:", error);
      } finally {
        setLoading(false);
      }
    },
    [executeRecaptcha, url],
  );

  const handleCopy = () => {
    if (!shortUrl) return;
    navigator.clipboard
      .writeText(shortUrl)
      .then(() => {
        toast.success("Short URL copied to clipboard!");
      })
      .catch((error) => {
        toast.error("Failed to copy short URL");
        console.error("Error copying short URL:", error);
      });
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
          <div className="w-12 h-12 border-4 border-green-800 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <main className="flex flex-col items-center justify-center min-h-screen">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          className="w-25 h-25 mb-4 fill-green-800"
        >
          {/*Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.*/}
          <path d="M451.5 160C434.9 160 418.8 164.5 404.7 172.7C388.9 156.7 370.5 143.3 350.2 133.2C378.4 109.2 414.3 96 451.5 96C537.9 96 608 166 608 252.5C608 294 591.5 333.8 562.2 363.1L491.1 434.2C461.8 463.5 422 480 380.5 480C294.1 480 224 410 224 323.5C224 322 224 320.5 224.1 319C224.6 301.3 239.3 287.4 257 287.9C274.7 288.4 288.6 303.1 288.1 320.8C288.1 321.7 288.1 322.6 288.1 323.4C288.1 374.5 329.5 415.9 380.6 415.9C405.1 415.9 428.6 406.2 446 388.8L517.1 317.7C534.4 300.4 544.2 276.8 544.2 252.3C544.2 201.2 502.8 159.8 451.7 159.8zM307.2 237.3C305.3 236.5 303.4 235.4 301.7 234.2C289.1 227.7 274.7 224 259.6 224C235.1 224 211.6 233.7 194.2 251.1L123.1 322.2C105.8 339.5 96 363.1 96 387.6C96 438.7 137.4 480.1 188.5 480.1C205 480.1 221.1 475.7 235.2 467.5C251 483.5 269.4 496.9 289.8 507C261.6 530.9 225.8 544.2 188.5 544.2C102.1 544.2 32 474.2 32 387.7C32 346.2 48.5 306.4 77.8 277.1L148.9 206C178.2 176.7 218 160.2 259.5 160.2C346.1 160.2 416 230.8 416 317.1C416 318.4 416 319.7 416 321C415.6 338.7 400.9 352.6 383.2 352.2C365.5 351.8 351.6 337.1 352 319.4C352 318.6 352 317.9 352 317.1C352 283.4 334 253.8 307.2 237.5z" />
        </svg>
        <h1 className="text-2xl font-bold">Shortlink Generator</h1>
        <p>Get your link, shorteeeeeen!</p>
        <form
          onSubmit={handleSubmit}
          className="mt-4 rounded-lg border-2 border-green-800"
        >
          <input
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://"
            className="px-2 py-3 w-auto md:w-100 focus:outline-none"
          />
          <button type="submit" className="bg-green-900 text-white p-3 rounded">
            Get
          </button>
        </form>
        <div className="space-x-2">
          <Link href="/terms" className="mt-2 text-xs text-gray-400">
            Terms of Service
          </Link>
          <Link href="/privacy" className="mt-2 text-xs text-gray-400">
            Privacy Policy
          </Link>
        </div>
        {shortUrl && (
          <>
            <p className="mt-4">
              <a href={shortUrl} className="text-green-500 underline">
                {shortUrl}
              </a>
            </p>
            <div className="mt-2 flex items-center justify-center">
              <a
                href={shortUrl}
                className="me-2 bg-green-500 text-white px-2 py-1 rounded"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="w-5 h-5"
                >
                  {/*Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.*/}
                  <path d="M192 384L88.5 384C63.6 384 48.3 356.9 61.1 335.5L114 247.3C122.7 232.8 138.3 224 155.2 224L250.2 224C326.3 95.1 439.8 88.6 515.7 99.7C528.5 101.6 538.5 111.6 540.3 124.3C551.4 200.2 544.9 313.7 416 389.8L416 484.8C416 501.7 407.2 517.3 392.7 526L304.5 578.9C283.2 591.7 256 576.3 256 551.5L256 448C256 412.7 227.3 384 192 384L191.9 384zM464 224C464 197.5 442.5 176 416 176C389.5 176 368 197.5 368 224C368 250.5 389.5 272 416 272C442.5 272 464 250.5 464 224z" />
                </svg>
              </a>
              <button
                className="bg-green-500 text-white px-2 py-1 rounded cursor-pointer"
                onClick={handleCopy}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="w-5 h-5"
                >
                  {/*Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.*/}
                  <path d="M288 64C252.7 64 224 92.7 224 128L224 384C224 419.3 252.7 448 288 448L480 448C515.3 448 544 419.3 544 384L544 183.4C544 166 536.9 149.3 524.3 137.2L466.6 81.8C454.7 70.4 438.8 64 422.3 64L288 64zM160 192C124.7 192 96 220.7 96 256L96 512C96 547.3 124.7 576 160 576L352 576C387.3 576 416 547.3 416 512L416 496L352 496L352 512L160 512L160 256L176 256L176 192L160 192z" />
                </svg>
              </button>
            </div>
          </>
        )}
      </main>
    </>
  );
}
