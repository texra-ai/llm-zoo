An automated review found blocking issues on this PR (opened by the
daily model updater, on branch `<HEAD_BRANCH>`). Read the unresolved
feedback: `gh api repos/<REPOSITORY>/pulls/<PR_NUMBER>/comments` for
inline review comments and `gh api repos/<REPOSITORY>/pulls/<PR_NUMBER>/reviews`
for the review summary.

For each unresolved point: either fix it — re-verify the disputed
field against the provider's official pricing/model docs with
WebSearch/WebFetch — or, if you believe the reviewer is wrong, reply
on the PR via `gh pr comment` explaining why and leave that entry
unchanged. Do not touch unrelated entries.

After fixing, run `npm run typecheck` and `npm run build` and make
sure both pass. Commit with a message starting with
`[claude-review-fix]` and push to this branch (already checked out).
