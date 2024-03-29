/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => MTJPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian2 = require("obsidian");

// src/j2m.ts
var J2M = class {
  static toM(input) {
    input = input.replace(/^bq\.(.*)$/gm, function(_, content) {
      return "> " + content + "\n";
    });
    input = input.replace(/([*_])(.*)\1/g, function(_, wrapper, content) {
      const to = wrapper === "*" ? "**" : "*";
      return to + content + to;
    });
    input = input.replace(/^((?:#|-|\+|\*)+) (.*)$/gm, function(_, level, content) {
      let len = 2;
      let prefix = "1.";
      if (level.length > 1) {
        len = (level.length - 1) * 4 + 2;
      }
      prefix = level[level.length - 1];
      if (prefix == "#")
        prefix = "1.";
      return new Array(Math.floor(len)).join(" ") + prefix + " " + content;
    });
    input = input.replace(/^h([0-6])\.(.*)$/gm, function(_, level, content) {
      return new Array(level + 1).join("#") + content;
    });
    input = input.replace(/\{\{([^}]+)\}\}/g, "`$1`");
    input = input.replace(/\?\?((?:.[^?]|[^?].)+)\?\?/g, "<cite>$1</cite>");
    input = input.replace(/\+([^+]*)\+/g, "<ins>$1</ins>");
    input = input.replace(/\^([^^]*)\^/g, "<sup>$1</sup>");
    input = input.replace(/~([^~]*)~/g, "<sub>$1</sub>");
    input = input.replace(/-([^-]*)-/g, "-$1-");
    input = input.replace(/\{code(:([a-z]+))?\}([^]*?)\{code\}/gm, "```$2$3```");
    input = input.replace(/\{quote\}([^]*)\{quote\}/gm, function(_, content) {
      const lines2 = content.split(/\r?\n/gm);
      for (let i = 0; i < lines2.length; i++) {
        lines2[i] = "> " + lines2[i];
      }
      return lines2.join("\n");
    });
    input = input.replace(/!([^|\n\s]+)\|([^\n!]*)alt=([^\n!,]+?)(,([^\n!]*))?!/g, "![$3]($1)");
    input = input.replace(/!([^|\n\s]+)\|([^\n!]*)!/g, "![]($1)");
    input = input.replace(/!([^\n\s!]+)!/g, "![]($1)");
    input = input.replace(/\[([^|]+)\|(.+?)\]/g, "[$1]($2)");
    input = input.replace(/\[(.+?)\]([^(]+)/g, "<$1>$2");
    input = input.replace(/{noformat}/g, "```");
    input = input.replace(/{color:([^}]+)}([^]*?){color}/gm, '<span style="color:$1">$2</span>');
    const lines = input.split(/\r?\n/gm);
    for (let i = 0; i < lines.length; i++) {
      const line_content = lines[i];
      const seperators = line_content.match(/\|\|/g);
      if (seperators != null) {
        lines[i] = lines[i].replace(/\|\|/g, "|");
        console.log(seperators);
        let header_line = "";
        for (let j = 0; j < seperators.length - 1; j++) {
          header_line += "|---";
        }
        header_line += "|";
        lines.splice(i + 1, 0, header_line);
      }
    }
    input = "";
    for (let i = 0; i < lines.length; i++) {
      input += lines[i] + "\n";
    }
    return input;
  }
  static convertCallouts(input, settings) {
    const lines = input.split("\n");
    let insideCallout = false;
    let panelContent = "";
    let panelTitle = "";
    let panelType = "";
    const convertedLines = lines.map((line) => {
      if (line.startsWith("> [!")) {
        insideCallout = true;
        const match = line.match(/^>\s?\[!(\w+)\]\s?(.*)$/);
        if (match) {
          panelType = match[1];
          panelTitle = match[2];
        }
        return "";
      } else if (insideCallout && line.startsWith("> ")) {
        panelContent += line.replace(/^>\s?(.*)$/, "$1") + "\n";
        return "";
      } else {
        if (insideCallout) {
          insideCallout = false;
          let panelColor = "";
          const calloutConfiguration = settings.calloutConfigurations.find((ccfg) => ccfg.identifier == panelType);
          if (calloutConfiguration) {
            panelColor = `bgColor=${calloutConfiguration.contentBgColor}|titleBGColor=${calloutConfiguration.titleBgColor}|titleColor=${calloutConfiguration.titleColor}`;
            panelContent = `{color:${calloutConfiguration.contentColor}}${panelContent.trim()}{color}`;
            if (calloutConfiguration.titleIcon != "none") {
              panelTitle = `${calloutConfiguration.titleIcon} ${panelTitle}`;
            }
          }
          const panel = `{panel:${panelColor}|title=${panelTitle}}
${panelContent}
{panel}`;
          panelContent = "";
          panelTitle = "";
          panelType = "";
          return panel + "\n" + line;
        } else {
          return line;
        }
      }
    });
    return convertedLines.join("\n");
  }
  static toJ(input, settings) {
    const START = "J2MBLOCKPLACEHOLDER";
    const replacementsList = [];
    let counter = 0;
    input = input.replace(/`{3,}(\w+)?((?:\n|.)+?)`{3,}/g, function(_, synt, content) {
      let code = "{code";
      if (synt) {
        code += ":" + synt;
      }
      code += "}" + content + "{code}";
      const key = START + counter++ + "%%";
      replacementsList.push({ key, value: code });
      return key;
    });
    input = input.replace(/`([^`]+)`/g, function(_, content) {
      const code = "{{" + content + "}}";
      const key = START + counter++ + "%%";
      replacementsList.push({ key, value: code });
      return key;
    });
    input = input.replace(/`([^`]+)`/g, "{{$1}}");
    input = input.replace(/^(.*?)\n([=-])+$/gm, function(_, content, level) {
      return "h" + (level[0] === "=" ? 1 : 2) + ". " + content;
    });
    input = input.replace(/^([#]+)(.*?)$/gm, function(_, level, content) {
      return "h" + level.length + "." + content;
    });
    input = input.replace(/([*_]+)(.*?)\1/g, function(_, wrapper, content) {
      const to = wrapper.length === 1 ? "_" : "*";
      return to + content + to;
    });
    let multiLevelBulletTabs = false;
    input = input.replace(/^(\t*)- (.+)$/gm, function(_, p1, p2) {
      let hyphens = "- ";
      if (p1.length > 0) {
        hyphens = "-".repeat(p1.length + 1) + " ";
        console.log("Hyphens", hyphens, p1, p1.length);
        multiLevelBulletTabs = true;
      }
      return hyphens + p2;
    });
    if (!multiLevelBulletTabs) {
      input = input.replace(/^(\s*)- (.*)$/gm, function(_, level, content) {
        let len = 2;
        if (level.length > 0) {
          len = level.length / 4 + 2;
        }
        return new Array(Math.floor(len)).join("-") + " " + content;
      });
    }
    input = input.replace(/^(\s+)1. (.*)$/gm, function(_, level, content) {
      let len = 2;
      if (level.length > 1) {
        len = level.length / 4 + 2;
      }
      return new Array(Math.floor(len)).join("#") + " " + content;
    });
    const map = {
      cite: "??",
      del: "-",
      ins: "+",
      sup: "^",
      sub: "~"
    };
    input = input.replace(new RegExp("<(" + Object.keys(map).join("|") + ")>(.*?)</\\1>", "g"), function(_, from, content) {
      const to = map[from];
      return to + content + to;
    });
    input = input.replace(/<span style="color:(#[^"]+)">([^]*?)<\/span>/gm, "{color:$1}$2{color}");
    input = input.replace(/~~(.*?)~~/g, "-$1-");
    input = input.replace(/!\[\[(.+)\]\]/g, function(_, filePath) {
      return `{panel:borderColor=#ffecb5|bgColor=#fff3cd}
				{color:#664d03}+*Warning:*+ The following file must be transferred manually via drag & drop: *${filePath}*{color}
				{panel}
				
				!${filePath}|thumbnail!`;
    });
    input = input.replace(/!\[([^\]\n]+)\]\(([^)\n\s]+)\)/g, function(_, alt, filePath) {
      return `{panel:borderColor=#ffecb5|bgColor=#fff3cd}
				{color:#664d03}+*Warning:*+ The following file must be transferred manually via drag & drop: *${filePath}*{color}
				{panel}
				
				!${filePath}|alt=${alt}!`;
    });
    input = input.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function(_, filePath, alt) {
      return `{panel:borderColor=#ffecb5|bgColor=#fff3cd}
				{color:#664d03}+*Warning:*+ The following file must be transferred manually via drag & drop: *${filePath}*{color}
				{panel}
				
				[${filePath}|${alt}]`;
    });
    input = input.replace(/<([^>]+)>/g, function(_, filePath) {
      return `{panel:borderColor=#ffecb5|bgColor=#fff3cd}
				{color:#664d03}+*Warning:*+ The following file must be transferred manually via drag & drop: *${filePath}*{color}
				{panel}
				
				[${filePath}]`;
    });
    input = this.convertCallouts(input, settings);
    for (let i = 0; i < replacementsList.length; i++) {
      const sub = replacementsList[i];
      input = input.replace(sub["key"], sub["value"]);
    }
    const lines = input.split(/\r?\n/gm);
    for (let i = 0; i < lines.length; i++) {
      const line_content = lines[i];
      if (line_content.match(/\|---/g) != null) {
        lines[i - 1] = lines[i - 1].replace(/\|/g, "||");
        lines.splice(i, 1);
      }
    }
    input = "";
    for (let i = 0; i < lines.length; i++) {
      input += lines[i] + "\n";
    }
    return input;
  }
};

