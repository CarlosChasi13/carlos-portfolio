"use client";

import { Button } from "@/components/ui/button";

const descargarCv = () => {
  const link = document.createElement("a");
  link.href = "/Chasi_Carlos_Cv.pdf";
  link.download = "Chasi_Carlos_Cv.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function DownloadCvButton() {
  return (
    <Button
      className="bg-zinc-800 hover:bg-zinc-700 text-white"
      onClick={descargarCv}
    >
      Descargar CV
    </Button>
  );
}