"use strict";
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
var profile_svc_exports = {};
__export(profile_svc_exports, {
  default: () => profile_svc_default,
  get: () => get
});
module.exports = __toCommonJS(profile_svc_exports);
let profiles = [
  {
    id: "blaze",
    name: "Blaze Pasquale",
    nickname: void 0,
    home: "Oakland, CA",
    jobs: [],
    avatar: "/data/avatars/Blaze Pasquale.png"
  },
  {
    id: "daver",
    name: "David Davey",
    nickname: void 0,
    home: "Vallejo, CA",
    jobs: [],
    avatar: "/data/avatars/Blaze Pasquale.png"
  },
  {
    id: "tim",
    name: "Timothy",
    nickname: "t1m",
    home: "Emeryville, CA",
    jobs: [],
    avatar: "/data/avatars/Blaze Pasquale.png"
  }
];
function get(id) {
  return profiles.find((t) => t.id === id);
}
var profile_svc_default = { get };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  get
});