// src/settings.ts
var import_obsidian = require("obsidian");

// src/utils/calloutTypes.ts
var calloutTypes = {
  BUG: "Bug",
  DEFAULT: "Default",
  NOTE: "Note",
  ERROR: "Error",
  DANGER: "Danger",
  EXAMPLE: "Example",
  FAIL: "Fail",
  FAILURE: "Failure",
  MISSING: "Missing",
  IMPORTANT: "Important",
  INFO: "Info",
  QUESTION: "Question",
  HELP: "Help",
  FAQ: "FAQ",
  SUCCESS: "Success",
  CHECK: "Check",
  DONE: "Done",
  SUMMARY: "Summary",
  ABSTRACT: "Abstract",
  TLDR: "TLDR",
  TIP: "Tip",
  HINT: "Hint",
  TODO: "Todo",
  WARNING: "Warning",
  CAUTION: "Caution",
  ATTENTION: "Attention",
  QUOTE: "Quote",
  CITE: "Cite"
};

// src/utils/calloutTypeDefaultColors.ts
var calloutTypesDefaultColors = {
  BUG: {
    titleColor: `#ffffff`,
    titleBgColor: `#e93147`,
    contentBgColor: `#e93147`,
    contentBorderColor: `#e93147`,
    contentColor: `#ffffff`
  },
  DEFAULT: {
    titleColor: `#ffffff`,
    titleBgColor: `#086ddd`,
    contentBgColor: `#086ddd`,
    contentBorderColor: `#086ddd`,
    contentColor: `#ffffff`
  },
  NOTE: {
    titleColor: `#ffffff`,
    titleBgColor: `#086ddd`,
    contentBgColor: `#086ddd`,
    contentBorderColor: `#086ddd`,
    contentColor: `#ffffff`
  },
  ERROR: {
    titleColor: `#ffffff`,
    titleBgColor: `#e93147`,
    contentBgColor: `#e93147`,
    contentBorderColor: `#e93147`,
    contentColor: `#ffffff`
  },
  DANGER: {
    titleColor: `#ffffff`,
    titleBgColor: `#e93147`,
    contentBgColor: `#e93147`,
    contentBorderColor: `#e93147`,
    contentColor: `#ffffff`
  },
  EXAMPLE: {
    titleColor: `#ffffff`,
    titleBgColor: `#7852ee`,
    contentBgColor: `#7852ee`,
    contentBorderColor: `#7852ee`,
    contentColor: `#ffffff`
  },
  FAIL: {
    titleColor: `#ffffff`,
    titleBgColor: `#e93147`,
    contentBgColor: `#e93147`,
    contentBorderColor: `#e93147`,
    contentColor: `#ffffff`
  },
  FAILURE: {
    titleColor: `#ffffff`,
    titleBgColor: `#e93147`,
    contentBgColor: `#e93147`,
    contentBorderColor: `#e93147`,
    contentColor: `#ffffff`
  },
  MISSING: {
    titleColor: `#ffffff`,
    titleBgColor: `#e93147`,
    contentBgColor: `#e93147`,
    contentBorderColor: `#e93147`,
    contentColor: `#ffffff`
  },
  IMPORTANT: {
    titleColor: `#ffffff`,
    titleBgColor: `#00bfbc`,
    contentBgColor: `#00bfbc`,
    contentBorderColor: `#00bfbc`,
    contentColor: `#ffffff`
  },
  INFO: {
    titleColor: `#ffffff`,
    titleBgColor: `#086ddd`,
    contentBgColor: `#086ddd`,
    contentBorderColor: `#086ddd`,
    contentColor: `#ffffff`
  },
  QUESTION: {
    titleColor: `#ffffff`,
    titleBgColor: `#ec7500`,
    contentBgColor: `#ec7500`,
    contentBorderColor: `#ec7500`,
    contentColor: `#ffffff`
  },
  HELP: {
    titleColor: `#ffffff`,
    titleBgColor: `#ec7500`,
    contentBgColor: `#ec7500`,
    contentBorderColor: `#ec7500`,
    contentColor: `#ffffff`
  },
  FAQ: {
    titleColor: `#ffffff`,
    titleBgColor: `#ec7500`,
    contentBgColor: `#ec7500`,
    contentBorderColor: `#ec7500`,
    contentColor: `#ffffff`
  },
  SUCCESS: {
    titleColor: `#ffffff`,
    titleBgColor: `#08b94e`,
    contentBgColor: `#08b94e`,
    contentBorderColor: `#08b94e`,
    contentColor: `#ffffff`
  },
  CHECK: {
    titleColor: `#ffffff`,
    titleBgColor: `#08b94e`,
    contentBgColor: `#08b94e`,
    contentBorderColor: `#08b94e`,
    contentColor: `#ffffff`
  },
  DONE: {
    titleColor: `#ffffff`,
    titleBgColor: `#08b94e`,
    contentBgColor: `#08b94e`,
    contentBorderColor: `#08b94e`,
    contentColor: `#ffffff`
  },
  SUMMARY: {
    titleColor: `#ffffff`,
    titleBgColor: `#00bfbc`,
    contentBgColor: `#00bfbc`,
    contentBorderColor: `#00bfbc`,
    contentColor: `#ffffff`
  },
  ABSTRACT: {
    titleColor: `#ffffff`,
    titleBgColor: `#00bfbc`,
    contentBgColor: `#00bfbc`,
    contentBorderColor: `#00bfbc`,
    contentColor: `#ffffff`
  },
  TLDR: {
    titleColor: `#ffffff`,
    titleBgColor: `#00bfbc`,
    contentBgColor: `#00bfbc`,
    contentBorderColor: `#00bfbc`,
    contentColor: `#ffffff`
  },
  TIP: {
    titleColor: `#ffffff`,
    titleBgColor: `#00bfbc`,
    contentBgColor: `#00bfbc`,
    contentBorderColor: `#00bfbc`,
    contentColor: `#ffffff`
  },
  HINT: {
    titleColor: `#ffffff`,
    titleBgColor: `#00bfbc`,
    contentBgColor: `#00bfbc`,
    contentBorderColor: `#00bfbc`,
    contentColor: `#ffffff`
  },
  TODO: {
    titleColor: `#ffffff`,
    titleBgColor: `#086ddd`,
    contentBgColor: `#086ddd`,
    contentBorderColor: `#086ddd`,
    contentColor: `#ffffff`
  },
  WARNING: {
    titleColor: `#ffffff`,
    titleBgColor: `#ec7500`,
    contentBgColor: `#ec7500`,
    contentBorderColor: `#ec7500`,
    contentColor: `#ffffff`
  },
  CAUTION: {
    titleColor: `#ffffff`,
    titleBgColor: `#ec7500`,
    contentBgColor: `#ec7500`,
    contentBorderColor: `#ec7500`,
    contentColor: `#ffffff`
  },
  ATTENTION: {
    titleColor: `#ffffff`,
    titleBgColor: `#ec7500`,
    contentBgColor: `#ec7500`,
    contentBorderColor: `#ec7500`,
    contentColor: `#ffffff`
  },
  QUOTE: {
    titleColor: `#ffffff`,
    titleBgColor: `#9e9e9e`,
    contentBgColor: `#9e9e9e`,
    contentBorderColor: `#9e9e9e`,
    contentColor: `#ffffff`
  },
  CITE: {
    titleColor: `#ffffff`,
    titleBgColor: `#9e9e9e`,
    contentBgColor: `#9e9e9e`,
    contentBorderColor: `#9e9e9e`,
    contentColor: `#ffffff`
  }
};

