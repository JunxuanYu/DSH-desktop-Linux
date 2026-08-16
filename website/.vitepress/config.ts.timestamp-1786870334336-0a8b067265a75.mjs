// .vitepress/config.ts
import { readFileSync as readFileSync2 } from "node:fs";
import { resolve as resolve2 } from "node:path";
import { withMermaid } from "file:///home/tulip/deepseek-harness/node_modules/.pnpm/vitepress-plugin-mermaid@2.0.17_mermaid@11.16.0_vitepress@1.6.4_@algolia+client-search@_4e5e1d2dbd0e712c5a716bdb24f56ddf/node_modules/vitepress-plugin-mermaid/dist/vitepress-plugin-mermaid.es.mjs";

// docs.ts
function localized(value, locale) {
  return typeof value === "object" && value !== null && !Array.isArray(value) ? value[locale] : value;
}
function mirroredPages(pages) {
  return pages.flatMap((page) => ["root", "en"].map((locale) => {
    const aliases = page.sourceAliases === void 0 ? void 0 : Array.isArray(page.sourceAliases) ? page.sourceAliases : page.sourceAliases[locale];
    return {
      locale,
      contentLocale: localized(page.contentLocale, locale),
      source: localized(page.source, locale),
      route: locale === "root" ? page.route : `en/${page.route}`,
      label: page.label[locale],
      sidebar: page.sidebar[locale],
      section: page.section[locale],
      order: page.order,
      ...page.outline === void 0 ? {} : { outline: page.outline },
      ...aliases === void 0 ? {} : { sourceAliases: aliases }
    };
  }));
}
function pairedPages(pages) {
  return mirroredPages(pages.map((page) => {
    const chineseSource = page.source.replace(/\.md$/, ".zh.md");
    const sharedAliases = page.sourceAliases ?? [];
    return {
      ...page,
      source: { root: chineseSource, en: page.source },
      contentLocale: { root: "zh-CN", en: "en-US" },
      sourceAliases: {
        root: [...sharedAliases, page.source],
        en: [...sharedAliases, chineseSource]
      }
    };
  }));
}
var homeAndGuide = pairedPages([
  {
    source: "docs/user/index.md",
    route: "index.md",
    label: { root: "DeepSeek Harness", en: "DeepSeek Harness" },
    sidebar: { root: null, en: null },
    section: { root: "\u9996\u9875", en: "Home" },
    order: 0
  },
  {
    source: "docs/user/guide/index.md",
    route: "guide/quickstart.md",
    label: { root: "\u4F7F\u7528 Web UI", en: "Use the Web UI" },
    sidebar: { root: "zh-guide", en: "en-guide" },
    section: { root: "\u5165\u95E8", en: "Guide" },
    order: 1,
    sourceAliases: ["docs/user/guide"]
  },
  {
    source: "docs/user/guide/providers.md",
    route: "guide/providers.md",
    label: { root: "\u914D\u7F6E\u6A21\u578B", en: "Configure models" },
    sidebar: { root: "zh-guide", en: "en-guide" },
    section: { root: "\u5165\u95E8", en: "Guide" },
    order: 2
  },
  {
    source: "docs/user/guide/python-sdk.md",
    route: "guide/python-sdk.md",
    label: { root: "Python", en: "Python" },
    sidebar: { root: "zh-guide", en: "en-guide" },
    section: { root: "SDK", en: "SDK" },
    order: 1
  }
]);
var develop = pairedPages([
  {
    source: "docs/user/develop/basic/index.md",
    route: "develop/basic/index.md",
    label: { root: "\u7B2C\u4E00\u4E2A Harness \u63D2\u4EF6", en: "Your first Harness plugin" },
    sidebar: { root: "zh-develop", en: "en-develop" },
    section: { root: "\u57FA\u7840", en: "Basics" },
    order: 1,
    sourceAliases: ["docs/user/develop/basic"]
  },
  {
    source: "docs/user/develop/basic/tool.md",
    route: "develop/basic/tool.md",
    label: { root: "\u5F00\u53D1\u4E00\u4E2A Tool", en: "Build a tool" },
    sidebar: { root: "zh-develop", en: "en-develop" },
    section: { root: "\u57FA\u7840", en: "Basics" },
    order: 2
  },
  {
    source: "docs/user/develop/basic/config.md",
    route: "develop/basic/config.md",
    label: { root: "\u63D2\u4EF6\u914D\u7F6E", en: "Plugin configuration" },
    sidebar: { root: "zh-develop", en: "en-develop" },
    section: { root: "\u57FA\u7840", en: "Basics" },
    order: 3
  },
  {
    source: "docs/user/develop/basic/publish.md",
    route: "develop/basic/publish.md",
    label: { root: "\u6253\u5305\u4E0E\u5B89\u88C5\u63D2\u4EF6", en: "Package and install" },
    sidebar: { root: "zh-develop", en: "en-develop" },
    section: { root: "\u57FA\u7840", en: "Basics" },
    order: 4
  },
  {
    source: "docs/user/develop/framework/index.md",
    route: "develop/framework/index.md",
    label: { root: "\u63D2\u4EF6\u4E0E\u751F\u547D\u5468\u671F", en: "Plugin lifecycle" },
    sidebar: { root: "zh-develop", en: "en-develop" },
    section: { root: "\u6846\u67B6\u80FD\u529B", en: "Framework" },
    order: 1,
    sourceAliases: ["docs/user/develop/framework"]
  },
  {
    source: "docs/user/develop/framework/service.md",
    route: "develop/framework/service.md",
    label: { root: "\u670D\u52A1\u4E0E\u4F9D\u8D56", en: "Services and dependencies" },
    sidebar: { root: "zh-develop", en: "en-develop" },
    section: { root: "\u6846\u67B6\u80FD\u529B", en: "Framework" },
    order: 2
  },
  {
    source: "docs/user/develop/framework/events.md",
    route: "develop/framework/events.md",
    label: { root: "\u4E8B\u4EF6\u7CFB\u7EDF", en: "Event system" },
    sidebar: { root: "zh-develop", en: "en-develop" },
    section: { root: "\u6846\u67B6\u80FD\u529B", en: "Framework" },
    order: 3
  },
  {
    source: "docs/user/develop/practice/index.md",
    route: "develop/practice/index.md",
    label: { root: "\u80FD\u529B\u7684\u4E09\u5C42\u62C6\u5206", en: "Capability layering" },
    sidebar: { root: "zh-develop", en: "en-develop" },
    section: { root: "\u5B9E\u6218", en: "Practice" },
    order: 1,
    sourceAliases: ["docs/user/develop/practice"]
  },
  {
    source: "docs/user/develop/practice/llm-adapter.md",
    route: "develop/practice/llm-adapter.md",
    label: { root: "LLM \u9002\u914D\u5668", en: "LLM adapter" },
    sidebar: { root: "zh-develop", en: "en-develop" },
    section: { root: "\u5B9E\u6218", en: "Practice" },
    order: 2
  }
]);
var cordisTutorial = pairedPages([
  ["index.md", "\u603B\u89C8", "Overview"],
  ["01-first-plugin.md", "1. \u7B2C\u4E00\u4E2A\u63D2\u4EF6", "1. Your first plugin"],
  ["02-lifecycle-and-effects.md", "2. \u751F\u547D\u5468\u671F\u4E0E\u526F\u4F5C\u7528", "2. Lifecycle and effects"],
  ["03-services.md", "3. \u670D\u52A1", "3. Services"],
  ["04-events.md", "4. \u4E8B\u4EF6", "4. Events"],
  ["05-config.md", "5. \u914D\u7F6E", "5. Configuration"],
  ["06-composition-and-hmr.md", "6. \u7EC4\u5408\u4E0E\u70ED\u91CD\u8F7D", "6. Composition and HMR"],
  ["07-into-the-harness.md", "7. \u8FDB\u5165 Harness", "7. Into the harness"]
].map(([file, rootLabel, enLabel], order) => ({
  source: `docs/cordis-tutorial/${file}`,
  route: `develop/cordis-tutorial/${file}`,
  label: { root: rootLabel, en: enLabel },
  sidebar: { root: "zh-develop", en: "en-develop" },
  section: { root: "Cordis \u6846\u67B6\u6559\u7A0B", en: "Cordis framework tutorial" },
  order,
  ...file === "index.md" ? { sourceAliases: ["docs/cordis-tutorial"] } : {}
})));
var cordisPrimerReference = pairedPages([
  {
    source: "docs/cordis-primer.md",
    route: "reference/cordis-primer.md",
    label: { root: "Cordis \u5165\u95E8", en: "Cordis primer" },
    sidebar: { root: "zh-reference", en: "en-reference" },
    section: { root: "\u6982\u5FF5", en: "Concepts" },
    order: 1
  }
]);
var subsystemGroups = [
  ["\u603B\u89C8", "Overview", [
    ["README.md", "\u5B50\u7CFB\u7EDF", "Subsystems"]
  ]],
  ["\u5185\u6838\u4E0E\u4F5C\u7528\u57DF", "Core and scopes", [
    ["core.md", "\u6838\u5FC3", "Core"],
    ["scope.md", "\u4F5C\u7528\u57DF", "Scopes"],
    ["invariants.md", "\u8FD0\u884C\u65F6\u4E0D\u53D8\u5F0F", "Runtime invariants"]
  ]],
  ["\u4F1A\u8BDD\u4E0E\u6301\u4E45\u5316", "Sessions and persistence", [
    ["session.md", "\u4F1A\u8BDD", "Sessions"],
    ["session-query.md", "\u4F1A\u8BDD\u67E5\u8BE2", "Session query"],
    ["session-reference.md", "\u4F1A\u8BDD\u5F15\u7528", "Session references"],
    ["session-title.md", "\u4F1A\u8BDD\u6807\u9898", "Session titles"],
    ["session-projection.md", "\u4F1A\u8BDD\u6295\u5F71", "Session projections"],
    ["persistence.md", "\u4F1A\u8BDD\u6301\u4E45\u5316", "Session persistence"],
    ["spill.md", "Spill \u5B58\u50A8", "Spill storage"],
    ["session-telemetry.md", "\u9065\u6D4B", "SessionTelemetryBackend"]
  ]],
  ["\u6A21\u578B\u4E0E\u4E0A\u4E0B\u6587", "Model and context", [
    ["llm-streaming.md", "LLM \u6D41\u5F0F\u54CD\u5E94", "LLM streaming"],
    ["token-meter.md", "Token \u8BA1\u91CF", "Token metering"],
    ["system-prompt.md", "\u7CFB\u7EDF\u63D0\u793A\u8BCD", "System prompts"],
    ["compaction.md", "\u4E0A\u4E0B\u6587\u538B\u7F29", "Compaction"]
  ]],
  ["\u6267\u884C\u4E0E\u5DE5\u5177", "Execution and tools", [
    ["tools.md", "\u5DE5\u5177", "Tools"],
    ["shell.md", "Bash \u6267\u884C", "Bash execution"],
    ["subprocess.md", "\u5B50\u8FDB\u7A0B", "Subprocesses"],
    ["terminal.md", "PTY \u4F1A\u8BDD", "PTY sessions"],
    ["jobs.md", "\u540E\u53F0\u4EFB\u52A1", "Background jobs"],
    ["filesystem.md", "\u6587\u4EF6\u7CFB\u7EDF", "Filesystem"],
    ["lsp.md", "LSP \u5BFC\u822A", "LSP navigation"],
    ["code-runtime.md", "\u4EE3\u7801\u8FD0\u884C\u65F6", "Code runtime"],
    ["web.md", "Web \u8BBF\u95EE", "Web access"],
    ["skills.md", "\u6280\u80FD", "Skills"],
    ["workflow.md", "\u5DE5\u4F5C\u6D41", "Workflows"],
    ["subagent.md", "\u5B50\u4EE3\u7406", "Subagents"]
  ]],
  ["\u7B56\u7565\u4E0E\u4EA4\u4E92", "Policy and interaction", [
    ["approval.md", "\u5BA1\u6279", "Approvals"],
    ["permission-presets.md", "\u6743\u9650\u9884\u8BBE", "Permission presets"],
    ["sandbox.md", "\u6C99\u7BB1", "Sandboxing"],
    ["plan.md", "\u8BA1\u5212\u6A21\u5F0F", "Plan mode"],
    ["user-questions.md", "\u7528\u6237\u4EA4\u4E92", "User interaction"],
    ["commands.md", "\u547D\u4EE4", "Human commands"],
    ["goal.md", "\u76EE\u6807", "Goals"],
    ["schedule.md", "\u5B9A\u65F6\u63D0\u9192", "Scheduled reminders"]
  ]],
  ["\u5E73\u53F0\u4E0E\u63A5\u5165", "Platform and access", [
    ["web-server.md", "HTTP \u670D\u52A1\u5668", "HTTP server"],
    ["typert.md", "Typert", "Typert"],
    ["client-modules.md", "\u5BA2\u6237\u7AEF\u6A21\u5757", "Client modules"],
    ["storage.md", "\u5B58\u50A8", "Storage"],
    ["workspace.md", "\u5DE5\u4F5C\u533A", "Workspaces"],
    ["settings.md", "\u7528\u6237\u8BBE\u7F6E", "User settings"],
    ["credentials.md", "\u7528\u6237\u51ED\u636E", "User credentials"]
  ]]
];
var subsystemsReference = subsystemGroups.flatMap(([rootSection, enSection, files]) => pairedPages(
  files.map(([file, rootLabel, enLabel], order) => ({
    source: `docs/subsystems/${file}`,
    route: file === "README.md" ? "reference/subsystems/index.md" : `reference/subsystems/${file}`,
    label: { root: rootLabel, en: enLabel },
    sidebar: { root: "zh-reference", en: "en-reference" },
    section: { root: rootSection, en: enSection },
    order,
    // Subsystem pages carry long third-level sections a two-level outline reaches.
    outline: [2, 3],
    ...file === "README.md" ? { sourceAliases: ["docs/subsystems"] } : {}
  }))
));
var reference = [
  ...pairedPages([
    ["docs/architecture.md", "reference/index.md", "\u67B6\u6784", "Architecture", 0]
  ].map(([source, route, rootLabel, enLabel, order]) => ({
    source,
    route,
    label: { root: rootLabel, en: enLabel },
    sidebar: { root: "zh-reference", en: "en-reference" },
    section: { root: "\u6982\u5FF5", en: "Concepts" },
    order
  }))),
  ...pairedPages([
    ["docs/capability-seams.md", "reference/capability-seams.md", "\u80FD\u529B\u670D\u52A1", "Capability services", 2],
    ["docs/agent-lifecycle.md", "reference/agent-lifecycle.md", "Agent \u751F\u547D\u5468\u671F", "Agent lifecycle", 3],
    ["docs/tool-execution-pipeline.md", "reference/tool-execution-pipeline.md", "Tool \u6267\u884C", "Tool execution", 4]
  ].map(([source, route, rootLabel, enLabel, order]) => ({
    source,
    route,
    label: { root: rootLabel, en: enLabel },
    sidebar: { root: "zh-reference", en: "en-reference" },
    section: { root: "\u6982\u5FF5", en: "Concepts" },
    order
  }))),
  ...pairedPages([
    ["docs/config-catalog.md", "reference/config-catalog.md", "\u63D2\u4EF6\u914D\u7F6E", "Plugin configuration"],
    ["docs/tool-catalog.md", "reference/tool-catalog.md", "Tool Schema", "Tool schemas"],
    ["docs/persistence-catalog.md", "reference/persistence-catalog.md", "\u6301\u4E45\u5316\u4E8B\u4EF6", "Persistence events", "deep"]
  ].map(([source, route, rootLabel, enLabel, outline], order) => ({
    source,
    route,
    label: { root: rootLabel, en: enLabel },
    sidebar: { root: "zh-reference", en: "en-reference" },
    section: { root: "\u751F\u6210\u53C2\u8003", en: "Generated reference" },
    order,
    ...outline === void 0 ? {} : { outline }
  }))),
  ...pairedPages([
    ["context.md", "Context", "Context"],
    ["events.md", "Events", "Events"],
    ["fiber.md", "Fiber", "Fiber"],
    ["registry.md", "Plugin Registry", "Plugin Registry"],
    ["service.md", "Service", "Service"]
  ].map(([file, rootLabel, enLabel], order) => ({
    source: `docs/cordis-api/${file}`,
    route: `reference/cordis-api/${file}`,
    label: { root: rootLabel, en: enLabel },
    sidebar: { root: "zh-reference", en: "en-reference" },
    section: { root: "Cordis API", en: "Cordis Core API" },
    order
  }))),
  ...mirroredPages([
    ["inherited.md", "\u7EE7\u627F\u63A5\u53E3\u9762", "Inherited surface"]
  ].map(([file, rootLabel, enLabel], order) => ({
    source: `docs/cordis-api/${file}`,
    route: `reference/cordis-api/${file}`,
    contentLocale: "en-US",
    label: { root: rootLabel, en: enLabel },
    sidebar: { root: "zh-reference", en: "en-reference" },
    section: { root: "Cordis API", en: "Cordis Core API" },
    order: order + 5
  }))),
  ...pairedPages([
    ["adding-a-package.md", "\u65B0\u589E Package", "Adding a package"],
    ["adding-a-tool.md", "\u65B0\u589E Tool", "Adding a tool"],
    ["adding-an-llm-adapter.md", "\u65B0\u589E LLM Adapter", "Adding an LLM adapter"],
    ["extension-cookbook.md", "\u6269\u5C55\u6A21\u5F0F", "Extension patterns"]
  ].map(([file, rootLabel, enLabel], order) => ({
    source: `docs/cookbook/${file}`,
    route: `reference/cookbook/${file}`,
    label: { root: rootLabel, en: enLabel },
    sidebar: { root: "zh-reference", en: "en-reference" },
    section: { root: "\u5F00\u53D1\u624B\u518C", en: "Cookbook" },
    order
  }))),
  ...pairedPages([{
    source: "docs/cookbook/adding-a-conversation-node.md",
    route: "reference/cookbook/adding-a-conversation-node.md",
    label: { root: "\u65B0\u589E Conversation Node", en: "Adding a Conversation Node" },
    sidebar: { root: "zh-reference", en: "en-reference" },
    section: { root: "\u5F00\u53D1\u624B\u518C", en: "Cookbook" },
    order: 4
  }])
];
var sections = {
  root: [
    { label: "\u5165\u95E8" },
    { label: "SDK" },
    { label: "\u57FA\u7840" },
    { label: "\u6846\u67B6\u80FD\u529B" },
    { label: "\u5B9E\u6218" },
    { label: "Cordis \u6846\u67B6\u6559\u7A0B" },
    { label: "\u6982\u5FF5" },
    { label: "\u751F\u6210\u53C2\u8003" },
    { label: "Cordis API" },
    { label: "\u5F00\u53D1\u624B\u518C" },
    { label: "\u603B\u89C8" },
    { label: "\u5185\u6838\u4E0E\u4F5C\u7528\u57DF", collapsed: true },
    { label: "\u4F1A\u8BDD\u4E0E\u6301\u4E45\u5316", collapsed: true },
    { label: "\u6A21\u578B\u4E0E\u4E0A\u4E0B\u6587", collapsed: true },
    { label: "\u6267\u884C\u4E0E\u5DE5\u5177", collapsed: true },
    { label: "\u7B56\u7565\u4E0E\u4EA4\u4E92", collapsed: true },
    { label: "\u5E73\u53F0\u4E0E\u63A5\u5165", collapsed: true }
  ],
  en: [
    { label: "Guide" },
    { label: "SDK" },
    { label: "Basics" },
    { label: "Framework" },
    { label: "Practice" },
    { label: "Cordis framework tutorial" },
    { label: "Concepts" },
    { label: "Generated reference" },
    { label: "Cordis Core API" },
    { label: "Cookbook" },
    { label: "Overview" },
    { label: "Core and scopes", collapsed: true },
    { label: "Sessions and persistence", collapsed: true },
    { label: "Model and context", collapsed: true },
    { label: "Execution and tools", collapsed: true },
    { label: "Policy and interaction", collapsed: true },
    { label: "Platform and access", collapsed: true }
  ]
};
function sectionSpec(locale, label) {
  const declared = sections[locale];
  const section = declared.find((candidate) => candidate.label === label);
  if (section === void 0) throw new Error(`Sidebar section "${label}" has no placement in the ${locale} locale.`);
  return { ...section, index: declared.indexOf(section) };
}
var docsPages = [
  ...homeAndGuide,
  ...develop,
  ...cordisTutorial,
  ...cordisPrimerReference,
  ...subsystemsReference,
  ...reference
];
function orderedPages(locale, collection) {
  return docsPages.filter((page) => page.locale === locale && page.sidebar === collection).sort((left, right) => sectionSpec(locale, left.section).index - sectionSpec(locale, right.section).index || left.order - right.order);
}
function routeLink(route) {
  return `/${route.replace(/(?:index)?\.md$/, "")}`;
}
function landingLink(locale, collection) {
  const first = orderedPages(locale, collection)[0];
  if (first === void 0) throw new Error(`Sidebar collection "${collection}" publishes no page.`);
  return routeLink(first.route);
}

