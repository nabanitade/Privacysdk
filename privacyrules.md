### Privacy-rule coverage in GitLab — plain list view

**A. Ready “out of the box” with GitLab built-ins**

1. **No secrets in source** – enable *Secrets Detection* job.
2. **Unknown SDK / un-reviewed package blocker** – run *Dependency Scanning* + *License Compliance* with an allow-list.
3. **Dependency CVE / “privacy CVE” check** – rely on *Dependency Scanning* to fail MRs with high-severity vulnerabilities.

---

**B. Easy wins with custom Semgrep or CodeQL rules**

4. **PII / PHI naming guard** – regex or NLP match on sensitive field names.
5. **Explicit consent marker** – require `@consent_required` (or similar) before any data-capture call.
6. **Least-privilege field set** – flag new DB columns not referenced elsewhere.
7. **Encryption-at-rest enforcement** – catch writes to sensitive tables without `encrypt()` (or ORM flag).
8. **Retention-timer enforcement** – ensure queries to retained tables are paired with a deletion/TTL call.
9. **Hash or tokenize unique IDs** – block raw e-mail/phone identifiers as primary keys.
10. **Sensitive-payload flow check** – taint-mode rule: PII source → sink must pass a `mask()/anonymize()` helper.
11. **TLS-only outbound traffic** – forbid `http://` when tainted data is sent.
12. **Approved-endpoint allow-list** – outbound URLs must appear in `SAFE_HOSTS.yaml`.
13. **No raw PII in logs** – prohibit `logger.*` calls with tainted variables.
14. **Stack-trace sanitizer** – flag `printStackTrace()` / `traceback.print_exc()` without scrubbing.
15. **Ad / tracking code blockers** – detect pixels / ad-SDK imports on pages with `consent=opt_out`.
16. **Field-level access scoping** – GraphQL/REST PII fields must include an `@scope` directive.
17. **Rate-limit enforcement** – public endpoints returning personal data must call `apply_rate_limit()`.
18. **DSAR-compliance hook** – new personal-data writes must invoke `register_dsar()`.
19. **Purpose-limitation tag** – every new PII field needs a `data_purpose=` annotation.

---

**C. Possible, but heavier data-flow or context required**

20. **Data minimisation in ML pipelines** – ensure training jobs don’t load unused sensitive columns.
21. **Join-safety rule** – block joins between large PII tables unless the join key is pseudonymised.
22. **Region-lock enforcement** – detect cloud-SDK calls that ship EU data outside the EEA.
23. **PII-level trace-sampling guard** – static analysis can’t see runtime sampling; needs observability hooks.
24. **Versioned privacy contract** – diff API schemas across MRs and require a version bump when PII fields change.
25. **Profiling opt-out check** – verify that `profiling_disabled=true` users are excluded from scoring models.

---

**Roll-out tips**

* **Start** with the turnkey scanners (items 1-3).
* **Add** a Semgrep job and incrementally import the “easy-win” rules (items 4-19), beginning with warnings.
* **Gate merges** using Security Approval Policies once false positives are under control.
* **Tackle** the heavy rules (items 20-25) later or with runtime observability tooling if static analysis proves noisy.