// src/utils/calloutIcons.ts
var calloutIcons = {
  empty: {
    displayName: "None",
    jiraTag: "none"
  },
  smile: {
    displayName: "\u{1F642}",
    jiraTag: ":)"
  },
  sad: {
    displayName: "\u{1F641}",
    jiraTag: ":("
  },
  tongue: {
    displayName: "\u{1F60B}",
    jiraTag: ":P"
  },
  grinning: {
    displayName: "\u{1F600}",
    jiraTag: ":D"
  },
  winking: {
    displayName: "\u{1F609}",
    jiraTag: ";)"
  },
  thumbUp: {
    displayName: "\u{1F44D}",
    jiraTag: "(y)"
  },
  thumbDown: {
    displayName: "\u{1F44E}",
    jiraTag: "(n)"
  },
  info: {
    displayName: "\u{1F6C8}",
    jiraTag: "(i)"
  },
  check: {
    displayName: "\u2705",
    jiraTag: "(/)"
  },
  cross: {
    displayName: "\u274C",
    jiraTag: "(x)"
  },
  warn: {
    displayName: "\u26A0",
    jiraTag: "(!)"
  },
  plus: {
    displayName: "\u2295",
    jiraTag: "(+)"
  },
  minus: {
    displayName: "\u229F",
    jiraTag: "(-)"
  },
  question: {
    displayName: "?",
    jiraTag: "(?)"
  },
  lightBulbOn: {
    displayName: "\u{1F4A1}",
    jiraTag: "(on)"
  },
  lightBulbOff: {
    displayName: "\u{1F4A1}(off)",
    jiraTag: "(off)"
  },
  redStar: {
    displayName: "\u2B50(red)",
    jiraTag: "(*r)"
  },
  greenStar: {
    displayName: "\u2B50(green)",
    jiraTag: "(*g)"
  },
  blueStar: {
    displayName: "\u2B50(blue)",
    jiraTag: "(*b)"
  },
  goldStar: {
    displayName: "\u2B50",
    jiraTag: "(*)"
  },
  redFlag: {
    displayName: "\u2690(red)",
    jiraTag: "(flag)"
  },
  whiteFlag: {
    displayName: "\u2690(white)",
    jiraTag: "(flagoff)"
  }
};

