import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Loader2, CheckCircle } from "lucide-react";

const MagicLinkLogin = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        setMessage(error.message);
        setIsSuccess(false);
      } else {
        setMessage("Un lien de connexion a été envoyé à votre adresse email.");
        setIsSuccess(true);
      }
    } catch (error) {
      setMessage("Une erreur est survenue. Veuillez réessayer.");
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="card-administrative w-full max-w-md mx-auto">
      <CardHeader className="text-center space-y-4">
        <div className="w-12 h-12 mx-auto bg-primary/10 rounded-sm flex items-center justify-center">
          <Mail className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-xl font-bold">Connexion par email</CardTitle>
        <CardDescription>
          Entrez votre adresse email pour recevoir un lien de connexion sécurisé
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Adresse email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              required
              disabled={isLoading}
              className="input-enhanced"
            />
          </div>

          <Button
            type="submit"
            className="w-full btn-administrative"
            disabled={isLoading || !email}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Envoyer le lien de connexion
              </>
            )}
          </Button>
        </form>

        {message && (
          <Alert className={isSuccess ? "border-success bg-success/10" : "border-warning bg-warning/10"}>
            <div className="flex items-center">
              {isSuccess ? (
                <CheckCircle className="h-4 w-4 mr-2 text-success" />
              ) : (
                <Mail className="h-4 w-4 mr-2 text-warning" />
              )}
              <AlertDescription className={isSuccess ? "text-success" : "text-warning"}>
                {message}
              </AlertDescription>
            </div>
          </Alert>
        )}

        {isSuccess && (
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Vérifiez votre boîte de réception et cliquez sur le lien pour vous connecter.
            </p>
            <p className="text-xs text-muted-foreground">
              Le lien expire dans 60 minutes.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MagicLinkLogin;