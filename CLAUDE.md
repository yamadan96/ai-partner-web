# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important

- **ALL** instructions within this document **MUST BE FOLLOWED** unless explicitly specified as optional.
- **ASK FOR CLARIFICATION** if you find unclear anything in this document and related documents as well as my command descriptions.
- Think in **English**, and answer in **Japanese**

## Skills and Capabilities

- You are very skilled senior engineer.

## Working Philosophy

- Think step by step deeply.
- When you solve tasks, devide them and start from a small step.
- After updating codes, consider side effects by looking at other files
- Make sure to keep code clean. Uneccessary codes including methods and functions should be removed.

## Project Structure

**Note**: Before you tackle your tasks, read codes carefully and understand the whole structure of the project.

## Package Management Guides

**Important**: Always use **`uv`** with `pyproject.toml`, never **`pip`**.

Frequently used commands:

- add a new package: `uv add <package-name>`
  - e.g. `uv add pandas`
  - If the package is used only in development, use the `--dev` option.
- update the project's environment: `uv sync`
- remove dependencies from the project and the environment: `uv remove <package-name>`
  - e.g. `uv remove pandas`

For more commands, please refer to manual from `uv -h`

## Code quality Guides

- You have to use **`ruff` through `uv`** to update code quality through linters and formatters.
- All the setting is writtin in `pyproject.toml`.

Frequently used commands:

- find linting errors: `uv run ruff check`
- find linting errors and fix them: `uv run ruff check --fix`
- format codes: `uv run ruff format`
- only check format: `uv run ruff format --check`

## Code Style Guides

- Follow the existing coding style as much as possible when you generate code.
- When you write scripts, basically use existing packages. If they don't meet your expectation, update packages instead of create something new in your scripts.

### Architecture

- Do not make architecture and code complicated, keep small and simple.
- If an incorrect or unintended format is passed, please ensure it **fails fast** by raising an error, rather than using default values, in accordance with the **Principle of Least Astonishment**.
- Construct **loosely coupled**, **highly cohesive** architecture.
- Follow packaging principles:
  - **Reuse-Release Equivalent Principle**
  - **Common Reuse Principle**
  - **Common Closure Principle**
  - **Acyclic Dependencies Principle**
  - **Stable Dependencies Principle**
  - **Stable Abstractions Principle**
- Follow **object oriented programming** paradigm.
  - Follow **SOLID principles**.
  - Follow **DRY principle**.
  - Follow **DI principle**.
  - Prefer **value object**.
  - Prefer **Composition Pattern**.
- Never do hard coding.

### Python Style Guide

- Make sure to follow **Pyright** Style.
- Path handling: Prefer `pathlib.Path` instead of `os.path`
- Be strict to type.
- Latest `typing` is perffered. e.g. `int | None` instead of `Optional[int]`, `list[str]` instead of `List[str], and so on.`
- Debugging: USE `logging` instead of `print`
- Error handling: Use specific exceptions with context messages and proper logging
- Type consistency: Leverage `pydantic` as well as `typing` effectively.
- Experiment configuration: use YAML file for experiment setting
- Do NOT use `cast` for type safety.
- USE **`omegaconf`** rather than `pyyaml`.
- Only when you can't cope with type errors due to the reasons such as library issues (e.g. pandas), you can use ignore them with comment out `# pyright: ignore`.
  - Please specify the error type such as `# pyright: ignore[reportOptionalSubscript]`
  - Never use `# type: ignore`.

## Operation Guides

### Git/Github

- Always fix lint error and format with `ruff` on related files before push changes.

## Dependency and Package Management

- When you import package, make sure they are installed in the environment.

## Script Execution

- When you run scripts, make sure to use `uv` (e.g. `uv run hello.py` instead of `python3 hello.py`)

<!-- claude --dangerously-skip-permissions -->
