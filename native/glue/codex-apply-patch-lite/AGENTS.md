# CODEX APPLY PATCH LITE KNOWLEDGE

## OVERVIEW
Specialized Rust crate for parsing, verifying, and applying Codex-style patches. Folder is `codex-apply-patch-lite`; package/crate name is `codex-apply-patch`.

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Public API | `src/lib.rs` | Exports parser, verification, standalone main, instructions. |
| Patch grammar | `src/parser.rs` | Parser hotspot with unit tests. |
| Streaming parser | `src/streaming_parser.rs` | Stateful incremental parse logic with tests. |
| Fuzzy matching | `src/seek_sequence.rs` | Helper logic with tests. |
| Invocation parsing | `src/invocation.rs` | Shell/heredoc/apply_patch command verification. |
| Tool instructions | `apply_patch_tool_instructions.md` | Authoritative patch format guidance. |

## CONVENTIONS
- Keep `lib.rs` as the API/export surface; move algorithmic changes into focused modules.
- Preserve absolute-path handling in `ApplyPatchAction` and verification code.
- Unit tests are inline in parser modules; add edge-case tests near changed parsing logic.
- This crate depends on Codex path crates via the native workspace; preserve upstream compatibility notes.

## ANTI-PATTERNS
- Do not make parser behavior changes without tests in `parser.rs`, `streaming_parser.rs`, or `seek_sequence.rs` as appropriate.
- Do not conflate this folder name with the crate name in cargo commands.
- Do not bypass `verify_apply_patch_args` / `maybe_parse_apply_patch_verified` for invocation semantics.

## COMMANDS
From `native/`:
```bash
cargo test -p codex-apply-patch
```
