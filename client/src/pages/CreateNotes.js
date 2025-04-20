import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import axios from "axios";

export default function CreateNotes() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmitPostgres = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/notes/create/postgres",
        { title, content },
        { withCredentials: true }
      );
      console.log({ title, content });
      window.location.href = "/";
    } catch (err) {
      console.error("Error creating note", err);
    }
    console.log({ title, content });
  };
  const handleSubmitMongoDB = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/notes/create/mongodb",
        { title, content },
        { withCredentials: true }
      );
      console.log({ title, content });
      window.location.href = "/";
    } catch (err) {
      console.error("Error creating note", err);
    }
    console.log({ title, content });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Create New Note</CardTitle>
          <CardDescription>
            Capture your thoughts, ideas, and reminders in one place.
          </CardDescription>
        </CardHeader>
        <form>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter note title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Write your note content here..."
                className="min-h-32"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <div className="flex bg-slate-400 p-4 rounded-b-md justify-center items-center">
            <CardFooter className="flex justify-end p-0 gap-12">
              <Button
                type="submit"
                className="hover:bg-slate-500"
                onClick={handleSubmitMongoDB}
              >
                <PlusCircle size={18} />
                MongoDB
              </Button>
              <Button
                type="submit"
                className="hover:bg-slate-500"
                onClick={handleSubmitPostgres}
              >
                <PlusCircle size={18} />
                PostgreSQL
              </Button>
            </CardFooter>
          </div>
        </form>
      </Card>
    </div>
  );
}
