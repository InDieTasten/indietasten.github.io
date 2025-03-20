---
title: "I have a dream about dynamic environment provisioning"
excerpt: "Learnings from pre-release madness"
date: "2020-10-16T00:00:00.000Z"
author:
  name: InDieTasten
  picture: "/assets/blog/authors/idt.jpeg"
tags: ["ci", "cd", "testing", "infrastructure"]
---

## The repeating annoyance of pre-release madness

Oftentimes when developing larger business applications in a larger team,
you run into problems as you get close to release dates.
You and your colleages finally merge all of their changes together,
it deploys to a test environment and something breaks.
Assuming you've all had a couple of bug fixes at the end of the sprint,
and with larger features just completing in time to be included for the release,
you are all left with a broken application the evening before release.
What to do?

You revert changes, deploy again and try again, as long as it's still broken.
Numerous deployments to testing reveal, that one of the many PRs broke the app.
But it's not obvious why. Somebody probably f_cked up a merge conflict.
Everything is merged together again, a couple other problems arise in the meantime,
but in the end, you scuff together a presentable version for next days sprint review and deployment.

While it did work out in the end, and everybody was working together
as a team to solve this challenge (funnily enough, it's a bonding experience that will be remembered),
I think it comes with a lot of unnecessary pain.

A good portion of the solution revolved around chopping up the changes into smaller pieces again
and to test intermediate revisions of the result.
Deploying these one after the other and testing these sequentially,
wastes a lot of time. A lot of the time is spent waiting for CI/CD pipelines.

## Make annoyance go bleh

I'd like to propose a different solution.
Be prepared for such incidents by having the ability to easily create additional environments.
Don't limit your testing by environments. Each PR could spin up an environment.
This could be be helpful to prevent a lot of issues.
Testers could be part of the PR review group testing specific PR changes.

This is even helpful for developers,
as you can now also quickly look at what the code is actually changing.
You get to see the result. Not just the source. Which can improve quality in many ways.
Oftentimes developers become blind to obvious design problems on web pages for example.
Having the resulting page visible as part of the PR would allow for "fast failing" in those areas.

If well integrated, automated E2E tests could be executed on those environments.
The flexibility gained by such a setup is really convenient.
It's also helping to increase confidence in your solution.
The ability to easily just create an instance isolated from
other environments would definitely help me sleep better.

It forces the team to invest thoughts into provisioning, deploying and seeding environments,
which are aspects of development that easily fall out of focus when time is running out in a sprint.
Schema migrations, seeding and similar issues are often at fault for final release day madness
and embarrassed team members.

## Caveats

Of course this will be a bit more expensive on your infrastructure resources.
You have to make sure to unprovision all these environments,
as soon as they are no longer required. Though that shouldn't be that big of a deal,
as accidentally removing one too many isn't a problem, as it can be recreated easily.

This also only really works, when you are able to
isolate the application from other systems you don't have control over / can't provision automatically.

Make sure not to forget continuous environments.
It's great if you can spin up different environments quickly,
but that doesn't help, if after every release you need to
recreate production because the data isn't compatible.
I assume it's necessary to still have permanent environments for testing too,
to make sure that your previous release version is updatable to your new version
with all it's "legacy" data.

Speaking of legacy data, don't forget to hydrate data storages with reasonable amounts of data comparable
to production systems proportional to the machine sizes you use.
If your API works great with 10 users and falls apart at 100,
you can't really release that to a production environment with 400.000 users.
This applies to all non-production environments though, even permanent ones,
as they often don't accumulate as much data as production environments.
So strictly speaking it's not a caveat of dynamic provisioning, but more a caveat of
"not changing code directly in production" which itself comes with a bunch of other more severe caveats IMO.


# Discussion

Do you have experience with this stuff?
How would you go about implementing this kind of integration and isolation?
Are there industry solutions out there doing this?
Let me know by shooting me an issue on
[GitHub](https://github.com/InDieTasten/indietasten.github.io).
