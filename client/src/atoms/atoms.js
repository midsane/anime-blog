import { atom } from "recoil";
const latestArticleAtom = atom({
  key: "latestArticleAtom",
  default: [],
});

const articlesAtom = atom({
  key: "articlesAtom",
  default: [],
});

const articlesInfoLoadingAtom = atom({
  key: "articlesInfoLoadingAtom",
  default: [],
});

const articleIntroAtom = atom({
  key: "articleIntroAtom",
  default: "",
});

const articleTitleAtom = atom({
  key: "articleTitleAtom",
  default: "",
});

const articleBannerImgLinkAtom = atom({
  key: "articleBannerImgLinkAtom",
  default: "",
});

const toastMsgAtom = atom({
  key: "toastMsgAtom",
  default: ""
})

const articleListAtom = atom({
  key: "articleListAtom",
  default: []
})

export {
  latestArticleAtom,
  articlesAtom,
  articlesInfoLoadingAtom,
  articleIntroAtom,
  articleTitleAtom,
  articleBannerImgLinkAtom,
  toastMsgAtom,
  articleListAtom
};
