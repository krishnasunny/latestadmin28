import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">Unauthorized Access</h1>
      <p className="text-muted-foreground mb-8 text-center">
        You don't have permission to access this page.
      </p>
      <Button onClick={() => navigate(-1)}>Go Back</Button>
    </div>
  );
}