# NATIVE RUST KNOWLEDGE

## OVERVIEW
Rust workspace for Codex-derived glue. Core/Gateway consume stable JSON/FFI contracts while Rust supplies mature programming-domain primitives.

## STRUCTURE
```
native/
├── Cargo.toml                 # workspace root
├── UPSTREAM.md                # Codex upstream and layering rules
├── rust-toolchain.toml        # declared Windows MSVC channel
└── glue/
    ├── code-native/           # `tinadec-code-native` JSON tool dispatcher
    ├── core-cdylib/           # Core-side C ABI exports
    ├── codex-exec-server-shim/# filesystem/executor shim
    └── codex-apply-patch-lite/# package name: `codex-apply-patch`
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Workspace members | `Cargo.toml` | Includes four glue crates; excludes `codex-src`. |
| Upstream policy | `UPSTREAM.md` | Record exact Codex commit before replacing stubs. |
| Native tool binary | `glue/code-native/src/main.rs` | Supports `execute` and `version`. |
| FFI surface | `glue/core-cdylib/src/lib.rs` | `tinadec_native_version`, guardian check, free string. |
| Apply patch | `glue/codex-apply-patch-lite/src/*` | Large parser/apply hotspot. |

## CONVENTIONS
- Rust is implementation source, not product layering. Core contracts stay stable.
- `code-native` advertises: `search_files`, `glob_search`, `read_file`, `list_directory`, `grep_content`, `apply_patch`, `sandbox_exec`, `review_format`.
- `code-native` version output hardcodes upstream commit `14953023471159aaed89f360c0f3da2346cb4bc0`.
- `native/Cargo.toml` patches `tokio-tungstenite` and `tungstenite` to OpenAI forks.
- Windows root npm scripts use `stable-x86_64-pc-windows-gnullvm` paths even though `rust-toolchain.toml` declares MSVC; prefer documented npm scripts for repo builds.

## ANTI-PATTERNS
- Do not edit `native/codex-src` as normal source; it is optional vendored upstream and gitignored.
- Do not change public Core/Gateway JSON contracts while swapping Rust internals.
- Do not assume folder name equals crate name: `codex-apply-patch-lite` package is `codex-apply-patch`.

## COMMANDS
```bash
npm run build:native
```

From `native/`:
```bash
cargo build --bin tinadec-code-native
cargo test -p codex-apply-patch
```
