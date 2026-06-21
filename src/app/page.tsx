import { Button } from "@/components/ui/button";
import { useCurrent } from "@/features/auth/api/use-current";

export default function Home() {
  //const { data } = useCurrent();
  return (
    <div>
      <Button variant="primary">Hello World</Button>
      <p className="text-lg text-muted-foreground">Welcome to the homepage!</p>
    </div>
  );
}