// ../scripts/project-doc-site.ts
import {
  copyFileSync,
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  realpathSync,
  rmSync,
  statSync,
  writeFileSync
} from "node:fs";
import { basename, dirname, extname, posix, relative, resolve, sep } from "node:path";
import { fromMarkdown } from "file:///home/tulip/deepseek-harness/node_modules/.pnpm/mdast-util-from-markdown@2.0.3/node_modules/mdast-util-from-markdown/index.js";
import { gfmFromMarkdown } from "file:///home/tulip/deepseek-harness/node_modules/.pnpm/mdast-util-gfm@3.1.0/node_modules/mdast-util-gfm/index.js";
import { gfm } from "file:///home/tulip/deepseek-harness/node_modules/.pnpm/micromark-extension-gfm@3.0.0/node_modules/micromark-extension-gfm/index.js";
var __vite_injected_original_dirname = "/home/tulip/deepseek-harness/scripts";
var REPOSITORY_URL = "https://github.com/deepseek-ai/deepseek-harness";
var root = resolve(__vite_injected_original_dirname, "..");
var generatedRoot = resolve(root, "website/.generated");
function repoPath(absPath, repoRoot) {
  return relative(repoRoot, absPath).split(sep).join("/");
}
function isExternalOrSiteAbsolute(url) {
  return url.startsWith("#") || url.startsWith("//") || url.startsWith("/") || /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(url);
}
function skipWhitespace(source, start) {
  let index = start;
  while (/\s/.test(source[index] ?? "")) index += 1;
  return index;
}
function labelEnd(source) {
  const first = source.indexOf("[");
  if (first === -1) return -1;
  let depth = 0;
  for (let index = first; index < source.length; index += 1) {
    const char = source[index];
    if (char === "\\") {
      index += 1;
    } else if (char === "[") {
      depth += 1;
    } else if (char === "]") {
      depth -= 1;
      if (depth === 0) return index;
    }
  }
  return -1;
}
function destinationRange(rawNode, type) {
  const endOfLabel = labelEnd(rawNode);
  if (endOfLabel === -1) {
    throw new Error(`project-doc-site: cannot locate label end in ${JSON.stringify(rawNode)}.`);
  }
  let start;
  if (type === "definition") {
    const colon = rawNode.indexOf(":", endOfLabel + 1);
    if (colon === -1) {
      throw new Error(`project-doc-site: cannot locate definition separator in ${JSON.stringify(rawNode)}.`);
    }
    start = skipWhitespace(rawNode, colon + 1);
  } else {
    if (rawNode[endOfLabel + 1] !== "(") {
      throw new Error(`project-doc-site: cannot locate inline destination in ${JSON.stringify(rawNode)}.`);
    }
    start = skipWhitespace(rawNode, endOfLabel + 2);
  }
  if (rawNode[start] === "<") {
    for (let index = start + 1; index < rawNode.length; index += 1) {
      if (rawNode[index] === "\\") index += 1;
      else if (rawNode[index] === ">") return { start: start + 1, end: index };
    }
    throw new Error(`project-doc-site: cannot locate angle-bracket destination end in ${JSON.stringify(rawNode)}.`);
  }
  let depth = 0;
  for (let index = start; index < rawNode.length; index += 1) {
    const char = rawNode[index];
    if (char === "\\") {
      index += 1;
    } else if (char === "(") {
      depth += 1;
    } else if (char === ")") {
      if (depth === 0) return { start, end: index };
      depth -= 1;
    } else if (/\s/.test(char ?? "") && depth === 0) {
      return { start, end: index };
    }
  }
  return { start, end: rawNode.length };
}
function splitTarget(url) {
  const boundary = url.search(/[?#]/);
  if (boundary === -1) return { path: url, suffix: "" };
  return { path: url.slice(0, boundary), suffix: url.slice(boundary) };
}
function decodePath(path) {
  try {
    return decodeURIComponent(path);
  } catch {
    throw new Error(`project-doc-site: malformed percent escape in ${JSON.stringify(path)}.`);
  }
}
function routeTarget(fromRoute, toRoute, suffix) {
  const target = posix.relative(posix.dirname(fromRoute), toRoute);
  return `${target.startsWith(".") ? target : `./${target}`}${suffix}`;
}
function sourceMap(pages) {
  const map = /* @__PURE__ */ new Map();
  for (const page of pages) {
    for (const source of [page.source, ...page.sourceAliases ?? []]) {
      const localized2 = map.get(source) ?? /* @__PURE__ */ new Map();
      if (localized2.has(page.locale)) {
        throw new Error(`project-doc-site: duplicate source or alias ${JSON.stringify(source)} for locale ${JSON.stringify(page.locale)}.`);
      }
      localized2.set(page.locale, page);
      map.set(source, localized2);
    }
  }
  return map;
}
function counterpartSource(source) {
  return source.endsWith(".zh.md") ? source.replace(/\.zh\.md$/, ".md") : source.replace(/\.md$/, ".zh.md");
}
function resolveRepositoryTarget(sourceAbs, rawPath, repoRoot) {
  const decoded = decodePath(rawPath);
  let absPath = resolve(dirname(sourceAbs), decoded);
  if (existsSync(absPath)) return { absPath };
  const lineMatch = decoded.match(/:(\d+)$/);
  if (lineMatch !== null) {
    const lineText = lineMatch[1];
    if (lineText === void 0) throw new Error("project-doc-site: line suffix matched without a line number.");
    absPath = resolve(dirname(sourceAbs), decoded.slice(0, -lineMatch[0].length));
    if (existsSync(absPath)) return { absPath, line: Number.parseInt(lineText, 10) };
  }
  if (extname(decoded) === "") {
    const markdown = resolve(dirname(sourceAbs), `${decoded}.md`);
    if (existsSync(markdown)) return { absPath: markdown };
    const index = resolve(dirname(sourceAbs), decoded, "index.md");
    if (existsSync(index)) return { absPath: index };
  }
  throw new Error(`project-doc-site: ${repoPath(sourceAbs, repoRoot)} links to missing path ${JSON.stringify(rawPath)}.`);
}
function githubTarget(absPath, line, suffix, repositoryRef, repoRoot, image) {
  const path = repoPath(absPath, repoRoot);
  if (image) return `https://raw.githubusercontent.com/deepseek-ai/deepseek-harness/${repositoryRef}/${path}${suffix}`;
  const kind = lstatSync(absPath).isDirectory() ? "tree" : "blob";
  const lineSuffix = line === void 0 ? suffix : `#L${line}`;
  return `${REPOSITORY_URL}/${kind}/${repositoryRef}/${path}${lineSuffix}`;
}
function rewriteMarkdown(source, options) {
  const sourceAbs = resolve(options.repoRoot, options.sourcePath);
  const published = sourceMap(options.pages);
  const tree = fromMarkdown(source, { extensions: [gfm()], mdastExtensions: [gfmFromMarkdown()] });
  const replacements = [];
  const rewrite = (node) => {
    if (isExternalOrSiteAbsolute(node.url)) return;
    const { path, suffix } = splitTarget(node.url);
    if (path === "") return;
    const { absPath, line } = resolveRepositoryTarget(sourceAbs, path, options.repoRoot);
    const targetPath = repoPath(absPath, options.repoRoot);
    const isLanguageSwitcher = targetPath === counterpartSource(options.sourcePath);
    const targetLocale = isLanguageSwitcher ? options.locale === "root" ? "en" : "root" : options.locale;
    const page = published.get(targetPath)?.get(targetLocale);
    const nextUrl = page !== void 0 ? routeTarget(options.route, page.route, suffix) : node.type === "image" && options.placeImage !== void 0 ? `${options.placeImage(absPath)}${suffix}` : githubTarget(absPath, line, suffix, options.repositoryRef, options.repoRoot, node.type === "image");
    const start = node.position?.start.offset;
    const end = node.position?.end.offset;
    if (start === void 0 || end === void 0) {
      throw new Error(`project-doc-site: link ${JSON.stringify(node.url)} has no source offsets.`);
    }
    const rawNode = source.slice(start, end);
    const rawDestination = destinationRange(rawNode, node.type);
    replacements.push({
      start: start + rawDestination.start,
      end: start + rawDestination.end,
      value: nextUrl
    });
  };
  const visit = (node) => {
    if ((node.type === "link" || node.type === "image" || node.type === "definition") && "url" in node) rewrite(node);
    if ("children" in node) {
      for (const child of node.children) visit(child);
    }
  };
  visit(tree);
  let projected = source;
  for (const replacement of replacements.sort((a, b) => b.start - a.start)) {
    projected = projected.slice(0, replacement.start) + replacement.value + projected.slice(replacement.end);
  }
  return projected;
}
function addProjectionFrontmatter(markdown, page) {
  const fields = [
    `editSource: ${JSON.stringify(page.source)}`,
    ...page.outline === void 0 ? [] : [`outline: ${JSON.stringify(page.outline)}`]
  ].join("\n");
  if (markdown.startsWith("---\n")) return markdown.replace("---\n", `---
${fields}
`);
  return `---
${fields}
---

${markdown}`;
}
var LANGUAGE_SWITCHER = /^(?:English \| \[中文\]\([^)]*\)|\[English\]\([^)]*\) \| 中文)$/;
var REPOSITORY_BADGE = /^\[!\[[^\]]*\]\(https:\/\/img\.shields\.io\/[^)]*\)\]\([^)]*\)$/;
function withoutRepositoryChrome(markdown) {
  const lines = markdown.split("\n");
  const switcher = lines.findIndex((line) => LANGUAGE_SWITCHER.test(line));
  if (switcher !== -1 && switcher < 8) {
    lines.splice(switcher, lines[switcher + 1] === "" ? 2 : 1);
  }
  const badge = lines.findLastIndex((line) => REPOSITORY_BADGE.test(line));
  if (badge !== -1) {
    lines.splice(lines[badge - 1] === "" ? badge - 1 : badge, lines[badge - 1] === "" ? 2 : 1);
  }
  return lines.join("\n");
}
function projectedPageContent(markdown, page) {
  if (page.sidebar !== null) return withoutRepositoryChrome(markdown);
  if (!markdown.startsWith("---\n")) {
    throw new Error(`project-doc-site: locale home source ${JSON.stringify(page.source)} must start with YAML frontmatter.`);
  }
  const closingDelimiter = "\n---\n";
  const closing = markdown.indexOf(closingDelimiter, 4);
  if (closing === -1) {
    throw new Error(`project-doc-site: locale home source ${JSON.stringify(page.source)} has unclosed YAML frontmatter.`);
  }
  return markdown.slice(0, closing + closingDelimiter.length);
}
function publishableImage(absPath, repoRoot) {
  const real = realpathSync(absPath);
  const inside = real === repoRoot || real.startsWith(`${repoRoot}${sep}`);
  return inside && statSync(real).isFile() ? real : void 0;
}
function referencedImages() {
  const found = /* @__PURE__ */ new Set();
  for (const page of docsPages) {
    const sourceAbs = resolve(root, page.source);
    if (!existsSync(sourceAbs)) continue;
    rewriteMarkdown(readFileSync(sourceAbs, "utf8"), {
      sourcePath: page.source,
      locale: page.locale,
      route: page.route,
      pages: docsPages,
      repoRoot: root,
      repositoryRef: "master",
      placeImage: (absPath) => {
        const real = publishableImage(absPath, root);
        if (real !== void 0) found.add(real);
        return "";
      }
    });
  }
  return [...found];
}
function docsSourceFiles() {
  return [.../* @__PURE__ */ new Set([...docsPages.map((page) => resolve(root, page.source)), ...referencedImages()])];
}
function projectDocs() {
  const routes = /* @__PURE__ */ new Set();
  const claimed = /* @__PURE__ */ new Map();
  const repositoryRef = process.env.GITHUB_SHA ?? "master";
  rmSync(generatedRoot, { recursive: true, force: true });
  const claim = (target, sourceAbs) => {
    const holder = claimed.get(target);
    if (holder !== void 0 && holder !== sourceAbs) {
      throw new Error(
        `project-doc-site: ${repoPath(sourceAbs, root)} and ${repoPath(holder, root)} both project to ${relative(generatedRoot, target).split(sep).join("/")}.`
      );
    }
    claimed.set(target, sourceAbs);
  };
  for (const page of docsPages) {
    if (routes.has(page.route)) throw new Error(`project-doc-site: duplicate route ${JSON.stringify(page.route)}.`);
    routes.add(page.route);
    const sourceAbs = resolve(root, page.source);
    if (!existsSync(sourceAbs) || !lstatSync(sourceAbs).isFile()) {
      throw new Error(`project-doc-site: source ${JSON.stringify(page.source)} does not exist or is not a file.`);
    }
    const output = resolve(generatedRoot, page.route);
    claim(output, sourceAbs);
    mkdirSync(dirname(output), { recursive: true });
    const markdown = readFileSync(sourceAbs, "utf8");
    const projected = rewriteMarkdown(markdown, {
      sourcePath: page.source,
      locale: page.locale,
      route: page.route,
      pages: docsPages,
      repoRoot: root,
      repositoryRef,
      placeImage: (absPath) => {
        const real = publishableImage(absPath, root);
        if (real === void 0) {
          throw new Error(
            `project-doc-site: ${page.source} references image ${repoPath(absPath, root)}, which is not a regular file inside the repository.`
          );
        }
        const name = basename(real);
        const target = resolve(dirname(output), name);
        claim(target, real);
        copyFileSync(real, target);
        return `./${encodeURI(name)}`;
      }
    });
    writeFileSync(output, addProjectionFrontmatter(projectedPageContent(projected, page), page));
  }
}

