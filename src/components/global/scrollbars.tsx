import { ScrollArea } from "@/components/ui/scroll-area"

export default function CustomScrollArea({ children }: { children: React.ReactNode }) {
  return (
    <ScrollArea className="h-screen w-screen" style={{ overflow: 'auto' }}>
      <div className="min-h-full min-w-max"> {/* This ensures content is at least as tall as the container and as wide as its content */}
        {children}
      </div>
    </ScrollArea>
  )
}