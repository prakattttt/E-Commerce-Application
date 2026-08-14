import { motion } from "framer-motion";
import { Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { fadeUp } from "../../../animations";

const ContactInfo = () => {
  return (
    <motion.div variants={fadeUp} className="space-y-5">
      {/* Quick Contact */}
      <div className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <h2 className="font-display text-lg font-bold sm:text-xl">
          Quick Contact
        </h2>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Prefer reaching us directly?
        </p>

        <div className="mt-6 space-y-5">
          <a
            href="mailto:support@shopsphere.com"
            className="group flex min-w-0 items-center gap-4"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
              <Mail size={18} />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Email</p>

              <p className="truncate text-sm font-semibold">
                support@shopsphere.com
              </p>
            </div>
          </a>

          <a
            href="tel:+9779800000000"
            className="group flex items-center gap-4"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
              <Phone size={18} />
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Phone</p>

              <p className="text-sm font-semibold">+977 9800000000</p>
            </div>
          </a>

          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <MapPin size={18} />
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Location</p>

              <p className="text-sm font-semibold">Kathmandu, Nepal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Response Times */}
      <div className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
            <Clock3 size={18} />
          </div>

          <div>
            <h2 className="font-display font-bold">Response Times</h2>

            <p className="text-xs text-muted-foreground">We're here to help</p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <div className="flex flex-col gap-2 border-b border-border pb-3 xs:flex-row xs:items-center xs:justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 shrink-0 rounded-full bg-success" />

              <span className="text-sm">Customer Support</span>
            </div>

            <span className="text-xs font-semibold text-muted-foreground">
              Within 4 hours
            </span>
          </div>

          <div className="flex flex-col gap-2 xs:flex-row xs:items-center xs:justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />

              <span className="text-sm">General Queries</span>
            </div>

            <span className="text-xs font-semibold text-muted-foreground">
              Within 24 hours
            </span>
          </div>
        </div>
      </div>

      {/* Order Support */}
      <div className="rounded-3xl bg-primary p-5 text-primary-foreground shadow-sm sm:p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground/15">
          <MessageCircle size={19} />
        </div>

        <h2 className="mt-4 font-display text-base font-bold sm:text-lg">
          Need help with an order?
        </h2>

        <p className="mt-2 text-sm leading-6 text-primary-foreground/75">
          Keep your order number nearby so our support team can help you faster.
        </p>
      </div>
    </motion.div>
  );
};

export default ContactInfo;
