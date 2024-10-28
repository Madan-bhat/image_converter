import ThemeToggle from "@/components/ui/themeToggle";
import { Montserrat } from "next/font/google";
import ImageConverter from "./components/ImageConvertor";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-4 sm:p-8 md:p-24 ${montserrat.className} bg-gradient-to-b from-background to-secondary/20`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary animate-gradient">
            Image Converter
          </h1>
          <ThemeToggle />
        </div>
        <ImageConverter />
      </div>
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        Created by MADAN BHAT
      </footer>
    </main>
  );
}