// src/settings.ts
var DEFAULT_SETTINGS = {
  imageEnableUploadToHost: false,
  temp: {
    createCalloutConfiguration: ""
  },
  calloutConfigurations: []
};
var MTJSettingsTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    const settings = this.plugin.settings;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Markdown to Jira - Settings" });
    containerEl.createEl("h1", { text: "Callouts" });
    new import_obsidian.Setting(containerEl).setName("Add callout configuration").setDesc("This setting is mandatory if callouts should be converted. Choose one of the callout types and set the different color settings for each element of a callout.").addDropdown((dropdown) => {
      dropdown.addOptions(calloutTypes).onChange(async (value) => {
        settings.temp.createCalloutConfiguration = value;
        await this.plugin.saveSettings();
      });
    }).addButton((button) => {
      button.setIcon("plus").onClick(async () => {
        if (settings.temp.createCalloutConfiguration.length == 0) {
          return new import_obsidian.Notice("First select a callout type to add!");
        }
        if (settings.calloutConfigurations.some((ccfg) => ccfg.identifier == settings.temp.createCalloutConfiguration)) {
          return new import_obsidian.Notice("This callout configuration already exists!");
        }
        settings.calloutConfigurations.push({
          identifier: settings.temp.createCalloutConfiguration,
          titleIcon: calloutIcons.empty.jiraTag,
          titleColor: calloutTypesDefaultColors[settings.temp.createCalloutConfiguration].titleColor,
          titleBgColor: calloutTypesDefaultColors[settings.temp.createCalloutConfiguration].titleBgColor,
          contentBgColor: calloutTypesDefaultColors[settings.temp.createCalloutConfiguration].contentBgColor,
          contentBorderColor: calloutTypesDefaultColors[settings.temp.createCalloutConfiguration].contentBorderColor,
          contentColor: calloutTypesDefaultColors[settings.temp.createCalloutConfiguration].contentColor
        });
        await this.plugin.saveSettings();
        this.display();
      });
    });
    for (const [i, val] of settings.calloutConfigurations.entries()) {
      containerEl.createEl("h4", { text: `Callout-Config of ${val.identifier}:` });
      new import_obsidian.Setting(containerEl).setName("Choose title icon").addDropdown((dropdown) => {
        dropdown.addOptions(Object.entries(calloutIcons).reduce((acc, [key, { jiraTag, displayName }]) => ({ ...acc, [jiraTag]: displayName }), {})).setValue(val.titleIcon).onChange(async (value) => {
          settings.calloutConfigurations[i].titleIcon = value;
          await this.plugin.saveSettings();
        });
      });
      new import_obsidian.Setting(containerEl).setName(`Choose title text color:`).addColorPicker((colorPicker) => {
        colorPicker.setValue(settings.calloutConfigurations[i].titleColor || calloutTypesDefaultColors[val.identifier].titleColor).onChange(async (color) => {
          settings.calloutConfigurations[i].titleColor = color;
          await this.plugin.saveSettings();
        });
      }).addExtraButton((btn) => {
        btn.setIcon("reset").onClick(async () => {
          settings.calloutConfigurations[i].titleColor = calloutTypesDefaultColors[val.identifier].titleColor;
          await this.plugin.saveSettings();
          this.display();
        }).setTooltip("restore default color");
      });
      new import_obsidian.Setting(containerEl).setName(`Choose title background color:`).addColorPicker((colorPicker) => {
        colorPicker.setValue(settings.calloutConfigurations[i].titleBgColor || calloutTypesDefaultColors[val.identifier].titleBgColor).onChange(async (color) => {
          settings.calloutConfigurations[i].titleBgColor = color;
          await this.plugin.saveSettings();
        });
      }).addExtraButton((btn) => {
        btn.setIcon("reset").onClick(async () => {
          settings.calloutConfigurations[i].titleBgColor = calloutTypesDefaultColors[val.identifier].titleBgColor;
          await this.plugin.saveSettings();
          this.display();
        }).setTooltip("restore default color");
      });
      new import_obsidian.Setting(containerEl).setName(`Choose content text color:`).addColorPicker((colorPicker) => {
        colorPicker.setValue(settings.calloutConfigurations[i].contentColor || calloutTypesDefaultColors[val.identifier].contentColor).onChange(async (color) => {
          settings.calloutConfigurations[i].contentColor = color;
          await this.plugin.saveSettings();
        });
      }).addExtraButton((btn) => {
        btn.setIcon("reset").onClick(async () => {
          settings.calloutConfigurations[i].contentColor = calloutTypesDefaultColors[val.identifier].contentColor;
          await this.plugin.saveSettings();
          this.display();
        }).setTooltip("restore default color");
      });
      new import_obsidian.Setting(containerEl).setName(`Choose content background color:`).addColorPicker((colorPicker) => {
        colorPicker.setValue(settings.calloutConfigurations[i].contentBgColor || calloutTypesDefaultColors[val.identifier].contentBgColor).onChange(async (color) => {
          settings.calloutConfigurations[i].contentBgColor = color;
          await this.plugin.saveSettings();
        });
      }).addExtraButton((btn) => {
        btn.setIcon("reset").onClick(async () => {
          settings.calloutConfigurations[i].contentBgColor = calloutTypesDefaultColors[val.identifier].contentBgColor;
          await this.plugin.saveSettings();
          this.display();
        }).setTooltip("restore default color");
      });
      new import_obsidian.Setting(containerEl).setName(`Choose content border color:`).addColorPicker((colorPicker) => {
        colorPicker.setValue(settings.calloutConfigurations[i].contentBorderColor || calloutTypesDefaultColors[val.identifier].contentBorderColor).onChange(async (color) => {
          settings.calloutConfigurations[i].contentBorderColor = color;
          await this.plugin.saveSettings();
        });
      }).addExtraButton((btn) => {
        btn.setIcon("reset").onClick(async () => {
          settings.calloutConfigurations[i].contentBorderColor = calloutTypesDefaultColors[val.identifier].contentBorderColor;
          await this.plugin.saveSettings();
          this.display();
        }).setTooltip("restore default color");
      });
      new import_obsidian.Setting(containerEl).setName("Remove configuration").addButton((button) => {
        button.setIcon("minus").onClick(async () => {
          settings.calloutConfigurations.splice(i, 1);
          await this.plugin.saveSettings();
          this.display();
        });
      });
      containerEl.createEl("hr");
    }
    containerEl.createEl("h1", { text: "Images" });
    new import_obsidian.Setting(containerEl).setName("Image Translation (This feature is still in development...)").setDesc("Should images be uploaded to one of the given hosts?").addToggle((toggle) => {
      toggle.setDisabled(true);
      toggle.onChange(async () => {
        if (toggle.disabled) {
          new import_obsidian.Notice(`This feature is still in development...`, 3e3);
          this.plugin.settings.imageEnableUploadToHost = false;
          toggle.setValue(false);
        } else {
          this.plugin.settings.imageEnableUploadToHost = toggle.getValue();
          await this.plugin.saveSettings();
        }
      });
    });
  }
};

// src/main.ts
var MTJPlugin = class extends import_obsidian2.Plugin {
  async onload() {
    await this.loadSettings();
    this.addCommand({
      id: "mtj-convert-note-to-jira",
      name: "Note to Jira markup (clipboard)",
      editorCallback: async (editor) => {
        const markup = J2M.toJ(editor.getDoc().getValue(), this.settings);
        await navigator.clipboard.writeText(markup);
      }
    });
    this.addCommand({
      id: "mtj-convert-selection-to-jira",
      name: "Selection to Jira markup (clipboard)",
      editorCallback: async (editor) => {
        const markup = J2M.toJ(editor.getSelection(), this.settings);
        await navigator.clipboard.writeText(markup);
      }
    });
    this.addCommand({
      id: "mtj-convert-jira-selection-to-markdown",
      name: "Jira markup (clipboard) to markdown note",
      editorCallback: async (editor) => {
        const markup = await navigator.clipboard.readText();
        const markdown = J2M.toM(markup);
        editor.replaceSelection(markdown);
      }
    });
    this.addSettingTab(new MTJSettingsTab(this.app, this));
  }
  onunload() {
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
