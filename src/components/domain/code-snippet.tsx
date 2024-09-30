'use client'

import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Copy } from "lucide-react"

type CodeSnippetProps = {
  id: string
}

export default function CodeSnippet({ id }: CodeSnippetProps) {
  const { toast } = useToast()

  const snippet = `
// Adding styles dynamically
const styleAndScriptSnippet = \`
    const iframeStyles = (styleString) => {
        const style = document.createElement('style');
        style.textContent = styleString;
        document.head.append(style);
    };

    iframeStyles(\`
        body {
            margin: 0;
            padding: 0;
            height: 100vh;
            width: 100vw;
            overflow: hidden;
            font-family: Arial, sans-serif;
            background-color: black;
            color: gray;
        }
        .chat-frame {
            position: fixed;
            bottom: 20px;
            right: 20px;
            border: none;
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            width: 60px;
            height: 60px;
            overflow: hidden;
            border-radius: 50%;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            z-index: 1000;
        }
        .chat-frame.expanded {
            width: 450px;
            height: 670px;
            bottom: 50px;
            right: 50px;
            border-radius: 20px;
        }
        .blur-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            backdrop-filter: blur(10px);
            background-color: rgba(0, 0, 0, 0.5);
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            z-index: 999;
        }
        .blur-overlay.active {
            opacity: 1;
            pointer-events: auto;
        }
    \`);

    const iframe = document.createElement("iframe");
    const blurOverlay = document.createElement('div');
    blurOverlay.classList.add('blur-overlay');
    document.body.appendChild(blurOverlay);

    iframe.src = \`http://localhost:3000/chatbot?domainId=${id}\`;
    iframe.classList.add('chat-frame');
    document.body.appendChild(iframe);

    let resizeTimeout;

    window.addEventListener("message", (e) => {
        if (e.origin !== "http://localhost:3000") return;
        const data = JSON.parse(e.data);
        if (data.type === "resize") {
            clearTimeout(resizeTimeout);
            if (data.isOpen) {
                iframe.style.transition = "all 0.3s";
                iframe.style.width = '450px';
                iframe.style.height = '670px';
                resizeTimeout = setTimeout(() => {
                    iframe.classList.add('expanded');
                    blurOverlay.classList.add('active');
                }, 50);
            } else {
                iframe.classList.remove('expanded');
                blurOverlay.classList.remove('active');
                resizeTimeout = setTimeout(() => {
                    iframe.style.transition = "all 0s";
                    iframe.style.width = '60px';
                    iframe.style.height = '60px';
                }, 50);
            }
        }
    });

    document.addEventListener('click', (e) => {
        if (!iframe.contains(e.target) && iframe.classList.contains('expanded')) {
            iframe.contentWindow.postMessage(JSON.stringify({ type: "close", domainId: "${id}" }), "http://localhost:3000");
        }
    });
\`;

// Execute the script
const script = document.createElement('script');
script.textContent = styleAndScriptSnippet;
document.head.appendChild(script);
  `

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet)
    toast({
      title: "Copied to clipboard",
      description: "You can now paste the code inside your website",
    })
  }

  return (
    <div className="mt-10 flex flex-col gap-5 items-start w-full">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-2xl font-bold">Code Snippet</h2>
        <Button onClick={handleCopy} variant="outline" size="sm">
          <Copy className="mr-2 h-4 w-4" />
          Copy Code
        </Button>
      </div>
      <p className="text-muted-foreground">
        Copy and paste this code snippet into the header tag of your website
      </p>
      <div className="w-full bg-muted rounded-lg p-4 relative">
        <ScrollArea className="h-[400px] w-full rounded-md border">
          <pre className="p-4">
            <code className="text-sm whitespace-pre-wrap break-all">{snippet}</code>
          </pre>
        </ScrollArea>
      </div>
    </div>
  )
}