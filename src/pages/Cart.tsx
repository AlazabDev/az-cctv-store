import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, Trash2, Truck, Shield } from "lucide-react";
import { Layout } from "@/components/Layout";
import { QuantitySelector } from "@/components/QuantitySelector";
import { useCart } from "@/hooks/useCart";
import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

const Cart = () => {
  const { items, updateQuantity, removeItem, getSubtotal } = useCart();
  const { fmtPrice, t } = useLanguage();
  const subtotal = getSubtotal();
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container-narrow py-28 text-center">
          <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-muted-foreground/30" />
          <h1 className="text-3xl font-bold mb-4">{t("bagEmpty")}</h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">{t("bagEmptyText")}</p>
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

  return (
    <Layout>
      <div className="container-full py-10">
        <h1 className="text-3xl font-bold tracking-tight mb-10">{t("bag")}</h1>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-7">
            <div className="space-y-0">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-5 py-6 border-b border-border">
                  <Link
                    to={`/product/${item.productId}`}
                    className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-lg overflow-hidden bg-muted/30 border"
                  >
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-contain p-1.5"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col">
                    <div className="flex-1">
                      <Link
                        to={`/product/${item.productId}`}
                        className="font-medium text-sm md:text-base hover:text-primary transition-colors line-clamp-2"
                      >
                        {item.name}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-1">{item.brand}</p>
                      <p className="font-bold text-primary mt-2">{fmtPrice(item.price)}</p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <QuantitySelector
                        quantity={item.quantity}
                        onQuantityChange={(qty) => updateQuantity(item.productId, qty)}
                        min={1}
                        max={99}
                      />
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                        title={t("remove")}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180 rtl:rotate-0" />
              {t("continueShopping")}
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-muted/30 border rounded-xl p-6 lg:sticky lg:top-32">
              <h2 className="font-bold text-lg mb-6">{t("orderSummary")}</h2>

              <div className="space-y-3 mb-6 text-sm">
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

              <div className="border-t border-border pt-4 mb-6 flex justify-between font-bold text-lg">
                <span>{t("total")}</span>
                <span className="text-primary">{fmtPrice(total)}</span>
              </div>

              <Button
                asChild
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
              >
                <Link to="/checkout">{t("checkout")}</Link>
              </Button>

              <div className="mt-6 pt-4 border-t border-border grid grid-cols-2 gap-3 text-[11px] text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-accent" />
                  <span>{t("shippingText")}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-accent" />
                  <span>{t("returnsText")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
