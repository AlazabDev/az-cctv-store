import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { Layout } from "@/components/Layout";
import { useCart } from "@/hooks/useCart";
import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items, getSubtotal, clearCart } = useCart();
  const { fmtPrice, t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });

  const subtotal = getSubtotal();
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container-narrow py-28 text-center">
          <CheckCircle2 className="w-14 h-14 mx-auto mb-6 text-muted-foreground/30" />
          <h1 className="text-3xl font-bold mb-4">{t("bagEmpty")}</h1>
          <p className="text-muted-foreground mb-8">{t("bagEmptyText")}</p>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold">
            <Link to="/products">
              {t("continueShopping")}
              <ArrowRight className="ms-2 w-4 h-4 rtl:rotate-180" />
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulated order submission — online payment is coming soon.
    await new Promise((resolve) => setTimeout(resolve, 1200));

    toast({
      title: t("orderSubmitted"),
      description: t("orderSubmittedText"),
    });

    clearCart();
    setIsSubmitting(false);
    navigate("/");
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="container-full py-5 border-b border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/cart" className="hover:text-foreground transition-colors">
            {t("bag")}
          </Link>
          <span className="text-border">/</span>
          <span className="text-foreground">{t("checkoutTitle")}</span>
        </div>
      </div>

      {/* Cash on delivery banner */}
      <div className="bg-accent/10 border-b border-accent/20">
        <div className="container-full py-3">
          <div className="flex items-center gap-3 text-sm">
            <AlertCircle className="w-5 h-5 text-accent shrink-0" />
            <p>
              <span className="font-medium">{t("checkoutComingSoon")}.</span>{" "}
              <span className="text-muted-foreground">{t("checkoutNotice")}</span>
            </p>
          </div>
        </div>
      </div>

      <section className="py-10">
        <div className="container-full">
          <h1 className="text-3xl font-bold tracking-tight mb-10">{t("checkoutTitle")}</h1>

          <div className="grid lg:grid-cols-12 gap-10">
            {/* Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <h2 className="font-bold text-lg mb-4">{t("contactUs")}</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-semibold text-muted-foreground mb-1.5">
                        {t("fullName")} *
                      </label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-muted-foreground mb-1.5">
                        {t("phone")} *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        dir="ltr"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="email" className="block text-xs font-semibold text-muted-foreground mb-1.5">
                      {t("email")}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      dir="ltr"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <h2 className="font-bold text-lg mb-4">{t("shippingTitle")}</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="address" className="block text-xs font-semibold text-muted-foreground mb-1.5">
                        {t("address")} *
                      </label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-xs font-semibold text-muted-foreground mb-1.5">
                        {t("city")} *
                      </label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="notes" className="block text-xs font-semibold text-muted-foreground mb-1.5">
                        {t("notes")}
                      </label>
                      <Textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
                >
                  {isSubmitting ? "…" : (
                    <>
                      {t("submitOrder")}
                      <ArrowRight className="ms-2 w-4 h-4 rtl:rotate-180" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-5">
              <div className="bg-muted/30 border rounded-xl p-6 lg:sticky lg:top-32">
                <h2 className="font-bold text-lg mb-6">{t("orderSummary")}</h2>

                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.productId} className="flex gap-3">
                      <div className="w-14 h-14 bg-muted/50 rounded border overflow-hidden shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {t("quantity")}: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-medium">{fmtPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-3 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("subtotal")}</span>
                    <span className="font-medium">{fmtPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("shipping")}</span>
                    <span className="font-medium">
                      {shipping === 0 ? t("free") : fmtPrice(shipping)}
                    </span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 flex justify-between font-bold text-lg">
                  <span>{t("total")}</span>
                  <span className="text-primary">{fmtPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Checkout;
