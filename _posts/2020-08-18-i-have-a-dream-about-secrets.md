---
layout: default
title: "I have a dream(rant) about secrets in repositories"
categories: git secrets deployment
---

# I have a ~~dream~~ rant about secrets in repositories

TL DR: Please don't put them there

## What?

I've been working in the software development business professionally for 5 years now, all at one company.
We have yet to "discover" open source. We heavily use OSS, but have nothing up of our own stuff.
That may be the reason why nobody so far has ever questioned putting secrets into the git repository.

That would be one of the first lessons, when pushing anything into a public repository.
No secrets. It's that simple.


## Why not?

For public repositories, I think it should be fairly obvious, that putting secrets there is a bad idea.

But even for private repos, there is always a chance of leaking the repo. A quick clone on some machine.
Drive may not be encrypted and the device gets lost. Of course you forget, which repos have been cloned to that machine.
Nobody keeps track of that. I have probably 30 something repos on my dev machine.
The secrets on that single machine could potentially kill 10 or more production services we are running right now.

    appsettings.json => connection strings => sql db => drop

Or even worse, silently taking dumps and blackmailing us. The problem wouldn't be as bad, when secrets would rotate often.
But sadly, that's another problem we haven't touched. I am happy to see at least some passwords having 30+ bits of entropy.

Another problem is versioning. It might not come off as a huge problem, but the commit history is cluttered with our devops guy
commiting "config" over and over again, as he wants to trigger our continuous deployment with different settings in a trial and error manner.
It's a cool setup. We have branches for each environment, and you just have to merge into them, and as they update, they will be deployed.
It's cool as long as you go "forward". If you want to get back to a different version, or want to try a feature branch on some environment,
you will be faced with reverting commits, which is kinf of stupid, because then you'd have to revert the revert, if you were to ever test that
branch again. Resetting the branch would be better, but often people will branch off of these CD branches, so their branch will be infected with these broken config changes that way.

Also, any intern starting to set foot in one of the real projects requiring access to code,
will automatically be granted access to all of the environments secrets. Good stuff.

It's a mess.


## A vision for improvement

So what's my dream solution about?

Don't put secrets into the repository. Treat every repository, as if it was public.

What about that cool CI/CD pipeline we have going on?
Well, we can keep it. We just have to make some changes to it.

Have two build pipelines: Debug & Release

They are analogous to the build definitions Debug and Release.

Define your secrets in your Release pipelines.
Have a release pipeline for every environment.

Now you can use any build, and deploy it to any environment. No more config changes are tracked in the repo.
Having a hard to repro bug in production? Just deploy the Debug version there for some extra verbose error tracking for a couple minutes.

Want to test a feature branch? Select your preferred build definition. Select an environment, done.

As a bonus, you also have increase confidence,
that moving a code version from one environment to another won't introduce additional changes,
that may have happened in the target environment branch before.

Of couse you still need to communicate about who is putting what into which environment.
Unless you can dynamically provision new environments,
but that's a dream for another night.

### But what if the config schema changes?

That would break the pipelines, and that's good?

It's a great way to interpret semver for code, that nobody depends on.
If you develop a product with no exposed APIs,
it's a bit difficult to define what change would be breaking and therefor a major version increase.
But the configuration schema is kind of like an interface, that the application needs to support.

Whenever the config schema changes, or existing configs in your pipelines will break,
that's a major code version increase for your repository.

Now your repository is managing code only. Your commits can now focus on development.
No more "config". You don't have builds that only work for one environment.
You don't need to rebuild to move a code version from one environment to another.
You just deploy the same code with different config to the next environment.

    Code + Config = Release

And the intern can finally work on all them cool projects without seeing prod credentials.

A great time to be alive.

## Who is responsible for this mess?

Microsoft.

All the samples and project templates are generating configuration files ready for committing them.
The default VS .gitignore won't ignore appsettings.json and similar files.

# Discussion

Are you already living the dream?
Are there problems I haven't thought about?
Shoot me an issue on [GitHub](https://github.com/InDieTasten/indietasten.github.io/issues).
