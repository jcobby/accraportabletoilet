"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CircleHelp,
  Copy,
  MapPin,
  PackageCheck,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useForm, useWatch, type FieldPath } from "react-hook-form";
import { toast } from "sonner";

import { WhatsAppIcon } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formatCedis } from "@/lib/format";
import {
  buildQuoteMessage,
  contactMethods,
  eventTypes,
  extras,
  NOT_SURE,
  quoteDefaults,
  quoteSchema,
  type QuoteValues,
} from "@/lib/quote";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { Unit } from "@/types";

type StepFields = FieldPath<QuoteValues>[];

const stepMeta = [
  { title: "Your event", hint: "When it is and how big", icon: CalendarDays },
  { title: "What you need", hint: "Units and extras", icon: PackageCheck },
  { title: "Where", hint: "Town and venue", icon: MapPin },
  { title: "Your details", hint: "How we reach you", icon: UserRound },
];

const stepFields: StepFields[] = [
  ["eventType", "eventDate", "days", "guests"],
  ["unitSlugs", "extraIds"],
  ["city", "venue"],
  ["name", "phone", "email", "contactMethod", "notes"],
];

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1.5 text-xs font-medium text-destructive">
      {message}
    </p>
  );
}

export function QuoteForm({
  units,
  initialUnits = [],
  initialGuests,
}: {
  units: Unit[];
  /** Preselected from a fleet page or from the sizing calculator's result. */
  initialUnits?: string[];
  initialGuests?: number;
}) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState<string | null>(null);

  const form = useForm<QuoteValues>({
    resolver: zodResolver(quoteSchema),
    mode: "onTouched",
    defaultValues: {
      ...quoteDefaults,
      unitSlugs: initialUnits,
      ...(initialGuests ? { guests: initialGuests } : {}),
    } as QuoteValues,
  });

  const {
    control,
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = form;

  const unitNameFor = useMemo(() => {
    const lookup = new Map(units.map((unit) => [unit.slug, unit.name]));
    return (slug: string) =>
      slug === NOT_SURE ? "Not sure yet — please advise" : (lookup.get(slug) ?? slug);
  }, [units]);

  const selectedUnits = useWatch({ control, name: "unitSlugs" }) ?? [];
  const selectedExtras = useWatch({ control, name: "extraIds" }) ?? [];
  const eventType = useWatch({ control, name: "eventType" });
  const contactMethod = useWatch({ control, name: "contactMethod" });

  function toggle(field: "unitSlugs" | "extraIds", value: string, checked: boolean) {
    const current = (form.getValues(field) ?? []) as string[];
    let next = checked ? [...current, value] : current.filter((item) => item !== value);

    // "Not sure yet" is mutually exclusive with picking specific units.
    if (field === "unitSlugs") {
      if (checked && value === NOT_SURE) next = [NOT_SURE];
      else if (checked) next = next.filter((item) => item !== NOT_SURE);
    }

    setValue(field, next, { shouldValidate: true, shouldDirty: true });
  }

  async function nextStep() {
    const valid = await trigger(stepFields[step], { shouldFocus: true });
    if (!valid) return;
    setStep((current) => Math.min(current + 1, stepMeta.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function previousStep() {
    setStep((current) => Math.max(current - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function onSubmit(values: QuoteValues) {
    const message = buildQuoteMessage(values, unitNameFor);
    setSubmitted(message);
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ---------- Success ----------
  if (submitted) {
    return (
      <div className="rounded-2xl border bg-card p-8 text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-brand-soft text-brand">
          <Check className="size-7" aria-hidden />
        </span>
        <h2 className="mt-5 font-heading text-2xl font-bold">Your request is ready to send</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          WhatsApp should have opened with your details filled in — press send and we will take it
          from there. If nothing opened, copy the summary below.
        </p>

        <pre className="mt-6 overflow-x-auto rounded-xl border bg-secondary/60 p-5 text-left font-mono text-xs leading-relaxed whitespace-pre-wrap text-foreground">
          {submitted}
        </pre>

        <div className="mt-6 flex flex-col justify-center gap-2.5 sm:flex-row">
          <Button
            type="button"
            className="h-11 px-5"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(submitted);
                toast.success("Summary copied");
              } catch {
                toast.error("Could not copy — select the text and copy it manually");
              }
            }}
          >
            <Copy aria-hidden />
            Copy summary
          </Button>
          <a
            href={whatsappLink(submitted)}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline" }), "h-11 px-5")}
          >
            <WhatsAppIcon className="size-4 text-[#25D366]" />
            Open WhatsApp again
          </a>
          <Link href="/" className={cn(buttonVariants({ variant: "ghost" }), "h-11 px-5")}>
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  // ---------- Form ----------
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Stepper */}
      <ol className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stepMeta.map((meta, index) => {
          const state = index === step ? "current" : index < step ? "done" : "todo";
          return (
            <li
              key={meta.title}
              aria-current={state === "current" ? "step" : undefined}
              className={cn(
                "rounded-xl border p-3 transition-colors",
                state === "current" && "border-brand bg-brand-soft",
                state === "done" && "border-brand/30 bg-brand-soft/50",
                state === "todo" && "bg-card",
              )}
            >
              <span
                className={cn(
                  "flex size-7 items-center justify-center rounded-lg text-xs font-bold",
                  state === "todo" ? "bg-secondary text-muted-foreground" : "bg-brand text-white",
                )}
              >
                {state === "done" ? <Check className="size-3.5" aria-hidden /> : index + 1}
              </span>
              <p className="mt-2 text-xs font-semibold">{meta.title}</p>
              <p className="text-[0.7rem] text-muted-foreground">{meta.hint}</p>
            </li>
          );
        })}
      </ol>

      <div className="mt-8 rounded-2xl border bg-card p-6 sm:p-8">
        {/* ---------- Step 1 ---------- */}
        {step === 0 ? (
          <fieldset>
            <legend className="font-heading text-xl font-bold">Tell us about the event</legend>
            <p className="mt-1.5 text-sm text-muted-foreground">
              This is enough for us to check availability and size the order.
            </p>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="eventType">What kind of event is it?</Label>
                <Select
                  value={eventType ?? null}
                  onValueChange={(value) =>
                    setValue("eventType", value as QuoteValues["eventType"], {
                      shouldValidate: true,
                    })
                  }
                >
                  <SelectTrigger id="eventType" className="mt-2 h-11 w-full">
                    <SelectValue placeholder="Choose one" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError message={errors.eventType?.message} />
              </div>

              <div>
                <Label htmlFor="eventDate">Event date</Label>
                <Input id="eventDate" type="date" className="mt-2 h-11" {...register("eventDate")} />
                <FieldError message={errors.eventDate?.message} />
              </div>

              <div>
                <Label htmlFor="days">How many days?</Label>
                <Input
                  id="days"
                  type="number"
                  min={1}
                  className="mt-2 h-11"
                  {...register("days", { valueAsNumber: true })}
                />
                <FieldError message={errors.days?.message} />
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="guests">Roughly how many guests?</Label>
                <Input
                  id="guests"
                  type="number"
                  min={1}
                  placeholder="e.g. 300"
                  className="mt-2 h-11"
                  {...register("guests", { valueAsNumber: true })}
                />
                <p className="mt-1.5 text-xs text-muted-foreground">
                  An estimate is fine — we size on headcount, so being roughly right matters more
                  than being exact.
                </p>
                <FieldError message={errors.guests?.message} />
              </div>
            </div>
          </fieldset>
        ) : null}

        {/* ---------- Step 2 ---------- */}
        {step === 1 ? (
          <fieldset>
            <legend className="font-heading text-xl font-bold">What do you need?</legend>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Pick anything that looks right — or tell us you are not sure and we will advise.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {units.map((unit) => {
                const checked = selectedUnits.includes(unit.slug);
                return (
                  <label
                    key={unit.slug}
                    className={cn(
                      "flex cursor-pointer gap-3 rounded-xl border p-4 transition-colors",
                      checked ? "border-brand bg-brand-soft" : "hover:border-brand/40",
                    )}
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={(value) => toggle("unitSlugs", unit.slug, Boolean(value))}
                      className="mt-0.5"
                    />
                    <span>
                      <span className="block text-sm font-semibold">{unit.name}</span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {unit.capacity}
                      </span>
                      <span className="mt-1.5 block text-xs font-medium text-brand">
                        {unit.pricing.perDay === null
                          ? "Price on request"
                          : `from ${formatCedis(unit.pricing.perDay)} / day`}
                      </span>
                    </span>
                  </label>
                );
              })}

              <label
                className={cn(
                  "flex cursor-pointer gap-3 rounded-xl border border-dashed p-4 transition-colors sm:col-span-2",
                  selectedUnits.includes(NOT_SURE)
                    ? "border-brand bg-brand-soft"
                    : "hover:border-brand/40",
                )}
              >
                <Checkbox
                  checked={selectedUnits.includes(NOT_SURE)}
                  onCheckedChange={(value) => toggle("unitSlugs", NOT_SURE, Boolean(value))}
                  className="mt-0.5"
                />
                <span>
                  <span className="flex items-center gap-1.5 text-sm font-semibold">
                    <CircleHelp className="size-4 text-brand" aria-hidden />
                    Not sure yet — please advise
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    We will work out the mix from your headcount and programme length.
                  </span>
                </span>
              </label>
            </div>
            <FieldError message={errors.unitSlugs?.message} />

            <h3 className="mt-8 font-heading text-base font-bold">Anything else?</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {extras.map((extra) => {
                const checked = selectedExtras.includes(extra.id);
                return (
                  <label
                    key={extra.id}
                    className={cn(
                      "flex cursor-pointer gap-3 rounded-xl border p-4 transition-colors",
                      checked ? "border-brand bg-brand-soft" : "hover:border-brand/40",
                    )}
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={(value) => toggle("extraIds", extra.id, Boolean(value))}
                      className="mt-0.5"
                    />
                    <span>
                      <span className="block text-sm font-semibold">{extra.label}</span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {extra.hint}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ) : null}

        {/* ---------- Step 3 ---------- */}
        {step === 2 ? (
          <fieldset>
            <legend className="font-heading text-xl font-bold">Where are we delivering?</legend>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Delivery within Accra and Tema is included. Anywhere else is quoted on road time.
            </p>

            <div className="mt-7 grid gap-5">
              <div>
                <Label htmlFor="city">Town or city</Label>
                <Input
                  id="city"
                  placeholder="e.g. Accra"
                  className="mt-2 h-11"
                  {...register("city")}
                />
                <FieldError message={errors.city?.message} />
              </div>

              <div>
                <Label htmlFor="venue">Venue or nearest landmark</Label>
                <Input
                  id="venue"
                  placeholder="e.g. Alisa Hotel lawn, North Ridge"
                  className="mt-2 h-11"
                  {...register("venue")}
                />
                <p className="mt-1.5 text-xs text-muted-foreground">
                  A landmark helps our driver find the spot without calling you on the day.
                </p>
                <FieldError message={errors.venue?.message} />
              </div>
            </div>
          </fieldset>
        ) : null}

        {/* ---------- Step 4 ---------- */}
        {step === 3 ? (
          <fieldset>
            <legend className="font-heading text-xl font-bold">How do we reach you?</legend>
            <p className="mt-1.5 text-sm text-muted-foreground">
              We usually respond the same working day.
            </p>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Your name</Label>
                <Input id="name" className="mt-2 h-11" {...register("name")} />
                <FieldError message={errors.name?.message} />
              </div>

              <div>
                <Label htmlFor="phone">Phone number</Label>
                <Input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  placeholder="e.g. 024 000 0000"
                  className="mt-2 h-11"
                  {...register("phone")}
                />
                <FieldError message={errors.phone?.message} />
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="email">Your email (optional)</Label>
                <Input id="email" type="email" className="mt-2 h-11" {...register("email")} />
                <FieldError message={errors.email?.message} />
              </div>

              <div className="sm:col-span-2">
                <Label>Best way to reach you</Label>
                <RadioGroup
                  value={contactMethod ?? "WhatsApp"}
                  onValueChange={(value) =>
                    setValue("contactMethod", value as QuoteValues["contactMethod"], {
                      shouldValidate: true,
                    })
                  }
                  className="mt-2 grid gap-3 sm:grid-cols-3"
                >
                  {contactMethods.map((method) => (
                    <label
                      key={method}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm font-medium transition-colors",
                        contactMethod === method
                          ? "border-brand bg-brand-soft"
                          : "hover:border-brand/40",
                      )}
                    >
                      <RadioGroupItem value={method} />
                      {method}
                    </label>
                  ))}
                </RadioGroup>
                <FieldError message={errors.contactMethod?.message} />
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="notes">Anything else we should know? (optional)</Label>
                <Textarea
                  id="notes"
                  rows={4}
                  placeholder="Access, ground conditions, timings, whether there is power on site…"
                  className="mt-2"
                  {...register("notes")}
                />
                <FieldError message={errors.notes?.message} />
              </div>
            </div>

            <p className="mt-6 rounded-xl bg-secondary/60 p-4 text-xs leading-relaxed text-muted-foreground">
              Pressing send opens WhatsApp with this summary filled in — you stay in control of the
              message. Nothing is stored on this website.
            </p>
          </fieldset>
        ) : null}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between gap-3 border-t pt-6">
          <Button
            type="button"
            variant="ghost"
            className="h-11 px-5"
            onClick={previousStep}
            disabled={step === 0}
          >
            <ArrowLeft aria-hidden />
            Back
          </Button>

          {step < stepMeta.length - 1 ? (
            <Button type="button" className="h-11 px-6 text-sm font-semibold" onClick={nextStep}>
              Continue
              <ArrowRight aria-hidden />
            </Button>
          ) : (
            <Button type="submit" className="h-11 px-6 text-sm font-semibold">
              <WhatsAppIcon className="size-4" />
              Send my request
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
