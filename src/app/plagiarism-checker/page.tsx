"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Loader2, ScanText, ExternalLink, X } from "lucide-react";
import { checkPlagiarismAction } from "./actions";
import type { CheckTextForPlagiarismOutput } from "@/ai/flows/check-text-for-plagiarism";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

type PlagiarismResult = 
  | (CheckTextForPlagiarismOutput & { similarityPercentage?: number; sourceUrls?: string[] })
  | { error: string };

export default function PlagiarismCheckerPage() {
  const [text, setText] = useState(`"James Bond in film" redirects here. For the various portrayals of the character in film, see Portrayal of James Bond in film.
James Bond is a fictional character created by British novelist Ian Fleming in 1953. A British secret agent working for MI6 under the codename 007, Bond has been portrayed on film in twenty-seven productions by actors Sean Connery, David Niven, George Lazenby, Roger Moore, Timothy Dalton, Pierce Brosnan, and Daniel Craig. Eon Productions, which now holds the adaptation rights to all of Fleming's Bond novels, made all but two films in the film series.[1][2]

In 1961, producers Albert R. Broccoli and Harry Saltzman purchased the filming rights to Fleming's novels.[3] They founded Eon Productions and, with financial backing by United Artists, produced Dr. No, directed by Terence Young and featuring Connery as Bond.[4] Following its release in 1962, Broccoli and Saltzman created the holding company Danjaq to ensure future productions in the James Bond film series.[5] The Eon series currently has twenty-five films, with the most recent, No Time to Die, released in September 2021. With a combined gross of $7.8 billion to date, it is the fifth-highest-grossing film series in nominal terms.[6] Adjusting for inflation, the series has earned over $19.2 billion in 2022 dollars from box-office receipts alone,[a] with non-Eon entries pushing this inflation-adjusted figure to a grand total in excess of $20 billion.

The films have won six Academy Awards: for Sound Effects (now Sound Editing) in Goldfinger (at the 37th Awards), to John Stears for Visual Effects in Thunderball (at the 38th Awards), to Per Hallberg and Karen Baker Landers for Sound Editing, to Adele and Paul Epworth for Original Song in Skyfall (at the 85th Awards), to Sam Smith and Jimmy Napes for Original Song in Spectre (at the 88th Awards), and to Billie Eilish and Finneas O'Connell for Original Song in No Time to Die (at the 94th Awards). Several other songs produced for the films have been nominated for Academy Awards for Original Song, including Paul McCartney's "Live and Let Die", Carly Simon's "Nobody Does It Better", and Sheena Easton's "For Your Eyes Only". In 1982, Albert R. Broccoli received the Irving G. Thalberg Memorial Award.[7]

When Broccoli and Saltzman bought the rights to existing and future Fleming titles, the deal did not include Casino Royale, which had been sold to producer Gregory Ratoff for a television adaptation in 1954. After Ratoff's death, the rights passed to Charles K. Feldman,[8] who subsequently produced the Bond spoof Casino Royale in 1967.[9] A legal case ensured that the film rights to the novel Thunderball were held by Kevin McClory, as he, Fleming and scriptwriter Jack Whittingham had written a film script on which the novel was based.[1] Although Eon Productions and McClory joined forces to produce Thunderball, McClory still retained the rights to the story and adapted Thunderball into 1983's non-Eon entry, Never Say Never Again.[10] Distribution rights to both of those films are currently held by Metro-Goldwyn-Mayer Pictures, which distributes Eon's regular series.[11][12] In February 2025, it was announced that Amazon MGM had gained full creative control of the franchise and that long-serving producers Barbara Broccoli and Michael G. Wilson would step down from producing future films in the series, although they would remain co-owners.[13] On 25 March 2025, Amazon MGM announced that producers Amy Pascal and David Heyman have been selected to produce the next James Bond film. Pascal will produce the film through Pascal Pictures, and Heyman will produce via Heyday Films.[14]`);
  const [result, setResult] = useState<PlagiarismResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();

  const extractTextFromPDF = async (file: File): Promise<string> => {
    if (typeof window === "undefined") throw new Error("PDF extraction must run in the browser");
    try {
      // dynamic import for browser only
      // dynamic import for browser only, cast to any to avoid missing type declarations
      const pdfjsModule: any = await import("pdfjs-dist");
      // support both possible shapes (default export or module object)
      const pdfjs = pdfjsModule?.default ?? pdfjsModule;
      // set worker path (uses CDN). pdfjs.version may be undefined in some builds; provide a sensible fallback.
      const pdfVersion = pdfjs.version || "3.5.141";
      pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfVersion}/pdf.worker.min.js`;

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      let text = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => (item.str ? item.str : "")).join(" ");
        text += pageText + "\n";
      }

      return text.trim();
    } catch (error) {
      console.error("PDF extraction error:", error);
      throw new Error("Failed to extract text from PDF");
    }
  };

  const extractTextFromDOCX = async (file: File): Promise<string> => {
    if (typeof window === "undefined") throw new Error("DOCX extraction must run in the browser");
    try {
      const mammoth = await import("mammoth");
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      return result.value.trim();
    } catch (error) {
      console.error("DOCX extraction error:", error);
      throw new Error("Failed to extract text from DOCX");
    }
  };

  const extractTextFromFile = async (file: File): Promise<string> => {
    if (file.type === "text/plain") {
      return await file.text();
    } else if (file.type === "application/pdf") {
      return await extractTextFromPDF(file);
    } else if (
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return await extractTextFromDOCX(file);
    }
    throw new Error("Unsupported file type");
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const allowedTypes = [
        "text/plain",
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(selectedFile.type)) {
        toast({
          title: "Invalid file type",
          description: "Only .txt, .pdf, .docx files are allowed",
          variant: "destructive",
        });
        return;
      }
      setFile(selectedFile);
      setText("");

      // Extract and auto-submit
      try {
        setLoading(true);
        const extractedText = await extractTextFromFile(selectedFile);

        if (!extractedText.trim()) {
          toast({
            title: "Empty file",
            description: "The file appears to be empty. Please upload a file with content.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        // Auto-submit the extracted text
        setResult(null);
        const plagiarismResult = await checkPlagiarismAction(extractedText);

        if ("error" in plagiarismResult) {
          toast({
            title: "Check Failed",
            description: plagiarismResult.error,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success",
            description: "Plagiarism check completed!",
          });
        }
        setResult(plagiarismResult);
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to process file. Please try again.",
          variant: "destructive",
        });
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClear = () => {
    setText("");
    setResult(null);
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
 
   // remove uploaded file without affecting other inputs
   const handleRemoveFile = () => {
    setFile(null);
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
   };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!text.trim()) {
      toast({
        title: "Input required",
        description: "Please enter some text to check for plagiarism.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      setResult(null);
      const plagiarismResult = await checkPlagiarismAction(text);

      if ("error" in plagiarismResult) {
        toast({
          title: "Check Failed",
          description: plagiarismResult.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Plagiarism check completed!",
        });
      }
      setResult(plagiarismResult);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check plagiarism. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold text-primary">Plagiarism Checker</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Find out if your text contains plagiarized content from online sources.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <Card className="shadow-md">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Check Your Text</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Textarea
                placeholder="Start typing or paste your text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={10}
                className="resize-none focus:ring-accent"
                disabled={loading || !!file}
              />
              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={loading || !text.trim() || !!file}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground flex-1"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Checking...
                    </>
                  ) : (
                    <>
                      <ScanText className="mr-2 h-4 w-4" />
                      Check for Plagiarism
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleClear}
                  disabled={loading || (!text.trim() && !file)}
                >
                  <X className="mr-2 h-4 w-4" />
                  Clear
                </Button>
              </div>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background text-muted-foreground">OR</span>
              </div>
            </div>

            <div className="mb-6">
              <Label htmlFor="file-input" className="text-base font-semibold mb-2 block">
                Upload File (.txt, .pdf, .docx)
              </Label>
              <Input
                id="file-input"
                type="file"
                accept=".txt,.pdf,.docx"
                onChange={handleFileChange}
                disabled={!!text || loading}
                className="cursor-pointer"
                ref={fileInputRef}
              />
              {file && (
                <div className="mt-2 flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">
                    Selected: <span className="font-semibold">{file.name}</span>
                  </p>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    aria-label="Remove uploaded file"
                    className="inline-flex items-center justify-center h-7 w-7 rounded-md bg-destructive/10 text-destructive hover:bg-destructive/20"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </Card>

        <div className="sticky top-28">
          <Card className="shadow-md">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Plagiarism Report</h2>
              <div className="min-h-[350px] flex items-center justify-center">
                {loading && (
                  <div className="flex flex-col items-center gap-4 text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p className="text-muted-foreground font-semibold">Scanning the web for sources...</p>
                    <p className="text-sm text-muted-foreground">This may take a moment.</p>
                  </div>
                )}
                {!loading && result && !("error" in result) && "sourceUrls" in result && (
                  <div className="w-full space-y-6">
                    <div>
                      <div className="flex justify-between items-baseline mb-2">
                        <span className="text-sm text-muted-foreground">Similarity Score</span>
                        <span className="font-semibold text-3xl font-headline text-primary">
                          {result.similarityPercentage}%
                        </span>
                      </div>
                      <Progress
                        value={result.similarityPercentage || 0}
                        className="h-3"
                      />
                    </div>

                    {result.sourceUrls && result.sourceUrls.length > 0 ? (
                      <div className="space-y-2">
                        <h3 className="font-semibold text-muted-foreground">
                          Matching Sources:
                        </h3>
                        <ScrollArea className="h-60 pr-4">
                          <ul className="space-y-3">
                            {result.sourceUrls.map((url, index) => (
                              <li key={index} className="text-sm">
                                <a
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-start gap-2 text-muted-foreground hover:text-primary transition-colors group"
                                >
                                  <ExternalLink className="h-4 w-4 flex-shrink-0 mt-0.5" />
                                  <span className="break-all group-hover:underline">
                                    {url}
                                  </span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </ScrollArea>
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground pt-8">
                        <p className="font-semibold text-lg text-primary">
                          Looks Original!
                        </p>
                        <p>No matching sources found online.</p>
                      </div>
                    )}
                  </div>
                )}
                {!loading && !result && (
                  <div className="text-center text-muted-foreground">
                    <p>Your plagiarism report will appear here.</p>
                  </div>
                )}
                {!loading && result && "error" in result && (
                  <div className="text-center text-destructive p-4 rounded-md bg-destructive/10">
                    <p className="font-semibold">Check Failed</p>
                    <p className="text-sm">
                      {"error" in result
                        ? result.error
                        : "Could not check for plagiarism. Please try again."}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
