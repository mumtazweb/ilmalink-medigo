# Unwanted URL Security Audit

Generated: 2026-06-27T19:48:15.260Z

## Summary

- Active blocked route files: 0
- Blocked internal links: 0
- Blocked generated search URLs: 0
- Blocked blog database slugs: 0
- Suspicious source text matches: 0

## Likely Entry Path

- Live indexed legacy URLs such as /russianmarket/ and /ultimateshop/ have no active App Router source files in the current repository, which points to stale indexing from an older deployment, previous static/template content, or external spam URLs rather than a current checked-in route.
- The removed /login/, /create-account/, /forgot-password/, /reset-password/, and /dashboard/ URLs came from the former public blog-authoring surface. They are now deleted from App Router source and forced to 410 by proxy.
- The repeatable audit should be run after content imports, database blog publishing, or route additions to catch blocked slugs before sitemap/search generation.

## Google Search Console Removals

Use `google-search-console-removals.txt` for the exact canonical URL list.