// .vitepress/config.ts
var __vite_injected_original_dirname2 = "/home/tulip/deepseek-harness/website/.vitepress";
projectDocs();
function sidebar(locale, collection) {
  const groups = /* @__PURE__ */ new Map();
  for (const page of orderedPages(locale, collection)) {
    const entries = groups.get(page.section) ?? [];
    entries.push(page);
    groups.set(page.section, entries);
  }
  return [...groups.entries()].map(([text, entries]) => {
    const { collapsed } = sectionSpec(locale, text);
    return {
      text,
      // A present `collapsed` is what makes the default theme render the
      // group as collapsible at all, so an open group must omit the key.
      ...collapsed === void 0 ? {} : { collapsed },
      items: entries.map((page) => ({ text: page.label, link: routeLink(page.route) }))
    };
  });
}
var guideModules = {
  root: {
    guide: "zh-guide",
    develop: { label: "\u5F00\u53D1", collection: "zh-develop" },
    reference: { label: "\u53C2\u8003", collection: "zh-reference" }
  },
  en: {
    guide: "en-guide",
    develop: { label: "Development", collection: "en-develop" },
    reference: { label: "Reference", collection: "en-reference" }
  }
};
function guideSidebar(locale) {
  const { guide, develop: develop2, reference: reference2 } = guideModules[locale];
  return [
    ...sidebar(locale, guide),
    ...[develop2, reference2].map(({ label, collection }) => ({
      text: label,
      link: landingLink(locale, collection)
    }))
  ];
}
function moduleNav(locale) {
  const { develop: develop2, reference: reference2 } = guideModules[locale];
  const routePrefix = locale === "root" ? "" : "/en";
  return [
    { text: develop2.label, link: landingLink(locale, develop2.collection), activeMatch: `^${routePrefix}/develop/` },
    { text: reference2.label, link: landingLink(locale, reference2.collection), activeMatch: `^${routePrefix}/reference/` }
  ];
}
function watchCanonicalDocs(server) {
  const sources = docsSourceFiles();
  server.watcher.add(sources);
  server.watcher.on("change", (changed) => {
    if (!sources.includes(changed)) return;
    projectDocs();
  });
}
function escapeVueInterpolation(html) {
  return html.replaceAll("{{", "&#123;&#123;").replaceAll("}}", "&#125;&#125;");
}
var sharedTheme = {
  search: {
    provider: "local",
    options: {
      locales: {
        root: {
          translations: {
            button: {
              buttonText: "\u641C\u7D22\u6587\u6863",
              buttonAriaLabel: "\u641C\u7D22\u6587\u6863"
            },
            modal: {
              displayDetails: "\u663E\u793A\u8BE6\u7EC6\u5217\u8868",
              resetButtonTitle: "\u6E05\u9664\u641C\u7D22",
              backButtonTitle: "\u5173\u95ED\u641C\u7D22",
              noResultsText: "\u672A\u627E\u5230\u76F8\u5173\u7ED3\u679C",
              footer: {
                selectText: "\u9009\u62E9",
                selectKeyAriaLabel: "\u56DE\u8F66\u952E",
                navigateText: "\u5207\u6362",
                navigateUpKeyAriaLabel: "\u4E0A\u65B9\u5411\u952E",
                navigateDownKeyAriaLabel: "\u4E0B\u65B9\u5411\u952E",
                closeText: "\u5173\u95ED",
                closeKeyAriaLabel: "Esc \u952E"
              }
            }
          }
        }
      }
    }
  },
  socialLinks: [
    { icon: "github", link: "https://github.com/deepseek-ai/deepseek-harness" }
  ],
  editLink: {
    pattern: ({ frontmatter }) => {
      const data = frontmatter;
      const editSource = typeof data === "object" && data !== null ? Reflect.get(data, "editSource") : void 0;
      if (typeof editSource !== "string") throw new Error("Projected documentation page has no editSource frontmatter.");
      return `https://github.com/deepseek-ai/deepseek-harness/edit/master/${editSource}`;
    },
    text: "\u5728 GitHub \u4E0A\u7F16\u8F91\u6B64\u9875"
  }
};
var base = process.env.DOCS_BASE ?? "/";
var wordmark = readFileSync2(resolve2(__vite_injected_original_dirname2, "../public/wordmark.svg"), "utf8").trim().replace("<svg ", '<svg class="dsh-wordmark" ');
var siteStyle = `
.dsh-lockup { display: inline-flex; align-items: center; gap: 8px; min-width: 0; }
.dsh-wordmark { display: block; height: 22px; width: auto; color: var(--vp-c-text-1); }
.dsh-tag {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--vp-c-brand-soft);
  border-radius: 999px;
  padding: 1px 9px;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  white-space: nowrap;
  color: var(--vp-c-brand-1);
}

.VPSidebar::-webkit-scrollbar { width: 6px; }
.VPSidebar::-webkit-scrollbar-track { background: transparent; }
.VPSidebar::-webkit-scrollbar-thumb {
  background-color: transparent;
  border-radius: 3px;
  transition: background-color 0.3s;
}
.VPSidebar[data-scrolling]::-webkit-scrollbar-thumb { background-color: var(--vp-c-text-3); }
@supports not selector(::-webkit-scrollbar) {
  .VPSidebar { scrollbar-width: thin; scrollbar-color: transparent transparent; }
  .VPSidebar[data-scrolling] { scrollbar-color: var(--vp-c-text-3) transparent; }
}
`;
var scrollbarScript = `
(() => {
  let idle
  addEventListener('scroll', (event) => {
    const target = event.target
    if (!(target instanceof Element) || !target.classList.contains('VPSidebar')) return
    target.dataset.scrolling = ''
    clearTimeout(idle)
    idle = setTimeout(() => delete target.dataset.scrolling, 800)
  }, true)
})()
`;
function siteTitle(previewTag) {
  return `<span class="dsh-lockup">${wordmark}<span class="dsh-tag">${previewTag}</span></span>`;
}
var config_default = withMermaid({
  title: "DeepSeek Harness",
  description: "\u7528\u4E8E\u6784\u5EFA Agent Harness \u7684\u63D2\u4EF6\u5316 SDK",
  base,
  head: [
    // VitePress leaves head hrefs untouched, so the base belongs here explicitly.
    ["link", { rel: "icon", type: "image/svg+xml", href: `${base}favicon.svg` }],
    ["style", {}, siteStyle],
    ["script", {}, scrollbarScript]
  ],
  cleanUrls: true,
  srcDir: ".generated",
  cacheDir: ".cache",
  outDir: ".dist",
  locales: {
    root: {
      label: "\u7B80\u4F53\u4E2D\u6587",
      lang: "zh-CN",
      themeConfig: {
        siteTitle: siteTitle("\u6280\u672F\u9884\u89C8"),
        nav: [
          { text: "\u5165\u95E8", link: landingLink("root", guideModules.root.guide), activeMatch: "^/guide/" },
          ...moduleNav("root")
        ],
        sidebar: {
          "/guide/": guideSidebar("root"),
          "/develop/": sidebar("root", "zh-develop"),
          "/reference/": sidebar("root", "zh-reference")
        },
        outline: { label: "\u672C\u9875\u76EE\u5F55" },
        docFooter: { prev: "\u4E0A\u4E00\u7BC7", next: "\u4E0B\u4E00\u7BC7" },
        darkModeSwitchLabel: "\u5916\u89C2",
        lightModeSwitchTitle: "\u5207\u6362\u5230\u6D45\u8272\u4E3B\u9898",
        darkModeSwitchTitle: "\u5207\u6362\u5230\u6DF1\u8272\u4E3B\u9898",
        sidebarMenuLabel: "\u83DC\u5355",
        returnToTopLabel: "\u8FD4\u56DE\u9876\u90E8",
        langMenuLabel: "\u5207\u6362\u8BED\u8A00",
        skipToContentLabel: "\u8DF3\u81F3\u5185\u5BB9"
      }
    },
    en: {
      label: "English",
      lang: "en-US",
      link: "/en/",
      themeConfig: {
        siteTitle: siteTitle("Preview"),
        nav: [
          { text: "Guide", link: landingLink("en", guideModules.en.guide), activeMatch: "^/en/guide/" },
          ...moduleNav("en")
        ],
        sidebar: {
          "/en/guide/": guideSidebar("en"),
          "/en/develop/": sidebar("en", "en-develop"),
          "/en/reference/": sidebar("en", "en-reference")
        },
        editLink: {
          pattern: ({ frontmatter }) => {
            const data = frontmatter;
            const editSource = typeof data === "object" && data !== null ? Reflect.get(data, "editSource") : void 0;
            if (typeof editSource !== "string") throw new Error("Projected documentation page has no editSource frontmatter.");
            return `https://github.com/deepseek-ai/deepseek-harness/edit/master/${editSource}`;
          },
          text: "Edit this page on GitHub"
        },
        outline: { label: "On this page" },
        docFooter: { prev: "Previous", next: "Next" }
      }
    }
  },
  vite: {
    // `srcDir` puts the Vite root inside the disposable generated tree, whose
    // own `public/` no tracked asset can live in.
    publicDir: resolve2(__vite_injected_original_dirname2, "../public"),
    plugins: [
      {
        name: "deepseek-harness-doc-projector",
        configureServer: watchCanonicalDocs
      }
    ]
  },
  markdown: {
    config(md) {
      const renderText = md.renderer.rules.text;
      const renderCode = md.renderer.rules.code_inline;
      if (renderText === void 0 || renderCode === void 0) {
        throw new Error("VitePress Markdown renderer is missing its text or inline-code rule.");
      }
      md.renderer.rules.text = (...args) => escapeVueInterpolation(renderText(...args));
      md.renderer.rules.code_inline = (...args) => escapeVueInterpolation(renderCode(...args));
    }
  },
  mermaid: {},
  themeConfig: sharedTheme
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZpdGVwcmVzcy9jb25maWcudHMiLCAiZG9jcy50cyIsICIuLi9zY3JpcHRzL3Byb2plY3QtZG9jLXNpdGUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS90dWxpcC9kZWVwc2Vlay1oYXJuZXNzL3dlYnNpdGUvLnZpdGVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvdHVsaXAvZGVlcHNlZWstaGFybmVzcy93ZWJzaXRlLy52aXRlcHJlc3MvY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3R1bGlwL2RlZXBzZWVrLWhhcm5lc3Mvd2Vic2l0ZS8udml0ZXByZXNzL2NvbmZpZy50c1wiOy8qKiBWaXRlUHJlc3MgY29uZmlndXJhdGlvbiBmb3IgdGhlIGxvY2FsbHkgcHJvamVjdGVkIGRvY3VtZW50YXRpb24gc2l0ZS4gKi9cblxuaW1wb3J0IHsgcmVhZEZpbGVTeW5jIH0gZnJvbSAnbm9kZTpmcydcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdub2RlOnBhdGgnXG5pbXBvcnQgdHlwZSB7IERlZmF1bHRUaGVtZSwgUGFnZURhdGEgfSBmcm9tICd2aXRlcHJlc3MnXG5pbXBvcnQgdHlwZSB7IFZpdGVEZXZTZXJ2ZXIgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgd2l0aE1lcm1haWQgfSBmcm9tICd2aXRlcHJlc3MtcGx1Z2luLW1lcm1haWQnXG5pbXBvcnQgeyBsYW5kaW5nTGluaywgb3JkZXJlZFBhZ2VzLCByb3V0ZUxpbmssIHNlY3Rpb25TcGVjLCB0eXBlIERvY3NMb2NhbGUsIHR5cGUgRG9jc1BhZ2UsIHR5cGUgRG9jc1NpZGViYXIgfSBmcm9tICcuLi9kb2NzLnRzJ1xuaW1wb3J0IHsgZG9jc1NvdXJjZUZpbGVzLCBwcm9qZWN0RG9jcyB9IGZyb20gJy4uLy4uL3NjcmlwdHMvcHJvamVjdC1kb2Mtc2l0ZS50cydcblxucHJvamVjdERvY3MoKVxuXG5mdW5jdGlvbiBzaWRlYmFyKGxvY2FsZTogRG9jc0xvY2FsZSwgY29sbGVjdGlvbjogTm9uTnVsbGFibGU8RG9jc1BhZ2VbJ3NpZGViYXInXT4pOiBEZWZhdWx0VGhlbWUuU2lkZWJhckl0ZW1bXSB7XG4gIC8vIGBvcmRlcmVkUGFnZXNgIGFscmVhZHkgc29ydHMgYnkgc2VjdGlvbiBwbGFjZW1lbnQsIHNvIGluc2VydGlvbiBvcmRlclxuICAvLyBjYXJyaWVzIHRoZSBncm91cCBvcmRlciBhbmQgZWFjaCBncm91cCBrZWVwcyBpdHMgcGFnZXMgaW4gc2VxdWVuY2UuXG4gIGNvbnN0IGdyb3VwcyA9IG5ldyBNYXA8c3RyaW5nLCBEb2NzUGFnZVtdPigpXG4gIGZvciAoY29uc3QgcGFnZSBvZiBvcmRlcmVkUGFnZXMobG9jYWxlLCBjb2xsZWN0aW9uKSkge1xuICAgIGNvbnN0IGVudHJpZXMgPSBncm91cHMuZ2V0KHBhZ2Uuc2VjdGlvbikgPz8gW11cbiAgICBlbnRyaWVzLnB1c2gocGFnZSlcbiAgICBncm91cHMuc2V0KHBhZ2Uuc2VjdGlvbiwgZW50cmllcylcbiAgfVxuICByZXR1cm4gWy4uLmdyb3Vwcy5lbnRyaWVzKCldLm1hcCgoW3RleHQsIGVudHJpZXNdKSA9PiB7XG4gICAgY29uc3QgeyBjb2xsYXBzZWQgfSA9IHNlY3Rpb25TcGVjKGxvY2FsZSwgdGV4dClcbiAgICByZXR1cm4ge1xuICAgICAgdGV4dCxcbiAgICAgIC8vIEEgcHJlc2VudCBgY29sbGFwc2VkYCBpcyB3aGF0IG1ha2VzIHRoZSBkZWZhdWx0IHRoZW1lIHJlbmRlciB0aGVcbiAgICAgIC8vIGdyb3VwIGFzIGNvbGxhcHNpYmxlIGF0IGFsbCwgc28gYW4gb3BlbiBncm91cCBtdXN0IG9taXQgdGhlIGtleS5cbiAgICAgIC4uLihjb2xsYXBzZWQgPT09IHVuZGVmaW5lZCA/IHt9IDogeyBjb2xsYXBzZWQgfSksXG4gICAgICBpdGVtczogZW50cmllcy5tYXAocGFnZSA9PiAoeyB0ZXh0OiBwYWdlLmxhYmVsLCBsaW5rOiByb3V0ZUxpbmsocGFnZS5yb3V0ZSkgfSkpLFxuICAgIH1cbiAgfSlcbn1cblxuLyoqIE9uZSBtb2R1bGUgbGluayBzaGFyZWQgYmV0d2VlbiB0aGUgbmF2aWdhdGlvbiBiYXIgYW5kIHRoZSBndWlkZSBzaWRlYmFyLiAqL1xuaW50ZXJmYWNlIEd1aWRlTW9kdWxlTGluayB7XG4gIC8qKiBMYWJlbCBzaG93biBpbiB0aGUgbmF2aWdhdGlvbiBiYXIgYW5kIHRoZSBndWlkZSBzaWRlYmFyLiAqL1xuICBsYWJlbDogc3RyaW5nXG4gIC8qKiBTaWRlYmFyIGNvbGxlY3Rpb24gdGhlIGxpbmsgb3BlbnMuICovXG4gIGNvbGxlY3Rpb246IERvY3NTaWRlYmFyXG59XG5cbi8qKlxuICogUGVyLWxvY2FsZSBndWlkZS1tb2R1bGUgZmFjdHM6IHRoZSBndWlkZSBjb2xsZWN0aW9uIGFuZCB0aGUgbW9kdWxlIGxpbmtzXG4gKiBhcHBlbmRlZCB0byB0aGUgZ3VpZGUgc2lkZWJhci5cbiAqL1xuaW50ZXJmYWNlIEd1aWRlTW9kdWxlcyB7XG4gIC8qKiBHdWlkZSBzaWRlYmFyIGNvbGxlY3Rpb24gZm9yIHRoZSBsb2NhbGUuICovXG4gIGd1aWRlOiAnemgtZ3VpZGUnIHwgJ2VuLWd1aWRlJ1xuICAvKiogRGV2ZWxvcG1lbnQgbW9kdWxlIGxpbmsuICovXG4gIGRldmVsb3A6IEd1aWRlTW9kdWxlTGlua1xuICAvKiogUmVmZXJlbmNlIG1vZHVsZSBsaW5rLiAqL1xuICByZWZlcmVuY2U6IEd1aWRlTW9kdWxlTGlua1xufVxuXG4vKipcbiAqIEd1aWRlLW1vZHVsZSBmYWN0cyBrZXllZCBieSBsb2NhbGUsIGdpdmluZyBldmVyeSBtb2R1bGUgbGFiZWwgYW5kIGNvbGxlY3Rpb25cbiAqIG9uZSBob21lIHNoYXJlZCBieSB0aGUgbmF2aWdhdGlvbiBiYXIgYW5kIHRoZSBndWlkZSBzaWRlYmFyLlxuICovXG5jb25zdCBndWlkZU1vZHVsZXMgPSB7XG4gIHJvb3Q6IHtcbiAgICBndWlkZTogJ3poLWd1aWRlJyxcbiAgICBkZXZlbG9wOiB7IGxhYmVsOiAnXHU1RjAwXHU1M0QxJywgY29sbGVjdGlvbjogJ3poLWRldmVsb3AnIH0sXG4gICAgcmVmZXJlbmNlOiB7IGxhYmVsOiAnXHU1M0MyXHU4MDAzJywgY29sbGVjdGlvbjogJ3poLXJlZmVyZW5jZScgfSxcbiAgfSxcbiAgZW46IHtcbiAgICBndWlkZTogJ2VuLWd1aWRlJyxcbiAgICBkZXZlbG9wOiB7IGxhYmVsOiAnRGV2ZWxvcG1lbnQnLCBjb2xsZWN0aW9uOiAnZW4tZGV2ZWxvcCcgfSxcbiAgICByZWZlcmVuY2U6IHsgbGFiZWw6ICdSZWZlcmVuY2UnLCBjb2xsZWN0aW9uOiAnZW4tcmVmZXJlbmNlJyB9LFxuICB9LFxufSBzYXRpc2ZpZXMgUmVjb3JkPERvY3NMb2NhbGUsIEd1aWRlTW9kdWxlcz5cblxuLyoqXG4gKiBHdWlkZSBzaWRlYmFyIHdpdGggZGlyZWN0IGxpbmtzIGludG8gdGhlIGZpcnN0IGRldmVsb3BtZW50IGFuZCByZWZlcmVuY2UgcGFnZXMuXG4gKlxuICogQHBhcmFtIGxvY2FsZSAtIFJvdXRlIHRyZWUgd2hvc2UgZ3VpZGUgc2lkZWJhciBpcyBiZWluZyBidWlsdC5cbiAqIEByZXR1cm5zIEd1aWRlIGdyb3VwcyBmb2xsb3dlZCBieSB0b3AtbGV2ZWwgbGlua3MgdG8gdGhlIG90aGVyIGRvY3VtZW50YXRpb24gbW9kdWxlcy5cbiAqL1xuZnVuY3Rpb24gZ3VpZGVTaWRlYmFyKGxvY2FsZTogRG9jc0xvY2FsZSk6IERlZmF1bHRUaGVtZS5TaWRlYmFySXRlbVtdIHtcbiAgY29uc3QgeyBndWlkZSwgZGV2ZWxvcCwgcmVmZXJlbmNlIH0gPSBndWlkZU1vZHVsZXNbbG9jYWxlXVxuICByZXR1cm4gW1xuICAgIC4uLnNpZGViYXIobG9jYWxlLCBndWlkZSksXG4gICAgLi4uW2RldmVsb3AsIHJlZmVyZW5jZV0ubWFwKCh7IGxhYmVsLCBjb2xsZWN0aW9uIH0pID0+ICh7XG4gICAgICB0ZXh0OiBsYWJlbCxcbiAgICAgIGxpbms6IGxhbmRpbmdMaW5rKGxvY2FsZSwgY29sbGVjdGlvbiksXG4gICAgfSkpLFxuICBdXG59XG5cbi8qKlxuICogTmF2aWdhdGlvbi1iYXIgaXRlbXMgZm9yIHRoZSBtb2R1bGVzIHRoZSBndWlkZSBzaWRlYmFyIGxpbmtzIGludG8sIHJlYWRpbmdcbiAqIHRoZWlyIGxhYmVscyBhbmQgY29sbGVjdGlvbnMgZnJvbSB0aGUgc2hhcmVkIHBlci1sb2NhbGUgcmVjb3JkLlxuICpcbiAqIEBwYXJhbSBsb2NhbGUgLSBSb3V0ZSB0cmVlIHRoZSBuYXZpZ2F0aW9uIGl0ZW1zIGJlbG9uZyB0by5cbiAqIEByZXR1cm5zIFRoZSBtb2R1bGUgaXRlbXMgZm9yIHRoZSBsb2NhbGUncyBuYXZpZ2F0aW9uIGJhci5cbiAqL1xuZnVuY3Rpb24gbW9kdWxlTmF2KGxvY2FsZTogRG9jc0xvY2FsZSk6IERlZmF1bHRUaGVtZS5OYXZJdGVtW10ge1xuICBjb25zdCB7IGRldmVsb3AsIHJlZmVyZW5jZSB9ID0gZ3VpZGVNb2R1bGVzW2xvY2FsZV1cbiAgY29uc3Qgcm91dGVQcmVmaXggPSBsb2NhbGUgPT09ICdyb290JyA/ICcnIDogJy9lbidcbiAgcmV0dXJuIFtcbiAgICB7IHRleHQ6IGRldmVsb3AubGFiZWwsIGxpbms6IGxhbmRpbmdMaW5rKGxvY2FsZSwgZGV2ZWxvcC5jb2xsZWN0aW9uKSwgYWN0aXZlTWF0Y2g6IGBeJHtyb3V0ZVByZWZpeH0vZGV2ZWxvcC9gIH0sXG4gICAgeyB0ZXh0OiByZWZlcmVuY2UubGFiZWwsIGxpbms6IGxhbmRpbmdMaW5rKGxvY2FsZSwgcmVmZXJlbmNlLmNvbGxlY3Rpb24pLCBhY3RpdmVNYXRjaDogYF4ke3JvdXRlUHJlZml4fS9yZWZlcmVuY2UvYCB9LFxuICBdXG59XG5cbmZ1bmN0aW9uIHdhdGNoQ2Fub25pY2FsRG9jcyhzZXJ2ZXI6IFZpdGVEZXZTZXJ2ZXIpOiB2b2lkIHtcbiAgY29uc3Qgc291cmNlcyA9IGRvY3NTb3VyY2VGaWxlcygpXG4gIHNlcnZlci53YXRjaGVyLmFkZChzb3VyY2VzKVxuICBzZXJ2ZXIud2F0Y2hlci5vbignY2hhbmdlJywgKGNoYW5nZWQpID0+IHtcbiAgICBpZiAoIXNvdXJjZXMuaW5jbHVkZXMoY2hhbmdlZCkpIHJldHVyblxuICAgIHByb2plY3REb2NzKClcbiAgfSlcbn1cblxuZnVuY3Rpb24gZXNjYXBlVnVlSW50ZXJwb2xhdGlvbihodG1sOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gaHRtbC5yZXBsYWNlQWxsKCd7eycsICcmIzEyMzsmIzEyMzsnKS5yZXBsYWNlQWxsKCd9fScsICcmIzEyNTsmIzEyNTsnKVxufVxuXG5jb25zdCBzaGFyZWRUaGVtZTogUGljazxEZWZhdWx0VGhlbWUuQ29uZmlnLCAnc2VhcmNoJyB8ICdzb2NpYWxMaW5rcycgfCAnZWRpdExpbmsnPiA9IHtcbiAgc2VhcmNoOiB7XG4gICAgcHJvdmlkZXI6ICdsb2NhbCcsXG4gICAgb3B0aW9uczoge1xuICAgICAgbG9jYWxlczoge1xuICAgICAgICByb290OiB7XG4gICAgICAgICAgdHJhbnNsYXRpb25zOiB7XG4gICAgICAgICAgICBidXR0b246IHtcbiAgICAgICAgICAgICAgYnV0dG9uVGV4dDogJ1x1NjQxQ1x1N0QyMlx1NjU4N1x1Njg2MycsXG4gICAgICAgICAgICAgIGJ1dHRvbkFyaWFMYWJlbDogJ1x1NjQxQ1x1N0QyMlx1NjU4N1x1Njg2MycsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbW9kYWw6IHtcbiAgICAgICAgICAgICAgZGlzcGxheURldGFpbHM6ICdcdTY2M0VcdTc5M0FcdThCRTZcdTdFQzZcdTUyMTdcdTg4NjgnLFxuICAgICAgICAgICAgICByZXNldEJ1dHRvblRpdGxlOiAnXHU2RTA1XHU5NjY0XHU2NDFDXHU3RDIyJyxcbiAgICAgICAgICAgICAgYmFja0J1dHRvblRpdGxlOiAnXHU1MTczXHU5NUVEXHU2NDFDXHU3RDIyJyxcbiAgICAgICAgICAgICAgbm9SZXN1bHRzVGV4dDogJ1x1NjcyQVx1NjI3RVx1NTIzMFx1NzZGOFx1NTE3M1x1N0VEM1x1Njc5QycsXG4gICAgICAgICAgICAgIGZvb3Rlcjoge1xuICAgICAgICAgICAgICAgIHNlbGVjdFRleHQ6ICdcdTkwMDlcdTYyRTknLFxuICAgICAgICAgICAgICAgIHNlbGVjdEtleUFyaWFMYWJlbDogJ1x1NTZERVx1OEY2Nlx1OTUyRScsXG4gICAgICAgICAgICAgICAgbmF2aWdhdGVUZXh0OiAnXHU1MjA3XHU2MzYyJyxcbiAgICAgICAgICAgICAgICBuYXZpZ2F0ZVVwS2V5QXJpYUxhYmVsOiAnXHU0RTBBXHU2NUI5XHU1NDExXHU5NTJFJyxcbiAgICAgICAgICAgICAgICBuYXZpZ2F0ZURvd25LZXlBcmlhTGFiZWw6ICdcdTRFMEJcdTY1QjlcdTU0MTFcdTk1MkUnLFxuICAgICAgICAgICAgICAgIGNsb3NlVGV4dDogJ1x1NTE3M1x1OTVFRCcsXG4gICAgICAgICAgICAgICAgY2xvc2VLZXlBcmlhTGFiZWw6ICdFc2MgXHU5NTJFJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgc29jaWFsTGlua3M6IFtcbiAgICB7IGljb246ICdnaXRodWInLCBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL2RlZXBzZWVrLWFpL2RlZXBzZWVrLWhhcm5lc3MnIH0sXG4gIF0sXG4gIGVkaXRMaW5rOiB7XG4gICAgcGF0dGVybjogKHsgZnJvbnRtYXR0ZXIgfTogUGFnZURhdGEpID0+IHtcbiAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBmcm9udG1hdHRlclxuICAgICAgY29uc3QgZWRpdFNvdXJjZTogdW5rbm93biA9IHR5cGVvZiBkYXRhID09PSAnb2JqZWN0JyAmJiBkYXRhICE9PSBudWxsID8gUmVmbGVjdC5nZXQoZGF0YSwgJ2VkaXRTb3VyY2UnKSA6IHVuZGVmaW5lZFxuICAgICAgaWYgKHR5cGVvZiBlZGl0U291cmNlICE9PSAnc3RyaW5nJykgdGhyb3cgbmV3IEVycm9yKCdQcm9qZWN0ZWQgZG9jdW1lbnRhdGlvbiBwYWdlIGhhcyBubyBlZGl0U291cmNlIGZyb250bWF0dGVyLicpXG4gICAgICByZXR1cm4gYGh0dHBzOi8vZ2l0aHViLmNvbS9kZWVwc2Vlay1haS9kZWVwc2Vlay1oYXJuZXNzL2VkaXQvbWFzdGVyLyR7ZWRpdFNvdXJjZX1gXG4gICAgfSxcbiAgICB0ZXh0OiAnXHU1NzI4IEdpdEh1YiBcdTRFMEFcdTdGMTZcdThGOTFcdTZCNjRcdTk4NzUnLFxuICB9LFxufVxuXG4vKiogU2l0ZSBiYXNlIHBhdGgsIGNhcnJ5aW5nIHRoZSBsZWFkaW5nIGFuZCB0cmFpbGluZyBzbGFzaGVzIFZpdGVQcmVzcyByZXF1aXJlcy4gKi9cbmNvbnN0IGJhc2UgPSBwcm9jZXNzLmVudi5ET0NTX0JBU0UgPz8gJy8nXG5cbi8qKlxuICogVGhlIERlZXBTZWVrIHdvcmRtYXJrLCBpbmxpbmVkIHNvIGl0cyBgY3VycmVudENvbG9yYCBmaWxscyBmb2xsb3cgdGhlIGFjdGl2ZVxuICogdGhlbWUuIEFuIGA8aW1nPmAgd291bGQgZnJlZXplIHRoZSBtYXJrIGF0IHRoZSBjb2xvcnMgdGhlIGZpbGUgZGVjbGFyZXMuXG4gKi9cbmNvbnN0IHdvcmRtYXJrID0gcmVhZEZpbGVTeW5jKHJlc29sdmUoaW1wb3J0Lm1ldGEuZGlybmFtZSwgJy4uL3B1YmxpYy93b3JkbWFyay5zdmcnKSwgJ3V0ZjgnKVxuICAudHJpbSgpXG4gIC5yZXBsYWNlKCc8c3ZnICcsICc8c3ZnIGNsYXNzPVwiZHNoLXdvcmRtYXJrXCIgJylcblxuLyoqXG4gKiBTdHlsZXMgdGhlIGRlZmF1bHQgdGhlbWUgZG9lcyBub3QgcHJvdmlkZSwgY2FycmllZCBpbmxpbmUgYmVjYXVzZSB0aGUgc2l0ZVxuICogcnVucyB0aGUgc3RvY2sgdGhlbWUgd2l0aCBubyB0aGVtZSBkaXJlY3Rvcnkgb2YgaXRzIG93bi5cbiAqXG4gKiBUaGUgbmF2aWdhdGlvbi1iYXIgbG9ja3VwIHBhaXJzIHdpdGggYHNpdGVUaXRsZWAuIFRoZSBzY3JvbGxiYXIgcnVsZXMgcmVwbGFjZVxuICogdGhlIHNpZGViYXIncyBwbGF0Zm9ybSBiYXIsIHdoaWNoIHJlc2VydmVzIDE1cHggb2YgYSAyNjVweCBjb2x1bW4gYW5kIGRyYXdzIGFcbiAqIHRyYWNrIHRoZSByZXN0IG9mIHRoZSBuYXZpZ2F0aW9uIGhhcyBubyBib3JkZXIgZm9yOyBgc2Nyb2xsYmFyU2NyaXB0YCBzdXBwbGllc1xuICogdGhlIG1hcmtlciB0aGF0IHJldmVhbHMgdGhlIHRodW1iLiBDaHJvbWUgZHJvcHMgYDo6LXdlYmtpdC1zY3JvbGxiYXJgIG9uY2VcbiAqIGBzY3JvbGxiYXItd2lkdGhgIGlzIHNldCB0byBhbnl0aGluZyBidXQgYGF1dG9gLCBzbyB0aGUgc3RhbmRhcmQgcHJvcGVydGllc1xuICogc3RheSBiZWhpbmQgYSBxdWVyeSBvbmx5IEZpcmVmb3ggYW5zd2Vycy5cbiAqL1xuY29uc3Qgc2l0ZVN0eWxlID0gYFxuLmRzaC1sb2NrdXAgeyBkaXNwbGF5OiBpbmxpbmUtZmxleDsgYWxpZ24taXRlbXM6IGNlbnRlcjsgZ2FwOiA4cHg7IG1pbi13aWR0aDogMDsgfVxuLmRzaC13b3JkbWFyayB7IGRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ6IDIycHg7IHdpZHRoOiBhdXRvOyBjb2xvcjogdmFyKC0tdnAtYy10ZXh0LTEpOyB9XG4uZHNoLXRhZyB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS12cC1jLWJyYW5kLXNvZnQpO1xuICBib3JkZXItcmFkaXVzOiA5OTlweDtcbiAgcGFkZGluZzogMXB4IDlweDtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBmb250LXdlaWdodDogNTAwO1xuICBsaW5lLWhlaWdodDogMThweDtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgY29sb3I6IHZhcigtLXZwLWMtYnJhbmQtMSk7XG59XG5cbi5WUFNpZGViYXI6Oi13ZWJraXQtc2Nyb2xsYmFyIHsgd2lkdGg6IDZweDsgfVxuLlZQU2lkZWJhcjo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sgeyBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDsgfVxuLlZQU2lkZWJhcjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuM3M7XG59XG4uVlBTaWRlYmFyW2RhdGEtc2Nyb2xsaW5nXTo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIgeyBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS12cC1jLXRleHQtMyk7IH1cbkBzdXBwb3J0cyBub3Qgc2VsZWN0b3IoOjotd2Via2l0LXNjcm9sbGJhcikge1xuICAuVlBTaWRlYmFyIHsgc2Nyb2xsYmFyLXdpZHRoOiB0aGluOyBzY3JvbGxiYXItY29sb3I6IHRyYW5zcGFyZW50IHRyYW5zcGFyZW50OyB9XG4gIC5WUFNpZGViYXJbZGF0YS1zY3JvbGxpbmddIHsgc2Nyb2xsYmFyLWNvbG9yOiB2YXIoLS12cC1jLXRleHQtMykgdHJhbnNwYXJlbnQ7IH1cbn1cbmBcblxuLyoqXG4gKiBNYXJrIHRoZSBzaWRlYmFyIHdoaWxlIGl0IHNjcm9sbHMsIHNvIGl0cyBzY3JvbGxiYXIgcmVzdHMgaW52aXNpYmxlLlxuICpcbiAqIEEgc2l6ZWQgYDo6LXdlYmtpdC1zY3JvbGxiYXJgIG9wdHMgdGhlIGVsZW1lbnQgb3V0IG9mIHRoZSBwbGF0Zm9ybSdzXG4gKiBzZWxmLWhpZGluZyBvdmVybGF5IGJhciwgbGVhdmluZyBvbmUgcGFpbnRlZCBhdCBhbGwgdGltZXM7IG5vdGhpbmcgaW4gQ1NTXG4gKiByZXBvcnRzIHRoYXQgYW4gZWxlbWVudCBpcyBzY3JvbGxpbmcuIFRoZSBsaXN0ZW5lciBjYXB0dXJlcyBpbnN0ZWFkIG9mXG4gKiBidWJibGluZyBiZWNhdXNlIHNjcm9sbCBldmVudHMgZG8gbm90IGJ1YmJsZSwgYW5kIG1hcmtzIGEgYGRhdGEtYCBhdHRyaWJ1dGVcbiAqIHJhdGhlciB0aGFuIGEgY2xhc3MgYmVjYXVzZSBWdWUgcmV3cml0ZXMgYGNsYXNzYCB3aG9sZXNhbGUgd2hlbiBpdCBwYXRjaGVzXG4gKiB0aGUgZWxlbWVudC5cbiAqL1xuY29uc3Qgc2Nyb2xsYmFyU2NyaXB0ID0gYFxuKCgpID0+IHtcbiAgbGV0IGlkbGVcbiAgYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0XG4gICAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgRWxlbWVudCkgfHwgIXRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ1ZQU2lkZWJhcicpKSByZXR1cm5cbiAgICB0YXJnZXQuZGF0YXNldC5zY3JvbGxpbmcgPSAnJ1xuICAgIGNsZWFyVGltZW91dChpZGxlKVxuICAgIGlkbGUgPSBzZXRUaW1lb3V0KCgpID0+IGRlbGV0ZSB0YXJnZXQuZGF0YXNldC5zY3JvbGxpbmcsIDgwMClcbiAgfSwgdHJ1ZSlcbn0pKClcbmBcblxuLyoqXG4gKiBOYXZpZ2F0aW9uLWJhciB0aXRsZTogdGhlIERlZXBTZWVrIHdvcmRtYXJrIGFuZCB0aGUgcmVsZWFzZS1zdGFnZSB0YWcuXG4gKiBWaXRlUHJlc3MgcmVuZGVycyBgc2l0ZVRpdGxlYCBhcyBIVE1MLlxuICpcbiAqIEBwYXJhbSBwcmV2aWV3VGFnIC0gTG9jYWxpemVkIHJlbGVhc2Utc3RhZ2UgbGFiZWwuXG4gKiBAcmV0dXJucyBNYXJrdXAgcGxhY2VkIGJlc2lkZSB0aGUgbmF2aWdhdGlvbi1iYXIgaG9tZSBsaW5rLlxuICovXG5mdW5jdGlvbiBzaXRlVGl0bGUocHJldmlld1RhZzogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGA8c3BhbiBjbGFzcz1cImRzaC1sb2NrdXBcIj4ke3dvcmRtYXJrfTxzcGFuIGNsYXNzPVwiZHNoLXRhZ1wiPiR7cHJldmlld1RhZ308L3NwYW4+PC9zcGFuPmBcbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aE1lcm1haWQoe1xuICB0aXRsZTogJ0RlZXBTZWVrIEhhcm5lc3MnLFxuICBkZXNjcmlwdGlvbjogJ1x1NzUyOFx1NEU4RVx1Njc4NFx1NUVGQSBBZ2VudCBIYXJuZXNzIFx1NzY4NFx1NjNEMlx1NEVGNlx1NTMxNiBTREsnLFxuICBiYXNlLFxuICBoZWFkOiBbXG4gICAgLy8gVml0ZVByZXNzIGxlYXZlcyBoZWFkIGhyZWZzIHVudG91Y2hlZCwgc28gdGhlIGJhc2UgYmVsb25ncyBoZXJlIGV4cGxpY2l0bHkuXG4gICAgWydsaW5rJywgeyByZWw6ICdpY29uJywgdHlwZTogJ2ltYWdlL3N2Zyt4bWwnLCBocmVmOiBgJHtiYXNlfWZhdmljb24uc3ZnYCB9XSxcbiAgICBbJ3N0eWxlJywge30sIHNpdGVTdHlsZV0sXG4gICAgWydzY3JpcHQnLCB7fSwgc2Nyb2xsYmFyU2NyaXB0XSxcbiAgXSxcbiAgY2xlYW5VcmxzOiB0cnVlLFxuICBzcmNEaXI6ICcuZ2VuZXJhdGVkJyxcbiAgY2FjaGVEaXI6ICcuY2FjaGUnLFxuICBvdXREaXI6ICcuZGlzdCcsXG4gIGxvY2FsZXM6IHtcbiAgICByb290OiB7XG4gICAgICBsYWJlbDogJ1x1N0I4MFx1NEY1M1x1NEUyRFx1NjU4NycsXG4gICAgICBsYW5nOiAnemgtQ04nLFxuICAgICAgdGhlbWVDb25maWc6IHtcbiAgICAgICAgc2l0ZVRpdGxlOiBzaXRlVGl0bGUoJ1x1NjI4MFx1NjcyRlx1OTg4NFx1ODlDOCcpLFxuICAgICAgICBuYXY6IFtcbiAgICAgICAgICB7IHRleHQ6ICdcdTUxNjVcdTk1RTgnLCBsaW5rOiBsYW5kaW5nTGluaygncm9vdCcsIGd1aWRlTW9kdWxlcy5yb290Lmd1aWRlKSwgYWN0aXZlTWF0Y2g6ICdeL2d1aWRlLycgfSxcbiAgICAgICAgICAuLi5tb2R1bGVOYXYoJ3Jvb3QnKSxcbiAgICAgICAgXSxcbiAgICAgICAgc2lkZWJhcjoge1xuICAgICAgICAgICcvZ3VpZGUvJzogZ3VpZGVTaWRlYmFyKCdyb290JyksXG4gICAgICAgICAgJy9kZXZlbG9wLyc6IHNpZGViYXIoJ3Jvb3QnLCAnemgtZGV2ZWxvcCcpLFxuICAgICAgICAgICcvcmVmZXJlbmNlLyc6IHNpZGViYXIoJ3Jvb3QnLCAnemgtcmVmZXJlbmNlJyksXG4gICAgICAgIH0sXG4gICAgICAgIG91dGxpbmU6IHsgbGFiZWw6ICdcdTY3MkNcdTk4NzVcdTc2RUVcdTVGNTUnIH0sXG4gICAgICAgIGRvY0Zvb3RlcjogeyBwcmV2OiAnXHU0RTBBXHU0RTAwXHU3QkM3JywgbmV4dDogJ1x1NEUwQlx1NEUwMFx1N0JDNycgfSxcbiAgICAgICAgZGFya01vZGVTd2l0Y2hMYWJlbDogJ1x1NTkxNlx1ODlDMicsXG4gICAgICAgIGxpZ2h0TW9kZVN3aXRjaFRpdGxlOiAnXHU1MjA3XHU2MzYyXHU1MjMwXHU2RDQ1XHU4MjcyXHU0RTNCXHU5ODk4JyxcbiAgICAgICAgZGFya01vZGVTd2l0Y2hUaXRsZTogJ1x1NTIwN1x1NjM2Mlx1NTIzMFx1NkRGMVx1ODI3Mlx1NEUzQlx1OTg5OCcsXG4gICAgICAgIHNpZGViYXJNZW51TGFiZWw6ICdcdTgzRENcdTUzNTUnLFxuICAgICAgICByZXR1cm5Ub1RvcExhYmVsOiAnXHU4RkQ0XHU1NkRFXHU5ODc2XHU5MEU4JyxcbiAgICAgICAgbGFuZ01lbnVMYWJlbDogJ1x1NTIwN1x1NjM2Mlx1OEJFRFx1OEEwMCcsXG4gICAgICAgIHNraXBUb0NvbnRlbnRMYWJlbDogJ1x1OERGM1x1ODFGM1x1NTE4NVx1NUJCOScsXG4gICAgICB9LFxuICAgIH0sXG4gICAgZW46IHtcbiAgICAgIGxhYmVsOiAnRW5nbGlzaCcsXG4gICAgICBsYW5nOiAnZW4tVVMnLFxuICAgICAgbGluazogJy9lbi8nLFxuICAgICAgdGhlbWVDb25maWc6IHtcbiAgICAgICAgc2l0ZVRpdGxlOiBzaXRlVGl0bGUoJ1ByZXZpZXcnKSxcbiAgICAgICAgbmF2OiBbXG4gICAgICAgICAgeyB0ZXh0OiAnR3VpZGUnLCBsaW5rOiBsYW5kaW5nTGluaygnZW4nLCBndWlkZU1vZHVsZXMuZW4uZ3VpZGUpLCBhY3RpdmVNYXRjaDogJ14vZW4vZ3VpZGUvJyB9LFxuICAgICAgICAgIC4uLm1vZHVsZU5hdignZW4nKSxcbiAgICAgICAgXSxcbiAgICAgICAgc2lkZWJhcjoge1xuICAgICAgICAgICcvZW4vZ3VpZGUvJzogZ3VpZGVTaWRlYmFyKCdlbicpLFxuICAgICAgICAgICcvZW4vZGV2ZWxvcC8nOiBzaWRlYmFyKCdlbicsICdlbi1kZXZlbG9wJyksXG4gICAgICAgICAgJy9lbi9yZWZlcmVuY2UvJzogc2lkZWJhcignZW4nLCAnZW4tcmVmZXJlbmNlJyksXG4gICAgICAgIH0sXG4gICAgICAgIGVkaXRMaW5rOiB7XG4gICAgICAgICAgcGF0dGVybjogKHsgZnJvbnRtYXR0ZXIgfTogUGFnZURhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBmcm9udG1hdHRlclxuICAgICAgICAgICAgY29uc3QgZWRpdFNvdXJjZTogdW5rbm93biA9IHR5cGVvZiBkYXRhID09PSAnb2JqZWN0JyAmJiBkYXRhICE9PSBudWxsID8gUmVmbGVjdC5nZXQoZGF0YSwgJ2VkaXRTb3VyY2UnKSA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgaWYgKHR5cGVvZiBlZGl0U291cmNlICE9PSAnc3RyaW5nJykgdGhyb3cgbmV3IEVycm9yKCdQcm9qZWN0ZWQgZG9jdW1lbnRhdGlvbiBwYWdlIGhhcyBubyBlZGl0U291cmNlIGZyb250bWF0dGVyLicpXG4gICAgICAgICAgICByZXR1cm4gYGh0dHBzOi8vZ2l0aHViLmNvbS9kZWVwc2Vlay1haS9kZWVwc2Vlay1oYXJuZXNzL2VkaXQvbWFzdGVyLyR7ZWRpdFNvdXJjZX1gXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0ZXh0OiAnRWRpdCB0aGlzIHBhZ2Ugb24gR2l0SHViJyxcbiAgICAgICAgfSxcbiAgICAgICAgb3V0bGluZTogeyBsYWJlbDogJ09uIHRoaXMgcGFnZScgfSxcbiAgICAgICAgZG9jRm9vdGVyOiB7IHByZXY6ICdQcmV2aW91cycsIG5leHQ6ICdOZXh0JyB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB2aXRlOiB7XG4gICAgLy8gYHNyY0RpcmAgcHV0cyB0aGUgVml0ZSByb290IGluc2lkZSB0aGUgZGlzcG9zYWJsZSBnZW5lcmF0ZWQgdHJlZSwgd2hvc2VcbiAgICAvLyBvd24gYHB1YmxpYy9gIG5vIHRyYWNrZWQgYXNzZXQgY2FuIGxpdmUgaW4uXG4gICAgcHVibGljRGlyOiByZXNvbHZlKGltcG9ydC5tZXRhLmRpcm5hbWUsICcuLi9wdWJsaWMnKSxcbiAgICBwbHVnaW5zOiBbXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdkZWVwc2Vlay1oYXJuZXNzLWRvYy1wcm9qZWN0b3InLFxuICAgICAgICBjb25maWd1cmVTZXJ2ZXI6IHdhdGNoQ2Fub25pY2FsRG9jcyxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbiAgbWFya2Rvd246IHtcbiAgICBjb25maWcobWQpIHtcbiAgICAgIGNvbnN0IHJlbmRlclRleHQgPSBtZC5yZW5kZXJlci5ydWxlcy50ZXh0XG4gICAgICBjb25zdCByZW5kZXJDb2RlID0gbWQucmVuZGVyZXIucnVsZXMuY29kZV9pbmxpbmVcbiAgICAgIGlmIChyZW5kZXJUZXh0ID09PSB1bmRlZmluZWQgfHwgcmVuZGVyQ29kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVml0ZVByZXNzIE1hcmtkb3duIHJlbmRlcmVyIGlzIG1pc3NpbmcgaXRzIHRleHQgb3IgaW5saW5lLWNvZGUgcnVsZS4nKVxuICAgICAgfVxuICAgICAgbWQucmVuZGVyZXIucnVsZXMudGV4dCA9ICguLi5hcmdzKSA9PiBlc2NhcGVWdWVJbnRlcnBvbGF0aW9uKHJlbmRlclRleHQoLi4uYXJncykpXG4gICAgICBtZC5yZW5kZXJlci5ydWxlcy5jb2RlX2lubGluZSA9ICguLi5hcmdzKSA9PiBlc2NhcGVWdWVJbnRlcnBvbGF0aW9uKHJlbmRlckNvZGUoLi4uYXJncykpXG4gICAgfSxcbiAgfSxcbiAgbWVybWFpZDoge30sXG4gIHRoZW1lQ29uZmlnOiBzaGFyZWRUaGVtZSxcbn0pXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL3R1bGlwL2RlZXBzZWVrLWhhcm5lc3Mvd2Vic2l0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvdHVsaXAvZGVlcHNlZWstaGFybmVzcy93ZWJzaXRlL2RvY3MudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvdHVsaXAvZGVlcHNlZWstaGFybmVzcy93ZWJzaXRlL2RvY3MudHNcIjsvKipcbiAqIENhbm9uaWNhbCBwdWJsaWNhdGlvbiBtYW5pZmVzdCBmb3IgdGhlIGRvY3VtZW50YXRpb24gd2Vic2l0ZS5cbiAqXG4gKiBNYXJrZG93biBzdGF5cyBpbiBpdHMgb3duaW5nIHJlcG9zaXRvcnkgdGllci4gVGhpcyBtYW5pZmVzdCBtYXBzIGVhY2hcbiAqIGNhbm9uaWNhbCBzb3VyY2UgaW50byBtYXRjaGluZyByb3V0ZSB0cmVlcyBmb3IgYm90aCBzaXRlIGxvY2FsZXM7IHdoZW4gYVxuICogdHJhbnNsYXRpb24gaXMgYWJzZW50LCBib3RoIHJvdXRlcyBpbnRlbnRpb25hbGx5IHByb2plY3QgdGhlIGF2YWlsYWJsZVxuICogc291cmNlIGluc3RlYWQgb2YgY29weWluZyBNYXJrZG93bi5cbiAqL1xuXG4vKiogTG9jYWxlIGtleSB1c2VkIGJ5IHRoZSBWaXRlUHJlc3Mgc2l0ZS4gKi9cbmV4cG9ydCB0eXBlIERvY3NMb2NhbGUgPSAncm9vdCcgfCAnZW4nXG5cbi8qKiBTaWRlYmFyIGNvbGxlY3Rpb24gcmVuZGVyZWQgZm9yIG9uZSBsb2NhbGUgYW5kIHRvcC1sZXZlbCBtb2R1bGUuICovXG5leHBvcnQgdHlwZSBEb2NzU2lkZWJhciA9XG4gIHwgJ3poLWd1aWRlJ1xuICB8ICd6aC1kZXZlbG9wJ1xuICB8ICd6aC1yZWZlcmVuY2UnXG4gIHwgJ2VuLWd1aWRlJ1xuICB8ICdlbi1kZXZlbG9wJ1xuICB8ICdlbi1yZWZlcmVuY2UnXG5cbi8qKiBBIHBhZ2UgcHJvamVjdGVkIGludG8gdGhlIFZpdGVQcmVzcyBzb3VyY2UgdHJlZS4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRG9jc1BhZ2Uge1xuICAvKiogVml0ZVByZXNzIGxvY2FsZSB3aG9zZSByb3V0ZSB0cmVlIG93bnMgdGhpcyBwcm9qZWN0aW9uLiAqL1xuICBsb2NhbGU6IERvY3NMb2NhbGVcbiAgLyoqIExhbmd1YWdlIG9mIHRoZSBjYW5vbmljYWwgc291cmNlIGN1cnJlbnRseSBwcm9qZWN0ZWQgYXQgdGhpcyByb3V0ZS4gKi9cbiAgY29udGVudExvY2FsZTogJ3poLUNOJyB8ICdlbi1VUydcbiAgLyoqIFJlcG9zaXRvcnktcmVsYXRpdmUgY2Fub25pY2FsIE1hcmtkb3duIHNvdXJjZS4gKi9cbiAgc291cmNlOiBzdHJpbmdcbiAgLyoqIFZpdGVQcmVzcyByb3V0ZSwgaW5jbHVkaW5nIHRoZSBgLm1kYCBzdWZmaXguICovXG4gIHJvdXRlOiBzdHJpbmdcbiAgLyoqIE5hdmlnYXRpb24gbGFiZWwgc2hvd24gaW4gdGhlIHNpZGViYXIuICovXG4gIGxhYmVsOiBzdHJpbmdcbiAgLyoqIFNpZGViYXIgY29sbGVjdGlvbiB0aGF0IG93bnMgdGhlIHBhZ2UsIG9yIG51bGwgZm9yIGEgbG9jYWxlIGhvbWUgcGFnZS4gKi9cbiAgc2lkZWJhcjogRG9jc1NpZGViYXIgfCBudWxsXG4gIC8qKiBTZWN0aW9uIGxhYmVsIHdpdGhpbiB0aGUgc2lkZWJhci4gKi9cbiAgc2VjdGlvbjogc3RyaW5nXG4gIC8qKiBTdGFibGUgb3JkZXIgd2l0aGluIHRoZSBzZWN0aW9uLiAqL1xuICBvcmRlcjogbnVtYmVyXG4gIC8qKiBIZWFkaW5nIGxldmVscyBpbmNsdWRlZCBpbiB0aGlzIHBhZ2UncyBWaXRlUHJlc3Mgb3V0bGluZS4gKi9cbiAgb3V0bGluZT86IG51bWJlciB8IHJlYWRvbmx5IFtudW1iZXIsIG51bWJlcl0gfCAnZGVlcCcgfCBmYWxzZVxuICAvKiogQWRkaXRpb25hbCByZXBvc2l0b3J5IHBhdGhzIHRoYXQgcmVzb2x2ZSB0byB0aGlzIHBhZ2UuICovXG4gIHNvdXJjZUFsaWFzZXM/OiBzdHJpbmdbXVxufVxuXG5pbnRlcmZhY2UgTWlycm9yZWRQYWdlIHtcbiAgc291cmNlOiBzdHJpbmcgfCBSZWNvcmQ8RG9jc0xvY2FsZSwgc3RyaW5nPlxuICByb3V0ZTogc3RyaW5nXG4gIGNvbnRlbnRMb2NhbGU6IERvY3NQYWdlWydjb250ZW50TG9jYWxlJ10gfCBSZWNvcmQ8RG9jc0xvY2FsZSwgRG9jc1BhZ2VbJ2NvbnRlbnRMb2NhbGUnXT5cbiAgbGFiZWw6IFJlY29yZDxEb2NzTG9jYWxlLCBzdHJpbmc+XG4gIHNpZGViYXI6IFJlY29yZDxEb2NzTG9jYWxlLCBEb2NzU2lkZWJhciB8IG51bGw+XG4gIHNlY3Rpb246IFJlY29yZDxEb2NzTG9jYWxlLCBzdHJpbmc+XG4gIG9yZGVyOiBudW1iZXJcbiAgb3V0bGluZT86IERvY3NQYWdlWydvdXRsaW5lJ11cbiAgc291cmNlQWxpYXNlcz86IHN0cmluZ1tdIHwgUGFydGlhbDxSZWNvcmQ8RG9jc0xvY2FsZSwgc3RyaW5nW10+PlxufVxuXG50eXBlIFBhaXJlZFBhZ2UgPSBPbWl0PE1pcnJvcmVkUGFnZSwgJ3NvdXJjZScgfCAnY29udGVudExvY2FsZScgfCAnc291cmNlQWxpYXNlcyc+ICYge1xuICAvKiogRW5nbGlzaCBzaWRlIG9mIGEgc2libGluZyBgZm9vLm1kYCAvIGBmb28uemgubWRgIHBhaXIuICovXG4gIHNvdXJjZTogc3RyaW5nXG4gIC8qKiBMYW5ndWFnZS1uZXV0cmFsIHJlcG9zaXRvcnkgYWxpYXNlcywgc3VjaCBhcyB0aGUgZGlyZWN0b3J5IG9mIGFuIGluZGV4IHBhZ2UuICovXG4gIHNvdXJjZUFsaWFzZXM/OiBzdHJpbmdbXVxufVxuXG5mdW5jdGlvbiBsb2NhbGl6ZWQ8VD4odmFsdWU6IFQgfCBSZWNvcmQ8RG9jc0xvY2FsZSwgVD4sIGxvY2FsZTogRG9jc0xvY2FsZSk6IFQge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAhPT0gbnVsbCAmJiAhQXJyYXkuaXNBcnJheSh2YWx1ZSlcbiAgICA/ICh2YWx1ZSBhcyBSZWNvcmQ8RG9jc0xvY2FsZSwgVD4pW2xvY2FsZV1cbiAgICA6IHZhbHVlXG59XG5cbmZ1bmN0aW9uIG1pcnJvcmVkUGFnZXMocGFnZXM6IE1pcnJvcmVkUGFnZVtdKTogRG9jc1BhZ2VbXSB7XG4gIHJldHVybiBwYWdlcy5mbGF0TWFwKHBhZ2UgPT4gKFsncm9vdCcsICdlbiddIGFzIGNvbnN0KS5tYXAoKGxvY2FsZSkgPT4ge1xuICAgIGNvbnN0IGFsaWFzZXMgPSBwYWdlLnNvdXJjZUFsaWFzZXMgPT09IHVuZGVmaW5lZFxuICAgICAgPyB1bmRlZmluZWRcbiAgICAgIDogQXJyYXkuaXNBcnJheShwYWdlLnNvdXJjZUFsaWFzZXMpID8gcGFnZS5zb3VyY2VBbGlhc2VzIDogcGFnZS5zb3VyY2VBbGlhc2VzW2xvY2FsZV1cbiAgICByZXR1cm4ge1xuICAgICAgbG9jYWxlLFxuICAgICAgY29udGVudExvY2FsZTogbG9jYWxpemVkKHBhZ2UuY29udGVudExvY2FsZSwgbG9jYWxlKSxcbiAgICAgIHNvdXJjZTogbG9jYWxpemVkKHBhZ2Uuc291cmNlLCBsb2NhbGUpLFxuICAgICAgcm91dGU6IGxvY2FsZSA9PT0gJ3Jvb3QnID8gcGFnZS5yb3V0ZSA6IGBlbi8ke3BhZ2Uucm91dGV9YCxcbiAgICAgIGxhYmVsOiBwYWdlLmxhYmVsW2xvY2FsZV0sXG4gICAgICBzaWRlYmFyOiBwYWdlLnNpZGViYXJbbG9jYWxlXSxcbiAgICAgIHNlY3Rpb246IHBhZ2Uuc2VjdGlvbltsb2NhbGVdLFxuICAgICAgb3JkZXI6IHBhZ2Uub3JkZXIsXG4gICAgICAuLi4ocGFnZS5vdXRsaW5lID09PSB1bmRlZmluZWQgPyB7fSA6IHsgb3V0bGluZTogcGFnZS5vdXRsaW5lIH0pLFxuICAgICAgLi4uKGFsaWFzZXMgPT09IHVuZGVmaW5lZCA/IHt9IDogeyBzb3VyY2VBbGlhc2VzOiBhbGlhc2VzIH0pLFxuICAgIH1cbiAgfSkpXG59XG5cbmZ1bmN0aW9uIHBhaXJlZFBhZ2VzKHBhZ2VzOiBQYWlyZWRQYWdlW10pOiBEb2NzUGFnZVtdIHtcbiAgcmV0dXJuIG1pcnJvcmVkUGFnZXMocGFnZXMubWFwKChwYWdlKSA9PiB7XG4gICAgY29uc3QgY2hpbmVzZVNvdXJjZSA9IHBhZ2Uuc291cmNlLnJlcGxhY2UoL1xcLm1kJC8sICcuemgubWQnKVxuICAgIGNvbnN0IHNoYXJlZEFsaWFzZXMgPSBwYWdlLnNvdXJjZUFsaWFzZXMgPz8gW11cbiAgICByZXR1cm4ge1xuICAgICAgLi4ucGFnZSxcbiAgICAgIHNvdXJjZTogeyByb290OiBjaGluZXNlU291cmNlLCBlbjogcGFnZS5zb3VyY2UgfSxcbiAgICAgIGNvbnRlbnRMb2NhbGU6IHsgcm9vdDogJ3poLUNOJywgZW46ICdlbi1VUycgfSxcbiAgICAgIHNvdXJjZUFsaWFzZXM6IHtcbiAgICAgICAgcm9vdDogWy4uLnNoYXJlZEFsaWFzZXMsIHBhZ2Uuc291cmNlXSxcbiAgICAgICAgZW46IFsuLi5zaGFyZWRBbGlhc2VzLCBjaGluZXNlU291cmNlXSxcbiAgICAgIH0sXG4gICAgfVxuICB9KSlcbn1cblxuY29uc3QgaG9tZUFuZEd1aWRlID0gcGFpcmVkUGFnZXMoW1xuICB7XG4gICAgc291cmNlOiAnZG9jcy91c2VyL2luZGV4Lm1kJyxcbiAgICByb3V0ZTogJ2luZGV4Lm1kJyxcbiAgICBsYWJlbDogeyByb290OiAnRGVlcFNlZWsgSGFybmVzcycsIGVuOiAnRGVlcFNlZWsgSGFybmVzcycgfSxcbiAgICBzaWRlYmFyOiB7IHJvb3Q6IG51bGwsIGVuOiBudWxsIH0sXG4gICAgc2VjdGlvbjogeyByb290OiAnXHU5OTk2XHU5ODc1JywgZW46ICdIb21lJyB9LFxuICAgIG9yZGVyOiAwLFxuICB9LFxuICB7XG4gICAgc291cmNlOiAnZG9jcy91c2VyL2d1aWRlL2luZGV4Lm1kJyxcbiAgICByb3V0ZTogJ2d1aWRlL3F1aWNrc3RhcnQubWQnLFxuICAgIGxhYmVsOiB7IHJvb3Q6ICdcdTRGN0ZcdTc1MjggV2ViIFVJJywgZW46ICdVc2UgdGhlIFdlYiBVSScgfSxcbiAgICBzaWRlYmFyOiB7IHJvb3Q6ICd6aC1ndWlkZScsIGVuOiAnZW4tZ3VpZGUnIH0sXG4gICAgc2VjdGlvbjogeyByb290OiAnXHU1MTY1XHU5NUU4JywgZW46ICdHdWlkZScgfSxcbiAgICBvcmRlcjogMSxcbiAgICBzb3VyY2VBbGlhc2VzOiBbJ2RvY3MvdXNlci9ndWlkZSddLFxuICB9LFxuICB7XG4gICAgc291cmNlOiAnZG9jcy91c2VyL2d1aWRlL3Byb3ZpZGVycy5tZCcsXG4gICAgcm91dGU6ICdndWlkZS9wcm92aWRlcnMubWQnLFxuICAgIGxhYmVsOiB7IHJvb3Q6ICdcdTkxNERcdTdGNkVcdTZBMjFcdTU3OEInLCBlbjogJ0NvbmZpZ3VyZSBtb2RlbHMnIH0sXG4gICAgc2lkZWJhcjogeyByb290OiAnemgtZ3VpZGUnLCBlbjogJ2VuLWd1aWRlJyB9LFxuICAgIHNlY3Rpb246IHsgcm9vdDogJ1x1NTE2NVx1OTVFOCcsIGVuOiAnR3VpZGUnIH0sXG4gICAgb3JkZXI6IDIsXG4gIH0sXG4gIHtcbiAgICBzb3VyY2U6ICdkb2NzL3VzZXIvZ3VpZGUvcHl0aG9uLXNkay5tZCcsXG4gICAgcm91dGU6ICdndWlkZS9weXRob24tc2RrLm1kJyxcbiAgICBsYWJlbDogeyByb290OiAnUHl0aG9uJywgZW46ICdQeXRob24nIH0sXG4gICAgc2lkZWJhcjogeyByb290OiAnemgtZ3VpZGUnLCBlbjogJ2VuLWd1aWRlJyB9LFxuICAgIHNlY3Rpb246IHsgcm9vdDogJ1NESycsIGVuOiAnU0RLJyB9LFxuICAgIG9yZGVyOiAxLFxuICB9LFxuXSlcblxuY29uc3QgZGV2ZWxvcCA9IHBhaXJlZFBhZ2VzKFtcbiAge1xuICAgIHNvdXJjZTogJ2RvY3MvdXNlci9kZXZlbG9wL2Jhc2ljL2luZGV4Lm1kJyxcbiAgICByb3V0ZTogJ2RldmVsb3AvYmFzaWMvaW5kZXgubWQnLFxuICAgIGxhYmVsOiB7IHJvb3Q6ICdcdTdCMkNcdTRFMDBcdTRFMkEgSGFybmVzcyBcdTYzRDJcdTRFRjYnLCBlbjogJ1lvdXIgZmlyc3QgSGFybmVzcyBwbHVnaW4nIH0sXG4gICAgc2lkZWJhcjogeyByb290OiAnemgtZGV2ZWxvcCcsIGVuOiAnZW4tZGV2ZWxvcCcgfSxcbiAgICBzZWN0aW9uOiB7IHJvb3Q6ICdcdTU3RkFcdTc4NDAnLCBlbjogJ0Jhc2ljcycgfSxcbiAgICBvcmRlcjogMSxcbiAgICBzb3VyY2VBbGlhc2VzOiBbJ2RvY3MvdXNlci9kZXZlbG9wL2Jhc2ljJ10sXG4gIH0sXG4gIHtcbiAgICBzb3VyY2U6ICdkb2NzL3VzZXIvZGV2ZWxvcC9iYXNpYy90b29sLm1kJyxcbiAgICByb3V0ZTogJ2RldmVsb3AvYmFzaWMvdG9vbC5tZCcsXG4gICAgbGFiZWw6IHsgcm9vdDogJ1x1NUYwMFx1NTNEMVx1NEUwMFx1NEUyQSBUb29sJywgZW46ICdCdWlsZCBhIHRvb2wnIH0sXG4gICAgc2lkZWJhcjogeyByb290OiAnemgtZGV2ZWxvcCcsIGVuOiAnZW4tZGV2ZWxvcCcgfSxcbiAgICBzZWN0aW9uOiB7IHJvb3Q6ICdcdTU3RkFcdTc4NDAnLCBlbjogJ0Jhc2ljcycgfSxcbiAgICBvcmRlcjogMixcbiAgfSxcbiAge1xuICAgIHNvdXJjZTogJ2RvY3MvdXNlci9kZXZlbG9wL2Jhc2ljL2NvbmZpZy5tZCcsXG4gICAgcm91dGU6ICdkZXZlbG9wL2Jhc2ljL2NvbmZpZy5tZCcsXG4gICAgbGFiZWw6IHsgcm9vdDogJ1x1NjNEMlx1NEVGNlx1OTE0RFx1N0Y2RScsIGVuOiAnUGx1Z2luIGNvbmZpZ3VyYXRpb24nIH0sXG4gICAgc2lkZWJhcjogeyByb290OiAnemgtZGV2ZWxvcCcsIGVuOiAnZW4tZGV2ZWxvcCcgfSxcbiAgICBzZWN0aW9uOiB7IHJvb3Q6ICdcdTU3RkFcdTc4NDAnLCBlbjogJ0Jhc2ljcycgfSxcbiAgICBvcmRlcjogMyxcbiAgfSxcbiAge1xuICAgIHNvdXJjZTogJ2RvY3MvdXNlci9kZXZlbG9wL2Jhc2ljL3B1Ymxpc2gubWQnLFxuICAgIHJvdXRlOiAnZGV2ZWxvcC9iYXNpYy9wdWJsaXNoLm1kJyxcbiAgICBsYWJlbDogeyByb290OiAnXHU2MjUzXHU1MzA1XHU0RTBFXHU1Qjg5XHU4OEM1XHU2M0QyXHU0RUY2JywgZW46ICdQYWNrYWdlIGFuZCBpbnN0YWxsJyB9LFxuICAgIHNpZGViYXI6IHsgcm9vdDogJ3poLWRldmVsb3AnLCBlbjogJ2VuLWRldmVsb3AnIH0sXG4gICAgc2VjdGlvbjogeyByb290OiAnXHU1N0ZBXHU3ODQwJywgZW46ICdCYXNpY3MnIH0sXG4gICAgb3JkZXI6IDQsXG4gIH0sXG4gIHtcbiAgICBzb3VyY2U6ICdkb2NzL3VzZXIvZGV2ZWxvcC9mcmFtZXdvcmsvaW5kZXgubWQnLFxuICAgIHJvdXRlOiAnZGV2ZWxvcC9mcmFtZXdvcmsvaW5kZXgubWQnLFxuICAgIGxhYmVsOiB7IHJvb3Q6ICdcdTYzRDJcdTRFRjZcdTRFMEVcdTc1MUZcdTU0N0RcdTU0NjhcdTY3MUYnLCBlbjogJ1BsdWdpbiBsaWZlY3ljbGUnIH0sXG4gICAgc2lkZWJhcjogeyByb290OiAnemgtZGV2ZWxvcCcsIGVuOiAnZW4tZGV2ZWxvcCcgfSxcbiAgICBzZWN0aW9uOiB7IHJvb3Q6ICdcdTY4NDZcdTY3QjZcdTgwRkRcdTUyOUInLCBlbjogJ0ZyYW1ld29yaycgfSxcbiAgICBvcmRlcjogMSxcbiAgICBzb3VyY2VBbGlhc2VzOiBbJ2RvY3MvdXNlci9kZXZlbG9wL2ZyYW1ld29yayddLFxuICB9LFxuICB7XG4gICAgc291cmNlOiAnZG9jcy91c2VyL2RldmVsb3AvZnJhbWV3b3JrL3NlcnZpY2UubWQnLFxuICAgIHJvdXRlOiAnZGV2ZWxvcC9mcmFtZXdvcmsvc2VydmljZS5tZCcsXG4gICAgbGFiZWw6IHsgcm9vdDogJ1x1NjcwRFx1NTJBMVx1NEUwRVx1NEY5RFx1OEQ1NicsIGVuOiAnU2VydmljZXMgYW5kIGRlcGVuZGVuY2llcycgfSxcbiAgICBzaWRlYmFyOiB7IHJvb3Q6ICd6aC1kZXZlbG9wJywgZW46ICdlbi1kZXZlbG9wJyB9LFxuICAgIHNlY3Rpb246IHsgcm9vdDogJ1x1Njg0Nlx1NjdCNlx1ODBGRFx1NTI5QicsIGVuOiAnRnJhbWV3b3JrJyB9LFxuICAgIG9yZGVyOiAyLFxuICB9LFxuICB7XG4gICAgc291cmNlOiAnZG9jcy91c2VyL2RldmVsb3AvZnJhbWV3b3JrL2V2ZW50cy5tZCcsXG4gICAgcm91dGU6ICdkZXZlbG9wL2ZyYW1ld29yay9ldmVudHMubWQnLFxuICAgIGxhYmVsOiB7IHJvb3Q6ICdcdTRFOEJcdTRFRjZcdTdDRkJcdTdFREYnLCBlbjogJ0V2ZW50IHN5c3RlbScgfSxcbiAgICBzaWRlYmFyOiB7IHJvb3Q6ICd6aC1kZXZlbG9wJywgZW46ICdlbi1kZXZlbG9wJyB9LFxuICAgIHNlY3Rpb246IHsgcm9vdDogJ1x1Njg0Nlx1NjdCNlx1ODBGRFx1NTI5QicsIGVuOiAnRnJhbWV3b3JrJyB9LFxuICAgIG9yZGVyOiAzLFxuICB9LFxuICB7XG4gICAgc291cmNlOiAnZG9jcy91c2VyL2RldmVsb3AvcHJhY3RpY2UvaW5kZXgubWQnLFxuICAgIHJvdXRlOiAnZGV2ZWxvcC9wcmFjdGljZS9pbmRleC5tZCcsXG4gICAgbGFiZWw6IHsgcm9vdDogJ1x1ODBGRFx1NTI5Qlx1NzY4NFx1NEUwOVx1NUM0Mlx1NjJDNlx1NTIwNicsIGVuOiAnQ2FwYWJpbGl0eSBsYXllcmluZycgfSxcbiAgICBzaWRlYmFyOiB7IHJvb3Q6ICd6aC1kZXZlbG9wJywgZW46ICdlbi1kZXZlbG9wJyB9LFxuICAgIHNlY3Rpb246IHsgcm9vdDogJ1x1NUI5RVx1NjIxOCcsIGVuOiAnUHJhY3RpY2UnIH0sXG4gICAgb3JkZXI6IDEsXG4gICAgc291cmNlQWxpYXNlczogWydkb2NzL3VzZXIvZGV2ZWxvcC9wcmFjdGljZSddLFxuICB9LFxuICB7XG4gICAgc291cmNlOiAnZG9jcy91c2VyL2RldmVsb3AvcHJhY3RpY2UvbGxtLWFkYXB0ZXIubWQnLFxuICAgIHJvdXRlOiAnZGV2ZWxvcC9wcmFjdGljZS9sbG0tYWRhcHRlci5tZCcsXG4gICAgbGFiZWw6IHsgcm9vdDogJ0xMTSBcdTkwMDJcdTkxNERcdTU2NjgnLCBlbjogJ0xMTSBhZGFwdGVyJyB9LFxuICAgIHNpZGViYXI6IHsgcm9vdDogJ3poLWRldmVsb3AnLCBlbjogJ2VuLWRldmVsb3AnIH0sXG4gICAgc2VjdGlvbjogeyByb290OiAnXHU1QjlFXHU2MjE4JywgZW46ICdQcmFjdGljZScgfSxcbiAgICBvcmRlcjogMixcbiAgfSxcbl0pXG5cbmNvbnN0IGNvcmRpc1R1dG9yaWFsID0gcGFpcmVkUGFnZXMoKFtcbiAgWydpbmRleC5tZCcsICdcdTYwM0JcdTg5QzgnLCAnT3ZlcnZpZXcnXSxcbiAgWycwMS1maXJzdC1wbHVnaW4ubWQnLCAnMS4gXHU3QjJDXHU0RTAwXHU0RTJBXHU2M0QyXHU0RUY2JywgJzEuIFlvdXIgZmlyc3QgcGx1Z2luJ10sXG4gIFsnMDItbGlmZWN5Y2xlLWFuZC1lZmZlY3RzLm1kJywgJzIuIFx1NzUxRlx1NTQ3RFx1NTQ2OFx1NjcxRlx1NEUwRVx1NTI2Rlx1NEY1Q1x1NzUyOCcsICcyLiBMaWZlY3ljbGUgYW5kIGVmZmVjdHMnXSxcbiAgWycwMy1zZXJ2aWNlcy5tZCcsICczLiBcdTY3MERcdTUyQTEnLCAnMy4gU2VydmljZXMnXSxcbiAgWycwNC1ldmVudHMubWQnLCAnNC4gXHU0RThCXHU0RUY2JywgJzQuIEV2ZW50cyddLFxuICBbJzA1LWNvbmZpZy5tZCcsICc1LiBcdTkxNERcdTdGNkUnLCAnNS4gQ29uZmlndXJhdGlvbiddLFxuICBbJzA2LWNvbXBvc2l0aW9uLWFuZC1obXIubWQnLCAnNi4gXHU3RUM0XHU1NDA4XHU0RTBFXHU3MEVEXHU5MUNEXHU4RjdEJywgJzYuIENvbXBvc2l0aW9uIGFuZCBITVInXSxcbiAgWycwNy1pbnRvLXRoZS1oYXJuZXNzLm1kJywgJzcuIFx1OEZEQlx1NTE2NSBIYXJuZXNzJywgJzcuIEludG8gdGhlIGhhcm5lc3MnXSxcbl0gYXMgY29uc3QpLm1hcCgoW2ZpbGUsIHJvb3RMYWJlbCwgZW5MYWJlbF0sIG9yZGVyKTogUGFpcmVkUGFnZSA9PiAoe1xuICBzb3VyY2U6IGBkb2NzL2NvcmRpcy10dXRvcmlhbC8ke2ZpbGV9YCxcbiAgcm91dGU6IGBkZXZlbG9wL2NvcmRpcy10dXRvcmlhbC8ke2ZpbGV9YCxcbiAgbGFiZWw6IHsgcm9vdDogcm9vdExhYmVsLCBlbjogZW5MYWJlbCB9LFxuICBzaWRlYmFyOiB7IHJvb3Q6ICd6aC1kZXZlbG9wJywgZW46ICdlbi1kZXZlbG9wJyB9LFxuICBzZWN0aW9uOiB7IHJvb3Q6ICdDb3JkaXMgXHU2ODQ2XHU2N0I2XHU2NTU5XHU3QTBCJywgZW46ICdDb3JkaXMgZnJhbWV3b3JrIHR1dG9yaWFsJyB9LFxuICBvcmRlcixcbiAgLi4uKGZpbGUgPT09ICdpbmRleC5tZCcgPyB7IHNvdXJjZUFsaWFzZXM6IFsnZG9jcy9jb3JkaXMtdHV0b3JpYWwnXSB9IDoge30pLFxufSkpKVxuXG5jb25zdCBjb3JkaXNQcmltZXJSZWZlcmVuY2UgPSBwYWlyZWRQYWdlcyhbXG4gIHtcbiAgICBzb3VyY2U6ICdkb2NzL2NvcmRpcy1wcmltZXIubWQnLFxuICAgIHJvdXRlOiAncmVmZXJlbmNlL2NvcmRpcy1wcmltZXIubWQnLFxuICAgIGxhYmVsOiB7IHJvb3Q6ICdDb3JkaXMgXHU1MTY1XHU5NUU4JywgZW46ICdDb3JkaXMgcHJpbWVyJyB9LFxuICAgIHNpZGViYXI6IHsgcm9vdDogJ3poLXJlZmVyZW5jZScsIGVuOiAnZW4tcmVmZXJlbmNlJyB9LFxuICAgIHNlY3Rpb246IHsgcm9vdDogJ1x1Njk4Mlx1NUZGNScsIGVuOiAnQ29uY2VwdHMnIH0sXG4gICAgb3JkZXI6IDEsXG4gIH0sXG5dKVxuXG4vKipcbiAqIFN1YnN5c3RlbSBwYWdlcyBncm91cGVkIGJ5IHRoZSBjb25jZXJuIHRoZXkgZG9jdW1lbnQsIGFzIGBbQ2hpbmVzZSBzZWN0aW9uLFxuICogRW5nbGlzaCBzZWN0aW9uLCBwYWdlc11gLiBPbmUgZmxhdCBsaXN0IG9mIGV2ZXJ5IHN1YnN5c3RlbSBwdXNoZWQgdGhlIHJlc3Qgb2ZcbiAqIHRoZSByZWZlcmVuY2Ugc2lkZWJhciBiZWxvdyB0aGUgZm9sZC5cbiAqL1xuY29uc3Qgc3Vic3lzdGVtR3JvdXBzID0gW1xuICBbJ1x1NjAzQlx1ODlDOCcsICdPdmVydmlldycsIFtcbiAgICBbJ1JFQURNRS5tZCcsICdcdTVCNTBcdTdDRkJcdTdFREYnLCAnU3Vic3lzdGVtcyddLFxuICBdXSxcbiAgWydcdTUxODVcdTY4MzhcdTRFMEVcdTRGNUNcdTc1MjhcdTU3REYnLCAnQ29yZSBhbmQgc2NvcGVzJywgW1xuICAgIFsnY29yZS5tZCcsICdcdTY4MzhcdTVGQzMnLCAnQ29yZSddLFxuICAgIFsnc2NvcGUubWQnLCAnXHU0RjVDXHU3NTI4XHU1N0RGJywgJ1Njb3BlcyddLFxuICAgIFsnaW52YXJpYW50cy5tZCcsICdcdThGRDBcdTg4NENcdTY1RjZcdTRFMERcdTUzRDhcdTVGMEYnLCAnUnVudGltZSBpbnZhcmlhbnRzJ10sXG4gIF1dLFxuICBbJ1x1NEYxQVx1OEJERFx1NEUwRVx1NjMwMVx1NEU0NVx1NTMxNicsICdTZXNzaW9ucyBhbmQgcGVyc2lzdGVuY2UnLCBbXG4gICAgWydzZXNzaW9uLm1kJywgJ1x1NEYxQVx1OEJERCcsICdTZXNzaW9ucyddLFxuICAgIFsnc2Vzc2lvbi1xdWVyeS5tZCcsICdcdTRGMUFcdThCRERcdTY3RTVcdThCRTInLCAnU2Vzc2lvbiBxdWVyeSddLFxuICAgIFsnc2Vzc2lvbi1yZWZlcmVuY2UubWQnLCAnXHU0RjFBXHU4QkREXHU1RjE1XHU3NTI4JywgJ1Nlc3Npb24gcmVmZXJlbmNlcyddLFxuICAgIFsnc2Vzc2lvbi10aXRsZS5tZCcsICdcdTRGMUFcdThCRERcdTY4MDdcdTk4OTgnLCAnU2Vzc2lvbiB0aXRsZXMnXSxcbiAgICBbJ3Nlc3Npb24tcHJvamVjdGlvbi5tZCcsICdcdTRGMUFcdThCRERcdTYyOTVcdTVGNzEnLCAnU2Vzc2lvbiBwcm9qZWN0aW9ucyddLFxuICAgIFsncGVyc2lzdGVuY2UubWQnLCAnXHU0RjFBXHU4QkREXHU2MzAxXHU0RTQ1XHU1MzE2JywgJ1Nlc3Npb24gcGVyc2lzdGVuY2UnXSxcbiAgICBbJ3NwaWxsLm1kJywgJ1NwaWxsIFx1NUI1OFx1NTBBOCcsICdTcGlsbCBzdG9yYWdlJ10sXG4gICAgWydzZXNzaW9uLXRlbGVtZXRyeS5tZCcsICdcdTkwNjVcdTZENEInLCAnU2Vzc2lvblRlbGVtZXRyeUJhY2tlbmQnXSxcbiAgXV0sXG4gIFsnXHU2QTIxXHU1NzhCXHU0RTBFXHU0RTBBXHU0RTBCXHU2NTg3JywgJ01vZGVsIGFuZCBjb250ZXh0JywgW1xuICAgIFsnbGxtLXN0cmVhbWluZy5tZCcsICdMTE0gXHU2RDQxXHU1RjBGXHU1NENEXHU1RTk0JywgJ0xMTSBzdHJlYW1pbmcnXSxcbiAgICBbJ3Rva2VuLW1ldGVyLm1kJywgJ1Rva2VuIFx1OEJBMVx1OTFDRicsICdUb2tlbiBtZXRlcmluZyddLFxuICAgIFsnc3lzdGVtLXByb21wdC5tZCcsICdcdTdDRkJcdTdFREZcdTYzRDBcdTc5M0FcdThCQ0QnLCAnU3lzdGVtIHByb21wdHMnXSxcbiAgICBbJ2NvbXBhY3Rpb24ubWQnLCAnXHU0RTBBXHU0RTBCXHU2NTg3XHU1MzhCXHU3RjI5JywgJ0NvbXBhY3Rpb24nXSxcbiAgXV0sXG4gIFsnXHU2MjY3XHU4ODRDXHU0RTBFXHU1REU1XHU1MTc3JywgJ0V4ZWN1dGlvbiBhbmQgdG9vbHMnLCBbXG4gICAgWyd0b29scy5tZCcsICdcdTVERTVcdTUxNzcnLCAnVG9vbHMnXSxcbiAgICBbJ3NoZWxsLm1kJywgJ0Jhc2ggXHU2MjY3XHU4ODRDJywgJ0Jhc2ggZXhlY3V0aW9uJ10sXG4gICAgWydzdWJwcm9jZXNzLm1kJywgJ1x1NUI1MFx1OEZEQlx1N0EwQicsICdTdWJwcm9jZXNzZXMnXSxcbiAgICBbJ3Rlcm1pbmFsLm1kJywgJ1BUWSBcdTRGMUFcdThCREQnLCAnUFRZIHNlc3Npb25zJ10sXG4gICAgWydqb2JzLm1kJywgJ1x1NTQwRVx1NTNGMFx1NEVGQlx1NTJBMScsICdCYWNrZ3JvdW5kIGpvYnMnXSxcbiAgICBbJ2ZpbGVzeXN0ZW0ubWQnLCAnXHU2NTg3XHU0RUY2XHU3Q0ZCXHU3RURGJywgJ0ZpbGVzeXN0ZW0nXSxcbiAgICBbJ2xzcC5tZCcsICdMU1AgXHU1QkZDXHU4MjJBJywgJ0xTUCBuYXZpZ2F0aW9uJ10sXG4gICAgWydjb2RlLXJ1bnRpbWUubWQnLCAnXHU0RUUzXHU3ODAxXHU4RkQwXHU4ODRDXHU2NUY2JywgJ0NvZGUgcnVudGltZSddLFxuICAgIFsnd2ViLm1kJywgJ1dlYiBcdThCQkZcdTk1RUUnLCAnV2ViIGFjY2VzcyddLFxuICAgIFsnc2tpbGxzLm1kJywgJ1x1NjI4MFx1ODBGRCcsICdTa2lsbHMnXSxcbiAgICBbJ3dvcmtmbG93Lm1kJywgJ1x1NURFNVx1NEY1Q1x1NkQ0MScsICdXb3JrZmxvd3MnXSxcbiAgICBbJ3N1YmFnZW50Lm1kJywgJ1x1NUI1MFx1NEVFM1x1NzQwNicsICdTdWJhZ2VudHMnXSxcbiAgXV0sXG4gIFsnXHU3QjU2XHU3NTY1XHU0RTBFXHU0RUE0XHU0RTkyJywgJ1BvbGljeSBhbmQgaW50ZXJhY3Rpb24nLCBbXG4gICAgWydhcHByb3ZhbC5tZCcsICdcdTVCQTFcdTYyNzknLCAnQXBwcm92YWxzJ10sXG4gICAgWydwZXJtaXNzaW9uLXByZXNldHMubWQnLCAnXHU2NzQzXHU5NjUwXHU5ODg0XHU4QkJFJywgJ1Blcm1pc3Npb24gcHJlc2V0cyddLFxuICAgIFsnc2FuZGJveC5tZCcsICdcdTZDOTlcdTdCQjEnLCAnU2FuZGJveGluZyddLFxuICAgIFsncGxhbi5tZCcsICdcdThCQTFcdTUyMTJcdTZBMjFcdTVGMEYnLCAnUGxhbiBtb2RlJ10sXG4gICAgWyd1c2VyLXF1ZXN0aW9ucy5tZCcsICdcdTc1MjhcdTYyMzdcdTRFQTRcdTRFOTInLCAnVXNlciBpbnRlcmFjdGlvbiddLFxuICAgIFsnY29tbWFuZHMubWQnLCAnXHU1NDdEXHU0RUU0JywgJ0h1bWFuIGNvbW1hbmRzJ10sXG4gICAgWydnb2FsLm1kJywgJ1x1NzZFRVx1NjgwNycsICdHb2FscyddLFxuICAgIFsnc2NoZWR1bGUubWQnLCAnXHU1QjlBXHU2NUY2XHU2M0QwXHU5MTkyJywgJ1NjaGVkdWxlZCByZW1pbmRlcnMnXSxcbiAgXV0sXG4gIFsnXHU1RTczXHU1M0YwXHU0RTBFXHU2M0E1XHU1MTY1JywgJ1BsYXRmb3JtIGFuZCBhY2Nlc3MnLCBbXG4gICAgWyd3ZWItc2VydmVyLm1kJywgJ0hUVFAgXHU2NzBEXHU1MkExXHU1NjY4JywgJ0hUVFAgc2VydmVyJ10sXG4gICAgWyd0eXBlcnQubWQnLCAnVHlwZXJ0JywgJ1R5cGVydCddLFxuICAgIFsnY2xpZW50LW1vZHVsZXMubWQnLCAnXHU1QkEyXHU2MjM3XHU3QUVGXHU2QTIxXHU1NzU3JywgJ0NsaWVudCBtb2R1bGVzJ10sXG4gICAgWydzdG9yYWdlLm1kJywgJ1x1NUI1OFx1NTBBOCcsICdTdG9yYWdlJ10sXG4gICAgWyd3b3Jrc3BhY2UubWQnLCAnXHU1REU1XHU0RjVDXHU1MzNBJywgJ1dvcmtzcGFjZXMnXSxcbiAgICBbJ3NldHRpbmdzLm1kJywgJ1x1NzUyOFx1NjIzN1x1OEJCRVx1N0Y2RScsICdVc2VyIHNldHRpbmdzJ10sXG4gICAgWydjcmVkZW50aWFscy5tZCcsICdcdTc1MjhcdTYyMzdcdTUxRURcdTYzNkUnLCAnVXNlciBjcmVkZW50aWFscyddLFxuICBdXSxcbl0gYXMgY29uc3RcblxuY29uc3Qgc3Vic3lzdGVtc1JlZmVyZW5jZSA9IHN1YnN5c3RlbUdyb3Vwcy5mbGF0TWFwKChbcm9vdFNlY3Rpb24sIGVuU2VjdGlvbiwgZmlsZXNdKSA9PiBwYWlyZWRQYWdlcyhcbiAgZmlsZXMubWFwKChbZmlsZSwgcm9vdExhYmVsLCBlbkxhYmVsXSwgb3JkZXIpOiBQYWlyZWRQYWdlID0+ICh7XG4gICAgc291cmNlOiBgZG9jcy9zdWJzeXN0ZW1zLyR7ZmlsZX1gLFxuICAgIHJvdXRlOiBmaWxlID09PSAnUkVBRE1FLm1kJyA/ICdyZWZlcmVuY2Uvc3Vic3lzdGVtcy9pbmRleC5tZCcgOiBgcmVmZXJlbmNlL3N1YnN5c3RlbXMvJHtmaWxlfWAsXG4gICAgbGFiZWw6IHsgcm9vdDogcm9vdExhYmVsLCBlbjogZW5MYWJlbCB9LFxuICAgIHNpZGViYXI6IHsgcm9vdDogJ3poLXJlZmVyZW5jZScsIGVuOiAnZW4tcmVmZXJlbmNlJyB9LFxuICAgIHNlY3Rpb246IHsgcm9vdDogcm9vdFNlY3Rpb24sIGVuOiBlblNlY3Rpb24gfSxcbiAgICBvcmRlcixcbiAgICAvLyBTdWJzeXN0ZW0gcGFnZXMgY2FycnkgbG9uZyB0aGlyZC1sZXZlbCBzZWN0aW9ucyBhIHR3by1sZXZlbCBvdXRsaW5lIHJlYWNoZXMuXG4gICAgb3V0bGluZTogWzIsIDNdLFxuICAgIC4uLihmaWxlID09PSAnUkVBRE1FLm1kJyA/IHsgc291cmNlQWxpYXNlczogWydkb2NzL3N1YnN5c3RlbXMnXSB9IDoge30pLFxuICB9KSksXG4pKVxuXG5jb25zdCByZWZlcmVuY2UgPSBbXG4gIC4uLnBhaXJlZFBhZ2VzKChbXG4gICAgWydkb2NzL2FyY2hpdGVjdHVyZS5tZCcsICdyZWZlcmVuY2UvaW5kZXgubWQnLCAnXHU2N0I2XHU2Nzg0JywgJ0FyY2hpdGVjdHVyZScsIDBdLFxuICBdIGFzIGNvbnN0KS5tYXAoKFtzb3VyY2UsIHJvdXRlLCByb290TGFiZWwsIGVuTGFiZWwsIG9yZGVyXSk6IFBhaXJlZFBhZ2UgPT4gKHtcbiAgICBzb3VyY2UsXG4gICAgcm91dGUsXG4gICAgbGFiZWw6IHsgcm9vdDogcm9vdExhYmVsLCBlbjogZW5MYWJlbCB9LFxuICAgIHNpZGViYXI6IHsgcm9vdDogJ3poLXJlZmVyZW5jZScsIGVuOiAnZW4tcmVmZXJlbmNlJyB9LFxuICAgIHNlY3Rpb246IHsgcm9vdDogJ1x1Njk4Mlx1NUZGNScsIGVuOiAnQ29uY2VwdHMnIH0sXG4gICAgb3JkZXIsXG4gIH0pKSksXG4gIC4uLnBhaXJlZFBhZ2VzKChbXG4gICAgWydkb2NzL2NhcGFiaWxpdHktc2VhbXMubWQnLCAncmVmZXJlbmNlL2NhcGFiaWxpdHktc2VhbXMubWQnLCAnXHU4MEZEXHU1MjlCXHU2NzBEXHU1MkExJywgJ0NhcGFiaWxpdHkgc2VydmljZXMnLCAyXSxcbiAgICBbJ2RvY3MvYWdlbnQtbGlmZWN5Y2xlLm1kJywgJ3JlZmVyZW5jZS9hZ2VudC1saWZlY3ljbGUubWQnLCAnQWdlbnQgXHU3NTFGXHU1NDdEXHU1NDY4XHU2NzFGJywgJ0FnZW50IGxpZmVjeWNsZScsIDNdLFxuICAgIFsnZG9jcy90b29sLWV4ZWN1dGlvbi1waXBlbGluZS5tZCcsICdyZWZlcmVuY2UvdG9vbC1leGVjdXRpb24tcGlwZWxpbmUubWQnLCAnVG9vbCBcdTYyNjdcdTg4NEMnLCAnVG9vbCBleGVjdXRpb24nLCA0XSxcbiAgXSBhcyBjb25zdCkubWFwKChbc291cmNlLCByb3V0ZSwgcm9vdExhYmVsLCBlbkxhYmVsLCBvcmRlcl0pOiBQYWlyZWRQYWdlID0+ICh7XG4gICAgc291cmNlLFxuICAgIHJvdXRlLFxuICAgIGxhYmVsOiB7IHJvb3Q6IHJvb3RMYWJlbCwgZW46IGVuTGFiZWwgfSxcbiAgICBzaWRlYmFyOiB7IHJvb3Q6ICd6aC1yZWZlcmVuY2UnLCBlbjogJ2VuLXJlZmVyZW5jZScgfSxcbiAgICBzZWN0aW9uOiB7IHJvb3Q6ICdcdTY5ODJcdTVGRjUnLCBlbjogJ0NvbmNlcHRzJyB9LFxuICAgIG9yZGVyLFxuICB9KSkpLFxuICAuLi5wYWlyZWRQYWdlcygoW1xuICAgIFsnZG9jcy9jb25maWctY2F0YWxvZy5tZCcsICdyZWZlcmVuY2UvY29uZmlnLWNhdGFsb2cubWQnLCAnXHU2M0QyXHU0RUY2XHU5MTREXHU3RjZFJywgJ1BsdWdpbiBjb25maWd1cmF0aW9uJ10sXG4gICAgWydkb2NzL3Rvb2wtY2F0YWxvZy5tZCcsICdyZWZlcmVuY2UvdG9vbC1jYXRhbG9nLm1kJywgJ1Rvb2wgU2NoZW1hJywgJ1Rvb2wgc2NoZW1hcyddLFxuICAgIFsnZG9jcy9wZXJzaXN0ZW5jZS1jYXRhbG9nLm1kJywgJ3JlZmVyZW5jZS9wZXJzaXN0ZW5jZS1jYXRhbG9nLm1kJywgJ1x1NjMwMVx1NEU0NVx1NTMxNlx1NEU4Qlx1NEVGNicsICdQZXJzaXN0ZW5jZSBldmVudHMnLCAnZGVlcCddLFxuICBdIGFzIGNvbnN0KS5tYXAoKFtzb3VyY2UsIHJvdXRlLCByb290TGFiZWwsIGVuTGFiZWwsIG91dGxpbmVdLCBvcmRlcik6IFBhaXJlZFBhZ2UgPT4gKHtcbiAgICBzb3VyY2UsXG4gICAgcm91dGUsXG4gICAgbGFiZWw6IHsgcm9vdDogcm9vdExhYmVsLCBlbjogZW5MYWJlbCB9LFxuICAgIHNpZGViYXI6IHsgcm9vdDogJ3poLXJlZmVyZW5jZScsIGVuOiAnZW4tcmVmZXJlbmNlJyB9LFxuICAgIHNlY3Rpb246IHsgcm9vdDogJ1x1NzUxRlx1NjIxMFx1NTNDMlx1ODAwMycsIGVuOiAnR2VuZXJhdGVkIHJlZmVyZW5jZScgfSxcbiAgICBvcmRlcixcbiAgICAuLi4ob3V0bGluZSA9PT0gdW5kZWZpbmVkID8ge30gOiB7IG91dGxpbmUgfSksXG4gIH0pKSksXG4gIC4uLnBhaXJlZFBhZ2VzKChbXG4gICAgWydjb250ZXh0Lm1kJywgJ0NvbnRleHQnLCAnQ29udGV4dCddLFxuICAgIFsnZXZlbnRzLm1kJywgJ0V2ZW50cycsICdFdmVudHMnXSxcbiAgICBbJ2ZpYmVyLm1kJywgJ0ZpYmVyJywgJ0ZpYmVyJ10sXG4gICAgWydyZWdpc3RyeS5tZCcsICdQbHVnaW4gUmVnaXN0cnknLCAnUGx1Z2luIFJlZ2lzdHJ5J10sXG4gICAgWydzZXJ2aWNlLm1kJywgJ1NlcnZpY2UnLCAnU2VydmljZSddLFxuICBdIGFzIGNvbnN0KS5tYXAoKFtmaWxlLCByb290TGFiZWwsIGVuTGFiZWxdLCBvcmRlcik6IFBhaXJlZFBhZ2UgPT4gKHtcbiAgICBzb3VyY2U6IGBkb2NzL2NvcmRpcy1hcGkvJHtmaWxlfWAsXG4gICAgcm91dGU6IGByZWZlcmVuY2UvY29yZGlzLWFwaS8ke2ZpbGV9YCxcbiAgICBsYWJlbDogeyByb290OiByb290TGFiZWwsIGVuOiBlbkxhYmVsIH0sXG4gICAgc2lkZWJhcjogeyByb290OiAnemgtcmVmZXJlbmNlJywgZW46ICdlbi1yZWZlcmVuY2UnIH0sXG4gICAgc2VjdGlvbjogeyByb290OiAnQ29yZGlzIEFQSScsIGVuOiAnQ29yZGlzIENvcmUgQVBJJyB9LFxuICAgIG9yZGVyLFxuICB9KSkpLFxuICAuLi5taXJyb3JlZFBhZ2VzKChbXG4gICAgWydpbmhlcml0ZWQubWQnLCAnXHU3RUU3XHU2MjdGXHU2M0E1XHU1M0UzXHU5NzYyJywgJ0luaGVyaXRlZCBzdXJmYWNlJ10sXG4gIF0gYXMgY29uc3QpLm1hcCgoW2ZpbGUsIHJvb3RMYWJlbCwgZW5MYWJlbF0sIG9yZGVyKTogTWlycm9yZWRQYWdlID0+ICh7XG4gICAgc291cmNlOiBgZG9jcy9jb3JkaXMtYXBpLyR7ZmlsZX1gLFxuICAgIHJvdXRlOiBgcmVmZXJlbmNlL2NvcmRpcy1hcGkvJHtmaWxlfWAsXG4gICAgY29udGVudExvY2FsZTogJ2VuLVVTJyxcbiAgICBsYWJlbDogeyByb290OiByb290TGFiZWwsIGVuOiBlbkxhYmVsIH0sXG4gICAgc2lkZWJhcjogeyByb290OiAnemgtcmVmZXJlbmNlJywgZW46ICdlbi1yZWZlcmVuY2UnIH0sXG4gICAgc2VjdGlvbjogeyByb290OiAnQ29yZGlzIEFQSScsIGVuOiAnQ29yZGlzIENvcmUgQVBJJyB9LFxuICAgIG9yZGVyOiBvcmRlciArIDUsXG4gIH0pKSksXG4gIC4uLnBhaXJlZFBhZ2VzKChbXG4gICAgWydhZGRpbmctYS1wYWNrYWdlLm1kJywgJ1x1NjVCMFx1NTg5RSBQYWNrYWdlJywgJ0FkZGluZyBhIHBhY2thZ2UnXSxcbiAgICBbJ2FkZGluZy1hLXRvb2wubWQnLCAnXHU2NUIwXHU1ODlFIFRvb2wnLCAnQWRkaW5nIGEgdG9vbCddLFxuICAgIFsnYWRkaW5nLWFuLWxsbS1hZGFwdGVyLm1kJywgJ1x1NjVCMFx1NTg5RSBMTE0gQWRhcHRlcicsICdBZGRpbmcgYW4gTExNIGFkYXB0ZXInXSxcbiAgICBbJ2V4dGVuc2lvbi1jb29rYm9vay5tZCcsICdcdTYyNjlcdTVDNTVcdTZBMjFcdTVGMEYnLCAnRXh0ZW5zaW9uIHBhdHRlcm5zJ10sXG4gIF0gYXMgY29uc3QpLm1hcCgoW2ZpbGUsIHJvb3RMYWJlbCwgZW5MYWJlbF0sIG9yZGVyKTogUGFpcmVkUGFnZSA9PiAoe1xuICAgIHNvdXJjZTogYGRvY3MvY29va2Jvb2svJHtmaWxlfWAsXG4gICAgcm91dGU6IGByZWZlcmVuY2UvY29va2Jvb2svJHtmaWxlfWAsXG4gICAgbGFiZWw6IHsgcm9vdDogcm9vdExhYmVsLCBlbjogZW5MYWJlbCB9LFxuICAgIHNpZGViYXI6IHsgcm9vdDogJ3poLXJlZmVyZW5jZScsIGVuOiAnZW4tcmVmZXJlbmNlJyB9LFxuICAgIHNlY3Rpb246IHsgcm9vdDogJ1x1NUYwMFx1NTNEMVx1NjI0Qlx1NTE4QycsIGVuOiAnQ29va2Jvb2snIH0sXG4gICAgb3JkZXIsXG4gIH0pKSksXG4gIC4uLnBhaXJlZFBhZ2VzKFt7XG4gICAgc291cmNlOiAnZG9jcy9jb29rYm9vay9hZGRpbmctYS1jb252ZXJzYXRpb24tbm9kZS5tZCcsXG4gICAgcm91dGU6ICdyZWZlcmVuY2UvY29va2Jvb2svYWRkaW5nLWEtY29udmVyc2F0aW9uLW5vZGUubWQnLFxuICAgIGxhYmVsOiB7IHJvb3Q6ICdcdTY1QjBcdTU4OUUgQ29udmVyc2F0aW9uIE5vZGUnLCBlbjogJ0FkZGluZyBhIENvbnZlcnNhdGlvbiBOb2RlJyB9LFxuICAgIHNpZGViYXI6IHsgcm9vdDogJ3poLXJlZmVyZW5jZScsIGVuOiAnZW4tcmVmZXJlbmNlJyB9LFxuICAgIHNlY3Rpb246IHsgcm9vdDogJ1x1NUYwMFx1NTNEMVx1NjI0Qlx1NTE4QycsIGVuOiAnQ29va2Jvb2snIH0sXG4gICAgb3JkZXI6IDQsXG4gIH1dKSxcbl1cblxuLyoqIEEgc2lkZWJhciBncm91cCwgbWF0Y2hlZCB0byBwYWdlcyBieSBgbGFiZWxgLiAqL1xuZXhwb3J0IGludGVyZmFjZSBEb2NzU2VjdGlvbiB7XG4gIC8qKiBHcm91cCBoZWFkaW5nLCBlcXVhbCB0byB0aGUgYHNlY3Rpb25gIGZpZWxkIG9mIGV2ZXJ5IHBhZ2UgaXQgaG9sZHMuICovXG4gIGxhYmVsOiBzdHJpbmdcbiAgLyoqIFJlbmRlciB0aGUgZ3JvdXAgY29sbGFwc2VkIHVudGlsIGl0IGhvbGRzIHRoZSBwYWdlIGJlaW5nIHJlYWQuICovXG4gIGNvbGxhcHNlZD86IGJvb2xlYW5cbn1cblxuLyoqXG4gKiBFdmVyeSBzaWRlYmFyIGdyb3VwLCBpbiB0aGUgb3JkZXIgaXRzIGxvY2FsZSByZW5kZXJzIGl0LlxuICpcbiAqIFRoZSBzdWJzeXN0ZW0gZ3JvdXBzIGNvbGxhcHNlIGJlY2F1c2UgdG9nZXRoZXIgdGhleSBvdXRudW1iZXIgdGhlIHJlc3Qgb2YgdGhlXG4gKiByZWZlcmVuY2Ugc2lkZWJhcjsgZXhwYW5kZWQsIHRoZXkgcHVzaCBldmVyeSBvdGhlciBncm91cCBiZWxvdyB0aGUgZm9sZC5cbiAqL1xuY29uc3Qgc2VjdGlvbnM6IFJlY29yZDxEb2NzTG9jYWxlLCByZWFkb25seSBEb2NzU2VjdGlvbltdPiA9IHtcbiAgcm9vdDogW1xuICAgIHsgbGFiZWw6ICdcdTUxNjVcdTk1RTgnIH0sIHsgbGFiZWw6ICdTREsnIH0sXG4gICAgeyBsYWJlbDogJ1x1NTdGQVx1Nzg0MCcgfSwgeyBsYWJlbDogJ1x1Njg0Nlx1NjdCNlx1ODBGRFx1NTI5QicgfSwgeyBsYWJlbDogJ1x1NUI5RVx1NjIxOCcgfSwgeyBsYWJlbDogJ0NvcmRpcyBcdTY4NDZcdTY3QjZcdTY1NTlcdTdBMEInIH0sXG4gICAgeyBsYWJlbDogJ1x1Njk4Mlx1NUZGNScgfSwgeyBsYWJlbDogJ1x1NzUxRlx1NjIxMFx1NTNDMlx1ODAwMycgfSwgeyBsYWJlbDogJ0NvcmRpcyBBUEknIH0sIHsgbGFiZWw6ICdcdTVGMDBcdTUzRDFcdTYyNEJcdTUxOEMnIH0sXG4gICAgeyBsYWJlbDogJ1x1NjAzQlx1ODlDOCcgfSxcbiAgICB7IGxhYmVsOiAnXHU1MTg1XHU2ODM4XHU0RTBFXHU0RjVDXHU3NTI4XHU1N0RGJywgY29sbGFwc2VkOiB0cnVlIH0sXG4gICAgeyBsYWJlbDogJ1x1NEYxQVx1OEJERFx1NEUwRVx1NjMwMVx1NEU0NVx1NTMxNicsIGNvbGxhcHNlZDogdHJ1ZSB9LFxuICAgIHsgbGFiZWw6ICdcdTZBMjFcdTU3OEJcdTRFMEVcdTRFMEFcdTRFMEJcdTY1ODcnLCBjb2xsYXBzZWQ6IHRydWUgfSxcbiAgICB7IGxhYmVsOiAnXHU2MjY3XHU4ODRDXHU0RTBFXHU1REU1XHU1MTc3JywgY29sbGFwc2VkOiB0cnVlIH0sXG4gICAgeyBsYWJlbDogJ1x1N0I1Nlx1NzU2NVx1NEUwRVx1NEVBNFx1NEU5MicsIGNvbGxhcHNlZDogdHJ1ZSB9LFxuICAgIHsgbGFiZWw6ICdcdTVFNzNcdTUzRjBcdTRFMEVcdTYzQTVcdTUxNjUnLCBjb2xsYXBzZWQ6IHRydWUgfSxcbiAgXSxcbiAgZW46IFtcbiAgICB7IGxhYmVsOiAnR3VpZGUnIH0sIHsgbGFiZWw6ICdTREsnIH0sXG4gICAgeyBsYWJlbDogJ0Jhc2ljcycgfSwgeyBsYWJlbDogJ0ZyYW1ld29yaycgfSwgeyBsYWJlbDogJ1ByYWN0aWNlJyB9LCB7IGxhYmVsOiAnQ29yZGlzIGZyYW1ld29yayB0dXRvcmlhbCcgfSxcbiAgICB7IGxhYmVsOiAnQ29uY2VwdHMnIH0sIHsgbGFiZWw6ICdHZW5lcmF0ZWQgcmVmZXJlbmNlJyB9LCB7IGxhYmVsOiAnQ29yZGlzIENvcmUgQVBJJyB9LCB7IGxhYmVsOiAnQ29va2Jvb2snIH0sXG4gICAgeyBsYWJlbDogJ092ZXJ2aWV3JyB9LFxuICAgIHsgbGFiZWw6ICdDb3JlIGFuZCBzY29wZXMnLCBjb2xsYXBzZWQ6IHRydWUgfSxcbiAgICB7IGxhYmVsOiAnU2Vzc2lvbnMgYW5kIHBlcnNpc3RlbmNlJywgY29sbGFwc2VkOiB0cnVlIH0sXG4gICAgeyBsYWJlbDogJ01vZGVsIGFuZCBjb250ZXh0JywgY29sbGFwc2VkOiB0cnVlIH0sXG4gICAgeyBsYWJlbDogJ0V4ZWN1dGlvbiBhbmQgdG9vbHMnLCBjb2xsYXBzZWQ6IHRydWUgfSxcbiAgICB7IGxhYmVsOiAnUG9saWN5IGFuZCBpbnRlcmFjdGlvbicsIGNvbGxhcHNlZDogdHJ1ZSB9LFxuICAgIHsgbGFiZWw6ICdQbGF0Zm9ybSBhbmQgYWNjZXNzJywgY29sbGFwc2VkOiB0cnVlIH0sXG4gIF0sXG59XG5cbi8qKlxuICogUGxhY2VtZW50IGFuZCBjb2xsYXBzZSBiZWhhdmlvciBvZiBvbmUgc2lkZWJhciBncm91cC5cbiAqXG4gKiBAcGFyYW0gbG9jYWxlIC0gUm91dGUgdHJlZSB3aG9zZSBzaWRlYmFyIGlzIGJlaW5nIGJ1aWx0LlxuICogQHBhcmFtIGxhYmVsIC0gU2VjdGlvbiBsYWJlbCBjYXJyaWVkIGJ5IHRoZSBwYWdlcyBpbiB0aGUgZ3JvdXAuXG4gKiBAcmV0dXJucyBUaGUgZGVjbGFyZWQgZ3JvdXAsIHBsdXMgaXRzIHplcm8tYmFzZWQgcG9zaXRpb24gaW4gdGhlIGxvY2FsZS5cbiAqIEB0aHJvd3MgV2hlbiB0aGUgbG9jYWxlIGRlY2xhcmVzIG5vIHBsYWNlbWVudCBmb3IgdGhlIGxhYmVsLiBSYW5raW5nIGJ5IGxpc3RcbiAqICAgbWVtYmVyc2hpcCBhbG9uZSB3b3VsZCBzb3J0IGFuIHVuZGVjbGFyZWQgZ3JvdXAgc2lsZW50bHkgYWhlYWQgb2YgZXZlcnlcbiAqICAgZGVjbGFyZWQgb25lLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2VjdGlvblNwZWMobG9jYWxlOiBEb2NzTG9jYWxlLCBsYWJlbDogc3RyaW5nKTogRG9jc1NlY3Rpb24gJiB7IGluZGV4OiBudW1iZXIgfSB7XG4gIGNvbnN0IGRlY2xhcmVkID0gc2VjdGlvbnNbbG9jYWxlXVxuICBjb25zdCBzZWN0aW9uID0gZGVjbGFyZWQuZmluZChjYW5kaWRhdGUgPT4gY2FuZGlkYXRlLmxhYmVsID09PSBsYWJlbClcbiAgaWYgKHNlY3Rpb24gPT09IHVuZGVmaW5lZCkgdGhyb3cgbmV3IEVycm9yKGBTaWRlYmFyIHNlY3Rpb24gXCIke2xhYmVsfVwiIGhhcyBubyBwbGFjZW1lbnQgaW4gdGhlICR7bG9jYWxlfSBsb2NhbGUuYClcbiAgcmV0dXJuIHsgLi4uc2VjdGlvbiwgaW5kZXg6IGRlY2xhcmVkLmluZGV4T2Yoc2VjdGlvbikgfVxufVxuXG4vKiogRXZlcnkgY2Fub25pY2FsIHBhZ2UgcHVibGlzaGVkIGJ5IHRoZSBkb2N1bWVudGF0aW9uIHdlYnNpdGUuICovXG5leHBvcnQgY29uc3QgZG9jc1BhZ2VzOiBEb2NzUGFnZVtdID0gW1xuICAuLi5ob21lQW5kR3VpZGUsXG4gIC4uLmRldmVsb3AsXG4gIC4uLmNvcmRpc1R1dG9yaWFsLFxuICAuLi5jb3JkaXNQcmltZXJSZWZlcmVuY2UsXG4gIC4uLnN1YnN5c3RlbXNSZWZlcmVuY2UsXG4gIC4uLnJlZmVyZW5jZSxcbl1cblxuLyoqXG4gKiBQYWdlcyBvZiBvbmUgc2lkZWJhciBjb2xsZWN0aW9uLCBpbiB0aGUgb3JkZXIgdGhlIHNpZGViYXIgbGlzdHMgdGhlbS5cbiAqXG4gKiBAcGFyYW0gbG9jYWxlIC0gUm91dGUgdHJlZSB3aG9zZSBzaWRlYmFyIGlzIGJlaW5nIGJ1aWx0LlxuICogQHBhcmFtIGNvbGxlY3Rpb24gLSBTaWRlYmFyIGNvbGxlY3Rpb24gdG8gcmVhZC5cbiAqIEByZXR1cm5zIFRoZSBjb2xsZWN0aW9uJ3MgcGFnZXMsIG9yZGVyZWQgYnkgc2VjdGlvbiBwbGFjZW1lbnQgdGhlbiBieSBgb3JkZXJgLlxuICovXG5leHBvcnQgZnVuY3Rpb24gb3JkZXJlZFBhZ2VzKGxvY2FsZTogRG9jc0xvY2FsZSwgY29sbGVjdGlvbjogRG9jc1NpZGViYXIpOiBEb2NzUGFnZVtdIHtcbiAgcmV0dXJuIGRvY3NQYWdlc1xuICAgIC5maWx0ZXIocGFnZSA9PiBwYWdlLmxvY2FsZSA9PT0gbG9jYWxlICYmIHBhZ2Uuc2lkZWJhciA9PT0gY29sbGVjdGlvbilcbiAgICAuc29ydCgobGVmdCwgcmlnaHQpID0+IChcbiAgICAgIHNlY3Rpb25TcGVjKGxvY2FsZSwgbGVmdC5zZWN0aW9uKS5pbmRleCAtIHNlY3Rpb25TcGVjKGxvY2FsZSwgcmlnaHQuc2VjdGlvbikuaW5kZXhcbiAgICAgIHx8IGxlZnQub3JkZXIgLSByaWdodC5vcmRlclxuICAgICkpXG59XG5cbi8qKlxuICogU2l0ZS1yZWxhdGl2ZSBsaW5rIGZvciBhIHB1Ymxpc2hlZCByb3V0ZS5cbiAqXG4gKiBAcGFyYW0gcm91dGUgLSBNYW5pZmVzdCByb3V0ZSwgaW5jbHVkaW5nIGl0cyBgLm1kYCBzdWZmaXguXG4gKiBAcmV0dXJucyBUaGUgbGluayBWaXRlUHJlc3Mgc2VydmVzIHRoZSByb3V0ZSBhdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJvdXRlTGluayhyb3V0ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGAvJHtyb3V0ZS5yZXBsYWNlKC8oPzppbmRleCk/XFwubWQkLywgJycpfWBcbn1cblxuLyoqXG4gKiBXaGVyZSBhIHRvcC1sZXZlbCBuYXZpZ2F0aW9uIGl0ZW0gbGFuZHMuXG4gKlxuICogVGhlIHRhcmdldCBpcyBkZXJpdmVkIHJhdGhlciB0aGFuIHdyaXR0ZW4gZG93bjogYSBjb2xsZWN0aW9uIHdob3NlIGZpcnN0IHBhZ2VcbiAqIGlzIHJlbmFtZWQgb3IgcmVvcmRlcmVkIHdvdWxkIG90aGVyd2lzZSBsZWF2ZSB0aGUgbmF2aWdhdGlvbiBiYXIgcG9pbnRpbmcgYXRcbiAqIGEgcm91dGUgdGhlIG1hbmlmZXN0IG5vIGxvbmdlciBwdWJsaXNoZXMuXG4gKlxuICogQHBhcmFtIGxvY2FsZSAtIFJvdXRlIHRyZWUgdGhlIG5hdmlnYXRpb24gaXRlbSBiZWxvbmdzIHRvLlxuICogQHBhcmFtIGNvbGxlY3Rpb24gLSBTaWRlYmFyIGNvbGxlY3Rpb24gdGhlIGl0ZW0gb3BlbnMuXG4gKiBAcmV0dXJucyBTaXRlLXJlbGF0aXZlIGxpbmsgb2YgdGhlIGNvbGxlY3Rpb24ncyBmaXJzdCBwYWdlLlxuICogQHRocm93cyBXaGVuIHRoZSBjb2xsZWN0aW9uIHB1Ymxpc2hlcyBubyBwYWdlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbGFuZGluZ0xpbmsobG9jYWxlOiBEb2NzTG9jYWxlLCBjb2xsZWN0aW9uOiBEb2NzU2lkZWJhcik6IHN0cmluZyB7XG4gIGNvbnN0IGZpcnN0ID0gb3JkZXJlZFBhZ2VzKGxvY2FsZSwgY29sbGVjdGlvbilbMF1cbiAgaWYgKGZpcnN0ID09PSB1bmRlZmluZWQpIHRocm93IG5ldyBFcnJvcihgU2lkZWJhciBjb2xsZWN0aW9uIFwiJHtjb2xsZWN0aW9ufVwiIHB1Ymxpc2hlcyBubyBwYWdlLmApXG4gIHJldHVybiByb3V0ZUxpbmsoZmlyc3Qucm91dGUpXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL3R1bGlwL2RlZXBzZWVrLWhhcm5lc3Mvc2NyaXB0c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvdHVsaXAvZGVlcHNlZWstaGFybmVzcy9zY3JpcHRzL3Byb2plY3QtZG9jLXNpdGUudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvdHVsaXAvZGVlcHNlZWstaGFybmVzcy9zY3JpcHRzL3Byb2plY3QtZG9jLXNpdGUudHNcIjsvKipcbiAqIEJ1aWxkLXRpbWUgcHJvamVjdGlvbiBmcm9tIGNhbm9uaWNhbCByZXBvc2l0b3J5IE1hcmtkb3duIGludG8gVml0ZVByZXNzLlxuICpcbiAqIFRoZSBnZW5lcmF0ZWQgdHJlZSBpcyBkaXNwb3NhYmxlOiBzb3VyY2VzIHN0YXkgaW4gdGhlaXIgb3duaW5nIGBkb2NzL2BcbiAqIHRpZXIsIHdoaWxlIHRoaXMgYWRhcHRlciByZXdyaXRlcyBjcm9zcy1zb3VyY2UgbGlua3MgZm9yIHRoZSBwdWJsaWMgc2l0ZS5cbiAqL1xuXG5pbXBvcnQge1xuICBjb3B5RmlsZVN5bmMsIGV4aXN0c1N5bmMsIGxzdGF0U3luYywgbWtkaXJTeW5jLCByZWFkRmlsZVN5bmMsIHJlYWxwYXRoU3luYywgcm1TeW5jLCBzdGF0U3luYywgd3JpdGVGaWxlU3luYyxcbn0gZnJvbSAnbm9kZTpmcydcbmltcG9ydCB7IGJhc2VuYW1lLCBkaXJuYW1lLCBleHRuYW1lLCBwb3NpeCwgcmVsYXRpdmUsIHJlc29sdmUsIHNlcCB9IGZyb20gJ25vZGU6cGF0aCdcbmltcG9ydCB7IGZyb21NYXJrZG93biB9IGZyb20gJ21kYXN0LXV0aWwtZnJvbS1tYXJrZG93bidcbmltcG9ydCB7IGdmbUZyb21NYXJrZG93biB9IGZyb20gJ21kYXN0LXV0aWwtZ2ZtJ1xuaW1wb3J0IHsgZ2ZtIH0gZnJvbSAnbWljcm9tYXJrLWV4dGVuc2lvbi1nZm0nXG5pbXBvcnQgdHlwZSB7IE5vZGVzIH0gZnJvbSAnbWRhc3QnXG5pbXBvcnQgeyBkb2NzUGFnZXMsIHR5cGUgRG9jc0xvY2FsZSwgdHlwZSBEb2NzUGFnZSB9IGZyb20gJy4uL3dlYnNpdGUvZG9jcy50cydcblxuY29uc3QgUkVQT1NJVE9SWV9VUkwgPSAnaHR0cHM6Ly9naXRodWIuY29tL2RlZXBzZWVrLWFpL2RlZXBzZWVrLWhhcm5lc3MnXG5jb25zdCByb290ID0gcmVzb2x2ZShpbXBvcnQubWV0YS5kaXJuYW1lLCAnLi4nKVxuY29uc3QgZ2VuZXJhdGVkUm9vdCA9IHJlc29sdmUocm9vdCwgJ3dlYnNpdGUvLmdlbmVyYXRlZCcpXG5cbmludGVyZmFjZSBSZXBsYWNlbWVudCB7XG4gIHN0YXJ0OiBudW1iZXJcbiAgZW5kOiBudW1iZXJcbiAgdmFsdWU6IHN0cmluZ1xufVxuXG5pbnRlcmZhY2UgRGVzdGluYXRpb25SYW5nZSB7XG4gIHN0YXJ0OiBudW1iZXJcbiAgZW5kOiBudW1iZXJcbn1cblxudHlwZSBSZXdyaXRhYmxlTm9kZSA9IEV4dHJhY3Q8Tm9kZXMsIHsgdHlwZTogJ2xpbmsnIHwgJ2ltYWdlJyB8ICdkZWZpbml0aW9uJyB9PlxuXG4vKiogSW5wdXRzIGZvciByZXdyaXRpbmcgb25lIGNhbm9uaWNhbCBNYXJrZG93biBwYWdlLiAqL1xuZXhwb3J0IGludGVyZmFjZSBSZXdyaXRlTWFya2Rvd25PcHRpb25zIHtcbiAgbG9jYWxlOiBEb2NzTG9jYWxlXG4gIHNvdXJjZVBhdGg6IHN0cmluZ1xuICByb3V0ZTogc3RyaW5nXG4gIHBhZ2VzOiBEb2NzUGFnZVtdXG4gIHJlcG9Sb290OiBzdHJpbmdcbiAgcmVwb3NpdG9yeVJlZjogc3RyaW5nXG4gIC8qKlxuICAgKiBQbGFjZSBvbmUgcmVmZXJlbmNlZCBpbWFnZSBiZXNpZGUgdGhlIHByb2plY3RlZCBwYWdlIGFuZCByZXR1cm4gdGhlIFVSTCB0b1xuICAgKiByZWFjaCBpdCBmcm9tIHRoYXQgcGFnZS4gQSBHaXRIdWIgcmF3IFVSTCBjYW5ub3Qgc2VydmUgdGhpcyByZXBvc2l0b3J5IFx1MjAxNFxuICAgKiBgcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbWAgYW5zd2VycyA0MDQgZm9yIGEgcHJpdmF0ZSBvbmUsIGFuZCBubyByZWFkZXIgb2ZcbiAgICogdGhlIHNpdGUgaXMgYXV0aGVudGljYXRlZCB0byBpdCBcdTIwMTQgc28gYW4gaW1hZ2UgdHJhdmVscyBpbnRvIHRoZSBnZW5lcmF0ZWRcbiAgICogdHJlZSBhbmQgVml0ZSBidW5kbGVzIGl0IGxpa2UgYW55IG90aGVyIHNpdGUgYXNzZXQuIE9taXR0ZWQgYnkgY2FsbGVycyB0aGF0XG4gICAqIG9ubHkgcmV3cml0ZSB0ZXh0LCB3aGljaCB0aGVuIGxlYXZlIGltYWdlcyBwb2ludGluZyBhdCB0aGUgcmVwb3NpdG9yeS5cbiAgICovXG4gIHBsYWNlSW1hZ2U/OiAoYWJzUGF0aDogc3RyaW5nKSA9PiBzdHJpbmdcbn1cblxuZnVuY3Rpb24gcmVwb1BhdGgoYWJzUGF0aDogc3RyaW5nLCByZXBvUm9vdDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJlbGF0aXZlKHJlcG9Sb290LCBhYnNQYXRoKS5zcGxpdChzZXApLmpvaW4oJy8nKVxufVxuXG5mdW5jdGlvbiBpc0V4dGVybmFsT3JTaXRlQWJzb2x1dGUodXJsOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIHVybC5zdGFydHNXaXRoKCcjJylcbiAgICB8fCB1cmwuc3RhcnRzV2l0aCgnLy8nKVxuICAgIHx8IHVybC5zdGFydHNXaXRoKCcvJylcbiAgICB8fCAvXlthLXpBLVpdW2EtekEtWjAtOSsuLV0qOi8udGVzdCh1cmwpXG59XG5cbmZ1bmN0aW9uIHNraXBXaGl0ZXNwYWNlKHNvdXJjZTogc3RyaW5nLCBzdGFydDogbnVtYmVyKTogbnVtYmVyIHtcbiAgbGV0IGluZGV4ID0gc3RhcnRcbiAgd2hpbGUgKC9cXHMvLnRlc3Qoc291cmNlW2luZGV4XSA/PyAnJykpIGluZGV4ICs9IDFcbiAgcmV0dXJuIGluZGV4XG59XG5cbmZ1bmN0aW9uIGxhYmVsRW5kKHNvdXJjZTogc3RyaW5nKTogbnVtYmVyIHtcbiAgY29uc3QgZmlyc3QgPSBzb3VyY2UuaW5kZXhPZignWycpXG4gIGlmIChmaXJzdCA9PT0gLTEpIHJldHVybiAtMVxuICBsZXQgZGVwdGggPSAwXG4gIGZvciAobGV0IGluZGV4ID0gZmlyc3Q7IGluZGV4IDwgc291cmNlLmxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgIGNvbnN0IGNoYXIgPSBzb3VyY2VbaW5kZXhdXG4gICAgaWYgKGNoYXIgPT09ICdcXFxcJykge1xuICAgICAgaW5kZXggKz0gMVxuICAgIH0gZWxzZSBpZiAoY2hhciA9PT0gJ1snKSB7XG4gICAgICBkZXB0aCArPSAxXG4gICAgfSBlbHNlIGlmIChjaGFyID09PSAnXScpIHtcbiAgICAgIGRlcHRoIC09IDFcbiAgICAgIGlmIChkZXB0aCA9PT0gMCkgcmV0dXJuIGluZGV4XG4gICAgfVxuICB9XG4gIHJldHVybiAtMVxufVxuXG5mdW5jdGlvbiBkZXN0aW5hdGlvblJhbmdlKHJhd05vZGU6IHN0cmluZywgdHlwZTogJ2xpbmsnIHwgJ2ltYWdlJyB8ICdkZWZpbml0aW9uJyk6IERlc3RpbmF0aW9uUmFuZ2Uge1xuICBjb25zdCBlbmRPZkxhYmVsID0gbGFiZWxFbmQocmF3Tm9kZSlcbiAgaWYgKGVuZE9mTGFiZWwgPT09IC0xKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBwcm9qZWN0LWRvYy1zaXRlOiBjYW5ub3QgbG9jYXRlIGxhYmVsIGVuZCBpbiAke0pTT04uc3RyaW5naWZ5KHJhd05vZGUpfS5gKVxuICB9XG5cbiAgbGV0IHN0YXJ0OiBudW1iZXJcbiAgaWYgKHR5cGUgPT09ICdkZWZpbml0aW9uJykge1xuICAgIGNvbnN0IGNvbG9uID0gcmF3Tm9kZS5pbmRleE9mKCc6JywgZW5kT2ZMYWJlbCArIDEpXG4gICAgaWYgKGNvbG9uID09PSAtMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBwcm9qZWN0LWRvYy1zaXRlOiBjYW5ub3QgbG9jYXRlIGRlZmluaXRpb24gc2VwYXJhdG9yIGluICR7SlNPTi5zdHJpbmdpZnkocmF3Tm9kZSl9LmApXG4gICAgfVxuICAgIHN0YXJ0ID0gc2tpcFdoaXRlc3BhY2UocmF3Tm9kZSwgY29sb24gKyAxKVxuICB9IGVsc2Uge1xuICAgIGlmIChyYXdOb2RlW2VuZE9mTGFiZWwgKyAxXSAhPT0gJygnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHByb2plY3QtZG9jLXNpdGU6IGNhbm5vdCBsb2NhdGUgaW5saW5lIGRlc3RpbmF0aW9uIGluICR7SlNPTi5zdHJpbmdpZnkocmF3Tm9kZSl9LmApXG4gICAgfVxuICAgIHN0YXJ0ID0gc2tpcFdoaXRlc3BhY2UocmF3Tm9kZSwgZW5kT2ZMYWJlbCArIDIpXG4gIH1cblxuICBpZiAocmF3Tm9kZVtzdGFydF0gPT09ICc8Jykge1xuICAgIGZvciAobGV0IGluZGV4ID0gc3RhcnQgKyAxOyBpbmRleCA8IHJhd05vZGUubGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgICBpZiAocmF3Tm9kZVtpbmRleF0gPT09ICdcXFxcJykgaW5kZXggKz0gMVxuICAgICAgZWxzZSBpZiAocmF3Tm9kZVtpbmRleF0gPT09ICc+JykgcmV0dXJuIHsgc3RhcnQ6IHN0YXJ0ICsgMSwgZW5kOiBpbmRleCB9XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihgcHJvamVjdC1kb2Mtc2l0ZTogY2Fubm90IGxvY2F0ZSBhbmdsZS1icmFja2V0IGRlc3RpbmF0aW9uIGVuZCBpbiAke0pTT04uc3RyaW5naWZ5KHJhd05vZGUpfS5gKVxuICB9XG5cbiAgbGV0IGRlcHRoID0gMFxuICBmb3IgKGxldCBpbmRleCA9IHN0YXJ0OyBpbmRleCA8IHJhd05vZGUubGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgY29uc3QgY2hhciA9IHJhd05vZGVbaW5kZXhdXG4gICAgaWYgKGNoYXIgPT09ICdcXFxcJykge1xuICAgICAgaW5kZXggKz0gMVxuICAgIH0gZWxzZSBpZiAoY2hhciA9PT0gJygnKSB7XG4gICAgICBkZXB0aCArPSAxXG4gICAgfSBlbHNlIGlmIChjaGFyID09PSAnKScpIHtcbiAgICAgIGlmIChkZXB0aCA9PT0gMCkgcmV0dXJuIHsgc3RhcnQsIGVuZDogaW5kZXggfVxuICAgICAgZGVwdGggLT0gMVxuICAgIH0gZWxzZSBpZiAoL1xccy8udGVzdChjaGFyID8/ICcnKSAmJiBkZXB0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHsgc3RhcnQsIGVuZDogaW5kZXggfVxuICAgIH1cbiAgfVxuICByZXR1cm4geyBzdGFydCwgZW5kOiByYXdOb2RlLmxlbmd0aCB9XG59XG5cbi8vIGAjZnJhZ21lbnRgIHN1ZmZpeGVzIHBhc3MgdGhyb3VnaCB2ZXJiYXRpbS4gR2VuZXJhdGVkIGNvcmRpcy1zdXJmYWNlXG4vLyBoZWFkaW5ncyBjYXJyeSBleHBsaWNpdCBgPGEgaWQ+YCBhbmNob3JzIHdpdGggdGhlIEdpdEh1YiBzbHVnLCBzbyB0aG9zZVxuLy8gZnJhZ21lbnRzIHJlc29sdmUgb24gdGhlIHB1Ymxpc2hlZCBzaXRlIHRvbzsgaGFuZC13cml0dGVuIGhlYWRpbmdzIHJlbHkgb25cbi8vIFZpdGVQcmVzcydzIG93biBzbHVnZ2VyLCB3aGljaCBkaWZmZXJzIGZyb20gR2l0SHViJ3MgZm9yIHB1bmN0dWF0aW9uLWhlYXZ5XG4vLyB0ZXh0IFx1MjAxNCBoYW5kLWF1dGhvcmVkIGNyb3NzLXBhZ2UgZnJhZ21lbnRzIHNob3VsZCBwcmVmZXIgcGxhaW4tdGV4dCBoZWFkaW5nc1xuLy8gb3IgZXhwbGljaXQgYW5jaG9ycy5cbmZ1bmN0aW9uIHNwbGl0VGFyZ2V0KHVybDogc3RyaW5nKTogeyBwYXRoOiBzdHJpbmc7IHN1ZmZpeDogc3RyaW5nIH0ge1xuICBjb25zdCBib3VuZGFyeSA9IHVybC5zZWFyY2goL1s/I10vKVxuICBpZiAoYm91bmRhcnkgPT09IC0xKSByZXR1cm4geyBwYXRoOiB1cmwsIHN1ZmZpeDogJycgfVxuICByZXR1cm4geyBwYXRoOiB1cmwuc2xpY2UoMCwgYm91bmRhcnkpLCBzdWZmaXg6IHVybC5zbGljZShib3VuZGFyeSkgfVxufVxuXG5mdW5jdGlvbiBkZWNvZGVQYXRoKHBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChwYXRoKVxuICB9IGNhdGNoIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYHByb2plY3QtZG9jLXNpdGU6IG1hbGZvcm1lZCBwZXJjZW50IGVzY2FwZSBpbiAke0pTT04uc3RyaW5naWZ5KHBhdGgpfS5gKVxuICB9XG59XG5cbmZ1bmN0aW9uIHJvdXRlVGFyZ2V0KGZyb21Sb3V0ZTogc3RyaW5nLCB0b1JvdXRlOiBzdHJpbmcsIHN1ZmZpeDogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgdGFyZ2V0ID0gcG9zaXgucmVsYXRpdmUocG9zaXguZGlybmFtZShmcm9tUm91dGUpLCB0b1JvdXRlKVxuICByZXR1cm4gYCR7dGFyZ2V0LnN0YXJ0c1dpdGgoJy4nKSA/IHRhcmdldCA6IGAuLyR7dGFyZ2V0fWB9JHtzdWZmaXh9YFxufVxuXG5mdW5jdGlvbiBzb3VyY2VNYXAocGFnZXM6IERvY3NQYWdlW10pOiBNYXA8c3RyaW5nLCBNYXA8RG9jc0xvY2FsZSwgRG9jc1BhZ2U+PiB7XG4gIGNvbnN0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBNYXA8RG9jc0xvY2FsZSwgRG9jc1BhZ2U+PigpXG4gIGZvciAoY29uc3QgcGFnZSBvZiBwYWdlcykge1xuICAgIGZvciAoY29uc3Qgc291cmNlIG9mIFtwYWdlLnNvdXJjZSwgLi4uKHBhZ2Uuc291cmNlQWxpYXNlcyA/PyBbXSldKSB7XG4gICAgICBjb25zdCBsb2NhbGl6ZWQgPSBtYXAuZ2V0KHNvdXJjZSkgPz8gbmV3IE1hcDxEb2NzTG9jYWxlLCBEb2NzUGFnZT4oKVxuICAgICAgaWYgKGxvY2FsaXplZC5oYXMocGFnZS5sb2NhbGUpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgcHJvamVjdC1kb2Mtc2l0ZTogZHVwbGljYXRlIHNvdXJjZSBvciBhbGlhcyAke0pTT04uc3RyaW5naWZ5KHNvdXJjZSl9IGZvciBsb2NhbGUgJHtKU09OLnN0cmluZ2lmeShwYWdlLmxvY2FsZSl9LmApXG4gICAgICB9XG4gICAgICBsb2NhbGl6ZWQuc2V0KHBhZ2UubG9jYWxlLCBwYWdlKVxuICAgICAgbWFwLnNldChzb3VyY2UsIGxvY2FsaXplZClcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1hcFxufVxuXG5mdW5jdGlvbiBjb3VudGVycGFydFNvdXJjZShzb3VyY2U6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBzb3VyY2UuZW5kc1dpdGgoJy56aC5tZCcpXG4gICAgPyBzb3VyY2UucmVwbGFjZSgvXFwuemhcXC5tZCQvLCAnLm1kJylcbiAgICA6IHNvdXJjZS5yZXBsYWNlKC9cXC5tZCQvLCAnLnpoLm1kJylcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZVJlcG9zaXRvcnlUYXJnZXQoc291cmNlQWJzOiBzdHJpbmcsIHJhd1BhdGg6IHN0cmluZywgcmVwb1Jvb3Q6IHN0cmluZyk6IHsgYWJzUGF0aDogc3RyaW5nOyBsaW5lPzogbnVtYmVyIH0ge1xuICBjb25zdCBkZWNvZGVkID0gZGVjb2RlUGF0aChyYXdQYXRoKVxuICBsZXQgYWJzUGF0aCA9IHJlc29sdmUoZGlybmFtZShzb3VyY2VBYnMpLCBkZWNvZGVkKVxuICBpZiAoZXhpc3RzU3luYyhhYnNQYXRoKSkgcmV0dXJuIHsgYWJzUGF0aCB9XG5cbiAgY29uc3QgbGluZU1hdGNoID0gZGVjb2RlZC5tYXRjaCgvOihcXGQrKSQvKVxuICBpZiAobGluZU1hdGNoICE9PSBudWxsKSB7XG4gICAgY29uc3QgbGluZVRleHQgPSBsaW5lTWF0Y2hbMV1cbiAgICBpZiAobGluZVRleHQgPT09IHVuZGVmaW5lZCkgdGhyb3cgbmV3IEVycm9yKCdwcm9qZWN0LWRvYy1zaXRlOiBsaW5lIHN1ZmZpeCBtYXRjaGVkIHdpdGhvdXQgYSBsaW5lIG51bWJlci4nKVxuICAgIGFic1BhdGggPSByZXNvbHZlKGRpcm5hbWUoc291cmNlQWJzKSwgZGVjb2RlZC5zbGljZSgwLCAtbGluZU1hdGNoWzBdLmxlbmd0aCkpXG4gICAgaWYgKGV4aXN0c1N5bmMoYWJzUGF0aCkpIHJldHVybiB7IGFic1BhdGgsIGxpbmU6IE51bWJlci5wYXJzZUludChsaW5lVGV4dCwgMTApIH1cbiAgfVxuXG4gIGlmIChleHRuYW1lKGRlY29kZWQpID09PSAnJykge1xuICAgIGNvbnN0IG1hcmtkb3duID0gcmVzb2x2ZShkaXJuYW1lKHNvdXJjZUFicyksIGAke2RlY29kZWR9Lm1kYClcbiAgICBpZiAoZXhpc3RzU3luYyhtYXJrZG93bikpIHJldHVybiB7IGFic1BhdGg6IG1hcmtkb3duIH1cbiAgICBjb25zdCBpbmRleCA9IHJlc29sdmUoZGlybmFtZShzb3VyY2VBYnMpLCBkZWNvZGVkLCAnaW5kZXgubWQnKVxuICAgIGlmIChleGlzdHNTeW5jKGluZGV4KSkgcmV0dXJuIHsgYWJzUGF0aDogaW5kZXggfVxuICB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKGBwcm9qZWN0LWRvYy1zaXRlOiAke3JlcG9QYXRoKHNvdXJjZUFicywgcmVwb1Jvb3QpfSBsaW5rcyB0byBtaXNzaW5nIHBhdGggJHtKU09OLnN0cmluZ2lmeShyYXdQYXRoKX0uYClcbn1cblxuZnVuY3Rpb24gZ2l0aHViVGFyZ2V0KFxuICBhYnNQYXRoOiBzdHJpbmcsXG4gIGxpbmU6IG51bWJlciB8IHVuZGVmaW5lZCxcbiAgc3VmZml4OiBzdHJpbmcsXG4gIHJlcG9zaXRvcnlSZWY6IHN0cmluZyxcbiAgcmVwb1Jvb3Q6IHN0cmluZyxcbiAgaW1hZ2U6IGJvb2xlYW4sXG4pOiBzdHJpbmcge1xuICBjb25zdCBwYXRoID0gcmVwb1BhdGgoYWJzUGF0aCwgcmVwb1Jvb3QpXG4gIGlmIChpbWFnZSkgcmV0dXJuIGBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vZGVlcHNlZWstYWkvZGVlcHNlZWstaGFybmVzcy8ke3JlcG9zaXRvcnlSZWZ9LyR7cGF0aH0ke3N1ZmZpeH1gXG4gIGNvbnN0IGtpbmQgPSBsc3RhdFN5bmMoYWJzUGF0aCkuaXNEaXJlY3RvcnkoKSA/ICd0cmVlJyA6ICdibG9iJ1xuICBjb25zdCBsaW5lU3VmZml4ID0gbGluZSA9PT0gdW5kZWZpbmVkID8gc3VmZml4IDogYCNMJHtsaW5lfWBcbiAgcmV0dXJuIGAke1JFUE9TSVRPUllfVVJMfS8ke2tpbmR9LyR7cmVwb3NpdG9yeVJlZn0vJHtwYXRofSR7bGluZVN1ZmZpeH1gXG59XG5cbi8qKlxuICogUmV3cml0ZSByZXBvc2l0b3J5LXJlbGF0aXZlIGxpbmtzIHdpdGhvdXQgcmVzZXJpYWxpemluZyBNYXJrZG93bi5cbiAqXG4gKiBAcGFyYW0gc291cmNlIE1hcmtkb3duIHRleHQgZnJvbSB0aGUgY2Fub25pY2FsIGZpbGUuXG4gKiBAcGFyYW0gb3B0aW9ucyBTb3VyY2UsIHJvdXRlLCBtYW5pZmVzdCwgYW5kIHJlcG9zaXRvcnkgY29udGV4dC5cbiAqIEByZXR1cm5zIE1hcmtkb3duIHdob3NlIHB1Ymxpc2hlZCBsaW5rcyByZXNvbHZlIGluc2lkZSB0aGUgc2l0ZSBvciB0byBHaXRIdWIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXdyaXRlTWFya2Rvd24oc291cmNlOiBzdHJpbmcsIG9wdGlvbnM6IFJld3JpdGVNYXJrZG93bk9wdGlvbnMpOiBzdHJpbmcge1xuICBjb25zdCBzb3VyY2VBYnMgPSByZXNvbHZlKG9wdGlvbnMucmVwb1Jvb3QsIG9wdGlvbnMuc291cmNlUGF0aClcbiAgY29uc3QgcHVibGlzaGVkID0gc291cmNlTWFwKG9wdGlvbnMucGFnZXMpXG4gIGNvbnN0IHRyZWUgPSBmcm9tTWFya2Rvd24oc291cmNlLCB7IGV4dGVuc2lvbnM6IFtnZm0oKV0sIG1kYXN0RXh0ZW5zaW9uczogW2dmbUZyb21NYXJrZG93bigpXSB9KVxuICBjb25zdCByZXBsYWNlbWVudHM6IFJlcGxhY2VtZW50W10gPSBbXVxuXG4gIGNvbnN0IHJld3JpdGUgPSAobm9kZTogUmV3cml0YWJsZU5vZGUpOiB2b2lkID0+IHtcbiAgICBpZiAoaXNFeHRlcm5hbE9yU2l0ZUFic29sdXRlKG5vZGUudXJsKSkgcmV0dXJuXG4gICAgY29uc3QgeyBwYXRoLCBzdWZmaXggfSA9IHNwbGl0VGFyZ2V0KG5vZGUudXJsKVxuICAgIGlmIChwYXRoID09PSAnJykgcmV0dXJuXG4gICAgY29uc3QgeyBhYnNQYXRoLCBsaW5lIH0gPSByZXNvbHZlUmVwb3NpdG9yeVRhcmdldChzb3VyY2VBYnMsIHBhdGgsIG9wdGlvbnMucmVwb1Jvb3QpXG4gICAgY29uc3QgdGFyZ2V0UGF0aCA9IHJlcG9QYXRoKGFic1BhdGgsIG9wdGlvbnMucmVwb1Jvb3QpXG4gICAgY29uc3QgaXNMYW5ndWFnZVN3aXRjaGVyID0gdGFyZ2V0UGF0aCA9PT0gY291bnRlcnBhcnRTb3VyY2Uob3B0aW9ucy5zb3VyY2VQYXRoKVxuICAgIGNvbnN0IHRhcmdldExvY2FsZTogRG9jc0xvY2FsZSA9IGlzTGFuZ3VhZ2VTd2l0Y2hlclxuICAgICAgPyBvcHRpb25zLmxvY2FsZSA9PT0gJ3Jvb3QnID8gJ2VuJyA6ICdyb290J1xuICAgICAgOiBvcHRpb25zLmxvY2FsZVxuICAgIGNvbnN0IHBhZ2UgPSBwdWJsaXNoZWQuZ2V0KHRhcmdldFBhdGgpPy5nZXQodGFyZ2V0TG9jYWxlKVxuICAgIGNvbnN0IG5leHRVcmwgPSBwYWdlICE9PSB1bmRlZmluZWRcbiAgICAgID8gcm91dGVUYXJnZXQob3B0aW9ucy5yb3V0ZSwgcGFnZS5yb3V0ZSwgc3VmZml4KVxuICAgICAgOiBub2RlLnR5cGUgPT09ICdpbWFnZScgJiYgb3B0aW9ucy5wbGFjZUltYWdlICE9PSB1bmRlZmluZWRcbiAgICAgICAgLy8gVGhlIHN1ZmZpeCByaWRlcyBhbG9uZyBleGFjdGx5IGFzIHRoZSBHaXRIdWIgYnJhbmNoIGtlZXBzIGl0OiBhbiBTVkdcbiAgICAgICAgLy8gdmlldyBmcmFnbWVudCBvciBhIFZpdGUgcXVlcnkgY2hhbmdlcyB3aGF0IHRoZSByZWZlcmVuY2UgbWVhbnMuXG4gICAgICAgID8gYCR7b3B0aW9ucy5wbGFjZUltYWdlKGFic1BhdGgpfSR7c3VmZml4fWBcbiAgICAgICAgOiBnaXRodWJUYXJnZXQoYWJzUGF0aCwgbGluZSwgc3VmZml4LCBvcHRpb25zLnJlcG9zaXRvcnlSZWYsIG9wdGlvbnMucmVwb1Jvb3QsIG5vZGUudHlwZSA9PT0gJ2ltYWdlJylcblxuICAgIGNvbnN0IHN0YXJ0ID0gbm9kZS5wb3NpdGlvbj8uc3RhcnQub2Zmc2V0XG4gICAgY29uc3QgZW5kID0gbm9kZS5wb3NpdGlvbj8uZW5kLm9mZnNldFxuICAgIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkIHx8IGVuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHByb2plY3QtZG9jLXNpdGU6IGxpbmsgJHtKU09OLnN0cmluZ2lmeShub2RlLnVybCl9IGhhcyBubyBzb3VyY2Ugb2Zmc2V0cy5gKVxuICAgIH1cbiAgICBjb25zdCByYXdOb2RlID0gc291cmNlLnNsaWNlKHN0YXJ0LCBlbmQpXG4gICAgY29uc3QgcmF3RGVzdGluYXRpb24gPSBkZXN0aW5hdGlvblJhbmdlKHJhd05vZGUsIG5vZGUudHlwZSlcbiAgICByZXBsYWNlbWVudHMucHVzaCh7XG4gICAgICBzdGFydDogc3RhcnQgKyByYXdEZXN0aW5hdGlvbi5zdGFydCxcbiAgICAgIGVuZDogc3RhcnQgKyByYXdEZXN0aW5hdGlvbi5lbmQsXG4gICAgICB2YWx1ZTogbmV4dFVybCxcbiAgICB9KVxuICB9XG5cbiAgY29uc3QgdmlzaXQgPSAobm9kZTogTm9kZXMpOiB2b2lkID0+IHtcbiAgICBpZiAoKG5vZGUudHlwZSA9PT0gJ2xpbmsnIHx8IG5vZGUudHlwZSA9PT0gJ2ltYWdlJyB8fCBub2RlLnR5cGUgPT09ICdkZWZpbml0aW9uJykgJiYgJ3VybCcgaW4gbm9kZSkgcmV3cml0ZShub2RlKVxuICAgIGlmICgnY2hpbGRyZW4nIGluIG5vZGUpIHtcbiAgICAgIGZvciAoY29uc3QgY2hpbGQgb2Ygbm9kZS5jaGlsZHJlbikgdmlzaXQoY2hpbGQpXG4gICAgfVxuICB9XG4gIHZpc2l0KHRyZWUpXG5cbiAgbGV0IHByb2plY3RlZCA9IHNvdXJjZVxuICBmb3IgKGNvbnN0IHJlcGxhY2VtZW50IG9mIHJlcGxhY2VtZW50cy5zb3J0KChhLCBiKSA9PiBiLnN0YXJ0IC0gYS5zdGFydCkpIHtcbiAgICBwcm9qZWN0ZWQgPSBwcm9qZWN0ZWQuc2xpY2UoMCwgcmVwbGFjZW1lbnQuc3RhcnQpICsgcmVwbGFjZW1lbnQudmFsdWUgKyBwcm9qZWN0ZWQuc2xpY2UocmVwbGFjZW1lbnQuZW5kKVxuICB9XG4gIHJldHVybiBwcm9qZWN0ZWRcbn1cblxuLyoqXG4gKiBSZWNvcmQgdGhlIGNhbm9uaWNhbCBlZGl0IHRhcmdldCBpbiBWaXRlUHJlc3MgZnJvbnRtYXR0ZXIuXG4gKlxuICogQHBhcmFtIG1hcmtkb3duIFByb2plY3RlZCBNYXJrZG93biBjb250ZW50LlxuICogQHBhcmFtIHBhZ2UgUHVibGljYXRpb24gbWFuaWZlc3QgZW50cnkgZm9yIHRoZSBjb250ZW50LlxuICogQHJldHVybnMgTWFya2Rvd24gd2l0aCBwcm9qZWN0aW9uLW93bmVkIGZyb250bWF0dGVyIGZpZWxkcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZFByb2plY3Rpb25Gcm9udG1hdHRlcihtYXJrZG93bjogc3RyaW5nLCBwYWdlOiBQaWNrPERvY3NQYWdlLCAnc291cmNlJyB8ICdvdXRsaW5lJz4pOiBzdHJpbmcge1xuICBjb25zdCBmaWVsZHMgPSBbXG4gICAgYGVkaXRTb3VyY2U6ICR7SlNPTi5zdHJpbmdpZnkocGFnZS5zb3VyY2UpfWAsXG4gICAgLi4uKHBhZ2Uub3V0bGluZSA9PT0gdW5kZWZpbmVkID8gW10gOiBbYG91dGxpbmU6ICR7SlNPTi5zdHJpbmdpZnkocGFnZS5vdXRsaW5lKX1gXSksXG4gIF0uam9pbignXFxuJylcbiAgaWYgKG1hcmtkb3duLnN0YXJ0c1dpdGgoJy0tLVxcbicpKSByZXR1cm4gbWFya2Rvd24ucmVwbGFjZSgnLS0tXFxuJywgYC0tLVxcbiR7ZmllbGRzfVxcbmApXG4gIHJldHVybiBgLS0tXFxuJHtmaWVsZHN9XFxuLS0tXFxuXFxuJHttYXJrZG93bn1gXG59XG5cbi8qKiBUaGUgc3dpdGNoZXIgbGluZSBhIGNhbm9uaWNhbCBwYWdlIGNhcnJpZXMgc28gaXRzIEdpdEh1YiByZWFkZXIgY2FuIHJlYWNoIHRoZSBvdGhlciBsYW5ndWFnZS4gKi9cbmNvbnN0IExBTkdVQUdFX1NXSVRDSEVSID0gL14oPzpFbmdsaXNoIFxcfCBcXFtcdTRFMkRcdTY1ODdcXF1cXChbXildKlxcKXxcXFtFbmdsaXNoXFxdXFwoW14pXSpcXCkgXFx8IFx1NEUyRFx1NjU4NykkL1xuXG4vKiogVGhlIHJlcG9zaXRvcnkgYmFkZ2UgYSBjYW5vbmljYWwgcGFnZSBjYXJyaWVzIGZvciBpdHMgR2l0SHViIHJlYWRlci4gKi9cbmNvbnN0IFJFUE9TSVRPUllfQkFER0UgPSAvXlxcWyFcXFtbXlxcXV0qXFxdXFwoaHR0cHM6XFwvXFwvaW1nXFwuc2hpZWxkc1xcLmlvXFwvW14pXSpcXClcXF1cXChbXildKlxcKSQvXG5cbi8qKlxuICogRHJvcCB0aGUgbGluZXMgdGhhdCBhZGRyZXNzIGEgY2Fub25pY2FsIHBhZ2UncyBHaXRIdWIgcmVhZGVyLlxuICpcbiAqIFRoZSBzaXRlIGNhcnJpZXMgYSBsb2NhbGUgc3dpdGNoZXIgaW4gaXRzIG5hdmlnYXRpb24gYmFyIGFuZCBsaW5rcyB0aGVcbiAqIHJlcG9zaXRvcnkgZnJvbSBldmVyeSBwYWdlLCBzbyBwcm9qZWN0aW5nIHRoZXNlIGxpbmVzIHdvdWxkIHJlcGVhdCBib3RoIFx1MjAxNCB0aGVcbiAqIHN3aXRjaGVyIGFzIHRoZSBmaXJzdCBlbGVtZW50IHVuZGVyIGVhY2ggaGVhZGluZy5cbiAqXG4gKiBAcGFyYW0gbWFya2Rvd24gUmV3cml0dGVuIGNhbm9uaWNhbCBNYXJrZG93biBjb250ZW50LlxuICogQHJldHVybnMgVGhlIGNvbnRlbnQgd2l0aG91dCB0aGUgc3dpdGNoZXIgbGluZSBvciB0aGUgcmVwb3NpdG9yeSBiYWRnZS5cbiAqL1xuZnVuY3Rpb24gd2l0aG91dFJlcG9zaXRvcnlDaHJvbWUobWFya2Rvd246IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IGxpbmVzID0gbWFya2Rvd24uc3BsaXQoJ1xcbicpXG4gIGNvbnN0IHN3aXRjaGVyID0gbGluZXMuZmluZEluZGV4KGxpbmUgPT4gTEFOR1VBR0VfU1dJVENIRVIudGVzdChsaW5lKSlcbiAgLy8gT25seSB0aGUgc3dpdGNoZXIgaW50cm9kdWNpbmcgdGhlIHBhZ2UgcXVhbGlmaWVzOyBmdXJ0aGVyIGRvd24gdGhlIHNhbWVcbiAgLy8gdGV4dCBpcyBwcm9zZSBvciBhIHNhbXBsZSByYXRoZXIgdGhhbiB0aGUgcGFnZSdzIG93biBoZWFkZXIuXG4gIGlmIChzd2l0Y2hlciAhPT0gLTEgJiYgc3dpdGNoZXIgPCA4KSB7XG4gICAgbGluZXMuc3BsaWNlKHN3aXRjaGVyLCBsaW5lc1tzd2l0Y2hlciArIDFdID09PSAnJyA/IDIgOiAxKVxuICB9XG4gIGNvbnN0IGJhZGdlID0gbGluZXMuZmluZExhc3RJbmRleChsaW5lID0+IFJFUE9TSVRPUllfQkFER0UudGVzdChsaW5lKSlcbiAgaWYgKGJhZGdlICE9PSAtMSkge1xuICAgIGxpbmVzLnNwbGljZShsaW5lc1tiYWRnZSAtIDFdID09PSAnJyA/IGJhZGdlIC0gMSA6IGJhZGdlLCBsaW5lc1tiYWRnZSAtIDFdID09PSAnJyA/IDIgOiAxKVxuICB9XG4gIHJldHVybiBsaW5lcy5qb2luKCdcXG4nKVxufVxuXG4vKipcbiAqIFNlbGVjdCB0aGUgTWFya2Rvd24gcmVuZGVyZWQgZm9yIG9uZSBwdWJsaXNoZWQgcGFnZS5cbiAqXG4gKiBAcGFyYW0gbWFya2Rvd24gUmV3cml0dGVuIGNhbm9uaWNhbCBNYXJrZG93biBjb250ZW50LlxuICogQHBhcmFtIHBhZ2UgUHVibGljYXRpb24gbWFuaWZlc3QgZW50cnkgZm9yIHRoZSBjb250ZW50LlxuICogQHJldHVybnMgRnVsbCBNYXJrZG93biBmb3Igb3JkaW5hcnkgcGFnZXMgb3IgZnJvbnRtYXR0ZXItb25seSBNYXJrZG93biBmb3IgYSBsb2NhbGUgaG9tZSBwYWdlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvamVjdGVkUGFnZUNvbnRlbnQobWFya2Rvd246IHN0cmluZywgcGFnZTogRG9jc1BhZ2UpOiBzdHJpbmcge1xuICBpZiAocGFnZS5zaWRlYmFyICE9PSBudWxsKSByZXR1cm4gd2l0aG91dFJlcG9zaXRvcnlDaHJvbWUobWFya2Rvd24pXG4gIGlmICghbWFya2Rvd24uc3RhcnRzV2l0aCgnLS0tXFxuJykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYHByb2plY3QtZG9jLXNpdGU6IGxvY2FsZSBob21lIHNvdXJjZSAke0pTT04uc3RyaW5naWZ5KHBhZ2Uuc291cmNlKX0gbXVzdCBzdGFydCB3aXRoIFlBTUwgZnJvbnRtYXR0ZXIuYClcbiAgfVxuICBjb25zdCBjbG9zaW5nRGVsaW1pdGVyID0gJ1xcbi0tLVxcbidcbiAgY29uc3QgY2xvc2luZyA9IG1hcmtkb3duLmluZGV4T2YoY2xvc2luZ0RlbGltaXRlciwgNClcbiAgaWYgKGNsb3NpbmcgPT09IC0xKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBwcm9qZWN0LWRvYy1zaXRlOiBsb2NhbGUgaG9tZSBzb3VyY2UgJHtKU09OLnN0cmluZ2lmeShwYWdlLnNvdXJjZSl9IGhhcyB1bmNsb3NlZCBZQU1MIGZyb250bWF0dGVyLmApXG4gIH1cbiAgcmV0dXJuIG1hcmtkb3duLnNsaWNlKDAsIGNsb3NpbmcgKyBjbG9zaW5nRGVsaW1pdGVyLmxlbmd0aClcbn1cblxuLyoqXG4gKiBUaGUgcmVwb3NpdG9yeSBmaWxlIG9uZSBpbWFnZSByZWZlcmVuY2UgcmVzb2x2ZXMgdG8sIG9yIGB1bmRlZmluZWRgIHdoZW4gdGhlXG4gKiB0YXJnZXQgaXMgbm90IGEgbG9jYWwgZmlsZSB0aGlzIGJ1aWxkIG1heSBwdWJsaXNoLlxuICogQHBhcmFtIGFic1BhdGggLSByZXNvbHZlZCBpbWFnZSB0YXJnZXQuXG4gKiBAcGFyYW0gcmVwb1Jvb3QgLSByZXBvc2l0b3J5IHJvb3QgZXZlcnkgcHVibGlzaGVkIGltYWdlIG11c3Qgc3RheSBpbnNpZGUuXG4gKiBAcmV0dXJucyB0aGUgZmlsZSdzIHJlYWwgcGF0aCwgb3IgYHVuZGVmaW5lZGAgd2hlbiBpdCBtdXN0IG5vdCBiZSBjb3BpZWQuXG4gKlxuICogT25seSBhIHJlZ3VsYXIgZmlsZSB3aG9zZSByZWFsIHBhdGggc3RheXMgaW5zaWRlIHRoZSByZXBvc2l0b3J5IHF1YWxpZmllcy5cbiAqIFB1YmxpY2F0aW9uIGNvcGllcyB0aGUgYnl0ZXMgaW50byB0aGUgc2l0ZSwgc28gYSByZWZlcmVuY2UgZXNjYXBpbmcgdGhlXG4gKiByZXBvc2l0b3J5IFx1MjAxNCBgLi4vLi4vLnNzaC9pZF9yc2FgLCBvciBhIHN5bWxpbmsgcG9pbnRpbmcgb3V0IG9mIHRoZSB0cmVlIFx1MjAxNFxuICogd291bGQgcHV0IGEgYnVpbGQtbWFjaGluZSBmaWxlIG9uIHRoZSBzaXRlOyBgZXhpc3RzU3luY2AgYWxvbmUsIHdoaWNoIGlzIGFsbFxuICogbGluayByZXNvbHV0aW9uIG5lZWRzLCBkb2VzIG5vdCBhbnN3ZXIgdGhhdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHB1Ymxpc2hhYmxlSW1hZ2UoYWJzUGF0aDogc3RyaW5nLCByZXBvUm9vdDogc3RyaW5nKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgY29uc3QgcmVhbCA9IHJlYWxwYXRoU3luYyhhYnNQYXRoKVxuICBjb25zdCBpbnNpZGUgPSByZWFsID09PSByZXBvUm9vdCB8fCByZWFsLnN0YXJ0c1dpdGgoYCR7cmVwb1Jvb3R9JHtzZXB9YClcbiAgcmV0dXJuIGluc2lkZSAmJiBzdGF0U3luYyhyZWFsKS5pc0ZpbGUoKSA/IHJlYWwgOiB1bmRlZmluZWRcbn1cblxuLyoqIEV2ZXJ5IGxvY2FsIGltYWdlIGEgcHVibGlzaGVkIHBhZ2UgcmVmZXJlbmNlcywgcmVzb2x2ZWQgdG8gaXRzIHJlcG9zaXRvcnkgZmlsZS4gKi9cbmZ1bmN0aW9uIHJlZmVyZW5jZWRJbWFnZXMoKTogc3RyaW5nW10ge1xuICBjb25zdCBmb3VuZCA9IG5ldyBTZXQ8c3RyaW5nPigpXG4gIGZvciAoY29uc3QgcGFnZSBvZiBkb2NzUGFnZXMpIHtcbiAgICBjb25zdCBzb3VyY2VBYnMgPSByZXNvbHZlKHJvb3QsIHBhZ2Uuc291cmNlKVxuICAgIGlmICghZXhpc3RzU3luYyhzb3VyY2VBYnMpKSBjb250aW51ZVxuICAgIHJld3JpdGVNYXJrZG93bihyZWFkRmlsZVN5bmMoc291cmNlQWJzLCAndXRmOCcpLCB7XG4gICAgICBzb3VyY2VQYXRoOiBwYWdlLnNvdXJjZSxcbiAgICAgIGxvY2FsZTogcGFnZS5sb2NhbGUsXG4gICAgICByb3V0ZTogcGFnZS5yb3V0ZSxcbiAgICAgIHBhZ2VzOiBkb2NzUGFnZXMsXG4gICAgICByZXBvUm9vdDogcm9vdCxcbiAgICAgIHJlcG9zaXRvcnlSZWY6ICdtYXN0ZXInLFxuICAgICAgcGxhY2VJbWFnZTogKGFic1BhdGgpID0+IHtcbiAgICAgICAgY29uc3QgcmVhbCA9IHB1Ymxpc2hhYmxlSW1hZ2UoYWJzUGF0aCwgcm9vdClcbiAgICAgICAgaWYgKHJlYWwgIT09IHVuZGVmaW5lZCkgZm91bmQuYWRkKHJlYWwpXG4gICAgICAgIHJldHVybiAnJ1xuICAgICAgfSxcbiAgICB9KVxuICB9XG4gIHJldHVybiBbLi4uZm91bmRdXG59XG5cbi8qKlxuICogRmlsZXMgd2F0Y2hlZCBieSB0aGUgbG9jYWwgVml0ZVByZXNzIGRldiBzZXJ2ZXI6IGV2ZXJ5IGNhbm9uaWNhbCBNYXJrZG93blxuICogc291cmNlLCBwbHVzIHRoZSBpbWFnZXMgdGhleSBwdWJsaXNoLiBXaXRob3V0IHRoZSBpbWFnZXMsIHJlcGxhY2luZyBhXG4gKiBzY3JlZW5zaG90IGxlYXZlcyB0aGUgcHJldmlvdXMgY29weSBpbiB0aGUgZ2VuZXJhdGVkIHRyZWUgdW50aWwgc29tZXRoaW5nXG4gKiB0b3VjaGVzIHRoZSBNYXJrZG93biBiZXNpZGUgaXQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkb2NzU291cmNlRmlsZXMoKTogc3RyaW5nW10ge1xuICByZXR1cm4gWy4uLm5ldyBTZXQoWy4uLmRvY3NQYWdlcy5tYXAocGFnZSA9PiByZXNvbHZlKHJvb3QsIHBhZ2Uuc291cmNlKSksIC4uLnJlZmVyZW5jZWRJbWFnZXMoKV0pXVxufVxuXG4vKiogUmVidWlsZCB0aGUgZGlzcG9zYWJsZSBWaXRlUHJlc3Mgc291cmNlIHRyZWUgZnJvbSB0aGUgcHVibGljYXRpb24gbWFuaWZlc3QuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvamVjdERvY3MoKTogdm9pZCB7XG4gIGNvbnN0IHJvdXRlcyA9IG5ldyBTZXQ8c3RyaW5nPigpXG4gIC8qKiBQcm9qZWN0ZWQgcGF0aCB0byB0aGUgcmVwb3NpdG9yeSBmaWxlIHRoYXQgY2xhaW1lZCBpdCwgcGFnZXMgYW5kIGltYWdlcyBhbGlrZS4gKi9cbiAgY29uc3QgY2xhaW1lZCA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KClcbiAgY29uc3QgcmVwb3NpdG9yeVJlZiA9IHByb2Nlc3MuZW52LkdJVEhVQl9TSEEgPz8gJ21hc3RlcidcbiAgcm1TeW5jKGdlbmVyYXRlZFJvb3QsIHsgcmVjdXJzaXZlOiB0cnVlLCBmb3JjZTogdHJ1ZSB9KVxuXG4gIC8qKiBSZXNlcnZlIG9uZSBwcm9qZWN0ZWQgcGF0aCwgcmVmdXNpbmcgYSBzZWNvbmQgc291cmNlIGZvciBpdC4gKi9cbiAgY29uc3QgY2xhaW0gPSAodGFyZ2V0OiBzdHJpbmcsIHNvdXJjZUFiczogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgY29uc3QgaG9sZGVyID0gY2xhaW1lZC5nZXQodGFyZ2V0KVxuICAgIGlmIChob2xkZXIgIT09IHVuZGVmaW5lZCAmJiBob2xkZXIgIT09IHNvdXJjZUFicykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgcHJvamVjdC1kb2Mtc2l0ZTogJHtyZXBvUGF0aChzb3VyY2VBYnMsIHJvb3QpfSBhbmQgJHtyZXBvUGF0aChob2xkZXIsIHJvb3QpfWBcbiAgICAgICAgKyBgIGJvdGggcHJvamVjdCB0byAke3JlbGF0aXZlKGdlbmVyYXRlZFJvb3QsIHRhcmdldCkuc3BsaXQoc2VwKS5qb2luKCcvJyl9LmAsXG4gICAgICApXG4gICAgfVxuICAgIGNsYWltZWQuc2V0KHRhcmdldCwgc291cmNlQWJzKVxuICB9XG5cbiAgZm9yIChjb25zdCBwYWdlIG9mIGRvY3NQYWdlcykge1xuICAgIGlmIChyb3V0ZXMuaGFzKHBhZ2Uucm91dGUpKSB0aHJvdyBuZXcgRXJyb3IoYHByb2plY3QtZG9jLXNpdGU6IGR1cGxpY2F0ZSByb3V0ZSAke0pTT04uc3RyaW5naWZ5KHBhZ2Uucm91dGUpfS5gKVxuICAgIHJvdXRlcy5hZGQocGFnZS5yb3V0ZSlcbiAgICBjb25zdCBzb3VyY2VBYnMgPSByZXNvbHZlKHJvb3QsIHBhZ2Uuc291cmNlKVxuICAgIGlmICghZXhpc3RzU3luYyhzb3VyY2VBYnMpIHx8ICFsc3RhdFN5bmMoc291cmNlQWJzKS5pc0ZpbGUoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBwcm9qZWN0LWRvYy1zaXRlOiBzb3VyY2UgJHtKU09OLnN0cmluZ2lmeShwYWdlLnNvdXJjZSl9IGRvZXMgbm90IGV4aXN0IG9yIGlzIG5vdCBhIGZpbGUuYClcbiAgICB9XG4gICAgY29uc3Qgb3V0cHV0ID0gcmVzb2x2ZShnZW5lcmF0ZWRSb290LCBwYWdlLnJvdXRlKVxuICAgIC8vIENsYWltZWQgYmVmb3JlIHRoZSBpbWFnZXMgYXJlIHBsYWNlZDogYSBwYWdlIGFuZCBhbiBpbWFnZSBsYW5kaW5nIG9uIG9uZVxuICAgIC8vIHBhdGggd291bGQgb3RoZXJ3aXNlIG92ZXJ3cml0ZSBlYWNoIG90aGVyIGluIHdoaWNoZXZlciBvcmRlciB0aGV5IHJhbi5cbiAgICBjbGFpbShvdXRwdXQsIHNvdXJjZUFicylcbiAgICBta2RpclN5bmMoZGlybmFtZShvdXRwdXQpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KVxuICAgIGNvbnN0IG1hcmtkb3duID0gcmVhZEZpbGVTeW5jKHNvdXJjZUFicywgJ3V0ZjgnKVxuICAgIGNvbnN0IHByb2plY3RlZCA9IHJld3JpdGVNYXJrZG93bihtYXJrZG93biwge1xuICAgICAgc291cmNlUGF0aDogcGFnZS5zb3VyY2UsXG4gICAgICBsb2NhbGU6IHBhZ2UubG9jYWxlLFxuICAgICAgcm91dGU6IHBhZ2Uucm91dGUsXG4gICAgICBwYWdlczogZG9jc1BhZ2VzLFxuICAgICAgcmVwb1Jvb3Q6IHJvb3QsXG4gICAgICByZXBvc2l0b3J5UmVmLFxuICAgICAgcGxhY2VJbWFnZTogKGFic1BhdGgpID0+IHtcbiAgICAgICAgY29uc3QgcmVhbCA9IHB1Ymxpc2hhYmxlSW1hZ2UoYWJzUGF0aCwgcm9vdClcbiAgICAgICAgaWYgKHJlYWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgIGBwcm9qZWN0LWRvYy1zaXRlOiAke3BhZ2Uuc291cmNlfSByZWZlcmVuY2VzIGltYWdlICR7cmVwb1BhdGgoYWJzUGF0aCwgcm9vdCl9LGBcbiAgICAgICAgICAgICsgJyB3aGljaCBpcyBub3QgYSByZWd1bGFyIGZpbGUgaW5zaWRlIHRoZSByZXBvc2l0b3J5LicsXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAgIC8vIEJlc2lkZSB0aGUgcGFnZSB0aGF0IHJlZmVyZW5jZXMgaXQsIHVuZGVyIGl0cyBvd24gYmFzZW5hbWU6IGVhY2hcbiAgICAgICAgLy8gbG9jYWxlJ3Mgcm91dGUgdHJlZSBnZXRzIGl0cyBvd24gY29weSwgc28gb25lIHJlbGF0aXZlIFVSTCBpcyBjb3JyZWN0XG4gICAgICAgIC8vIGZyb20gYm90aC5cbiAgICAgICAgY29uc3QgbmFtZSA9IGJhc2VuYW1lKHJlYWwpXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHJlc29sdmUoZGlybmFtZShvdXRwdXQpLCBuYW1lKVxuICAgICAgICBjbGFpbSh0YXJnZXQsIHJlYWwpXG4gICAgICAgIGNvcHlGaWxlU3luYyhyZWFsLCB0YXJnZXQpXG4gICAgICAgIC8vIEVuY29kZWQgYmVjYXVzZSB0aGUgZGVzdGluYXRpb24gaXMgYSBNYXJrZG93biBpbmxpbmUgdGFyZ2V0LCB3aGVyZSBhblxuICAgICAgICAvLyB1bmVzY2FwZWQgc3BhY2Ugd291bGQgZW5kIGl0IGVhcmx5LlxuICAgICAgICByZXR1cm4gYC4vJHtlbmNvZGVVUkkobmFtZSl9YFxuICAgICAgfSxcbiAgICB9KVxuICAgIHdyaXRlRmlsZVN5bmMob3V0cHV0LCBhZGRQcm9qZWN0aW9uRnJvbnRtYXR0ZXIocHJvamVjdGVkUGFnZUNvbnRlbnQocHJvamVjdGVkLCBwYWdlKSwgcGFnZSkpXG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFFQSxTQUFTLGdCQUFBQSxxQkFBb0I7QUFDN0IsU0FBUyxXQUFBQyxnQkFBZTtBQUd4QixTQUFTLG1CQUFtQjs7O0FDMEQ1QixTQUFTLFVBQWEsT0FBa0MsUUFBdUI7QUFDN0UsU0FBTyxPQUFPLFVBQVUsWUFBWSxVQUFVLFFBQVEsQ0FBQyxNQUFNLFFBQVEsS0FBSyxJQUNyRSxNQUFnQyxNQUFN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Q1I7QUFBQSxRQUNBLFNBQVMsRUFBRSxPQUFPLGVBQWU7QUFBQSxRQUNqQyxXQUFXLEVBQUUsTUFBTSxZQUFZLE1BQU0sT0FBTztBQUFBLE1BQzlDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE1BQU07QUFBQTtBQUFBO0FBQUEsSUFHSixXQUFXRCxTQUFRQyxtQ0FBcUIsV0FBVztBQUFBLElBQ25ELFNBQVM7QUFBQSxNQUNQO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixpQkFBaUI7QUFBQSxNQUNuQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxVQUFVO0FBQUEsSUFDUixPQUFPLElBQUk7QUFDVCxZQUFNLGFBQWEsR0FBRyxTQUFTLE1BQU07QUFDckMsWUFBTSxhQUFhLEdBQUcsU0FBUyxNQUFNO0FBQ3JDLFVBQUksZUFBZSxVQUFhLGVBQWUsUUFBVztBQUN4RCxjQUFNLElBQUksTUFBTSxzRUFBc0U7QUFBQSxNQUN4RjtBQUNBLFNBQUcsU0FBUyxNQUFNLE9BQU8sSUFBSSxTQUFTLHVCQUF1QixXQUFXLEdBQUcsSUFBSSxDQUFDO0FBQ2hGLFNBQUcsU0FBUyxNQUFNLGNBQWMsSUFBSSxTQUFTLHVCQUF1QixXQUFXLEdBQUcsSUFBSSxDQUFDO0FBQUEsSUFDekY7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTLENBQUM7QUFBQSxFQUNWLGFBQWE7QUFDZixDQUFDOyIsCiAgIm5hbWVzIjogWyJyZWFkRmlsZVN5bmMiLCAicmVzb2x2ZSIsICJsb2NhbGl6ZWQiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiLCAiZGV2ZWxvcCIsICJyZWZlcmVuY2UiLCAicmVhZEZpbGVTeW5jIiwgInJlc29sdmUiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiXQp9Cg==
