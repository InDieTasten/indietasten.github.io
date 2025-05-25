import { Container } from "@/components/Container";
import { GitHubIcon, StravaIcon } from "@/components/SocialIcons";
import Link from "next/link";

function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 transition fill-zinc-400 group-hover:fill-zinc-300" />
    </Link>
  )
}

export default function Index() {
  return (
    <Container className="mt-9">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-zinc-100">
          Open Sourcerer. Gamer. Runner.
        </h1>
        <p className="mt-6 text-base text-zinc-400">
          I’m Max, a software developer based in Osnabrück, Germany.
          I love tinkering with code and automating annoying things in life.
          In my free time, I enjoy running and gaming.
        </p>
        <div className="mt-6 flex gap-6">
          <SocialLink
            href="https://github.com/InDieTasten"
            aria-label="Follow on GitHub"
            icon={GitHubIcon}
          />
          <SocialLink
            href="https://www.strava.com/athletes/93088631"
            aria-label="Follow on Strava"
            icon={StravaIcon}
          />
        </div>
      </div>
    </Container>
  );
}
