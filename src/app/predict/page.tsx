import Dropzone from "@/components/dropzone";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import CardPie from "@/components/charts/cardPie";
import { api } from "@/utils/axios";
import { Birads } from "@/lib/type";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const predictSchema = z.object({
  icNo: z
    .string()
    .min(12, "IC Number must be 12 characters")
    .max(12, "IC Number must be 12 characters"),
});

export default function Predict() {
  const [showResult, setShow] = useState(false);
  const resultRef = useRef<HTMLDivElement | null>(null);
  const [images, setImages] = useState<File[] | []>([]);
  const [pieData, setData] = useState<Birads[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [save, setSave] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof predictSchema>>({
    resolver: zodResolver(predictSchema),
  });

  async function onPredict(data: z.infer<typeof predictSchema>) {
    if (images.length !== 4) {
      toast({
        title: "Error",
        description: "Please upload atleat 4 images",
        variant: "destructive",
      });

      return;
    }
    try {
      setLoading(true);

      const fd = new FormData();
      images.forEach((img) => {
        fd.append(`birad_images`, img);
      });
      fd.append("ic_no", data.icNo);

      const res = await api.post("/predict", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setData(res.data);
      setShow(true);
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  async function onSave() {
    setSave(true);
    try {
      const fd = new FormData();
      images.forEach((img) => {
        fd.append(`birad_images`, img);
      });
      fd.append("ic_no", form.getValues("icNo"));

      await api.post("/predict/save", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        title: "Success",
        description: "Prediction result was successfully saved",
      });
    } catch (error) {
      console.log(error);
    }
    setSave(false);
  }

  return (
    <div className="space-y-8">
      <div className={showResult ? "block" : "hidden"}>
        <CardPie
          data={pieData}
          action={true}
          onAgain={() => {
            window.location.reload();
          }}
          onSave={onSave}
          loading={save}
        />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onPredict)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Prediction</CardTitle>
              <CardDescription>
                Upload images of mammogram to start your prediction
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Dropzone sendFiles={(files) => setImages(files)} />
              <FormField
                control={form.control}
                name="icNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>IC No.</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="012345678901"
                        maxLength={12}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="gap-2 justify-end">
              <Button type="reset" variant="outline">
                Clear
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Predict"
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
