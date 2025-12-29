"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Loader2, ScanText, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { analyzeAction } from "./actions";

export default function AIDetectorPage() {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [showRaw, setShowRaw] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();

  const extractTextFromPDF = async (file: File): Promise<string> => {
    if (typeof window === "undefined") throw new Error("PDF extraction must run in the browser");
    const pdfjsModule: any = await import("pdfjs-dist");
    const pdfjs = pdfjsModule?.default ?? pdfjsModule;
    const pdfVersion = pdfjs.version || "3.5.141";
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfVersion}/pdf.worker.min.js`;

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      text += textContent.items.map((it: any) => it.str ?? "").join(" ") + "\n";
    }
    return text.trim();
  };

  const extractTextFromDOCX = async (file: File): Promise<string> => {
    if (typeof window === "undefined") throw new Error("DOCX extraction must run in the browser");
    const mammoth = await import("mammoth");
    const arrayBuffer = await file.arrayBuffer();
    const r = await mammoth.extractRawText({ arrayBuffer });
    return r.value.trim();
  };

  const extractTextFromFile = async (f: File) => {
    if (f.type === "text/plain") return await f.text();
    if (f.type === "application/pdf") return await extractTextFromPDF(f);
    if (f.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
      return await extractTextFromDOCX(f);
    throw new Error("Unsupported file type");
  };

  const handleRemoveFile = () => {
    setFile(null);
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    const allowed = [
      "text/plain",
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowed.includes(selected.type)) {
      toast({ title: "Invalid file", description: "Only .txt, .pdf, .docx allowed", variant: "destructive" });
      return;
    }

    setFile(selected);
    setText("");

    try {
      setLoading(true);
      setResult(null);
      const extracted = await extractTextFromFile(selected);
      if (!extracted.trim()) {
        toast({ title: "Empty file", description: "Uploaded file has no text", variant: "destructive" });
        setLoading(false);
        return;
      }

      const res = await analyzeAction(extracted);
      setResult(res);
      toast({ title: "Analysis complete" });
    } catch (err: any) {
      console.error(err);
      toast({ title: "Error", description: err?.message ?? "Failed to process file", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText("");
    setResult(null);
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) {
      toast({ title: "Input required", description: "Please enter text or upload a file", variant: "destructive" });
      return;
    }
    try {
      setLoading(true);
      setResult(null);
      const res = await analyzeAction(text);
      setResult(res);
      toast({ title: "Analysis complete" });
    } catch (err: any) {
      console.error(err);
      toast({ title: "Error", description: err?.message ?? "Analysis failed", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const renderResultPanel = (res: any) => {
    if (!res) return null;
    const isAi = res.isGenerated ?? res.is_ai ?? res.isAI ?? (res.prediction === "ai");
    const score = res.probability ?? res.score ?? res.confidence ?? res.aiProbability ?? res.similarity;
    const snippet = res.summary ?? res.explanation ?? res.textSnippet ?? res.resultText;

    return (
      <div className="w-full space-y-6">
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-sm text-muted-foreground">Detection</span>
            <span className="font-semibold text-2xl font-headline text-primary">
              {typeof isAi !== "undefined" ? (isAi ? "AI" : "Human") : "—"}
            </span>
          </div>
          {typeof score !== "undefined" && <Progress value={Math.round(Number(score) * 100) || Number(score) || 0} className="h-3" />}
        </div>

        {snippet && (
          <div>
            <h3 className="font-semibold text-muted-foreground">Notes</h3>
            <div className="text-sm whitespace-pre-wrap break-words">{String(snippet)}</div>
          </div>
        )}

        {/* details */}
        <div>
          <h3 className="font-semibold text-muted-foreground">Details</h3>
          <ScrollArea className="h-40 pr-2">
            <pre className="text-xs whitespace-pre-wrap break-words">{JSON.stringify(res, null, 2)}</pre>
          </ScrollArea>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold text-primary">AI Text Detector</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Detect if the provided text was generated by AI.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <Card className="shadow-md">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Analyze Text</h2>
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
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <ScanText className="mr-2 h-4 w-4" />
                      Detect AI
                    </>
                  )}
                </Button>
                <Button variant="outline" type="button" onClick={handleClear} disabled={loading || (!text.trim() && !file)}>
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
              <Label htmlFor="ai-file" className="text-base font-semibold mb-2 block">
                Upload File (.txt, .pdf, .docx)
              </Label>
              <Input
                id="ai-file"
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
              <h2 className="text-2xl font-bold mb-4">Analysis Report</h2>
              <div className="min-h-[350px] flex items-center justify-center">
                {loading && (
                  <div className="flex flex-col items-center gap-4 text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p className="text-muted-foreground font-semibold">Analyzing text...</p>
                    <p className="text-sm text-muted-foreground">This may take a moment.</p>
                  </div>
                )}

                {!loading && result && (
                  <div className="w-full">
                    {renderResultPanel(result)}

                    <div className="mt-4 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setShowRaw((s) => !s)}
                        className="text-xs text-muted-foreground underline"
                      >
                        {showRaw ? "Hide raw" : "Show raw JSON"}
                      </button>
                      {showRaw && (
                        <pre className="text-xs whitespace-pre-wrap break-words max-h-60 overflow-auto bg-muted/5 p-2 rounded w-full mt-2">
                          {(() => {
                            try {
                              return JSON.stringify(result, null, 2);
                            } catch {
                              return String(result);
                            }
                          })()}
                        </pre>
                      )}
                    </div>
                  </div>
                )}

                {!loading && !result && (
                  <div className="text-center text-muted-foreground">
                    <p>Result will appear here.</p>
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
