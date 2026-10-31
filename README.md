# HomeConstruction interface study

A fictional construction-site interface built with React, TypeScript, Vite,
and the existing charcoal/green visual design. It is not an operating builder.

## What works

- Local page navigation, package/add-on selection, and illustrative calculations.
- Gallery and review layouts containing sample content, not client evidence.
- Contact and quote form previews that do not send or request anything.
- A downloadable text example generated from the same fictional timeline data.
- A call-planner selection preview, not booking, email, calendar integration,
  provider availability, or a real appointment.

Use sample details only. Form values are held in page memory; no delivery or
response time is promised. Prices, schedules, warranties, reviews, and project
descriptions are illustrative. No contractor license, coverage, physical office,
business inbox, telephone, or social account is verified or connected.

The prototype is marked `noindex` so it is not advertised as a real service.
Privacy and usage pages describe the prototype rather than inventing business
contracts, payment terms, financing, or tracking practices.

## Development and validation

```sh
npm ci
npm run dev
npm run build
npm run lint
npm run test:safety
```

The root-hosted build uses absolute asset paths. `vercel.json` supplies the SPA
fallback for direct page URLs on the existing project. Deployment ownership
must be verified before release; do not create or rebind a hosting project to
make a command succeed.

The existing production endpoint is https://homeconstruction-site.vercel.app.
The custom `.site` hosts did not resolve during release verification. They need
DNS configuration at their current provider before being advertised as live;
this release does not change DNS or claim a domain renewal.

Safety tests transpile the edited components and exercise form handlers with
isolated browser/module mocks. They do not verify provider delivery or replace
an actual browser check.

Phone layouts use normal page flow rather than scroll pinning. Desktop panel
animations run only when reduced motion is not requested and clean up on resize.

Editor inspection is excluded from production builds and previews. To opt in
locally, set `ENABLE_VISUAL_EDITS=1` in the shell before running the dev server.

## Rights and limits

Image provenance and reuse rights need owner review. Dependency and third-party
notices must be preserved. No blanket application license or third-party asset
grant is established by this README. The forms' local behavior is not a claim
that hosting logs, network services, or the whole application passed a security
or privacy audit.
