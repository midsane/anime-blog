import {atom} from "recoil"
const latestArticleAtom = atom({
    key : "latestArticleAtom",
    default: []
})

const articlesAtom = atom({
  key: "articlesAtom",
  default: [],
});

const articlesInfoLoadingAtom= atom({
  key: "articlesInfoLoadingAtom",
  default: [],
});

export {latestArticleAtom, articlesAtom, articlesInfoLoadingAtom}