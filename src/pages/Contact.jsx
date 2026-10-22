
import { Link } from "react-router-dom";
import {
  FileText,
  Languages,
  BookOpen,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Type,
  Zap,
  Heart,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Text Editor",
    description:
      "Transform and refine your text with uppercase, lowercase, title case, sentence case, reverse text, find and replace, and more.",
    link: "/",
    linkText: "Explore text tools",
    number: "01",
  },
  {
    icon: Languages,
    title: "Language Translator",
    description:
      "Translate text between supported languages with a simple interface that makes communicating across languages easier.",
    link: "/translator",
    linkText: "Start translating",
    number: "02",
  },
  {
    icon: BookOpen,
    title: "English Dictionary",
    description:
      "Discover word meanings, pronunciations, example sentences, synonyms, and antonyms to understand words in context.",
    link: "/dictionary",
    linkText: "Explore the dictionary",
    number: "03",
  },
];

const benefits = [
  "Essential text tools in one place",
  "A clean and easy-to-use interface",
  "Quick access to everyday language utilities",
  "Useful for writing, learning, and communication",
];

export default function About() {
  return (
    <main className="min-h-screen bg-[#F8FAF9] text-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200/70">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#DCEFEA] opacity-70 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-teal-100/60 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-700 text-white shadow-lg shadow-teal-900/10">
              <Languages size={32} strokeWidth={1.8} />
            </div>

            <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/80 px-4 py-2 text-sm font-medium text-teal-800">
              <Sparkles size={15} />
              Welcome to Textora
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Words, made{" "}
              <span className="text-teal-700">easier.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Textora brings writing tools, language translation, and
              word discovery together in one simple workspace. Everything
              you need to work with words, all in one place.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-teal-800"
              >
                Explore Textora
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/translator"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:border-teal-300 hover:bg-teal-50"
              >
                Try Translator
                <Languages size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 md:grid-cols-2 md:items-center">
        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
            About the project
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            One workspace.
            <br />
            More ways with words.
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Everyday writing and language tasks often mean switching
            between different websites and tools. Textora brings
            essential utilities together to make those tasks simpler
            and more convenient.
          </p>

          <p className="mt-4 leading-8 text-slate-600">
            Whether you are cleaning up a paragraph, translating a
            message, or checking the meaning of an unfamiliar word,
            Textora gives you a straightforward place to get started.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#DCEFEA] text-teal-800">
              <Type size={22} />
            </div>
            <div>
              <h3 className="font-bold">The Textora experience</h3>
              <p className="text-sm text-slate-500">
                Practical tools, simple workflows
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-3">
                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0 text-teal-700"
                />
                <p className="text-sm leading-6 text-slate-600 sm:text-base">
                  {benefit}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-[#F0F7F5] p-5">
            <p className="text-lg font-semibold text-slate-800">
              Write. Translate. Learn.
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Three simple ways to make working with words easier.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-slate-200/70 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
              What you can do
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything starts with words
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Explore the tools that make up the Textora experience.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="group flex flex-col rounded-2xl border border-slate-200 bg-[#F8FAF9] p-6 transition duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg hover:shadow-teal-900/5 sm:p-7"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#DCEFEA] text-teal-800 transition group-hover:bg-teal-700 group-hover:text-white">
                      <Icon size={24} />
                    </div>

                    <span className="text-sm font-semibold tracking-wider text-slate-300">
                      {feature.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600 sm:text-base">
                    {feature.description}
                  </p>

                  <Link
                    to={feature.link}
                    className="mt-6 inline-flex items-center gap-2 font-semibold text-teal-800 transition hover:text-teal-900"
                  >
                    {feature.linkText}
                    <ArrowRight
                      size={17}
                      className="transition group-hover:translate-x-1"
                    />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="overflow-hidden rounded-3xl bg-slate-900 px-6 py-12 text-white sm:px-12 sm:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-teal-300">
              <Zap size={25} />
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Simple by design.
              <br />
              Useful by purpose.
            </h2>

            <p className="mt-5 leading-8 text-slate-300">
              Textora is built around a simple idea: useful tools
              should be easy to find and straightforward to use.
              A clean interface and focused features help keep
              your attention on what matters—your words.
            </p>

            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
              <Heart size={16} className="text-teal-300" />
              Made for everyday writing and learning
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-slate-200/70 bg-[#F0F7F5]">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8 sm:py-20">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to get started?
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
            Edit your text, explore a new language, or discover
            the meaning behind a word. Your next task starts here.
          </p>

          <Link
            to="/"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-7 py-3.5 font-semibold text-white shadow-sm transition hover:bg-teal-800"
          >
            Start using Textora
            <ArrowRight size={18} />
          </Link>

          <p className="mt-6 text-sm font-medium tracking-wide text-slate-500">
            Textora · Write. Translate. Learn.
          </p>
        </div>
      </section>
    </main>
  );
}
