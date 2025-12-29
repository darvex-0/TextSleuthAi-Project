"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Eye } from "lucide-react";
import Link from "next/link";

interface HistoryItem {
  id: string;
  type: "ai-detection" | "plagiarism";
  text: string;
  result: any;
  timestamp: Date;
}

export default function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem("textSleuth_history");
    setItems(saved ? JSON.parse(saved) : []);
  }, []);

  const deleteItem = (id: string) => {
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    localStorage.setItem("textSleuth_history", JSON.stringify(updated));
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="font-headline text-4xl font-bold text-primary">Analysis History</h1>
      </div>

      <div className="space-y-4">
        {items.length === 0 ? (
          <Card className="p-6 text-center text-muted-foreground">
            <p>No history yet. Run an analysis to get started.</p>
          </Card>
        ) : (
          items.map((item) => (
            <Card key={item.id} className="p-4 flex justify-between items-start">
              <div className="flex-1">
                <p className="font-semibold">{item.type === "ai-detection" ? "AI Detection" : "Plagiarism Check"}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">{item.text}</p>
                <p className="text-xs text-muted-foreground mt-1">{new Date(item.timestamp).toLocaleString()}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => deleteItem(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>

      <div className="mt-8 text-center">
        <Button asChild>
          <Link href="/">Back to Tools</Link>
        </Button>
      </div>
    </div>
  );
}