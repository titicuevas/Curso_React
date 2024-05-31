import { useState, useEffect } from "react";

const CAT_IMAGE_BASE_URL = "https://cataas.com/cat/says/";

export const useCatImage = (fact) => {
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    if (fact) {
      const threeFirstWords = fact.split(" ").slice(0, 3).join(" ");
      const encodedWords = encodeURIComponent(threeFirstWords);
      const imageUrl = `${CAT_IMAGE_BASE_URL}${encodedWords}?size=50&color=red`;
      setImageUrl(imageUrl);
    }
  }, [fact]);

  return imageUrl;
};
